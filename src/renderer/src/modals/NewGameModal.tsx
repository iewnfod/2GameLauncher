import MihoyoLogo from "../assets/mihoyo.png";
import KuroLogo from "../assets/kuro.png";
import SteamLogo from "../assets/steam.svg";
import NewKuroGameModal from "@renderer/modals/NewKuroGameModal";
import { useState } from "react";
import NewMihoyoGameModal from "@renderer/modals/NewMihoyoGameModal";
import TrueNewGameModal from "@renderer/modals/TrueNewGameModal";
import { Game, GameData } from "@renderer/lib/games";
import { useI18n } from "@renderer/components/i18n";

export default function NewGameModal({
	show,
	setShow,
	onNewGame
} : {
	show: boolean;
	setShow: (show: boolean) => void;
	onNewGame: (game: Game) => void;
}) {
	const {t} = useI18n();

	const [openKuroModal, setOpenKuroModal] = useState(false);
	const [openMihoyoModal, setOpenMihoyoModal] = useState(false);
	const [openTrueNewModal, setOpenTrueNewModal] = useState(false);
	const [gameName, setGameName] = useState("");
	const [gameLogo, setGameLogo] = useState("");
	const [additionalGameData, setAdditionalGameData] = useState<Partial<GameData>>({});

	const handleClose = () => {
		setGameName("");
		setGameLogo("");
		setOpenTrueNewModal(false);
		setOpenKuroModal(false);
		setOpenMihoyoModal(false);
		setShow(false);
	}

	const handleOpenTrueNewModal = (name: string, logo: string, gameData?: Partial<GameData>) => {
		setGameName(name);
		setGameLogo(logo);
		if (gameData) {
			setAdditionalGameData(gameData);
		}
		setOpenTrueNewModal(true);
	}

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
				className={`relative rounded-3xl bg-[#1E2939] text-[#FFFFFF] p-5 w-96 shadow-2xl transition-all duration-300 transform ${
					show
						? "opacity-100 scale-100 translate-y-0"
						: "opacity-0 scale-95 translate-y-4"
				}`}
			>
				<h3 className="text-xl select-none">{t("Add Game")}</h3>
				<p className="text-gray-400 select-none">
					{t("Select the game provider")}
				</p>
				<div className="flex flex-col items-center justify-center max-h-[50vh] min-h-10 pt-5 pb-5 overflow-y-auto">
					<GameTypeCard
						name={t("miHoYo")}
						logo={MihoyoLogo}
						onClick={() => setOpenMihoyoModal(true)}
					/>
					<GameTypeCard
						name={t("Kuro Games")}
						logo={KuroLogo}
						invertLogoColor
						onClick={() => setOpenKuroModal(true)}
					/>
					<GameTypeCard name="Steam" logo={SteamLogo} />
				</div>
			</div>

			<NewKuroGameModal
				show={openKuroModal}
				setShow={setOpenKuroModal}
				openTrueNew={handleOpenTrueNewModal}
			/>
			<NewMihoyoGameModal
				show={openMihoyoModal}
				setShow={setOpenMihoyoModal}
				openTrueNew={handleOpenTrueNewModal}
			/>

			<TrueNewGameModal
				show={openTrueNewModal}
				setShow={setOpenTrueNewModal}
				gameName={gameName}
				gameLogo={gameLogo}
				newGame={(game: Game) => {
					onNewGame(game);
					handleClose();
				}}
				additionalGameData={additionalGameData}
			/>
		</div>
	);
}

export function GameTypeCard({
	name,
	logo,
	invertLogoColor,
	selected,
	onClick
} : {
	name: string;
	logo: string;
	invertLogoColor?: boolean;
	selected?: boolean;
	onClick?: () => void;
}) {
	return (
		<div onClick={onClick} className={`flex flex-row items-center justify-start group w-full p-3 rounded-xl space-x-3 cursor-pointer hover:bg-gray-900 transition-all duration-150 ease-linear ${selected ? "bg-gray-900" : ""}`}>
			<img
				alt=""
				src={logo}
				className={`h-10 w-10 object-contain select-none rounded-lg ${invertLogoColor ? "invert-100" : ""}`}
			/>
			<p className="text-gray-400 select-none">{name}</p>
		</div>
	);
}
