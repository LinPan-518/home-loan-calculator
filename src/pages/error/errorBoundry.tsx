import { Component, ReactNode, ErrorInfo } from "react";
import { ErrorBoundaryPage } from "pages/error";

interface MyComponentProps {
  children: ReactNode;
}

interface MyComponentState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  openSupportDialog: boolean;
  sent: boolean;
}

class ErrorBoundary extends Component<MyComponentProps, MyComponentState> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      openSupportDialog: false,
      sent: false,
    };
  }

  sendError(data: any) {
    //send error back
    console.log(data?.error_path, data?.error_stack);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // catch errors below and render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  clearError(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    this.setState({
      error: null,
      errorInfo: null,
    });
  }

  render() {
    const { errorInfo, sent, error } = this.state;
    if (errorInfo) {
      if (!sent) {
        this.sendError({
          error_path: window.location.hostname + window.location.pathname,
          error_stack: error?.stack,
        });
        this.setState({
          sent: true,
        });
      }
      return (
        <>
          <ErrorBoundaryPage errorType={"_errorBoundary"} />
        </>
      );
    }
    // if no error, just render normal component
    return this.props.children;
  }
}

export default ErrorBoundary;
