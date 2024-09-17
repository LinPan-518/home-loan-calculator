import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Loading = () => {
  return (
    <Stack spacing={1} sx={{ margin: "40px" }}>
      <Skeleton variant="rounded" width={"100%"} height={200} />
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton variant="rounded" width={"100%"} height={400} />
      <Skeleton variant="text" sx={{ fontSize: "3rem", mt: 4 }} />
      <Skeleton variant="rounded" width={"100%"} height={500} />
    </Stack>
  );
};
export default Loading;
