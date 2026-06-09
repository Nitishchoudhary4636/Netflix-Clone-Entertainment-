const requiredEnvVars = {
  VITE_APP_API_ENDPOINT_URL: import.meta.env.VITE_APP_API_ENDPOINT_URL,
  VITE_APP_TMDB_V3_API_KEY: import.meta.env.VITE_APP_TMDB_V3_API_KEY,
} as const;

export function getEnvErrors(): string[] {
  return Object.entries(requiredEnvVars)
    .filter(([, value]) => !value || value.trim() === "")
    .map(([key]) => key);
}

export function isEnvConfigured(): boolean {
  return getEnvErrors().length === 0;
}
