import { Platform } from 'react-native';

let storageImpl: any;

if (Platform.OS === 'web') {
	storageImpl = {
		getString: (k: string) => {
			if (typeof window === 'undefined') return undefined;
			const v = window.localStorage.getItem(k);
			return v ?? undefined;
		},
		set: (k: string, v: string) => {
			if (typeof window === 'undefined') return;
			window.localStorage.setItem(k, String(v));
		},
		delete: (k: string) => {
			if (typeof window === 'undefined') return;
			window.localStorage.removeItem(k);
		},
		removeItem: (k: string) => {
			if (typeof window === 'undefined') return;
			window.localStorage.removeItem(k);
		},
	};
} else {
	try {
		// Use require to avoid bundlers trying to resolve this in web builds
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { createMMKV } = require('react-native-mmkv');
		storageImpl = createMMKV();
	} catch (e) {
		storageImpl = {
			getString: (_: string) => undefined,
			set: (_: string, __: string) => {},
			delete: (_: string) => {},
			removeItem: (_: string) => {},
		};
	}
}

export const storage = storageImpl;
