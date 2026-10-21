/** Build URLs that work locally and under a GitHub Pages project subdirectory. */
export function withBase(path = '/') {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const normalized = path.replace(/^\/+/, '');
  return normalized ? `${base}${normalized}` : base;
}
