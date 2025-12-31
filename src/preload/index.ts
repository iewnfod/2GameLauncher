import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
	fetchBgUrl: (websiteUrl: string, gameId: string) =>
		ipcRenderer.invoke("fetch-bg-url", { websiteUrl, gameId }),
	onUpdateBgUrl: (callback: (args: {url: string, gameId: string}) => void) =>
		ipcRenderer.on("update-bg-url", (_event, value) => callback(value)),
	minimize: () => ipcRenderer.invoke("minimize"),
	close: () => ipcRenderer.invoke("close"),
	selectFile: (filters: { name: string; extensions: string[] }[]) => ipcRenderer.invoke("selectFile", { filters }),
};

const storeAPI = {
	set: (key: string, value: any) =>
		ipcRenderer.invoke("store-set", key, value),
	get: (key: string) =>
		ipcRenderer.invoke("store-get", key),
	delete: (key: string) =>
		ipcRenderer.invoke("store-delete", key),
	include: (key: string) =>
		ipcRenderer.invoke("store-has", key),
}

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
		contextBridge.exposeInMainWorld("store", storeAPI);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
	// @ts-ignore (define in dts)
	window.store = storeAPI;
}
