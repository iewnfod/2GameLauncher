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

export function loadSteamEvents() {
	ipcMain.handle(
		"getSteamAppIcons",
		(_event, args: { steamId: string, appIds: string[] }) =>
			getSteamAppIcons(args.steamId, args.appIds)
	);
}
