import { trigger, animate, transition, style } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({opacity: 0}),
    animate('500ms ease-in', style({opacity: 1}))
  ]),
  transition(':leave', [
    animate('500ms ease-in', style({opacity: 0}))
  ])
]);
