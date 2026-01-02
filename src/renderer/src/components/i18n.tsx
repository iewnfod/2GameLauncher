// i18n.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from "@renderer/lib/translation";

export type Language = keyof typeof translations;

interface I18nContextType {
	language: Language;
	t: (key: string) => string;
	changeLanguage: (lang: Language) => void;
	availableLanguages: Language[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const getNestedValue = (obj: any, path: string): string => {
	return path.split('.').reduce((current, key) => {
		return current ? current[key] : undefined;
	}, obj) || path;
};

interface I18nProviderProps {
	children: ReactNode;
	defaultLanguage?: Language;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
	children,
	defaultLanguage = 'en'
}) => {
	const [language, setLanguage] = useState<Language>(defaultLanguage);
	const availableLanguages: Language[] = Object.keys(translations) as Language[];

	const t = (key: string): string => {
		const translation = translations[language];
		return getNestedValue(translation, key);
	};

	const changeLanguage = (lang: Language) => {
		setLanguage(lang);
		localStorage.setItem('preferred-language', lang);
	};

	return (
		<I18nContext.Provider value={{ language, t, changeLanguage, availableLanguages }}>
			{children}
		</I18nContext.Provider>
	);
};

export const useI18n = () => {
	const context = useContext(I18nContext);
	if (context === undefined) {
		throw new Error('useI18n must be used within an I18nProvider');
	}
	return context;
};

export const useTranslation = (lang?: Language) => {
	const [currentLang, setCurrentLang] = useState<Language>(lang || 'en');

	const t = (key: string): string => {
		const translation = translations[currentLang];
		return getNestedValue(translation, key);
	};

	const changeLanguage = (newLang: Language) => {
		setCurrentLang(newLang);
	};

	return {
		language: currentLang,
		t,
		changeLanguage,
		availableLanguages: Object.keys(translations) as Language[]
	};
};
