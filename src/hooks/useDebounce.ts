import { useCallback, useRef } from 'react';

export default function useDebounce(callback: (s: string) => void, delay: number): (s: string) => void {
	const timer = useRef<any>(null);

	const debouncedCallback = useCallback((s: string) => {
		if (timer.current) {
			clearTimeout(timer.current);
		}
		timer.current = setTimeout(() => {
			callback(s);
		}, delay);
	}, [callback, delay]);

	return debouncedCallback;
}