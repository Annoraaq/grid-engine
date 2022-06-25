export interface Movement {
  update(delta: number): void;
  getInfo(): MovementInfo;
}

// TODO docs
export interface MovementInfo {
  type: string;
  config?: Record<string, any>;
}
