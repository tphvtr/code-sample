import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { DogsService } from 'src/app/services';
import { Breed } from 'src/app/models';
import { Crumb } from 'src/app/shared/components/nav/crumb';
import { slideAnimation } from 'src/app/animations';

@Component({
  selector: 'app-breed-item',
  templateUrl: './breed-item.component.html',
  styleUrls: ['./breed-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideAnimation]
})
export class BreedItemComponent implements OnInit, OnDestroy {
  breed: Breed;
  urls: string[] = [];
  crumbs: Crumb = {text: 'breeds', url: 'breeds', child: []};
  selectedSlideIndex = 0;
  isLoad: boolean;
  private _subscriptions = new Subscription();

  constructor(private _route: ActivatedRoute,
              private _location: Location,
              private _dogService: DogsService) { }

  ngOnInit() {
    this._getId();
  }

  onSwipeSlide(val: 1 | -1): void  {
    this.isLoad = false;
    this.selectedSlideIndex = this.selectedSlideIndex + val;
    if (this.selectedSlideIndex < 0) {
      this.selectedSlideIndex = this.selectedSlideIndex + this.urls.length;
    }
    if (this.selectedSlideIndex === this.urls.length) {
      this.selectedSlideIndex = 0;
    }
  }

  onChangeSlide(i: number): void {
    this.selectedSlideIndex = i;
    this.isLoad = false;
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  private _getId(): void {
    this._subscriptions.add(
      this._route.params
      .subscribe(params => {
        if (params['id']) {
          this._getInfo(params['id']);
        }
      })
    );
  }

  private _getInfo(id: string): void {
    this.urls = [];
    this._subscriptions.add(
      this._dogService.getImage(id)
        .subscribe(res => {
          if (res && res.breeds) {
            this.breed = res.breeds[0];
            if (res.breeds[0].id) {
              this.crumbs.child.push({text: res.breeds[0].id});
              this._getCarouselImgs(res.breeds[0].id);
            }
          } else {
            this._location.back();
          }
        })
    );
  }

  private _getCarouselImgs(id: string): void {
    this._subscriptions.add(
      this._dogService.getDogs({limit: 5, breed_id: id, size: 'med'})
        .subscribe(res => {
          this.urls = this.urls.concat(res.map(item => item.url));
        })
    );
  }

}
