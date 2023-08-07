const supportedExts: { [key: string]: boolean } = { jpg: true, png: true, jpeg: true };

export function parsePermalink(permalink: string): { album?: string; image?: string } {
  const permalinkParts = permalink.split('/');
  const lastSegmentPath = permalinkParts[permalinkParts.length - 1];
  let imageFilename = undefined;
  if (lastSegmentPath) {
    const fileParts = lastSegmentPath.split('.');
    if (fileParts.length === 2) {
      if (supportedExts[fileParts[1].toLowerCase()]) {
        imageFilename = lastSegmentPath;
      } else {
        return { album: undefined, image: undefined };
      }
    }
  }
  const albumPermalink = (imageFilename ? permalinkParts.slice(0, -1) : permalinkParts)
    .filter((part) => !!part)
    .join('/');
  return { album: albumPermalink || undefined, image: albumPermalink ? imageFilename : undefined };
}
