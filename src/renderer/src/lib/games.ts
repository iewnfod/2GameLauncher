export interface Game {
	id: string;
	icon: string;
	name: string;
	data: GameData;
}

export interface GameData {
	type?: "steam" | "mihoyo" | "kuro";
	bg?: string;
	bgType?: "image" | "video";
	logo?: string;
	logoPlace?: "left" | "right";
	logoSize?: number;
	logoPosition?: number;
	gamePath: string;
	gameParams?: string;
	officialWebsite?: string;
	playedTime?: number;
	lastOpen?: number;
	autoFetchBg?: boolean;
	lastFetchBg?: number;
	noLogo?: boolean;
	steamAppId?: string;
}

export interface SteamGame {
	appId: string;
	name?: string | undefined;
	installDir?: string | undefined;
	sizeOnDisk?: number | undefined;
	isInstalled: boolean;
	lastUpdated?: Date | undefined;
}
