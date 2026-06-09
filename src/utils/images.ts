export function resolveImageUrl(
  path: string | null | undefined,
  baseUrl?: string,
  size = "w780"
): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (!baseUrl) return path;
  return `${baseUrl}${size}${path}`;
}
