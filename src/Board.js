import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
	const [board, setBoard] = useState(createBoard());
	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function generateRow() {
		const row = Array.from({ length: ncols });
		return row.map((col) => Math.random() < chanceLightStartsOn);
	}

	function createBoard() {
		let initialBoard = Array.from({ length: nrows });
		// TODO: create array-of-arrays of true/false values
		initialBoard = initialBoard.map((row) => generateRow());
		return initialBoard;
	}

	function hasWon() {
		// TODO: check the board in state to determine whether the player has won.
		let hasWon = true;
		board.map((row) =>
			row.map((cell) => {
				if (cell === false) {
					hasWon = false;
				}
			})
		);
		return hasWon;
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [y, x] = coord.split("-").map(Number);
			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it
				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};
			// TODO: Make a (deep) copy of the oldBoard
			const boardCopy = [...oldBoard];
			// TODO: in the copy, flip this cell and the cells around it
			flipAllCells(x, y, boardCopy, flipCell);
			// TODO: return the copy
			return boardCopy;
		});
	}

	function flipAllCells(x, y, boardCopy, flipCell) {
		flipCell(y, x, boardCopy);
		flipCell(y, x + 1, boardCopy);
		flipCell(y, x - 1, boardCopy);
		flipCell(y + 1, x, boardCopy);
		flipCell(y - 1, x, boardCopy);
	}

	function renderBoard() {
		return (
			<table className="Board-table">
				{board.map((row, rowIdx) => (
					<tr>
						{row.map((cell, cellIdx) => (
							<Cell
								flipCellsAroundMe={flipCellsAround}
								coord={`${rowIdx}-${cellIdx}`}
								isLit={cell}
								nrows={nrows}
							/>
						))}
					</tr>
				))}
			</table>
		);
	}

	return (
		<div className="Board">
			<button onClick={() => setBoard(createBoard())} class="Board-reset-btn">
				Reset
			</button>
			{hasWon() && <p className="Board-win">YOU WON!</p>}
			{!hasWon() && renderBoard()}
		</div>
	);
}

export default Board;
