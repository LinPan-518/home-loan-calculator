import { GlobalStyles } from "@mui/system";
import { Colors } from "./color";

export const GlobalStyle = () => (
  <GlobalStyles
    styles={{
      body: {
        margin: "0 auto",
        width: "100%",
        padding: 0,
        backgroundColor: Colors.White,
        textDecoration: "none",
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        color: Colors.Black,
      },
      hr: {
        border: 0,
        borderTop: `1px solid ${Colors.DarkGrey}`,
        margin: 0,
        height: "1px",
      },
      a: {
        textDecoration: "none",
      },
      "html, body, #root": {
        height: "100%",
        margin: 0,
      },
      "*": {
        margin: 0,
        padding: 0,
        border: 0,
      },
      "html, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, caption, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video":
        {
          margin: 0,
          padding: 0,
          border: 0,
        },
    }}
  />
);
