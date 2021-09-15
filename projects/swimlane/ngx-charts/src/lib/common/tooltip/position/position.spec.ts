import { PositionHelper } from './position';
import { PlacementTypes } from './placement-type.enum';

describe('positioning', () => {
  describe('flip', () => {
    describe('top', () => {
      it('keep', () => {
        (window as any).innerWidth = 500;
        (window as any).innerHeight = 500;

        const elementDimensions = {
          top: 50,
          left: 100,
          width: 100,
          height: 100
        };

        const popoverDimensions = {
          width: 100,
          height: 50
        };

        const shouldFlip = PositionHelper.shouldFlip(
          elementDimensions as any,
          popoverDimensions as any,
          PlacementTypes.Top,
          0
        );
        expect(shouldFlip).toEqual(false);
      });

      it('flip', () => {
        (window as any).innerWidth = 500;
        (window as any).innerHeight = 500;

        const elementDimensions = {
          top: 0,
          left: 100,
          width: 100,
          height: 100
        };

        const popoverDimensions = {
          width: 100,
          height: 50
        };

        const shouldFlip = PositionHelper.shouldFlip(
          elementDimensions as any,
          popoverDimensions as any,
          PlacementTypes.Top,
          0
        );
        expect(shouldFlip).toEqual(true);
      });
    });

    describe('bottom', () => {
      it('keep', () => {
        (window as any).innerWidth = 200;
        (window as any).innerHeight = 200;

        const elementDimensions = {
          top: 0,
          left: 100,
          width: 100,
          height: 100
        };

        const popoverDimensions = {
          width: 100,
          height: 50
        };

        const shouldFlip = PositionHelper.shouldFlip(
          elementDimensions as any,
          popoverDimensions as any,
          PlacementTypes.Bottom,
          0
        );
        expect(shouldFlip).toEqual(false);
      });

      it('flip', () => {
        (window as any).innerWidth = 200;
        (window as any).innerHeight = 200;

        const elementDimensions = {
          top: 100,
          left: 100,
          width: 100,
          height: 100
        };

        const popoverDimensions = {
          width: 100,
          height: 50
        };

        const shouldFlip = PositionHelper.shouldFlip(
          elementDimensions as any,
          popoverDimensions as any,
          PlacementTypes.Bottom,
          0
        );
        expect(shouldFlip).toEqual(true);
      });
    });

    describe('left', () => {
      it('keep', () => {
        (window as any).innerWidth = 200;
        (window as any).innerHeight = 200;

        const elementDimensions = {
          top: 0,
          left: 100,
          width: 100,
          height: 100
        };

        const popoverDimensions = {
          width: 100,
          height: 50
        };

        const shouldFlip = PositionHelper.shouldFlip(
          elementDimensions as any,
          popoverDimensions as any,
          PlacementTypes.Left,
          0
        );
        expect(shouldFlip).toEqual(false);
      });

      it('flip', () => {
        (window as any).innerWidth = 200;
        (window as any).innerHeight = 200;

        const elementDimensions = {
          top: 0,
          left: 0,
          width: 100,
          height: 100
        };

        const popoverDimensions = {
          width: 100,
          height: 50
        };

        const shouldFlip = PositionHelper.shouldFlip(
          elementDimensions as any,
          popoverDimensions as any,
          PlacementTypes.Left,
          0
        );
        expect(shouldFlip).toEqual(true);
      });
    });

    describe('right', () => {
      it('keep', () => {
        (window as any).innerWidth = 200;
        (window as any).innerHeight = 200;

        const elementDimensions = {
          top: 0,
          left: 0,
          width: 100,
          height: 100
        };

        const popoverDimensions = {
          width: 100,
          height: 50
        };

        const shouldFlip = PositionHelper.shouldFlip(
          elementDimensions as any,
          popoverDimensions as any,
          PlacementTypes.Right,
          0
        );
        expect(shouldFlip).toEqual(false);
      });

      it('flip', () => {
        (window as any).innerWidth = 200;
        (window as any).innerHeight = 200;

        const elementDimensions = {
          top: 0,
          left: 100,
          width: 100,
          height: 100
        };

        const popoverDimensions = {
          width: 100,
          height: 50
        };

        const shouldFlip = PositionHelper.shouldFlip(
          elementDimensions as any,
          popoverDimensions as any,
          PlacementTypes.Right,
          0
        );
        expect(shouldFlip).toEqual(true);
      });
    });
  });
});
