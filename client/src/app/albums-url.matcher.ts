import { UrlMatchResult, UrlSegment } from '@angular/router';

const ACCEPTABLE_EXTENSIONS = {'png': true, 'jpeg': true, 'jpg': true};

export function matchAlbum(segments: UrlSegment[]): UrlMatchResult {
  if (segments.length && segments[0].path === 'albums') {
    const lastSegmentPath = segments[segments.length - 1].path;
    const isFile = ACCEPTABLE_EXTENSIONS[lastSegmentPath.split('.').pop().toLocaleLowerCase()];
    const albumPath = segments.slice(1, isFile ? segments.length - 1 : segments.length)
      .map(segment => segment.path)
      .join('/');
    const posParams = {
      albumPermalink: new UrlSegment(albumPath, {})
    };
    if (isFile) {
      posParams['imageFilename'] = new UrlSegment(segments[segments.length - 1].path, {});
    }
    return { consumed: segments, posParams };
  } else {
    return null;
  }
}

