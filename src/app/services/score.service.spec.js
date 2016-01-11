describe('service ScoreService', () => {
  beforeEach(angular.mock.module('famousPlacesWeb'));

  it('should be registered', inject(ScoreService => {
    expect(ScoreService).not.toEqual(null);
  }))

  describe('padWithZeroes function', () => {
    it('should exist', inject(ScoreService => {
      expect(ScoreService.padWithZeroes).not.toBeNull();
    }));

    describe('with 4 characters or less', () => {
      it('should return string with 4 characters', inject(ScoreService => {
        const result = ScoreService.padWithZeroes('');

        expect(result).toEqual(jasmine.any(String));
        expect(result.length === 4).toBeTruthy();
        expect(result).toBe('0000');
      }));
    });

    describe('with more than 4 characters', () => {
      it('should return string with no changes', inject(ScoreService => {
        const result = ScoreService.padWithZeroes('I am a string');

        expect(result).toEqual(jasmine.any(String));
        expect(result).toBe('I am a string');
      }));
    });
  });

  describe('calculateScore function', () => {
    it('should exist', inject(ScoreService => {
      expect(ScoreService.calculateScore).not.toBeNull();
    }));

    it('should return 0 if distance is 1000000 or more', inject(ScoreService => {
      const result = ScoreService.calculateScore(1000000);

      expect(result).toEqual(0);
    }));

    it('should return 1000 if distance is less than 10', inject(ScoreService => {
      const result = ScoreService.calculateScore(10);
      const result2 = ScoreService.calculateScore(2);
      const result3 = ScoreService.calculateScore(0);
      const result4 = ScoreService.calculateScore(9);

      expect(result).not.toBe(1000);
      expect(result2).toBe(1000);
      expect(result3).toBe(1000);
      expect(result4).toBe(1000);
    }));
  });
});
