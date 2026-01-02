import { BookSearch, Play, Settings2, Trash } from "lucide-react";
import { Game, GameData } from "@renderer/lib/games";
import { useState } from "react";
import DeleteGameModal from "@renderer/modals/DeleteGameModal";
import { formatDuration } from "@renderer/lib/utils";
import { useI18n } from "@renderer/components/i18n";
import GameDetailsModal from "@renderer/modals/GameDetailsModal";

export default function GamePage({ game, onDelete, updateGameData }: {
	game: Game, onDelete: (id: string) => void,
	updateGameData: (id: string, data: Partial<GameData>) => void,
}) {
	const [showSettings, setShowSettings] = useState(false);
	const [showDeleteGameModal, setShowDeleteGameModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const {t} = useI18n();

	const handleLaunch = () => {
		console.log("Launching");
	};

	const handleHideSettings = () => {
		setShowSettings(false);
		console.log("Hide Settings");
	};

	const handleDeleteGame = () => {
		onDelete(game.id);
		setShowDeleteGameModal(false);
	};

	const handleShowDetails = () => {
		setShowDetailsModal(true);
	}

	return (
		<div
			className="relative w-full h-full flex flex-col justify-between items-center"
			onClick={handleHideSettings}
		>
			<div
				className="absolute top-0 z-10 flex w-full p-12 flex-row"
				style={{
					padding: game.data.logoPosition,
					flexDirection:
						game.data.logoPlace === "right" ? "row-reverse" : "row",
				}}
			>
				<img
					alt={game.name}
					src={game.data.logo ?? game.icon}
					width={game.data.logoSize}
					className="max-w-44 select-none"
				/>
			</div>

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
							absolute bottom-full right-0 mb-2 min-w-48 bg-[#2A2B2F]
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
								<h3 className="font-semibold text-lg select-none pl-2 text-[#FFFFFF]">
									{game.name}
								</h3>
								{game.data.playedTime !== undefined ? (
									<span className="translate-y-1 bg-gray-700/70 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2 select-none">
										{formatDuration(game.data.playedTime)}
									</span>
								) : null}
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

			<div className="absolute top-0 left-0 w-full h-full">
				{game.data.bgType === "image" ? (
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
