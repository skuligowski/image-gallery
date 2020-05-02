import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;

@Component({
  selector: 'app-album-selector',
  templateUrl: 'album-selector.component.html',
  styleUrls: ['album-selector.component.scss'],
})
export class AlbumSelectorComponent implements OnChanges, AfterViewInit {

  @Input()
  albums: Album[];

  @ViewChild('anchor')
  anchor: ElementRef<any>;

  withoutDate: Album[];
  years: AlbumYear[];

  selectedAlbumId: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params.albumId) {
        this.selectedAlbumId = params.albumId;
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.anchor) {
      (this.anchor.nativeElement as HTMLElement).scrollIntoView();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const aggregate = this.createYears(this.albums);
    this.years = aggregate.years.sort((a, b) => a.name < b.name ? 1 : -1);
    this.years.forEach(year => year.months.sort((a, b) => a.name < b.name ? 1 : -1));
    this.withoutDate = aggregate.withoutDate;
  }

  selectAlbum(album: Album) {
    this.router.navigateByUrl('albums/' + album.permalink);
  }

  getMonth(month: string): number {
    return parseInt(month);
  }

  private createYears(albums: Album[]): AlbumsAggregate {
    const yearsMap: {[key: string]: AlbumYear} = {};
    return albums.reduce((aggregate, album) => {
      if (album.date) {
        const [year, month] = album.date.split('-');
        let albumYear = yearsMap[year];
        if (!albumYear) {
          albumYear = yearsMap[year] = {name: year, months: []};
          aggregate.years.push(albumYear)
        }

        let albumMonth = albumYear.months.find(yearMonth => yearMonth.name === month);
        if (!albumMonth) {
          albumMonth = {name: month, albums: []};
          albumYear.months.push(albumMonth);
        }
        albumMonth.albums.push(album);
      } else {
        aggregate.withoutDate.push(album);
      }
      return aggregate;
    }, {years: [], withoutDate: []});
  }
}

interface AlbumsAggregate {
  withoutDate: Album[];
  years: AlbumYear[];
}

export interface AlbumYear {
  name: string;
  months: AlbumMonth[];
}

export interface AlbumMonth {
  name: string;
  albums: Album[];

}
