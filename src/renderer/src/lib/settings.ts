export interface Settings {
	language?: string;
	steamGridDBApiKey?: string;
	steamApiKey?: string;
	steamId?: string;
}

export const DEFAULT_SETTINGS: Settings = {
	language: 'en',
	steamGridDBApiKey: '',
	steamApiKey: '',
	steamId: '',
};
