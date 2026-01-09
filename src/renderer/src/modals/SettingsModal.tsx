import { useI18n } from "@renderer/providers/i18n";
import { ReactNode, useState } from "react";
import { SettingsIcon } from "lucide-react";
import GeneralSettings from "@renderer/components/settings/GeneralSettings";
import SteamSettings from "@renderer/components/settings/SteamSettings";
import SteamIcon from "@renderer/assets/SteamIcon";

export interface SettingsPage {
	name: string;
	icon: ReactNode;
}

export default function SettingsModal({
	show,
	setShow,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
}) {
	const { t } = useI18n();
	const settingsPages: SettingsPage[] = [
		{
			name: "General",
			icon: <SettingsIcon size={18}/>,
		},
		{
			name: "Steam",
			icon: <SteamIcon size={18}/>,
		}
	];
	const [currentPage, setCurrentPage] = useState<SettingsPage>(settingsPages[0]);

	const handleClose = () => {
		setShow(false);
	};

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
				className={`relative select-none rounded-3xl bg-[#1E2939] text-[#FFFFFF] p-5 min-w-[75%] min-h-[75%] shadow-2xl transition-all duration-300 transform ${
					show
						? "opacity-100 scale-100 translate-y-0"
						: "opacity-0 scale-95 translate-y-4"
				}`}
			>
				<h3 className="text-lg text-gray-400">{t("Settings")}</h3>

				<div className="border-t-2 border-gray-700/50 h-0 w-full rounded-lg my-3" />

				<div className="flex flex-row w-full justify-between items-start mt-5">
					<div className="flex flex-col justify-start items-center h-full w-36 gap-y-1">
						{settingsPages.map((s: SettingsPage, index) => (
							<div
								key={index}
								className={`
									w-full py-1.5 px-2.5 flex justify-start items-center
									text-gray-400 rounded-xl gap-x-1.5 cursor-pointer
									group hover:bg-gray-700 transition-all duration-300
									${s.name === currentPage.name ? "bg-gray-700" : ""}
								`}
								onClick={() => setCurrentPage(s)}
							>
								<div className="text-gray-400">{s.icon}</div>
								<p>{t(s.name)}</p>
							</div>
						))}
					</div>
					<div className="h-full grow px-5">
						<div
							className={
								currentPage.name === "General" ? "" : "hidden"
							}
						>
							<GeneralSettings/>
						</div>
						<div
							className={
								currentPage.name === "Steam" ? "" : "hidden"
							}
						>
							<SteamSettings/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
