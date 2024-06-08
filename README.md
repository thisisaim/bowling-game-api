# Bowling Game API

This project implements a Bowling Game scoring system using TypeScript and Express. The application allows users to input rolls, calculate scores, and fetch the current state of the game through a simple API.

## Thought Process

### Milestone 1 - Data Model
The data model is designed to represent a bowling game consisting of 10 frames. Each frame contains rolls and a score. The `BowlingGame` class maintains the state of the game, including the current frame and the rolls within each frame.

### Milestone 2 - Business Logic
The business logic handles the rules of bowling:
- **Strike:** A frame with a single roll of 10 pins. The score for this frame is 10 plus the pins from the next two rolls.
- **Spare:** A frame with two rolls that sum to 10 pins. The score for this frame is 10 plus the pins from the next roll.
- **Open Frame:** A frame with two rolls that do not sum to 10 pins. The score for this frame is the sum of the pins in the two rolls.

### Milestone 3 - API Implementation
An Express API is implemented to allow interaction with the bowling game. The API provides endpoints to add rolls and fetch the current game state, including the scoreboard, current frame, and remaining rolls in the current frame.

## Time and Space Complexity

### Time Complexity
- **Adding a Roll:** O(1) - Adding a roll to the current frame involves a constant-time operation.
- **Calculating Score:** O(1) per frame - Calculating the score for each frame involves a constant-time operation. Since there are at most 10 frames, the overall time complexity is O(10), which simplifies to O(1).

### Space Complexity
- **Frames and Rolls:** O(1) - The space required to store the frames and rolls is constant because a bowling game always consists of 10 frames, each with at most 3 rolls in the 10th frame.

## Running the Application

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/bowling-game-api.git
    cd bowling-game-api
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Compile TypeScript:**
    ```bash
    npx tsc
    ```

### Running the Server

1. **Start the Server:**
    ```bash
    npx ts-node src/server.ts
    ```

2. The server will start on `http://localhost:3000`.

### API Endpoints

#### Add a Roll
- **Endpoint:** `POST /roll`
- **Description:** Adds a roll to the current frame.
- **Request Body:**
    ```json
    {
      "pins": 5
    }
    ```
- **Response:** Returns the current state of the game.

#### Fetch the Scoreboard
- **Endpoint:** `GET /score`
- **Description:** Fetches the current state of the game, including the scoreboard, current frame, and remaining rolls in the current frame.
- **Response:**
    ```json
    {
      "frames": [
        {
          "rolls": [
            { "pins": 10 }
          ],
          "score": 20,
          "isStrike": true,
          "isSpare": false
        },
        ...
      ],
      "currentFrameIndex": 3
    }
    ```

### Running Tests

1. **Run the Test Suite:**
    ```bash
    npm test
    ```

This will run all the unit tests to ensure the correctness of the data model, business logic, and API implementation.

## Conclusion

This project provides a comprehensive implementation of a Bowling Game scoring system with a clean and maintainable codebase. The use of TypeScript ensures type safety and improved developer experience, while the Express API allows easy interaction with the system. The design considers both time and space complexity to ensure efficient performance.
