export type Nullable<T> = T | null;
export interface LinkedNode<T> {
	readonly content: T | null;
	next: Nullable<LinkedNode<T>>;
	prev: Nullable<LinkedNode<T>>;
}

export interface LinkedList<T> {
	readonly head: Nullable<LinkedNode<T>>;
	readonly size: number;
	add(v: T): LinkedNode<T>;
	findLastNode(): Nullable<LinkedNode<T>>;
}
