import { ElementRef } from '@angular/core';

import { AreaComponent } from './area.component';

describe('AreaComponent SSR paths', () => {
  const finalPath = 'M0,200L100,50L200,100L300,25L300,200L0,200Z';
  const startingPath = 'M0,200L100,200L200,200L300,200L300,200L0,200Z';

  function createComponent(animations: boolean): AreaComponent {
    const component = new AreaComponent({
      nativeElement: document.createElementNS('http://www.w3.org/2000/svg', 'g')
    } as ElementRef);
    component.path = finalPath;
    component.startingPath = startingPath;
    component.animations = animations;
    return component;
  }

  it('uses final path when animations are disabled', () => {
    const component = createComponent(false);

    component.ngOnChanges();

    expect(component.areaPath).toBe(finalPath);
    expect(component.areaPath).not.toBe(startingPath);
  });

  it('starts from baseline when animations are enabled', () => {
    const component = createComponent(true);
    vi.spyOn(component, 'updatePathEl').mockImplementation(() => {});

    component.ngOnChanges();

    expect(component.areaPath).toBe(startingPath);
  });
});
