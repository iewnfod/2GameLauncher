import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DEFAULT_SETTINGS, Settings } from "@renderer/lib/settings";
import { useI18n } from "@renderer/providers/i18n";

const settingsString = await window.store.get("settings");
let storedSettings = DEFAULT_SETTINGS;
try {
	storedSettings = JSON.parse(settingsString);
} catch (e) {}

interface SettingsContextType {
	settings: Settings;
	updateSettings: (changes: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
	children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
	children
}) => {
	const [settings, setSettings] = useState<Settings>(storedSettings);
	const { changeLanguage } = useI18n();

	const updateSettings = (changes: Partial<Settings>) => {
		setSettings((prevState) => {
			return {
				...prevState,
				...changes,
			};
		});
	};

	useEffect(() => {
		if (settings.language) {
			// @ts-expect-error settings.language must be one of Language
			changeLanguage(settings.language);
		}
	}, []);

	useEffect(() => {
		console.log("save settings");
		window.store.set("settings", JSON.stringify(settings));
	}, [settings]);

	return (
		<SettingsContext.Provider value={{settings, updateSettings}}>
			{children}
		</SettingsContext.Provider>
	);
}

export const useSettings = () => {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error('useSettings must be used within SettingsProvider');
	}
	return context;
}
