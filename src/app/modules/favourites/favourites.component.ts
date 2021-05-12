import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { FavouritesService, LogService } from 'src/app/services';
import { Favourite, Grid, GridAction, Log } from 'src/app/models';
import { Crumb } from 'src/app/shared/components/nav/crumb';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  crumbs: Crumb = {text: 'favourites'};
  favs: Grid[] = [];
  isLoading = true;
  logs$: Observable<Log[]>;
  private _subscriptions = new Subscription();

  constructor(private _favouriteService: FavouritesService,
              private _logService: LogService) {
                this.logs$ = this._logService.logs$.pipe(map(data => {
                  return data.filter(a => a.category === 'favourites');
                }));
               }

  ngOnInit() {
    this._getFavourites();
  }

  onAction(val: GridAction) {
    if (val && val.id) {
      this._deleteItem(val.id, val);
    }
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private _getFavourites(): void {
    this._subscriptions.add(
      this._favouriteService.getFavourites()
        .subscribe(res => {
          if (res && res.length) {
            this._prepareData(res);
            this.favs = this._prepareData(res);
          }
          this.isLoading = false;
        })
    );
  }

  private _prepareData(data: Favourite[]): Grid[] {
    return data.map(item => {
      return {
        id: item.id,
        url: item.image.url,
        image_id: item.image_id
      };
    });
  }

  private _deleteItem(id, val: GridAction): void {
    this._subscriptions.add(
      this._favouriteService.removeFromFavourites(id)
      .subscribe(res => {
        this.favs = this.favs.filter(item => item.id !== id);
        this._logService.onAction({action: 0, type: 'FAV', img_id: val.image_id, user_action: 0});
      })
    );
  }

}
