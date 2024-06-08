import express from 'express';
import BowlingGame from './BowlingGame';

const app = express();
const port = 3000;
const game = new BowlingGame();

app.use(express.json());

app.post('/roll', (req, res) => {
  const { pins } = req.body;
  if (typeof pins !== 'number' || pins < 0 || pins > 10) {
    return res.status(400).send({ error: 'Invalid pin count' });
  }
  game.addRoll(pins);
  game.calculateScore();
  res.send(game);
});

app.get('/score', (req, res) => {
  res.send({
    frames: game.frames,
    currentFrameIndex: game.currentFrameIndex,
    currentFrame: game.frames[game.currentFrameIndex],
  });
});

app.listen(port, () => {
  console.log(`Bowling game server running on http://localhost:${port}`);
});
