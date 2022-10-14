export const clickOutside = (node: Node, fn: () => void) => {
	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) {
			fn();
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};
	document.addEventListener('click', handleClick, true);
	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
