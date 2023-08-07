import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { albumNotFound, fetchAlbum, selectCurrentAlbum, selectImage } from '../../../state/albums/albumSlice';
import { useMatches } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { parsePermalink } from '../../../utils/parsePermalink';

function useMatchedPermalink(): string | undefined {
  const matches = useMatches();
  return matches.length && matches[0].params['*'] ? matches[0].params['*'] : undefined;
}

function useAlbumPermalink() {
  const permalink = useMatchedPermalink();
  const { album, image } = useMemo(() => {
    return permalink ? parsePermalink(permalink) : { album: undefined, image: undefined };
  }, [permalink]);
  return { albumPermalink: album, imagePermalink: image };
}

export function useAlbumRoute(): void {
  const dispatch = useAppDispatch();
  const { albumPermalink, imagePermalink } = useAlbumPermalink();
  useEffect(() => {
    if (!albumPermalink) {
      dispatch(albumNotFound());
    } else {
      dispatch(fetchAlbum(albumPermalink || ''));
    }
  }, [albumPermalink]);
  const { album } = useAppSelector(selectCurrentAlbum);
  useEffect(() => {
    if (album) {
      if (imagePermalink) {
        dispatch(selectImage(album.images.find((image) => image.filename === imagePermalink)));
      } else {
        dispatch(selectImage(undefined));
      }
    }
  }, [album, imagePermalink]);
}

export function useAlbum() {
  return useAppSelector(selectCurrentAlbum);
}
