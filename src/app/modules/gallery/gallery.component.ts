import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreedService, DogsService, FavouritesService, ModalService, ThemeService } from 'src/app/services';
import { Breed, Grid, Dog, Favourite, GridAction } from 'src/app/models';
import { Crumb } from 'src/app/shared/components/nav/crumb';
import { MatDialogRef, MatDialogConfig } from '@angular/material';
import { UploadModalComponent } from 'src/app/shared/modals/upload-modal/upload-modal.component';

export interface FormGroup {
  limit: number;
  sort: 'RANDOM' | 'ASC' | 'DESC';
  breed_id: string;
  mime_types: string[];
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit, OnDestroy {
  sortTypes = [
    {name: 'Random', value: 'RANDOM'},
    {name: 'Ascending', value: 'ASC'},
    {name: 'Descending', value: 'DESC'},
  ];
  types = [
    {name: 'All', value: ['JPG', 'PNG', 'TIFF', 'GIF']},
    {name: 'Static', value: ['JPG', 'PNG', 'TIFF']},
    {name: 'Animated', value: ['GIF']}
  ];
  limits: number[] = [5, 10, 15, 20];
  breeds: Breed[] = [];
  data: Grid[] = [];
  formGroup: FormGroup = {
    limit: 5,
    sort: 'RANDOM',
    breed_id: 'ALL',
    mime_types: this.types[1].value
  };
  crumbs: Crumb = {text: 'gallery'};
  isLoading = true;

  private _theme: string;
  private _dogs: Dog[] = [];
  private _favourites: Favourite[] = [];
  private _subscriptions = new Subscription();

  constructor(private _dialogRef: MatDialogRef<UploadModalComponent>,
              private _breedService: BreedService,
              private _dogService: DogsService,
              private _favouritesService: FavouritesService,
              private _modalService: ModalService,
              private _themeService: ThemeService) { }

  ngOnInit() {
    this._getDogs(this.formGroup.limit, 'RANDOM', this.types[0].value);
    this._getBreeds();
    this._getTheme();
  }

  onFilter(): void {
    this._getDogs(this.formGroup.limit, this.formGroup.sort, this.formGroup.mime_types, this.formGroup.breed_id);
  }

  onAction(val: GridAction): void {
    if (val && val.id) {
      const _id = this._favourites.find(item => item.image_id === val.id);
      _id ? this._removeFromFavs(val.fav_id) : this._addToFavs(val.id);
    }
  }

  onUpload(): void {
    this._dialogRef = this._modalService.openUploadModal(this._theme);
    this._modalService.updateModalPosition(window.innerWidth, this._dialogRef);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this._dialogRef) {
      this._modalService.updateModalPosition(event.target.innerWidth, this._dialogRef);
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private _getDogs(limit: number, order: 'RANDOM' | 'ASC' | 'DESC', mime_types: string[], breed_id?: string): void {
    this.isLoading = true;
    this.data = [];
    this._subscriptions.add(
      this._dogService.getDogs({limit, order, mime_types, breed_id, size: 'small'})
        .subscribe(res => {
          if (res && res.length) {
            this._dogs = res;
            this._getFavourites(res);
          } else {
            this.isLoading = false;
          }
        })
    );
  }

  private _getBreeds(): void {
    this._subscriptions.add(
      this._breedService.getBreeds()
        .subscribe(res => {
          if (res && res.length) {
            this.breeds = res;
          }
        })
    );
  }

  private _getFavourites(dogs?: Dog[]): void {
    this._subscriptions.add(
      this._favouritesService.getFavourites()
        .subscribe(res => {
          if (res && res.length) {
            this._favourites = res;
            this.data = this._prepareData(res, dogs);
            this.isLoading = false;
          }
        })
    );
  }

  private _prepareData(favs: Favourite[], data: Dog[]): Grid[] {
    return data.map(item => {
      return {
        url: item.url,
        id: item.id,
        fav_id: favs.find(fav => fav.image_id === item.id) ? favs.find(fav => fav.image_id === item.id).id : null
      };
    });
  }

  private _addToFavs(id: string): void {
    this._subscriptions.add(
      this._favouritesService.postToFavourites({image_id: id})
        .subscribe(res => {
          this._getFavourites(this._dogs);
        })
    );
  }

  private _removeFromFavs(id: number): void {
    this._subscriptions.add(
      this._favouritesService.removeFromFavourites(id)
        .subscribe(res => {
          this._getFavourites(this._dogs);
        })
    );
  }

  private _getTheme(): void {
    this._subscriptions.add(
      this._themeService.theme$
        .subscribe(res => this._theme = res)
    );
  }

}
