import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

export function Component() {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        px: 3,
      }}
    >
      <Typography variant="h3" color="white">
        404
      </Typography>
      <Typography color="grey.400">
        The page you are looking for does not exist.
      </Typography>
      <Button
        component={RouterLink}
        to={`/${MAIN_PATH.browse}`}
        variant="contained"
      >
        Go to home
      </Button>
    </Box>
  );
}

Component.displayName = "NotFoundPage";
