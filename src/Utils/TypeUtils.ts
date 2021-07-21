export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
