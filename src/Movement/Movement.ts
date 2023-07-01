export interface Movement {
  update(delta: number): void;
  getInfo(): MovementInfo;
}

/** Automatic movement information. */
export interface MovementInfo {
  /** Type of movement */
  type: string;
  /**
   * Configuration of movement. This is custom for every automatic movement
   * type
   */
  config?: Record<string, any>;
  /**
   * Current state of movement. This is custom for every automatic movement
   * type
   */
  state?: Record<string, any>;
}
