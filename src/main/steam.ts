import { newSteamAPIWithStoredKey } from "./lib/steam";
import { ipcMain } from "electron";
import { SteamOwnedGameReturn } from "../types/steam";

export async function getSteamAppIcons(steamId: string, appIds?: string[]) {
	const steam = newSteamAPIWithStoredKey();
	if (steam) {
		return await steam.getOwnedGames(steamId, appIds);
	} else {
		return {
			response: {
				game_count: 0,
				games: [],
			}
		} as SteamOwnedGameReturn;
	}
}

export async function getSteamAppDetails(appId: string) {
	const steam = newSteamAPIWithStoredKey();
	if (steam) {
		return await steam.getAppDetails(appId);
	} else {
		return undefined;
	}
}

export function loadSteamEvents() {
	ipcMain.handle(
		"getSteamAppIcons",
		(_event, args: { steamId: string, appIds: string[] }) =>
			getSteamAppIcons(args.steamId, args.appIds)
	);

	ipcMain.handle(
		"getSteamAppDetails",
		(_event, args: { appId: string }) =>
			getSteamAppDetails(args.appId)
	);
}
