export interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  highlighted?: boolean;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  directed?: boolean;
  highlighted?: boolean;
  label?: string;
}
