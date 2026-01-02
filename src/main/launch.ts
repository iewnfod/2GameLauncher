import * as child_process from "node:child_process";
import { BrowserWindow, ipcMain } from "electron";
import * as fs from "node:fs";

export async function launchGame(args: {
	gameId: string;
	gamePath: string;
	gameParams?: string;
}, 	mainWindow: BrowserWindow) {
	const command = args.gamePath;
	let params: string[] = [];

	try {
		fs.accessSync(command, fs.constants.R_OK | fs.constants.X_OK);
	} catch (e) {
		mainWindow.webContents.send("game-launch-error", { gameId: args.gameId, msg: "File not exist or not have access" });
	}

	if (args.gameParams) {
		params = args.gameParams.split(" ").filter(param => param.trim());
	}

	const child = child_process.spawn(
		args.gamePath,
		params,
	);

	child.on("error", (err) => {
		mainWindow.webContents.send("game-launch-error", {
			gameId: args.gameId,
			msg: `Game Launched Error ${err.toString()}`
		});
	});

	child.on("exit", (code) => {
		mainWindow.webContents.send("game-exit", {gameId: args.gameId, code});
	});
}

export function loadLaunchGameEvents(mainWindow: BrowserWindow) {
	ipcMain.handle("launchGame", (_event, args) => {
		launchGame(args, mainWindow);
	});
}
