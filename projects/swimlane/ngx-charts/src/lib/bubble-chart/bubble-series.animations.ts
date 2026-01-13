import { trigger, style, animate, transition } from '@angular/animations';

export const bubbleSeriesAnimations = [
  trigger('animationState', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'scale(0)'
      }),
      animate(250, style({ opacity: 1, transform: 'scale(1)' }))
    ])
  ])
];
