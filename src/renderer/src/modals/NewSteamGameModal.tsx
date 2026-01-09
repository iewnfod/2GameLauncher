import { GameData, SteamGame } from "@renderer/lib/games";
import { useI18n } from "@renderer/providers/i18n";
import { useEffect, useState } from "react";
import SteamLogo from "../assets/steam.svg";
import { useSettings } from "@renderer/providers/settings";
import GameVerticalCard from "@renderer/components/GameVerticalCard";
import { SteamOwnedGameInfo } from "../../../types/steam";

export default function NewSteamGameModal({
	show,
	setShow,
	openTrueNew,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	openTrueNew: (
		name: string,
		logo: string,
		addData?: Partial<GameData>,
	) => void;
}) {
	const { t } = useI18n();
	const { settings } = useSettings();

	const [games, setGames] = useState<SteamGame[]>([]);
	const [gameInfo, setGameInfo] = useState<
		Record<string, SteamOwnedGameInfo>
	>({});

	const handleClose = () => {
		setShow(false);
	};

	useEffect(() => {
		window.api.getAllSteamGames().then((g) => {
			const gs = g.filter((a) => a.appId !== "228980");
			if (gs) {
				const ids = gs.map((g) => g.appId);
				if (settings.steamId) {
					window.api.steam.getIcons(settings.steamId, ids).then((res) => {
						const newInfo = {};
						res.response.games.forEach((g) => {
							newInfo[g.appid] = g;
						});
						setGameInfo(newInfo);
					});
				}
				setGames(gs);
			}
		});
	}, []);

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
				className={`relative max-h-[75vh] w-[50vw] overflow-hidden rounded-3xl bg-[#1E2939] text-[#FFFFFF] p-5 shadow-2xl transition-all duration-300 transform ${
					show
						? "opacity-100 scale-100 translate-y-0"
						: "opacity-0 scale-95 translate-y-4"
				}`}
			>
				<div className="flex flex-row items-baseline justify-between space-x-3 select-none">
					<img alt="" src={SteamLogo} className="h-10" />
					<h3 className="text-xl text-gray-400">{t("Steam")}</h3>
				</div>
				<div className="overflow-y-auto h-[calc(75vh-6rem)] grow py-3 my-3">
					<div className="grid h-full grid-cols-4 gap-x-6 gap-y-8 px-3">
						{games.map((game, index) => (
							<GameVerticalCard
								key={index}
								name={t(gameInfo[game.appId]?.name ?? game.name ?? game.appId)}
								capsule={gameInfo[game.appId]?.capsule_filename}
								icon={gameInfo[game.appId]?.img_icon_url ?? SteamLogo}
								onClick={() =>
									openTrueNew(
										t(game.name ?? game.appId),
										gameInfo[game.appId].img_icon_url ??
											SteamLogo,
										{
											steamAppId: game.appId,
											type: "steam",
										},
									)
								}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
