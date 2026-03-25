// connect-4 game logic and minimax AI algorithm

const ROWS = 6;
const COLUMNS = 7;
const EMPTY = 0;
const PLAYER_ONE = 1;
const PLAYER_TWO = 2;

class Connect4 {
    constructor() {
        this.board = this.createBoard();
        this.currentPlayer = PLAYER_ONE;
    }

    createBoard() {
        return Array.from({ length: ROWS }, () => Array(COLUMNS).fill(EMPTY));
    }

    dropPiece(column) {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (this.board[row][column] === EMPTY) {
                this.board[row][column] = this.currentPlayer;
                return row;
            }
        }
        return -1; // Column is full
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    }

    checkWinner() {
        // Check horizontal, vertical, and diagonal for a win
    }

    minimax(depth, alpha, beta, maximizingPlayer) {
        const winner = this.checkWinner();
        if (winner !== null) {
            return winner === PLAYER_ONE ? -10 + depth : winner === PLAYER_TWO ? 10 - depth : 0;
        }

        if (maximizingPlayer) {
            let maxEval = -Infinity;
            for (let col = 0; col < COLUMNS; col++) {
                if (this.board[0][col] === EMPTY) {
                    const row = this.dropPiece(col);
                    this.switchPlayer();
                    const eval = this.minimax(depth + 1, alpha, beta, false);
                    this.switchPlayer();
                    this.board[row][col] = EMPTY; // undo move
                    maxEval = Math.max(maxEval, eval);
                    alpha = Math.max(alpha, eval);
                    if (beta <= alpha) break;
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let col = 0; col < COLUMNS; col++) {
                if (this.board[0][col] === EMPTY) {
                    const row = this.dropPiece(col);
                    this.switchPlayer();
                    const eval = this.minimax(depth + 1, alpha, beta, true);
                    this.switchPlayer();
                    this.board[row][col] = EMPTY; // undo move
                    minEval = Math.min(minEval, eval);
                    beta = Math.min(beta, eval);
                    if (beta <= alpha) break;
                }
            }
            return minEval;
        }
    }
}

export default Connect4;
