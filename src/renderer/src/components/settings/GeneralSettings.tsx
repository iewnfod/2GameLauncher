import { LANGUAGE_NAMES } from "@renderer/lib/translation";
import { ChevronDown } from "lucide-react";
import { Language, useI18n } from "@renderer/providers/i18n";
import { useCallback, useState } from "react";
import { useSettings } from "@renderer/providers/settings";

export default function GeneralSettings() {
	const { t, availableLanguages, language, changeLanguage } = useI18n();
	const { settings, updateSettings } = useSettings();
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

	const handleSelectLanguage = useCallback(
		(l: Language) => {
			if (l !== language) {
				changeLanguage(l);
				updateSettings({ language: l });
			}
			setIsLanguageDropdownOpen(false);
		},
		[language],
	);

	return (
		<div className="flex flex-col items-center justify-start w-full gap-y-5">
			<div className="w-full flex flex-row items-center justify-between space-x-1 select-none text-gray-400">
				<p className="text-md">{t("Language")}</p>

				<div className="relative">
					<div
						className="px-3 py-2.5 text-heading text-sm rounded-lg bg-gray-700/50 cursor-pointer hover:bg-gray-600/50 transition-colors duration-150 flex items-center justify-between min-w-35"
						onClick={() =>
							setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
						}
					>
						<span>
							{LANGUAGE_NAMES[settings.language || language] ||
								settings.language ||
								language}
						</span>
						<ChevronDown
							size={18}
							className={`transition duration-200 ${isLanguageDropdownOpen ? "rotate-180" : "rotate-0"}`}
						/>
					</div>

					<div
						className={`absolute top-full left-0 right-0 mt-1 bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-200 origin-top ${
							isLanguageDropdownOpen
								? "opacity-100 scale-y-100 translate-y-0"
								: "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
						}`}
					>
						<div className="p-1 max-h-60 overflow-y-auto custom-scrollbar">
							{availableLanguages.map((l) => (
								<div
									key={l}
									className={`px-3 py-1.5 m-1 cursor-pointer transition-all ease-linear duration-150 hover:bg-gray-700 mx-1 rounded-md text-gray-300 ${
										l === language
											? "bg-gray-700/50 font-medium"
											: "hover:text-white"
									}`}
									onClick={() => handleSelectLanguage(l)}
								>
									{LANGUAGE_NAMES[l] || l}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
