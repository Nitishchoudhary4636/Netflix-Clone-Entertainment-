import Box, { BoxProps } from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { APP_NAME, MAIN_PATH } from "src/constant";

export default function Logo({ sx }: BoxProps) {
  return (
    <RouterLink to={`/${MAIN_PATH.browse}`}>
      <Box
        component="img"
        alt={`${APP_NAME} logo`}
        src="/assets/logo.svg"
        width={140}
        height={28}
        sx={{
          display: "block",
          ...sx,
        }}
      />
    </RouterLink>
  );
}
