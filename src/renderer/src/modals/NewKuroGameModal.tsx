import KuroLogo from "@renderer/assets/kuro.png";
import wwIcon from "@renderer/assets/ww-icon.png";
import punishingIcon from "@renderer/assets/punishing.png";
import { GameTypeCard } from "@renderer/modals/NewGameModal";
import { GameData } from "@renderer/lib/games";
import wwBg from "@renderer/assets/ww-bg.png";
import wwLogo from "@renderer/assets/ww.png";

const kuroGames: {
	name: string;
	icon: string;
	addData?: Partial<GameData>;
}[] = [
	{
		name: "战双帕弥什",
		icon: punishingIcon,
	},
	{
		name: "鸣潮",
		icon: wwIcon,
		addData: {
			logoSize: 50,
			logoPosition: 15,
			logo: wwLogo,
			officialWebsite: "https://mc.kurogames.com/",
			bg: wwBg,
			bgType: "image",
			autoFetchBg: true,
		},
	},
];

export default function NewKuroGameModal({
	show,
	setShow,
	openTrueNew,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	openTrueNew: (name: string, logo: string, addData?: Partial<GameData>) => void;
}) {
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
					<img alt="" src={KuroLogo} className="h-10 invert-100" />
					<h3 className="text-xl text-gray-400">库洛游戏</h3>
				</div>
				<div className="flex flex-col items-center justify-center max-h-[50vh] min-h-10 pt-5 pb-5 overflow-y-auto">
					{kuroGames.map((game, index) => (
						<GameTypeCard
							key={index}
							name={game.name}
							logo={game.icon}
							onClick={() =>
								openTrueNew(game.name, game.icon, game.addData)
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
