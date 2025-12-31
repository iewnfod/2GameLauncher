import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { loadStoreEvent } from "./store";

function createWindow(): void {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 670,
		show: false,
		frame: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		}
	});

	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' }
	});

	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
	}

	ipcMain.handle("fetch-bg-url", (_event, args: { websiteUrl: string, gameId: string }) => {
		const window = new BrowserWindow({
			width: 800,
			height: 600,
			show: false,
		});
		window.loadURL(args.websiteUrl);
		window.webContents.once("did-finish-load", () => {
			setTimeout(() => {
				window.webContents
					.executeJavaScript(`document.querySelector('video')?.src`)
					.then((content) => {
						window.destroy();
						if (content) {
							mainWindow.webContents.send("update-bg-url", {
								url: content,
								gameId: args.gameId,
							});
						}
					})
					.catch(() => {
						window.destroy();
					});
			}, 100);
		});
	});

	ipcMain.handle("minimize", () => {
		mainWindow.minimize();
	});

	ipcMain.handle("close", () => {
		mainWindow.close();
	});
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId('com.electron');

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	ipcMain.handle(
		"selectFile",
		async (
			_event,
			args: {
				filters: { name: string; extensions: string[] }[];
			},
		) => {
			const { canceled, filePaths } = await dialog.showOpenDialog({
				properties: ["openFile"],
				filters: args.filters,
			});

			if (!canceled) {
				return filePaths[0];
			} else {
				return "";
			}
		},
	);

	loadStoreEvent();

	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
