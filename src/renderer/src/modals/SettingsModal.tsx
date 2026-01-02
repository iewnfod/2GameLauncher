import { Language, useI18n } from "@renderer/components/i18n";
import { Settings } from "@renderer/lib/settings";
import { LANGUAGE_NAMES } from "@renderer/lib/translation";
import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SettingsModal({
	show,
	setShow,
	settings,
	updateSettings,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	settings: Settings;
	updateSettings: (changes: Partial<Settings>) => void;
}) {
	const { t, availableLanguages, language, changeLanguage } = useI18n();
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

	const handleClose = () => {
		setShow(false);
		setIsLanguageDropdownOpen(false);
	};

	const handleSelectLanguage = useCallback((l: Language) => {
		if (l !== language) {
			updateSettings({ langauge: l });
			changeLanguage(l);
		}
		setIsLanguageDropdownOpen(false);
	}, [language]);

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
				show ? "opacity-100 visible" : "opacity-0 invisible"
			}`}
		>
			<div
				className="absolute inset-0 backdrop-blur-md"
				onClick={handleClose}
			/>

			<div
				className={`absolute inset-0 bg-[#000000]/70 transition-opacity duration-300 ${
					show ? "opacity-50" : "opacity-0"
				}`}
				onClick={handleClose}
			/>

			<div
				className={`relative select-none rounded-3xl bg-[#1E2939] text-[#FFFFFF] p-5 w-96 shadow-2xl transition-all duration-300 transform ${
					show
						? "opacity-100 scale-100 translate-y-0"
						: "opacity-0 scale-95 translate-y-4"
				}`}
			>
				<h3 className="text-lg text-gray-400">{t("Settings")}</h3>

				<div className="border-t-2 border-gray-700/50 h-0 w-full rounded-lg mt-3 mb-3" />

				<div className="flex flex-row items-center justify-between space-x-1 mt-5 select-none">
					<p className="text-md">{t("Language")}</p>

					<div className="relative">
						<div
							className="px-3 py-2.5 text-heading text-sm rounded-lg bg-gray-700/50 cursor-pointer hover:bg-gray-600/50 transition-colors duration-150 ease-linear flex items-center justify-between min-w-35"
							onClick={() =>
								setIsLanguageDropdownOpen(
									!isLanguageDropdownOpen,
								)
							}
						>
							<span>
								{LANGUAGE_NAMES[settings.langauge || language] || settings.langauge || language}
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
		</div>
	);
}
