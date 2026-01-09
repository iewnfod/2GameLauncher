import isDev from "electron-is-dev";
import { ipcMain } from "electron";
import { Conf } from "electron-conf";

const store = new Conf();

function getKey(key: string) {
	if (isDev) {
		return `dev.${key}`;
	} else {
		return key;
	}
}

export function storeSet(key: string, value: any) {
	store.set(getKey(key), value);
}

export function storeGet(key: string) {
	return store.get(getKey(key));
}

export function storeDelete(key: string) {
	store.delete(getKey(key));
}

export function storeHas(key: string) {
	return store.has(getKey(key));
}

export function loadStoreEvents() {
	ipcMain.handle("store-set", (_e, key, value) => {
		return storeSet(key, value);
	});

	ipcMain.handle("store-get", (_e, key) => {
		return storeGet(key);
	});

	ipcMain.handle("store-delete", (_e, key) => {
		return storeDelete(key);
	});

	ipcMain.handle("store-has", (_e, key) => {
		return storeHas(key);
	});
}
