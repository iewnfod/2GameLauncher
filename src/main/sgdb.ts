import { ipcMain } from "electron";
import { storeGet, storeHas, storeSet } from "./store";
import SGDB from "./lib/steamgriddb/src";
import axios from "axios";
import { CACHE_EXPIRY } from "./constants";

async function getClient() {
	let key = "";

	const settingsString = await storeGet("settings") as string;
	if (settingsString) {
		const settings = JSON.parse(settingsString);
		key = settings.steamGridDBApiKey;
	}
	return new SGDB(key ?? "");
}

async function downloadImageToBase64(url: string) {
	try {
		const response = await axios.get(url, {
			responseType: "arraybuffer",
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
			},
		});

		const contentType = response.headers["content-type"] || "image/png";
		const base64 = Buffer.from(response.data).toString("base64");

		return `data:${contentType};base64,${base64}`;
	} catch (error) {
		console.error(`Failed to download image from ${url}:`, error);
		return null;
	}
}

async function getSGDBHeroes(appId: string) {
	const client = await getClient();

	try {
		const heroes = await client.getHeroesBySteamAppId(Number(appId));
		const images: string[] = [];

		heroes.forEach((hero) => {
			images.push(hero.url.toString());
		});

		return images;
	} catch (e) {
		console.error(e);
		return [];
	}
}

async function getSGDBIcons(appId: string) {
	const cacheKey = `sgdb.cache.${appId}.icon`;
	try {
		if (storeHas(cacheKey)) {
			const d: {data: string, time: number} = JSON.parse(storeGet(cacheKey) as string);
			if (Date.now() - d.time < CACHE_EXPIRY) {
				return d.data;
			}
		}
	} catch (e) {}

	const client = await getClient();

	try {
		const icons = await client.getIconsBySteamAppId(Number(appId));
		if (icons && icons.length > 0) {
			const icon = icons[0];
			const img = await downloadImageToBase64(icon.url.toString());
			if (img) {
				storeSet(
					cacheKey,
					JSON.stringify({
						data: img,
						time: Date.now(),
					}),
				);
				return img;
			}
		}
		return "";
	} catch (e) {
		console.error(e);
		return "";
	}
}

export function loadSGDBEvents() {
	ipcMain.handle(
		"getSGDBHeroes",
		(_event, args: { appId: string }) =>
			getSGDBHeroes(args.appId)
	);

	ipcMain.handle(
		"getSGDBIcons",
		(_event, args: { appId: string }) =>
			getSGDBIcons(args.appId),
	);
}
