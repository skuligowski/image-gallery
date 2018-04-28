import {UrlMatcher, UrlMatchResult, UrlSegment, UrlSegmentGroup} from '@angular/router';

import {Route} from '@angular/router/src/config';

const ACCEPTABLE_EXTENSIONS = {'png': true, 'jpeg': true, 'jpg': true};

export function matchAlbum(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult {
  console.log(segments);
  console.log(group);
  if (segments.length && segments[0].path === 'album') {
    const lastSegmentPath = segments[segments.length - 1].path;
    const isPhoto = ACCEPTABLE_EXTENSIONS[lastSegmentPath.split('.').pop()];
    if (isPhoto) {
      const albumPermalink = new UrlSegment(segments.slice(1, segments.length - 1).map(segment => segment.path).join('/'), {});
      const photoName = new UrlSegment(segments[segments.length - 1].path, {});

      return { consumed: segments, posParams: { albumPermalink, photoName } };
    }
    return { consumed: segments, posParams: { albumPermalink: new UrlSegment(segments.slice(1).map(segment => segment.path).join('/'), {}) } };
  } else {
    return null;
  }
}
