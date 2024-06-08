import BowlingGame from '../src/BowlingGame';

describe('BowlingGame', () => {
  let game: BowlingGame;

  beforeEach(() => {
    game = new BowlingGame();
  });

  // Data Model Tests
  test('should initialize with 10 frames', () => {
    expect(game.frames).toHaveLength(10);
  });

  test('each frame should initialize with an empty rolls array', () => {
    game.frames.forEach(frame => {
      expect(frame.rolls).toEqual([]);
    });
  });

  test('currentFrameIndex should start at 0', () => {
    expect(game.currentFrameIndex).toBe(0);
  });

  test('calculateScore method should exist', () => {
    expect(typeof game.calculateScore).toBe('function');
  });

  test('private methods should exist', () => {
    expect(typeof (game as any).calculateFrameScore).toBe('function');
    expect(typeof (game as any).calculateTenthFrameScore).toBe('function');
  });

  // Business Logic Tests
  test('should add a roll to the current frame', () => {
    game.addRoll(5);
    expect(game.frames[0].rolls).toHaveLength(1);
    expect(game.frames[0].rolls[0].pins).toBe(5);
  });

  test('should move to next frame after two rolls', () => {
    game.addRoll(3);
    game.addRoll(6);
    expect(game.currentFrameIndex).toBe(1);
  });

  test('should move to next frame after a strike', () => {
    game.addRoll(10);
    expect(game.currentFrameIndex).toBe(1);
  });

  test('should calculate score for an open frame', () => {
    game.addRoll(3);
    game.addRoll(6);
    game.calculateScore();
    expect(game.frames[0].score).toBe(9);
  });

  test('should calculate score for a spare', () => {
    game.addRoll(5);
    game.addRoll(5);
    game.addRoll(4);
    game.calculateScore();
    expect(game.frames[0].score).toBe(14);
  });

  test('should calculate score for a strike', () => {
    game.addRoll(10);
    game.addRoll(4);
    game.addRoll(3);
    game.calculateScore();
    expect(game.frames[0].score).toBe(17);
  });

  test('should calculate score for multiple strikes', () => {
    game.addRoll(10);
    game.addRoll(10);
    game.addRoll(10);
    game.addRoll(4);
    game.addRoll(3);
    game.calculateScore();
    expect(game.frames[0].score).toBe(30);
    expect(game.frames[1].score).toBe(24);
    expect(game.frames[2].score).toBe(17);
  });

  test('should calculate score for the 10th frame', () => {
    for (let i = 0; i < 9; i++) {
      game.addRoll(10);
    }
    game.addRoll(10);
    game.addRoll(10);
    game.addRoll(10);
    game.calculateScore();
    expect(game.frames[9].score).toBe(30);
  });

  test('should handle a perfect game', () => {
    for (let i = 0; i < 12; i++) {
      game.addRoll(10);
    }
    game.calculateScore();
    expect(game.frames.reduce((total, frame) => total + (frame.score ?? 0), 0)).toBe(300);
  });

  test('should handle a game with no strikes or spares', () => {
    for (let i = 0; i < 20; i++) {
      game.addRoll(4);
    }
    game.calculateScore();
    expect(game.frames.reduce((total, frame) => total + (frame.score ?? 0), 0)).toBe(80);
  });

  test('should handle a game with alternating strikes and spares', () => {
    game.addRoll(10);
    game.addRoll(5);
    game.addRoll(5);
    game.addRoll(10);
    game.addRoll(5);
    game.addRoll(5);
    game.addRoll(10);
    game.addRoll(5);
    game.addRoll(5);
    game.addRoll(10);
    game.addRoll(5);
    game.addRoll(5);
    game.addRoll(10);
    game.addRoll(5);
    game.addRoll(5);
    game.addRoll(10);
    game.addRoll(5);
    game.addRoll(5);
    game.addRoll(10);
    game.calculateScore();
    expect(game.frames.reduce((total, frame) => total + (frame.score ?? 0), 0)).toBe(200);
  });
});
