interface Roll {
  pins: number;
}

interface Frame {
  rolls: Roll[];
  score?: number;
  isStrike?: boolean;
  isSpare?: boolean;
}

class BowlingGame {
  frames: Frame[];
  currentFrameIndex: number;

  constructor() {
    this.frames = Array.from({ length: 10 }, () => ({ rolls: [], isStrike: false, isSpare: false }));
    this.currentFrameIndex = 0;
  }

  addRoll(pins: number): void {
    const frame = this.frames[this.currentFrameIndex];

    if (frame.rolls.length < 2 || (this.currentFrameIndex === 9 && frame.rolls.length < 3)) {
      frame.rolls.push({ pins });

      if (pins === 10 && this.currentFrameIndex < 9) {
        frame.isStrike = true;
        this.currentFrameIndex++;
      } else if (frame.rolls.length === 2 && frame.rolls[0].pins + frame.rolls[1].pins === 10) {
        frame.isSpare = true;
        if (this.currentFrameIndex < 9) {
          this.currentFrameIndex++;
        }
      } else if (frame.rolls.length === 2 && this.currentFrameIndex < 9) {
        this.currentFrameIndex++;
      }
    }
  }

  calculateScore(): void {
    let cumulativeScore = 0;
    for (let i = 0; i < 10; i++) {
      const frame = this.frames[i];
      if (i < 9) {
        frame.score = this.calculateFrameScore(i);
      } else {
        frame.score = this.calculateTenthFrameScore();
      }
      if (frame.score !== undefined) {
        cumulativeScore += frame.score;
      }
      frame.score = cumulativeScore;
    }
  }

  private calculateFrameScore(index: number): number {
    const frame = this.frames[index];
    const nextFrame = this.frames[index + 1];
    const nextNextFrame = this.frames[index + 2];

    if (frame.isStrike) {
      const nextRoll1 = nextFrame?.rolls[0]?.pins ?? 0;
      const nextRoll2 = nextFrame?.rolls.length > 1 ? nextFrame.rolls[1].pins : nextNextFrame?.rolls[0]?.pins ?? 0;
      return 10 + nextRoll1 + nextRoll2;
    } else if (frame.isSpare) {
      const nextRoll1 = nextFrame?.rolls[0]?.pins ?? 0;
      return 10 + nextRoll1;
    } else if (frame.rolls.length === 2) {
      return frame.rolls[0].pins + frame.rolls[1].pins;
    } else {
      return frame.rolls[0]?.pins ?? 0;
    }
  }

  private calculateTenthFrameScore(): number {
    const frame = this.frames[9];
    return frame.rolls.reduce((sum, roll) => sum + roll.pins, 0);
  }
}

export default BowlingGame;
