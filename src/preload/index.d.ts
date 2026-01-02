import { ElectronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron';

declare global {
	interface Window {
		electron: ElectronAPI,
		api: {
			fetchBgUrl: (websiteUrl: string, gameId: string) => void,
			onUpdateBgUrl: (callback: (args: {url: string, gameId: string}) => void) => void,
			minimize: () => void,
			close: () => void,
			selectFile: (filters: { name: string; extensions: string[] }[]) => Promise<string>,
			showFileInFolder: (filePath: string) => void,
			getFileName: (filePath: string) => string,
			launchGame: (gameId: string, gamePath: string, gameParams?: string) => void,
			onGameExit: (callback: (args: {gameId: string, code: number | null}) => void) => void,
			onGameLaunchError: (callback: (args: { gameId: string, msg: string }) => void) => void,
		},
		store: {
			set: (key: string, value: any) => void,
			get: (key: string) => Promise<any>,
			delete: (key: string) => void,
			include: (key: string) => boolean,
		},
	}
}
