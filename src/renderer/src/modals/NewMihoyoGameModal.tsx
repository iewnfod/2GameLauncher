import MihoyoLogo from "../assets/mihoyo.png";
import bh3Icon from "../assets/bh3.png";
import hksrIcon from "../assets/hksr.png";
import giIcon from "../assets/gi-icon.png";
import zzzIcon from "../assets/zzz-icon.png";
import { GameData } from "@renderer/lib/games";
import zzzBg from "../assets/zzz-bg.png";
import zzzLogo from "../assets/zzz.svg";
import { useI18n } from "@renderer/providers/i18n";
import GameHorizontalCard from "@renderer/components/GameHorizontalCard";

const mihoyoGames: {
	name: string;
	icon: string;
	addData?: Partial<GameData>;
}[] = [
	{
		name: "games.Honkai Impact 3rd",
		icon: bh3Icon,
	},
	{
		name: "games.Genshin Impact",
		icon: giIcon,
	},
	{
		name: "games.Honkai: Star Rail",
		icon: hksrIcon,
	},
	{
		name: "games.Zenless Zone Zero",
		icon: zzzIcon,
		addData: {
			logo: zzzLogo,
			officialWebsite: "https://zzz.mihoyo.com/",
			bg: zzzBg,
			bgType: "image",
			autoFetchBg: true,
		},
	},
];

export default function NewMihoyoGameModal({
	show,
	setShow,
	openTrueNew,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	openTrueNew: (name: string, logo: string, addData?: Partial<GameData>) => void;
}) {
	const {t} = useI18n();

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
				className={`relative rounded-3xl bg-[#1E2939] text-[#FFFFFF] p-5 w-96 shadow-2xl transition-all duration-300 transform ${
					show
						? "opacity-100 scale-100 translate-y-0"
						: "opacity-0 scale-95 translate-y-4"
				}`}
			>
				<div className="flex flex-row items-baseline justify-between space-x-3 select-none">
					<img alt="" src={MihoyoLogo} className="h-10" />
					<h3 className="text-xl text-gray-400">{t("miHoYo")}</h3>
				</div>
				<div className="flex flex-col items-center justify-start max-h-[50vh] min-h-10 pt-5 pb-5 overflow-y-auto">
					{mihoyoGames.map((game, index) => (
						<GameHorizontalCard
							key={index}
							name={t(game.name)}
							logo={game.icon}
							onClick={() =>
								openTrueNew(
									t(game.name),
									game.icon,
									{...game.addData, type: "mihoyo"},
								)
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
