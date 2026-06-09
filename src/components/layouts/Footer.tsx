import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router-dom";
import { APP_NAME, MAIN_PATH } from "src/constant";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 180,
        bgcolor: "inherit",
        px: "60px",
        py: "24px",
      }}
    >
      <Divider
        component="div"
        sx={{
          "::before, ::after": { top: "0%" },
        }}
      >
        <Typography color="grey.700" variant="h6" component="span">
          {APP_NAME}
        </Typography>
      </Divider>

      <Typography sx={{ mt: 2, color: "grey.500", maxWidth: 760 }}>
        Discover trending movies, timeless classics, and fresh picks across
        genres. Use search to jump directly into what you want to watch next.
      </Typography>

      <Box sx={{ mt: 2, display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Link
          component={RouterLink}
          underline="hover"
          color="grey.400"
          to={`/${MAIN_PATH.browse}`}
        >
          Home
        </Link>
        <Link
          component={RouterLink}
          underline="hover"
          color="grey.400"
          to={`/${MAIN_PATH.genreExplore}/popular`}
        >
          Popular
        </Link>
        <Link
          component={RouterLink}
          underline="hover"
          color="grey.400"
          to={`/${MAIN_PATH.genreExplore}/top_rated`}
        >
          Top Rated
        </Link>
        <Link
          component={RouterLink}
          underline="hover"
          color="grey.400"
          to={`/${MAIN_PATH.genreExplore}/upcoming`}
        >
          Upcoming
        </Link>
      </Box>
    </Box>
  );
}
