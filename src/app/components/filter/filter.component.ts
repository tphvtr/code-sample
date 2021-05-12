import { FormControl } from '@angular/forms';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnDestroy {
  @Output() query = new EventEmitter<string>();
  search = new FormControl();
  private _query: string;
  private _subscriptions = new Subscription();

  constructor(private _route: ActivatedRoute) {
    this._onSearch();
    this._getQuery();
  }

  private _onSearch(): void {
    this._subscriptions.add(
      this.search.valueChanges.pipe(debounceTime(700))
        .subscribe((res: string) => {
          this._query = res;
          if (this._query && this._query.toLowerCase() === res.toLowerCase()) {
            this.query.emit(res);
          }
        })
    );
  }

  private _getQuery(): void {
    this._subscriptions.add(
      this._route.queryParams
        .subscribe(params => {
          this.search.setValue(params['query']);
        })
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

}
