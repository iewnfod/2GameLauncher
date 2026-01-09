import { storeGet, storeSet } from "../../store";
import { SteamOwnedGameReturn } from "../../../types/steam";
import { downloadImageToBase64 } from "../../file";
import { CACHE_EXPIRY } from "../../constants";

export class SteamAPI {
	private readonly apiKey: string;
	private readonly baseUrl: string = "https://api.steampowered.com";

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async getOwnedGames(steamId: string, appIds?: string[]) {
		const cacheKey = `cache.steam.${steamId}.${appIds?.join(",")}`;
		try {
			const cache = storeGet(cacheKey) as string;
			const d = JSON.parse(cache);
			if (d && d.time && d.data) {
				if (Date.now() - d.time < CACHE_EXPIRY) {
					return d.data;
				}
			}
		} catch (e) {}

		try {
			const api = new URL(
				`${this.baseUrl}/IPlayerService/GetOwnedGames/v0001/`,
			);
			api.searchParams.set("key", this.apiKey);
			api.searchParams.set("steamId", steamId);
			api.searchParams.set("include_appinfo", "true");
			api.searchParams.set("format", "json");
			api.searchParams.set("include_extended_appinfo", "true");
			if (appIds) {
				appIds.forEach((appId, index) => {
					api.searchParams.set(`appids_filter[${index}]`, appId);
				});
			}
			const res = await fetch(api, {
				method: "GET",
			});
			const data = await res.json() as SteamOwnedGameReturn;
			const games = data.response.games.map(async (game) => {
				const iconUrl = `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
				const capsuleUrl1 = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`;
				const capsuleUrl2 = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/${game.capsule_filename}`;
				let icon = iconUrl;
				let capsule = "";
				try {
					icon = (await downloadImageToBase64(iconUrl)) ?? iconUrl;
					try {
						capsule =
							(await downloadImageToBase64(capsuleUrl1)) ??
							"";
					} catch (e) {
						try {
							capsule =
								(await downloadImageToBase64(capsuleUrl2)) ??
								"";
						} catch (e) {}
					}
				} catch (e) {}
				return {
					...game,
					img_icon_url: icon,
					capsule_filename: capsule,
				};
			});
			data.response.games = await Promise.all(games);
			storeSet(cacheKey, JSON.stringify({data: data, time: Date.now()}));
			return data;
		} catch (e) {
			return {
				response: {
					game_count: 0,
					games: []
				}
			} as SteamOwnedGameReturn;
		}
	}
}

export function newSteamAPIWithStoredKey() {
	try {
		const settingsString = storeGet("settings") as string;
		const settings = JSON.parse(settingsString);
		if (settings && settings.steamApiKey) {
			return new SteamAPI(settings.steamApiKey);
		}
	} catch (e) {}

	return null;
}
