import { WelcomeComponent } from './modules/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/modules/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'voting',
    loadChildren: () => import('src/app/modules/voting/voting.module').then(m => m.VotingModule)
  },
  {
    path: 'breeds',
    loadChildren: () => import('src/app/modules/breeds/breeds.module').then(m => m.BreedsModule)
  },
  {
    path: 'breeds/:id',
    loadChildren: () => import('src/app/modules/breed-item/breed-item.module').then(m => m.BreedItemModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('src/app/modules/gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
    path: 'liked',
    loadChildren: () => import('src/app/modules/votes/votes.module').then(m => m.VotesModule)
  },
  {
    path: 'favourites',
    loadChildren: () => import('src/app/modules/favourites/favourites.module').then(m => m.FavouritesModule)
  },
  {
    path: 'disliked',
    loadChildren: () => import('src/app/modules/votes/votes.module').then(m => m.VotesModule)
  },
  {
    path: 'search',
    loadChildren: () => import('src/app/modules/search/search.module').then(m => m.SearchModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
