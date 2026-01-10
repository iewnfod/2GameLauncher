import { BookSearch, Play, Settings2, Trash } from "lucide-react";
import { Game, GameData } from "@renderer/lib/games";
import { useMemo, useState } from "react";
import DeleteGameModal from "@renderer/modals/DeleteGameModal";
import { useI18n } from "@renderer/providers/i18n";
import GameDetailsModal from "@renderer/modals/GameDetailsModal";
import MultiSrcImg from "@renderer/components/MultiSrcImg";

export default function GamePage({ game, onDelete, updateGameData }: {
	game: Game, onDelete: (id: string) => void,
	updateGameName: (id: string, name: string) => void,
	updateGameData: (id: string, data: Partial<GameData>) => void,
}) {
	const [showSettings, setShowSettings] = useState(false);
	const [showDeleteGameModal, setShowDeleteGameModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);

	const {t, language} = useI18n();
	const isSteam = useMemo(
		() => game.data.type === "steam",
		[game],
	);
	const isChinese = useMemo(
		() => language === "zh-cn",
		[language]
	);

	const handleLaunch = () => {
		console.log(`Trying to launch game ${game.id}`);
		if (isSteam) {
			window.api.launchSteamGame(game.id, game.data.steamAppId!, game.data.gameParams);
		} else {
			window.api.launchGame(
				game.id,
				game.data.gamePath,
				game.data.gameParams,
			);
		}
		updateGameData(game.id, {
			lastOpen: Date.now(),
		});
	};

	const handleHideSettings = () => {
		setShowSettings(false);
	};

	const handleDeleteGame = () => {
		onDelete(game.id);
		setShowDeleteGameModal(false);
	};

	const handleShowDetails = () => {
		setShowDetailsModal(true);
	};

	return (
		<div
			className="relative w-full h-full flex flex-col justify-between items-center"
			onClick={handleHideSettings}
		>
			{!game.data.noLogo && (
				<div
					className={`absolute top-0 z-10 flex w-full flex-row ${isSteam ? "px-12 py-3" : "p-12"}`}
					style={{
						padding: game.data.logoPosition,
						flexDirection:
							game.data.logoPlace === "right"
								? "row-reverse"
								: "row",
					}}
				>
					{isSteam ? (
						<MultiSrcImg
							alt={game.name}
							width={game.data.logoSize}
							className="max-w-48 select-none"
							src={[
								`https://shared.steamstatic.com/store_item_assets/steam/apps/${game.data.steamAppId}/logo${isChinese ? "_schinese" : ""}_2x.png`,
								`https://shared.steamstatic.com/store_item_assets/steam/apps/${game.data.steamAppId}/logo_2x.png`,
								`https://shared.steamstatic.com/store_item_assets/steam/apps/${game.data.steamAppId}/logo${isChinese ? "_schinese" : ""}.png`,
								`https://shared.steamstatic.com/store_item_assets/steam/apps/${game.data.steamAppId}/logo.png`,
							]}
						/>
					) : (
						<img
							alt={game.name}
							src={game.data.logo ?? game.icon}
							width={game.data.logoSize}
							className="max-w-44 select-none"
						/>
					)}
				</div>
			)}

			<div className="absolute bottom-0 z-10 flex flex-row justify-end items-center w-full pr-20 gap-5">
				<button
					className="animate-from-bottom-appear p-3 bg-[#FFDB29] cursor-pointer rounded-4xl group hover:bg-[#212429] transition-all duration-150 ease-linear"
					onClick={(e) => {
						e.stopPropagation();
						handleLaunch();
					}}
				>
					<div className="flex flex-row gap-3 justify-center items-center">
						<div className="rounded-4xl bg-[#16171A] p-2.5 group-hover:bg-[#FFDB29] transition-all duration-150 ease-linear">
							<Play
								color="#FFDB29"
								size={18}
								className="group-hover:stroke-[#212429] transition-all duration-150 ease-linear"
							/>
						</div>
						<div className="w-30 font-bold text-lg text-[#16171A] group-hover:text-[#FFDB29] text-center pr-4 transition-all duration-150 ease-linear select-none">
							{t("Play Now")}
						</div>
					</div>
				</button>

				<div className="relative animate-from-bottom-appear">
					<button
						className="p-4 bg-[#3C3C3C] group cursor-pointer rounded-4xl hover:bg-[#4A4A4A] transition-all duration-150"
						onClick={(e) => {
							e.stopPropagation();
							setShowSettings(!showSettings);
						}}
					>
						<Settings2
							color="#A7A7A7"
							size={24}
							className="group-hover:stroke-[#FFFFFF] transition-all ease-linear duration-150"
						/>
					</button>

					<div
						className={`
							absolute bottom-full right-0 mb-2 w-52 bg-[#2A2B2F]
							rounded-3xl shadow-xl border border-[#3C3C3C] overflow-hidden
							transition-all duration-200 ease-out origin-bottom
							${
								showSettings
									? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
									: "opacity-0 translate-y-2 scale-95 pointer-events-none"
							}
						`}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<div className="p-3 flex flex-col gap-3 justify-around items-start">
							<div className="flex flex-row gap-3 justify-between items-center w-full">
								<h3 className="font-semibold text-lg select-none text-ellipsis line-clamp-2 overflow-hidden px-2 text-[#FFFFFF]">
									{game.name}
								</h3>
							</div>

							<div className="border-t-2 border-gray-500/50 h-0 w-full rounded-lg" />

							<div className="flex flex-col w-full items-center justify-start space-y-1">
								<button
									onClick={handleShowDetails}
									className="flex flex-row items-center space-x-2 cursor-pointer px-3 py-2 hover:bg-gray-700 text-[#FFFFFF] rounded-xl transition-colors ease-linear duration-150 w-full"
								>
									<BookSearch size={16} />
									<p>{t("Details")}</p>
								</button>

								<button
									onClick={() => setShowDeleteGameModal(true)}
									className="flex flex-row items-center space-x-2 cursor-pointer px-3 py-2 text-red-400 hover:bg-red-700 hover:text-[#FFFFFF] rounded-xl transition-colors ease-linear duration-150 w-full"
								>
									<Trash size={16} />
									<p>{t("Delete")}</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute top-0 left-0 h-full bg-linear-to-r from-[#030712] to-transparent w-[20%] z-5" />

			<div className="absolute top-0 left-0 w-screen h-full text-center overflow-hidden">
				{isSteam ? (
					<div className="w-full h-full flex flex-col justify-center overflow-hidden">
						<MultiSrcImg
							alt=""
							className="h-full object-cover"
							src={[
								`https://shared.steamstatic.com/store_item_assets/steam/apps/${game.data.steamAppId!}/library_hero_2x.jpg`,
								`https://shared.steamstatic.com/store_item_assets/steam/apps/${game.data.steamAppId!}/library_hero.jpg`,
							]}
						/>
					</div>
				) : game.data.bgType === "image" ? (
					<img
						alt=""
						src={game.data.bg}
						className="overflow-hidden object-cover h-full w-full"
					/>
				) : game.data.bgType === "video" ? (
					<video
						src={game.data.bg}
						autoPlay
						loop
						preload="auto"
						controls={false}
						controlsList="nodownload nofullscreen"
						className="overflow-hidden object-cover h-full w-full"
					/>
				) : null}
			</div>

			<DeleteGameModal
				show={showDeleteGameModal}
				setShow={setShowDeleteGameModal}
				game={game}
				onDelete={handleDeleteGame}
			/>

			<GameDetailsModal
				show={showDetailsModal}
				setShow={setShowDetailsModal}
				game={game}
				updateGameData={updateGameData}
			/>
		</div>
	);
}
