import { useCallback, useState } from "react";
import { CircleAlert, SquareMousePointer } from "lucide-react";
import { Game, GameData } from "@renderer/lib/games";
import { v1 as uuidv1 } from "uuid";
import { useI18n } from "@renderer/components/i18n";

export default function TrueNewGameModal(
	{show, setShow, gameName, gameLogo, gamePath, newGame, additionalGameData} : {
		show: boolean;
		setShow: (show: boolean) => void;
		gameName: string;
		gameLogo: string;
		gamePath?: string;
		newGame: (game: Game) => void;
		additionalGameData: Partial<GameData>;
	}
) {
	const {t} = useI18n();

	const [innerGamePath, setInnerGamePath] = useState<string>(gamePath ?? "");
	const [params, setParams] = useState<string>("");
	const [showGamePathError, setShowGamePathError] = useState(false);

	const handleClose = () => {
		setShow(false);
		setShowGamePathError(false);
		setInnerGamePath("");
		setParams("");
	};

	const handleSelectGamePath = () => {
		window.api.selectFile([
			{name: "Game File", extensions: ["exe", "app"]}
		]).then((result) => {
			if (result) {
				setInnerGamePath(result);
			}
		});
	}

	const handleNewGame = useCallback(() => {
		if (!innerGamePath) {
			setShowGamePathError(true);
			return;
		}

		newGame({
			id: uuidv1(),
			icon: gameLogo,
			name: gameName,
			data: {
				gameParams: params,
				gamePath: innerGamePath,
				playedTime: 0,
				...additionalGameData,
			},
		});
		handleClose();
	}, [innerGamePath]);

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
				<div className="flex flex-row items-center justify-start space-x-3 select-none">
					<img alt="" src={gameLogo} className="h-10 rounded-lg" />
					<h3 className="text-xl text-gray-400">{gameName}</h3>
				</div>

				<div className="flex flex-col w-full pt-5 pb-5 space-y-5">
					<div>
						<label
							htmlFor="game-path-input"
							className="block text-sm/6 font-medium text-gray-400"
						>
							{t("Game Path")} *
						</label>
						<div className="mt-2">
							<div className="flex items-center rounded-lg bg-gray-700 pl-2">
								<div
									id="game-path-input"
									className="select-none h-9 overflow-hidden whitespace-nowrap text-ellipsis grow py-1.5 pr-3 pl-1 text-base text-gray-400 focus:outline-none sm:text-sm/6"
								>
									{innerGamePath}
								</div>
								<button
									className="pr-2 cursor-pointer group"
									onClick={handleSelectGamePath}
								>
									<SquareMousePointer
										color="#A7A7A7"
										size={20}
										className="group-hover:stroke-[#FFFFFF] transition-all duration-150 ease-linear"
									/>
								</button>
							</div>
						</div>
						{
							!innerGamePath && showGamePathError && (
								<div className="flex flex-row items-center justify-start space-x-1 mt-1 select-none">
									<CircleAlert className="stroke-red-500/75 translate-y-px" size={16}/>
									<p className="text-red-500/75 text-sm">{t('Game Path')} {t('should not be empty')}</p>
								</div>
							)
						}
					</div>

					<div>
						<label
							htmlFor="game-params"
							className="block text-sm/6 font-medium text-gray-400"
						>
							{t("Game Parameters")}
						</label>
						<div className="mt-2">
							<div className="flex items-center rounded-lg bg-gray-700 pl-2">
								<input
									id="game-params"
									type="text"
									value={params}
									onChange={(e) => setParams(e.target.value)}
									className="h-9 overflow-hidden whitespace-nowrap text-ellipsis block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-400 focus:outline-none sm:text-sm/6"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t-2 border-gray-700/50 h-0 w-full rounded-lg mt-6" />

				<div className="flex justify-end space-x-3 pt-6">
					<button
						onClick={handleClose}
						className="cursor-pointer px-4 py-2 border-2 border-red-700 hover:bg-red-900 rounded-xl transition-colors ease-linear duration-150"
					>
						{t("Cancel")}
					</button>
					<button
						onClick={handleNewGame}
						className="cursor-pointer px-4 py-2 bg-[#FFFFFF] text-gray-900 hover:bg-gray-200 rounded-xl transition-colors ease-linear duration-150"
					>
						{t("Submit")}
					</button>
				</div>
			</div>
		</div>
	);
}
