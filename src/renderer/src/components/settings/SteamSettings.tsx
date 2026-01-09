import { Clipboard, Info } from "lucide-react";
import { useI18n } from "@renderer/providers/i18n";
import { useSettings } from "@renderer/providers/settings";

export default function SteamSettings() {
	const { t } = useI18n();
	const { settings, updateSettings } = useSettings();

	const handleGetSteamGridDBApiKeyFromClipboard = () => {
		navigator.clipboard
			.readText()
			.then((result) => {
				if (result) {
					updateSettings({ steamGridDBApiKey: result.trim() });
				}
			})
			.catch(() => {});
	};

	const handleGetSteamApiKeyFromClipboard = () => {
		navigator.clipboard
			.readText()
			.then((result) => {
				if (result) {
					updateSettings({ steamApiKey: result.trim() });
				}
			})
			.catch(() => {});
	};

	const handleGetSteamIdFromClipboard = () => {
		navigator.clipboard
			.readText()
			.then((result) => {
				if (result) {
					updateSettings({ steamId: result.trim() });
				}
			})
			.catch(() => {});
	};

	return (
		<div className="flex flex-col items-center justify-start w-full gap-y-5">
			<div className="w-full">
				<label
					htmlFor="steam-id"
					className="block text-sm/6 font-medium text-gray-400"
				>
					<div className="flex flex-row items-center justify-start gap-x-1.5">
						{t("Steam ID")}
						<button
							className="pr-2 cursor-pointer group"
							onClick={() => {
								window.api.openExternal(
									"https://help.steampowered.com/faqs/view/2816-BE67-5B69-0FEC",
								);
							}}
						>
							<Info
								color="#A7A7A7"
								size={16}
								className="group-hover:stroke-[#FFFFFF] transition-all duration-150 ease-linear"
							/>
						</button>
					</div>
				</label>
				<div className="mt-2">
					<div className="flex items-center rounded-lg bg-gray-700 pl-2">
						<input
							id="steam-id"
							type="text"
							value={settings.steamId}
							onChange={(e) => {
								updateSettings({
									steamId: e.target.value,
								});
							}}
							className="h-9 overflow-hidden whitespace-nowrap text-ellipsis block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-400 focus:outline-none sm:text-sm/6"
						/>
						<button
							className="pr-2 cursor-pointer group"
							onClick={handleGetSteamIdFromClipboard}
						>
							<Clipboard
								color="#A7A7A7"
								size={20}
								className="group-hover:stroke-[#FFFFFF] transition-all duration-150 ease-linear"
							/>
						</button>
					</div>
				</div>
			</div>

			<div className="w-full">
				<label
					htmlFor="steam-grid-db-api-key"
					className="block text-sm/6 font-medium text-gray-400"
				>
					<div className="flex flex-row items-center justify-start gap-x-1.5">
						{t("Steam API Key")}
						<button
							className="pr-2 cursor-pointer group"
							onClick={() => {
								window.api.openExternal(
									"https://steamcommunity.com/dev/apikey",
								);
							}}
						>
							<Info
								color="#A7A7A7"
								size={16}
								className="group-hover:stroke-[#FFFFFF] transition-all duration-150 ease-linear"
							/>
						</button>
					</div>
				</label>
				<div className="mt-2">
					<div className="flex items-center rounded-lg bg-gray-700 pl-2">
						<input
							id="steam-grid-db-api-key"
							type="text"
							value={settings.steamApiKey}
							onChange={(e) => {
								updateSettings({
									steamApiKey: e.target.value,
								});
							}}
							className="h-9 overflow-hidden whitespace-nowrap text-ellipsis block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-400 focus:outline-none sm:text-sm/6"
						/>
						<button
							className="pr-2 cursor-pointer group"
							onClick={handleGetSteamApiKeyFromClipboard}
						>
							<Clipboard
								color="#A7A7A7"
								size={20}
								className="group-hover:stroke-[#FFFFFF] transition-all duration-150 ease-linear"
							/>
						</button>
					</div>
				</div>
			</div>

			<div className="w-full">
				<label
					htmlFor="steam-grid-db-api-key"
					className="block text-sm/6 font-medium text-gray-400"
				>
					<div className="flex flex-row items-center justify-start gap-x-1.5">
						{t("SteamGridDB API Key")}
						<button
							className="pr-2 cursor-pointer group"
							onClick={() => {
								window.api.openExternal(
									"https://www.steamgriddb.com/profile/preferences/api",
								);
							}}
						>
							<Info
								color="#A7A7A7"
								size={16}
								className="group-hover:stroke-[#FFFFFF] transition-all duration-150 ease-linear"
							/>
						</button>
					</div>
				</label>
				<div className="mt-2">
					<div className="flex items-center rounded-lg bg-gray-700 pl-2">
						<input
							id="steam-grid-db-api-key"
							type="text"
							value={settings.steamGridDBApiKey}
							onChange={(e) => {
								updateSettings({
									steamGridDBApiKey: e.target.value,
								});
							}}
							className="h-9 overflow-hidden whitespace-nowrap text-ellipsis block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-400 focus:outline-none sm:text-sm/6"
						/>
						<button
							className="pr-2 cursor-pointer group"
							onClick={handleGetSteamGridDBApiKeyFromClipboard}
						>
							<Clipboard
								color="#A7A7A7"
								size={20}
								className="group-hover:stroke-[#FFFFFF] transition-all duration-150 ease-linear"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
