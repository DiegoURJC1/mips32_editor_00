export enum Algorithm {
  Linear = 'linear',
  CatmullRom = 'catmull-rom',
  BezierCatmullRom = 'bezier-catmull-rom',
}

export const COLORS = {
  [Algorithm.Linear]: getComputedStyle(document.documentElement).getPropertyValue('--xy-edge-stroke-default') || '#757577',
  [Algorithm.BezierCatmullRom]: '#68D391',
  [Algorithm.CatmullRom]: '#FF0072',
};

export const DEFAULT_ALGORITHM = Algorithm.Linear;
