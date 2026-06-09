import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getEnvErrors } from "src/lib/env";
import { APP_NAME } from "src/constant";

export default function ConfigErrorScreen() {
  const missingVars = getEnvErrors();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#141414",
        px: 3,
      }}
    >
      <Box sx={{ maxWidth: 560 }}>
        <Typography variant="h4" color="error" gutterBottom>
          Configuration required
        </Typography>
        <Typography color="grey.300" paragraph>
          {APP_NAME} needs environment variables before it can load movie data.
          Copy <code>.env.example</code> to <code>.env</code> and fill in your
          TMDB API key.
        </Typography>
        <Box
          component="ul"
          sx={{ color: "grey.400", pl: 3, "& li": { mb: 1 } }}
        >
          {missingVars.map((name) => (
            <li key={name}>
              <Typography component="span" fontFamily="monospace">
                {name}
              </Typography>
            </li>
          ))}
        </Box>
        <Typography color="grey.500" sx={{ mt: 2 }}>
          Get a free API key at{" "}
          <a
            href="https://www.themoviedb.org/settings/api"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#a78bfa" }}
          >
            themoviedb.org/settings/api
          </a>
          .
        </Typography>
      </Box>
    </Box>
  );
}
