type SeatMatrix = number[][];

function initializeSeatMatrix(rows: number = 8, columns: number = 10): SeatMatrix {
  const seats: SeatMatrix = [];

  for (let row = 0; row < rows; row++) {
    const currentRow: number[] = [];

    for (let column = 0; column < columns; column++) {
      currentRow.push(0);
    }

    seats.push(currentRow);
  }

  return seats;
}

function markOccupiedSeats(
  seats: SeatMatrix,
  occupiedPositions: Array<[number, number]>,
): void {
  for (const [row, column] of occupiedPositions) {
    if (seats[row] && typeof seats[row][column] !== "undefined") {
      seats[row][column] = 1;
    }
  }
}

function printCinemaRoom(seats: SeatMatrix): void {
  const totalColumns = seats[0]?.length ?? 0;
  let header = "    ";

  for (let column = 0; column < totalColumns; column++) {
    header += `${String(column + 1).padStart(2, " ")} `;
  }

  console.log("Estado actual de la sala (X = ocupado, L = libre)");
  console.log(header);

  for (let row = 0; row < seats.length; row++) {
    let rowDisplay = `F${String(row + 1).padStart(2, "0")} `;

    for (let column = 0; column < seats[row].length; column++) {
      if (seats[row][column] === 1) {
        rowDisplay += " X ";
      } else {
        rowDisplay += " L ";
      }
    }

    console.log(rowDisplay);
  }
}

const cinemaSeats = initializeSeatMatrix(8, 10);

markOccupiedSeats(cinemaSeats, [
  [0, 1],
  [0, 2],
  [1, 4],
  [3, 7],
  [5, 0],
  [7, 9],
]);

printCinemaRoom(cinemaSeats);

export {};
