# Project structure

- Modules
  - Home page - [welcome.component.ts](src/app/modules/welcome/welcome.component.ts)
  - [Voting page](#voting)
  - Breeds page
  - [Likes\Dislikes Pages](#likes-dislikes-pages)
  - Favourites Page
  - Breed page
  - [Search](#searching)
- Shared
  - Components
    - [Grid](#grid)
    - Log
    - Nav (BreadCrumbs)
    - Tab (Aside menu)
    - Theme toggle
  - Modals
    - Upload Modal 
    - [Mobile menu Modal](#mobile-menu)
- Services
- Configs
- Models
- Animations - fade animation for carousel gestures and slide change in `Breed page`.
- assets/styles
  - _breadcrumbs.scss
  - _flexbox.scss
  - _variables.scss
  - _tabs.scss - styling for `<aside>` navigation
  - _forms.scss - styling for buttons, select and input
  - _icons.scss - mixin with icons
  - _material.scss - overriding default material styles
  - _mixins.scss - mixins for theming
  - _positioning.scss - some frequently used margins, widths etc.
  - _typography.scss - frequently used font-sizes, line-heights, colors etc.



## Mobile-menu

I've think that It would be nice to have an opportunity to navigate back to `home page` and to `change themes in mobile version` too. So I've added PetsPaw logo and a toggle button into [menu-modal.component.ts](src/app/shared/modals/menu-modal/menu-modal.component.ts) 

## Searching

Didn't get from the task how exactly should it work, so in my solution searching event fires on user's text typing with 700ms delay in [filter.component.ts](src/app/components/filter.component.ts) which inserted in [search.component.ts](src/app/modules/search/search.component.ts)

## Likes Dislikes Pages

For some reason endpoint for deleting a vote doesn't work ¯\\_(ツ)_/¯
[votes.component.ts](src/app/modules/votes/votes.component.ts)

## Voting

I didn't get an idea from the task description how exactly the logs should work. Is there any `limits` for log items count? Should logs be `cleared` after page reload? So in my approach i'm saving them all in the `localStorage` via [log.service.ts](src/app/services/log.service.ts)

[voting.component.ts](src/app/modules/voting/voting.component.ts)


## Grid

This component could be done as Material GridList but I wasn't sure that that was allowed for our task. So I tried to mimic it by myself

[grid.component.ts](src/app/shared/components/grid/grid.component.ts)



