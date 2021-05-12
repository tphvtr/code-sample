import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DogsService, VoteService, FavouritesService, LogService } from 'src/app/services';
import { Subscription, Observable } from 'rxjs';
import { Dog, Log } from 'src/app/models';
import { Crumb } from 'src/app/shared/components/nav/crumb';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VotingComponent implements OnInit, OnDestroy {
  crumbs: Crumb = {text: 'voting'};
  dog: Dog;
  logs$: Observable<Log[]>;
  favId: number;
  isLoading = true;
  private _subscriptions = new Subscription();
  constructor(private _dogService: DogsService,
              private _voteService: VoteService,
              private _favouriteService: FavouritesService,
              private _logService: LogService) {
                this.logs$ = this._logService.logs$;
              }

  ngOnInit() {
    this._getDogs();
  }

  onFav(dog: Dog): void {
    this.favId ? this._removeFromFav(dog, this.favId) : this._addToFav(dog);
  }

  onVote(val: 0 | 1, dog: Dog): void {
    this._subscriptions.add(
      this._voteService.createVote({image_id: dog.id, value: val})
        .subscribe(res => {
          this._logService.onAction({action: val, type: 'VOTE', img_id: dog.id, user_action: val});
          this.isLoading = true;
          this._getDogs();
        })
    );
  }

  private _getDogs(): void {
    this._subscriptions.add(
      this._dogService.getDogs({size: 'med'})
      .subscribe(res => {
        if (res.length) {
          this.dog = res[0];
        }
      })
    );
  }

  private _addToFav(dog: Dog): void {
    this._subscriptions.add(
      this._favouriteService.postToFavourites({image_id: dog.id})
        .subscribe(res => {
          this._logService.onAction({action: 1, type: 'FAV', img_id: dog.id, user_action: 1});
          this.favId = res.id;
        })
    );
  }

  private _removeFromFav(dog: Dog, id: number): void {
    this._subscriptions.add(
      this._favouriteService.removeFromFavourites(id)
        .subscribe(res => {
          this._logService.onAction({action: 1, type: 'FAV', img_id: dog.id, user_action: 0});
          this.favId = null;
        })
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

}
