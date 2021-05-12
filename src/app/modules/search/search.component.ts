import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { BreedService, DogsService } from 'src/app/services';
import { Dog, Breed, Grid, GridAction } from 'src/app/models';
import { Crumb } from 'src/app/shared/components/nav/crumb';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  breeds: Breed[] = [];
  data: Grid[] = [];
  query: string;
  isLoading = true;
  crumbs: Crumb = {text: 'search'};
  private _subscriptions = new Subscription();

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _breedService: BreedService,
              private _dogService: DogsService) {
  }

  ngOnInit() {
    this._getQuery();
  }

  onAction(val: GridAction): void {
    if (val && val.id) {
      this._router.navigate([`/breeds/${val.id}`]);
    }
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private _getQuery(): void {
    this._subscriptions.add(
      this._route.queryParams
        .subscribe(params => {
          this.query = params['query'];
          if (this.query && this.query.length) {
            this.isLoading = true;
            this._getDogsByBreed(this.query);
          } else {
            this.isLoading = false;
            this.breeds = [];
            this.data = [];
          }
        })
    );
  }

  private _getDogsByBreed(query: string): void {
    if (query.length) {
      this._subscriptions.add(
        this._breedService.getByQuery(query)
          .subscribe(res => {
            this.breeds = res;
            if (res && res.length) {
              this._getImages(res);
            } else {
              this.isLoading = false;
              this.breeds = [];
              this.data = [];
            }
          }, err => {
            this.breeds = [];
            this.data = [];
          })
      );
    }
  }

  private _getImages(breeds: Breed[]): void {
    const tasks$ = [];
    breeds.forEach(breed => {
      if (breed.reference_image_id) {
        tasks$.push(this._dogService.getImage(breed.reference_image_id));
      }
    });
    this._subscriptions.add(
      forkJoin(...tasks$).subscribe(res => {
        this.data = this._prepareData(res);
        this.isLoading = false;
      })
    );
  }

  private _prepareData(data: Dog[]): Grid[] {
    return data.map(item => {
      return {
        name: item.breeds[0] ? item.breeds[0].name : 'Mixed',
        url: item.url,
        id: item.id
      };
    });
  }

}
