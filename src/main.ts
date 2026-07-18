type SeatMatrix = number[][];

type SeatCountSummary = [occupied: number, available: number];

type SeatPosition = [row: number, column: number];

type ReservationResult = [success: boolean, message: string];

type ContiguousPairResult = [
  found: boolean,
  message: string,
  pair: [SeatPosition, SeatPosition] | null,
];

type ScenarioName = "empty" | "partial" | "almostFullSingles" | "full";

// Crea la matriz base de asientos de la sala.
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

// Marca asientos ocupados segun una lista de posiciones [fila, columna].
function markOccupiedSeats(
  seats: SeatMatrix,
  occupiedPositions: Array<[number, number]>,
): void {
  for (const [row, column] of occupiedPositions) {
    if (isValidSeatPosition(seats, row, column)) {
      seats[row][column] = 1;
    }
  }
}

// Valida que una posicion exista dentro de los limites de la matriz.
function isValidSeatPosition(seats: SeatMatrix, row: number, column: number): boolean {
  return row >= 0 && row < seats.length && column >= 0 && column < (seats[0]?.length ?? 0);
}

// Imprime la sala en consola para facilitar revisiones manuales.
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
      rowDisplay += seats[row][column] === 1 ? " X " : " L ";
    }

    console.log(rowDisplay);
  }
}

// Reserva un asiento si esta libre y devuelve un mensaje claro del resultado.
function reserveSeat(seats: SeatMatrix, row: number, column: number): ReservationResult {
  if (!isValidSeatPosition(seats, row, column)) {
    const message = `No se pudo reservar: la posicion fila ${row + 1}, columna ${column + 1} no existe.`;
    console.log(message);
    return [false, message];
  }

  if (seats[row][column] === 1) {
    const message = `No se pudo reservar el asiento en la fila ${row + 1}, columna ${column + 1} porque ya esta ocupado.`;
    console.log(message);
    return [false, message];
  }

  seats[row][column] = 1;
  const message = `Reserva confirmada para el asiento en la fila ${row + 1}, columna ${column + 1}.`;
  console.log(message);

  return [true, message];
}

// Cuenta asientos ocupados y disponibles en toda la sala.
function countSeats(seats: SeatMatrix): SeatCountSummary {
  let occupied = 0;
  let available = 0;

  for (let row = 0; row < seats.length; row++) {
    for (let column = 0; column < seats[row].length; column++) {
      if (seats[row][column] === 1) {
        occupied++;
      } else {
        available++;
      }
    }
  }

  return [occupied, available];
}

// Busca el primer par horizontal de asientos contiguos libres y retorna su posicion.
function findFirstContiguousPair(seats: SeatMatrix): ContiguousPairResult {
  for (let row = 0; row < seats.length; row++) {
    for (let column = 0; column < seats[row].length - 1; column++) {
      if (seats[row][column] === 0 && seats[row][column + 1] === 0) {
        const message =
          `Se encontraron asientos contiguos en fila ${row + 1}, columnas ${column + 1} y ${column + 2}.`;
        console.log(message);

        return [
          true,
          message,
          [
            [row, column],
            [row, column + 1],
          ],
        ];
      }
    }
  }

  const message = "No hay pares de asientos contiguos disponibles en esta sala.";
  console.log(message);
  return [false, message, null];
}

// Genera una sala preconfigurada para probar diferentes escenarios.
function createScenarioMatrix(scenario: ScenarioName): SeatMatrix {
  const seats = initializeSeatMatrix(8, 10);

  if (scenario === "partial") {
    markOccupiedSeats(seats, [
      [0, 1],
      [0, 2],
      [1, 4],
      [2, 0],
      [2, 1],
      [3, 6],
      [5, 7],
    ]);
  }

  if (scenario === "almostFullSingles") {
    for (let row = 0; row < seats.length; row++) {
      for (let column = 0; column < seats[row].length; column++) {
        seats[row][column] = column % 2 === 0 ? 1 : 0;
      }
    }
  }

  if (scenario === "full") {
    for (let row = 0; row < seats.length; row++) {
      for (let column = 0; column < seats[row].length; column++) {
        seats[row][column] = 1;
      }
    }
  }

  return seats;
}

// Ejecuta un escenario de consola para mostrar resultados y mensajes del sistema.
function runScenarioInConsole(title: string, seats: SeatMatrix): void {
  console.log(`\n=========== ${title} ===========`);
  printCinemaRoom(seats);

  const [, , pair] = findFirstContiguousPair(seats);
  if (pair) {
    const [firstSeat] = pair;
    reserveSeat(seats, firstSeat[0], firstSeat[1]);
    reserveSeat(seats, firstSeat[0], firstSeat[1]);
  } else {
    reserveSeat(seats, 0, 0);
  }

  const [occupied, available] = countSeats(seats);
  console.log(`Resumen de asientos -> Ocupados: ${occupied}, Libres: ${available}`);
}

// Corre las pruebas pedidas: sala vacia, parcial, casi llena y totalmente llena.
function runConsoleScenarios(): void {
  runScenarioInConsole("Escenario 1: Sala vacia", createScenarioMatrix("empty"));
  runScenarioInConsole("Escenario 2: Sala parcialmente ocupada", createScenarioMatrix("partial"));
  runScenarioInConsole(
    "Escenario 3: Sala casi llena con asientos sueltos",
    createScenarioMatrix("almostFullSingles"),
  );
  runScenarioInConsole("Escenario 4: Sala completamente llena", createScenarioMatrix("full"));
}

