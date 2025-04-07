import { EventsPhase } from '../types/Phases';

describe('EventPhase', () => {
  it('should map to corresponding string value correctly at type-level and runtime', () => {
    // If you added @ts-expect-error below, the type check should
    // error because the comparison always returns false

    expect(EventsPhase.DURATION_EVENTS_BEGIN === 'B').toBe(true);
  });

  it('should cause a type error and fail runtime check when compared to incorrect literal', () => {
    // @ts-expect-error The comparison always returns false
    expect(EventsPhase.DURATION_EVENTS_BEGIN === 'NOT_B').toBe(false);
  });
});
