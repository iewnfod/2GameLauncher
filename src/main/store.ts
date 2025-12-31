const Store = require("electron-store").default;
import { ipcMain } from "electron";

const store = new Store();

export function storeSet(key: string, value: any) {
	store.set(key, value);
}

export async function storeGet(key: string) {
	return await store.get(key);
}

export function storeDelete(key: string) {
	store.delete(key);
}

export function storeHas(key: string) {
	return store.has(key);
}

export function loadStoreEvent() {
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
