import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import path from "node:path";

const api = {
	fetchBgUrl: (websiteUrl: string, gameId: string) =>
		ipcRenderer.invoke("fetch-bg-url", { websiteUrl, gameId }),
	onUpdateBgUrl: (
		callback: (args: { url: string; gameId: string }) => void,
	) => ipcRenderer.on("update-bg-url", (_event, value) => callback(value)),
	minimize: () => ipcRenderer.invoke("minimize"),
	close: () => ipcRenderer.invoke("close"),
	selectFile: (filters: { name: string; extensions: string[] }[]) =>
		ipcRenderer.invoke("selectFile", { filters }),
	showFileInFolder: (filePath: string) =>
		ipcRenderer.invoke("showFileInFolder", { filePath }),
	getFileName: (filePath: string) => path.basename(filePath),
	launchGame: (gameId: string, gamePath: string, gameParams?: string) =>
		ipcRenderer.invoke("launchGame", { gameId, gamePath, gameParams }),
	onGameExit: (
		callback: (args: { gameId: string; code: number | null }) => void,
	) => ipcRenderer.on("game-exit", (_event, value) => callback(value)),
	onGameLaunchError: (
		callback: (args: { gameId: string; msg: string }) => void,
	) =>
		ipcRenderer.on("game-launch-error", (_event, value) => callback(value)),
	getAllSteamGames: () => ipcRenderer.invoke("getAllSteamGames"),
	getFileIcon: (filePath: string) =>
		ipcRenderer.invoke("getFileIcon", { filePath }),
	openExternal: (url: string) => ipcRenderer.invoke("openExternal", { url }),
	steam: {
		getSGDBHeroes: (appId: string) =>
			ipcRenderer.invoke("getSGDBHeroes", { appId }),
		getSGDBIcons: (appId: string) =>
			ipcRenderer.invoke("getSGDBIcons", { appId }),
		getIcons: (steamId: string, appIds?: string[]) =>
			ipcRenderer.invoke("getSteamAppIcons", { steamId, appIds }),
		getAppDetails: (appId: string) =>
			ipcRenderer.invoke("getSteamAppDetails", { appId }),
	},
	launchSteamGame: (gameId: string, steamAppId: string, gameParams?: string) =>
		ipcRenderer.invoke("launchSteamGame", { gameId, steamAppId, gameParams }),
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
