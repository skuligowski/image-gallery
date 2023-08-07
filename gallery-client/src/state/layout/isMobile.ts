export function isMobile(): boolean {
  return window.matchMedia('(max-width: 768px)').matches;
}
