export interface SteamOwnedGameInfo {
	appid: number;
	has_community_visible_stats: boolean;
	img_icon_url: string;
	name: string;
	playtime_deck_forever: number;
	playtime_disconnected: number;
	playtime_forever: number;
	playtime_linux_forever: number;
	playtime_mac_forever: number;
	playtime_windows_forever: number;
	rtime_last_played: number;
	capsule_filename: string;
	has_workshop: boolean;
	has_market: boolean;
	has_dlc: boolean;
}

export interface SteamOwnedGameReturn {
	response: {
		game_count: number;
		games: SteamOwnedGameInfo[];
	};
}

export interface SteamAppDetails {
	type: "game" | "dlc" | "demo" | "advertising" | "mod" | "video";
	name: string;
	steam_appid: number;
	required_age: number;
	controller_support?: "partial" | "full";
	is_free: boolean;
	dlc?: number[];
	detailed_description: string;
	about_the_game: string;
	short_description: string;
	fullgame?: {
		appid: number;
		name: string;
	}[];
	supported_languages: string;
	header_image: string;
	website: string;
	pc_requirements?: {
		minimum: string;
		recommended: string;
	};
	mac_requirements?: {
		minimum: string;
		recommended: string;
	};
	linux_requirements?: {
		minimum: string;
		recommended: string;
	};
	legal_notice: string;
	developers: string[];
	publishers: string[];
	demos?: {
		appid: number;
		description: string;
	}[];
	price_overview?: {
		currency: string;
		initial: number;
		final: number;
		discount_percent: number;
		initial_formatted: string;
		final_formatted: string;
	};
	packages: number[];
	package_groups: {
		name: "default" | "subscriptions";
		title: string;
		description: string;
		selection_text: string;
		save_text: string;
		display_type: 0 | 1;
		is_recurring_subscription: string;
		subs: {
			packageid: number;
			percent_savings_text: string;
			percent_savings: number;
			option_text: string;
			option_description: string;
			can_get_free_license: string;
			is_free_license: boolean;
			price_in_cents_with_discount: number;
		}[];
	}[];
	platforms: {
		windows: boolean;
		mac: boolean;
		linux: boolean;
	};
	metacritic?: {
		score: number;
		url: string;
	};
	categories?: {
		id: number;
		description: string;
	}[];
	genres?: {
		id: string;
		description: string;
	}[];
	screenshots?: {
		id: number;
		path_thumbnail: string;
		path_full: string;
	}[];
	movies?: {
		id: number;
		name: string;
		thumbnail: string;
		dash_av1: string;
		dash_h264: string;
		hls_h264: string;
		highlight: boolean;
	}[];
	recommendations?: {
		total: number;
	};
	achievements?: {
		total: number;
		highlighted: {
			name: string;
			path: string;
		}[];
	}[];
	release_date?: {
		coming_soon: boolean;
		date: string;
	};
	support_info: {
		url: string;
		email: string;
	};
	background: string;
	background_raw: string;
	content_descriptors?: any;
	ratings?: any;
}
