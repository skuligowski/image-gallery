import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Album = Definitions.Album;
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-selector',
  templateUrl: 'album-selector.component.html'
})
export class AlbumSelectorComponent implements OnChanges {

  @Input()
  albums: Album[];

  groups: AlbumsGroup[];

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.groups = this.createAlbumGroups(this.albums);
  }

  selectAlbum(album: Album) {
    this.router.navigateByUrl('albums/' + album.permalink);
  }

  private createAlbumGroups(albums: Album[]): AlbumsGroup[] {
    const groups = [];
    albums.reduce((groupsMap, album) => {
      const key = album.tree[0];
      let group = groupsMap[key];
      if (!group) {
        group = groupsMap[key] = {
          albums: [],
          key
        };
        groups.push(group);
      }
      group.albums.push(album);
      return groupsMap;
    }, {});
    return groups;
  }
}


export interface AlbumsGroup {
  key: string;
  albums: Album[];
}
