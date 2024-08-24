export type InferElementInArray<T> = T extends (infer R)[] ? R : unknown;
