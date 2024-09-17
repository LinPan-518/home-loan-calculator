import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Loading = () => {
  return (
    <Stack spacing={1} sx={{ margin: "40px" }}>
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
    </Stack>
  );
};
export default Loading;
