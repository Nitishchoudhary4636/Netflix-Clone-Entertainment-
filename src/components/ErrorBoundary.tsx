import { Component, ErrorInfo, ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled application error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#141414",
            gap: 2,
            px: 3,
          }}
        >
          <Typography variant="h4" color="white">
            Something went wrong
          </Typography>
          <Typography color="grey.400" textAlign="center">
            An unexpected error occurred. Please refresh the page and try again.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.assign("/browse")}
          >
            Back to home
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
