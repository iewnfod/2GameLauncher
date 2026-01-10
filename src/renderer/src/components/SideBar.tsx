import {Bolt, Grid2X2Plus} from "lucide-react";
import {Game} from "../lib/games";
import { useI18n } from "@renderer/providers/i18n";

export interface SideBarProps {
	games: Game[];
	selectedId: string;
	setSelectedId: (id: string) => void;
	openNewGameModal: () => void;
	openSettingsModal: () => void;
}

export default function SideBar(props: SideBarProps) {
	const {t} = useI18n();

	const handleSelectGame = (id: string) => {
		props.setSelectedId(id);
	}

	return (
		<div className="flex flex-col gap-5 w-18 h-full bg-[#030712] items-center justify-end">
			<div className="overflow-y-scroll mt-3 no-scrollbar">
				<div className="grow flex flex-col w-full items-center justify-end gap-2">
					{props.games.map((game, index) => (
						<div
							className="flex flex-row group relative"
							key={index}
						>
							<button
								className={`
									${game.id === props.selectedId ? "border-[#3E3D3D]" : "border-transparent"}
									 cursor-pointer transition-all ease-linear duration-150
									 border-2 hover:border-[#3E3D3D] rounded-2xl p-1
								`}
								onClick={() => handleSelectGame(game.id)}
							>
								<img
									alt=""
									src={game.icon}
									className="rounded-xl w-10 select-none"
								/>
							</button>
							<div className="absolute text-gray-700 left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-[#E0E0E0] text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none z-10 group-hover:delay-500 select-none">
								{game.name}
								<div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#E0E0E0]"></div>
							</div>
						</div>
					))}
				</div>
			</div>

			<hr className="border-t-2 border-[#A7A7A7] max-w-full pl-2.5 pr-2.5" />

			<div className="flex flex-col justify-end items-center w-full gap-1 pb-3">
				<div className="flex flex-row group relative">
					<button
						onClick={props.openNewGameModal}
						className="cursor-pointer transition-all ease-linear duration-150 border-2 border-transparent hover:border-[#3E3D3D] rounded-2xl p-1"
					>
						<div className="bg-[#3C3C3C] rounded-xl p-1.5">
							<Grid2X2Plus
								color="#A7A7A7"
								size={24}
								className="group-hover:stroke-[#FFFFFF] transition-all ease-linear duration-150"
							/>
						</div>
					</button>
					<div className="absolute text-gray-700 left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-[#E0E0E0] text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none z-10 group-hover:delay-500 select-none">
						{t("Add Game")}
						<div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#E0E0E0]"></div>
					</div>
				</div>
				<div className="flex flex-row group relative">
					<button
						onClick={props.openSettingsModal}
						className="cursor-pointer transition-all ease-linear duration-150 border-2 border-transparent hover:border-[#3E3D3D] rounded-2xl p-1"
					>
						<div className="bg-[#3C3C3C] rounded-xl p-1.5">
							<Bolt
								color="#A7A7A7"
								size={24}
								className="group-hover:stroke-[#FFFFFF] transition-all ease-linear duration-150"
							/>
						</div>
					</button>
					<div className="absolute text-gray-700 left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-[#E0E0E0] text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none z-10 group-hover:delay-500 select-none">
						{t("Settings")}
						<div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#E0E0E0]"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