// Renderiza la interfaz web para gestionar reservas haciendo clic en asientos.
function initializeWebInterface(): void {
  const app = document.getElementById("app");
  if (!app) {
    return;
  }
  const appRoot = app;

  const scenarioOptions: Array<[ScenarioName, string]> = [
    ["empty", "Sala vacia"],
    ["partial", "Sala parcialmente ocupada"],
    ["almostFullSingles", "Casi llena con asientos sueltos"],
    ["full", "Sala llena"],
  ];

  // Obtiene la etiqueta visible de un escenario a partir de su identificador.
  function getScenarioLabel(scenario: ScenarioName): string {
    for (const [key, label] of scenarioOptions) {
      if (key === scenario) {
        return label;
      }
    }

    return "Escenario desconocido";
  }

  let selectedScenario: ScenarioName = "partial";
  let seats = createScenarioMatrix(selectedScenario);
  let statusMessage = "Haz clic en un asiento verde para reservar.";
  let highlightedPair: [SeatPosition, SeatPosition] | null = null;

  function isHighlightedSeat(row: number, column: number): boolean {
    if (!highlightedPair) {
      return false;
    }

    return highlightedPair.some((seat) => seat[0] === row && seat[1] === column);
  }

  function render(): void {
    const [occupied, available] = countSeats(seats);
    const rows = seats.length;
    const columns = seats[0]?.length ?? 0;

    appRoot.innerHTML = `
      <section class="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Gestor de sala</p>
          <h2 class="text-2xl font-black tracking-tight text-slate-900">Mapa de asientos</h2>
          <p class="text-sm text-slate-600">Selecciona una sala de prueba o reserva haciendo clic en un asiento libre.</p>
        </header>

        <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <label class="grid gap-1 text-sm font-medium text-slate-700">
            Escenario de prueba
            <select id="scenario-select" class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200">
              ${scenarioOptions
                .map(
                  ([key, label]) =>
                    `<option value="${key}" ${key === selectedScenario ? "selected" : ""}>${label}</option>`,
                )
                .join("")}
            </select>
          </label>

          <button id="find-pair" class="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500">
            Buscar 2 contiguos
          </button>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div class="mb-3 flex items-center justify-between text-sm text-slate-700">
            <span>Libres: <strong>${available}</strong></span>
            <span>Ocupados: <strong>${occupied}</strong></span>
          </div>
          <div class="mb-3 rounded-lg bg-slate-900 py-2 text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-200">Pantalla</div>
          <div id="seat-grid" class="grid gap-2">
            ${seats
              .map((rowSeats, rowIndex) => {
                const rowButtons = rowSeats
                  .map((seat, columnIndex) => {
                    const isOccupied = seat === 1;
                    const highlighted = isHighlightedSeat(rowIndex, columnIndex);
                    const seatBaseClass =
                      "seat-btn rounded-lg border px-2 py-2 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-offset-1";
                    const seatStateClass = isOccupied
                      ? "border-rose-300 bg-rose-200 text-rose-900 cursor-not-allowed"
                      : "border-emerald-300 bg-emerald-200 text-emerald-900 hover:bg-emerald-300 focus:ring-emerald-400";
                    const highlightClass = highlighted ? " ring-2 ring-amber-500" : "";

                    return `<button
                      class="${seatBaseClass} ${seatStateClass}${highlightClass}"
                      data-row="${rowIndex}"
                      data-column="${columnIndex}"
                      ${isOccupied ? "disabled" : ""}
                    >C${columnIndex + 1}</button>`;
                  })
                  .join("");

                return `<div class="grid grid-cols-[auto_1fr] items-center gap-2">
                  <span class="text-xs font-semibold text-slate-500">F${rowIndex + 1}</span>
                  <div class="grid gap-2" style="grid-template-columns: repeat(${columns}, minmax(0, 1fr));">
                    ${rowButtons}
                  </div>
                </div>`;
              })
              .join("")}
          </div>
          <p class="mt-3 text-sm text-slate-700">${statusMessage}</p>
          <p class="mt-1 text-xs text-slate-500">Tamano de sala: ${rows} filas x ${columns} columnas</p>
        </div>
      </section>
    `;

    const scenarioSelect = appRoot.querySelector("#scenario-select") as HTMLSelectElement | null;
    const findPairButton = appRoot.querySelector("#find-pair") as HTMLButtonElement | null;
    const seatButtons = appRoot.querySelectorAll<HTMLButtonElement>(".seat-btn");

    scenarioSelect?.addEventListener("change", (event) => {
      selectedScenario = (event.target as HTMLSelectElement).value as ScenarioName;
      seats = createScenarioMatrix(selectedScenario);
      highlightedPair = null;
      statusMessage = `Escenario cargado: ${getScenarioLabel(selectedScenario)}.`;
      render();
    });

    findPairButton?.addEventListener("click", () => {
      const [, message, pair] = findFirstContiguousPair(seats);
      highlightedPair = pair;
      statusMessage = message;
      render();
    });

    for (const button of seatButtons) {
      button.addEventListener("click", () => {
        const row = Number(button.dataset.row);
        const column = Number(button.dataset.column);
        highlightedPair = null;
        const [, message] = reserveSeat(seats, row, column);
        statusMessage = message;
        render();
      });
    }
  }

  render();
}

runConsoleScenarios();

if (typeof document !== "undefined") {
  initializeWebInterface();
}

export {};
