import type { LinkedList, LinkedNode } from '$lib/types/list';

export class LinkedHelper {
	public static arrayToList<T>(values: T[], offset: number): NodeList<T[]> {
		const linkedList: NodeList<T[]> = new NodeList();
		const missing = values.reduce((acc: T[], v: T) => {
			if (acc.length === offset) {
				linkedList.add(acc);
				return [];
			}
			return acc.concat(v);
		}, []);

		if (missing.length > 0) {
			linkedList.add(missing);
		}
		return linkedList;
	}
}

export class SingleNode<U> implements LinkedNode<U> {
	content: U | null = null;
	next: LinkedNode<U> | null = null;
	prev: LinkedNode<U> | null = null;
	constructor(value: U | null) {
		this.content = value;
	}
}

export class NodeList<T> implements LinkedList<T> {
	head: LinkedNode<T> | null = null;
	size = 0;
	constructor(content?: T) {
		if (content !== null && content !== undefined) {
			this.head = new SingleNode(content);
			this.size += 1;
		}
	}

	findLastNode(): LinkedNode<T> | null {
		let currentNode = this.head;
		let isNull = true;
		while (isNull) {
			if (currentNode && currentNode.next) {
				currentNode = currentNode.next;
				continue;
			}
			isNull = false;
		}
		return currentNode;
	}

	add(v: T): LinkedNode<T> {
		const newNode = new SingleNode(v);
		const lastNode = this.findLastNode();
		if (lastNode === null) {
			this.head = newNode;
			this.size += 1;
			return newNode;
		}
		lastNode.next = newNode;
		lastNode.next.prev = lastNode;
		this.size += 1;
		return newNode;
	}
}
