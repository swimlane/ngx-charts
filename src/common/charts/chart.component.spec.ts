import {
  TestBed,
  async
} from '@angular/core/testing';
import { Component  } from '@angular/core';
import d3 from '../../d3';
import '../../../config/testing-utils';

import { CommonModule } from '../common.module';

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  barData: any;

  constructor() {
  }
}

describe('<chart>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [CommonModule]
    });

  });

  describe('basic setup', () => {

    beforeEach(() => {
      // set up a  basic chart
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
                    <chart
                        [view]="[400,800]"
                        >
                        <p>ng2d3 is cool!</p>
                    </chart>
                `
        }
      });
    });

    it('should set the svg width and height', async(() => {
      TestBed.compileComponents().then(() => {
        let fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;

        let svg = compiled.querySelectorAll('svg')[0];
        expect(d3.select(svg).attr('width')).toEqual('400');
        expect(d3.select(svg).attr('height')).toEqual('800');
      });
    }));

    it('should correctly project the inner content', async((done) => {
      TestBed.compileComponents().then(() => {
        let fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;

        let svg = d3.select(compiled.querySelectorAll('svg')[0]);

        let textNode = svg.select('p');
        expect(textNode.text()).toEqual('ng2d3 is cool!');

      });
    }));

  });
});
