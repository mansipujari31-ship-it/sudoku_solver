const board = document.getElementById("board");
let cells = [];

// Create 9x9 grid
for (let i = 0; i < 81; i++) {
    let input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 9;
    board.appendChild(input);
    cells.push(input);
}

// Get board values
function getBoard() {
    let grid = [];
    for (let i = 0; i < 9; i++) {
        grid.push(
            cells.slice(i * 9, i * 9 + 9).map(cell =>
                cell.value === "" ? 0 : parseInt(cell.value)
            )
        );
    }
    return grid;
}

// Check if number is valid
function isValid(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num)
            return false;
    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num)
                return false;
        }
    }
    return true;
}

// Backtracking algorithm
function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solve(grid)) return true;
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Solve Sudoku
function solveSudoku() {
    let grid = getBoard();
    if (solve(grid)) {
        cells.forEach((cell, i) => {
            cell.value = grid[Math.floor(i / 9)][i % 9];
        });
    } else {
        alert("No solution exists!");
    }
}

// Clear board
function clearBoard() {
    cells.forEach(cell => cell.value = "");
}
