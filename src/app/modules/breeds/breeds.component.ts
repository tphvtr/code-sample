import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DogsService, BreedService } from 'src/app/services';
import { Dog, Breed, Grid, GridAction } from 'src/app/models';
import { Crumb } from 'src/app/shared/components/nav/crumb';

export class FormGroup {
  limit: number;
  sort: 'RANDOM' | 'ASC' | 'DESC';
  breed_id: string | 'ALL';
}

@Component({
  selector: 'app-breeds',
  templateUrl: './breeds.component.html',
  styleUrls: ['./breeds.component.scss']
})
export class BreedsComponent implements OnInit, OnDestroy {
  crumbs: Crumb = {text: 'breeds'};
  limits = [5, 10, 15, 20];
  data: Grid[] = [];
  breeds: Breed[] = [];
  formGroup: FormGroup = {
    limit: 10,
    sort: 'RANDOM',
    breed_id: 'ALL'
  };
  private _subscriptions = new Subscription();
  constructor(private _dogService: DogsService,
              private _breedService: BreedService,
              private _router: Router) { }

  ngOnInit() {
    this._getDogs(this.formGroup.limit, 'RANDOM');
    this._getBreeds();
  }

  onSort(val: 'ASC' | 'DESC'): void {
    this.formGroup.sort = this.formGroup.sort !== val ? val : 'RANDOM';
    this._getDogs(this.formGroup.limit, val);
  }

  onChangeLimit(limit: number): void {
    this._getDogs(limit, this.formGroup.sort);
  }

  onChangeBreeds(val: string | 'ALL'): void {
    this._getDogs(this.formGroup.limit, this.formGroup.sort, val);
  }

  onAction(val: GridAction): void {
    this._router.navigate([`/breeds/${val.id}`]);
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private _getDogs(limit: number, order: 'RANDOM' | 'ASC' | 'DESC', breed_id?: string): void {
    this._subscriptions.add(
      this._dogService.getDogs({limit, order, breed_id, size: 'small'})
        .subscribe(res => {
          if (res && res.length) {
            this.data = this._prepareData(res);
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
