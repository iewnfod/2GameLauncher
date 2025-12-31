export interface Game {
	id: string;
	icon: string;
	name: string;
	data: GameData;
}

export interface GameData {
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
}
