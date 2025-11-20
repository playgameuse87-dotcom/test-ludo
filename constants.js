export const CELL_SIZE = 1;
export const BOARD_GRID = 15;
export const SAFE_POSITIONS = [1, 9, 13, 21, 25, 33, 37, 45];
export const PLAYER_COLORS = {
  red: "#ef4444",
  green: "#22c55e",
  yellow: "#eab308",
  blue: "#3b82f6",
};

const buildMainPath = () => {
  const coords = [];
  const half = Math.floor(BOARD_GRID / 2);
  const min = -half;
  const max = half;

  for (let x = min; x <= max; x++) coords.push({ x, z: max });
  for (let z = max - 1; z >= min + 1; z--) coords.push({ x: max, z });
  for (let x = max; x >= min; x--) coords.push({ x, z: min });
  for (let z = min + 1; z <= max - 1; z++) coords.push({ x: min, z });

  return coords;
};

export const MAIN_PATH = buildMainPath();

export const getBoardCellPosition = (index) => {
  const i = ((index % MAIN_PATH.length) + MAIN_PATH.length) % MAIN_PATH.length;
  const { x, z } = MAIN_PATH[i];
  return [x * CELL_SIZE, 0.06, z * CELL_SIZE];
};

export const HOME_BASES = [
  { colorKey: "red", pos: [-4.5 * CELL_SIZE, 0.05, 4.5 * CELL_SIZE] },
  { colorKey: "yellow", pos: [4.5 * CELL_SIZE, 0.05, 4.5 * CELL_SIZE] },
  { colorKey: "green", pos: [-4.5 * CELL_SIZE, 0.05, -4.5 * CELL_SIZE] },
  { colorKey: "blue", pos: [4.5 * CELL_SIZE, 0.05, -4.5 * CELL_SIZE] },
];
