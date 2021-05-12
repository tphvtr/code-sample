import { Crumb } from '../../shared/components/nav/crumb';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';

import { Grid, Vote, Image, GridAction } from 'src/app/models';
import { VoteService, DogsService } from 'src/app/services';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit, OnDestroy {
  data: Grid[] = [];
  action: 0 | 1 = 1;
  isLoading = true;
  crumbs: Crumb = {text: 'likes'};
  private _subscriptions = new Subscription();

  constructor(private _router: Router,
              private _voteService: VoteService,
              private _dogService: DogsService) {
                this._getAction();
              }

  ngOnInit() {
    this._getVotes();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  onAction(val: GridAction): void {
    if (val.id) {
      this._deleteVote(Number(val.id));
    }
  }

  private _getAction(): void {
    this._subscriptions.add(
      this._router.events.subscribe((res: NavigationEnd) => {
        if (res && res.url) {
          this.action = res.url === '/disliked' ? 0 : 1;
          this.crumbs.text = this.action === 1 ? 'likes' : 'dislikes';
        }
      })
    );
  }

  private _getVotes(): void {
    this._subscriptions.add(
      this._voteService.getVotes()
        .subscribe(res => {
          if (res && res.length) {
            this._getImages(res.filter(vote => vote.value === this.action));
          }
        })
    );
  }

  private _getImages(votes: Vote[]): void {
    const tasks$ = [];
    votes.forEach(vote => {
      if (vote.image_id) {
        tasks$.push(this._dogService.getImage(vote.image_id, {size: 'small'}));
      }
    });
    this._subscriptions.add(
      forkJoin(...tasks$).subscribe(res => {
        this.data = this._prepareData(res, votes);
        this.isLoading = false;
      })
    );
  }

  private _deleteVote(id: number): void {
    this._subscriptions.add(
      this._voteService.deleteVote(id)
        .subscribe(res => {
          this.data = this.data.filter(item => item.id !== id);
        })
    );
  }

  private _prepareData(imgs: Image[], votes: Vote[]): Grid[] {
    return imgs.map(img => {
      return {
        url: img.url,
        id: votes.find(vote => vote.image_id === img.id).id
      };
    });
  }

}
