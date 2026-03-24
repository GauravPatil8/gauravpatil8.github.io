export const withBase = (path: string) => {
  const normalizedBase = import.meta.env.BASE_URL || "/";
  const normalizedPath = path.replace(/^\/+/, "");

  return `${normalizedBase}${normalizedPath}`;
};
