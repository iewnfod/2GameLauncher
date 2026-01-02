import SideBar from "./components/SideBar";
import GamePage from "./components/GamePage";
import {useCallback, useEffect, useState} from "react";
import {Game, GameData } from "./lib/games";
import HeadLine from "@renderer/components/HeadLine";
import WelcomePage from "@renderer/components/WelcomePage";
import NewGameModal from "@renderer/modals/NewGameModal";
import SettingsModal from "@renderer/modals/SettingsModal";
import { DEFAULT_SETTINGS, Settings } from "@renderer/lib/settings";
import { useI18n } from "@renderer/components/i18n";
import { translations } from "@renderer/lib/translation";

function App() {
	const {changeLanguage} = useI18n();
	const [gamesData, setGamesData] = useState<Game[]>([]);
	const [currentGame, setCurrentGame] = useState<Game | null>(null);
	const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
	const [showNewGameModal, setShowNewGameModal] = useState(false);
	const [isGameDataLoaded, setIsGameDataLoaded] = useState<boolean>(false);
	const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
	const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
	const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

	const handleSelectGame = useCallback(
		(gameId: string) => {
			const g = gamesData.find((game) => game.id === gameId);
			if (g) {
				if (g.data) {
					if (g.data.officialWebsite && g.data.autoFetchBg) {
						if (!g.data.lastFetchBg || Date.now() - g.data.lastFetchBg > 3600 * 1000 * 12) {
							window.api.fetchBgUrl(g.data.officialWebsite, g.id);
						}
					}
					setCurrentGame(g);
					setSelectedGameId(gameId);
				}
			}
		},
		[gamesData],
	);

	const updateBgVideoUrl = useCallback((url: string, gameId: string) => {
		const index = gamesData.findIndex(g => g.id === gameId);
		if (index !== -1) {
			if (gamesData[index].data.bg !== url) {
				setGamesData((prevState) => {
					const newData = [...prevState];
					newData[index].data.bg = url;
					newData[index].data.bgType = "video";
					newData[index].data.lastFetchBg = Date.now();
					return newData;
				});
			}
		}
	}, [gamesData]);

	const handleGameExit = useCallback((gameId: string) => {
		setGamesData(prevState => {
			const index = prevState.findIndex(g => g.id === gameId);
			if (index !== -1) {
				const newState = [...prevState];
				const now = Date.now();
				const escapedTime = now - (newState[index].data.lastOpen ?? now);
				if (newState[index].data.playedTime) {
					newState[index].data.playedTime += escapedTime;
				} else {
					newState[index].data.playedTime = escapedTime;
				}
				newState[index].data.lastOpen = now;
				return newState;
			} else {
				return prevState;
			}
		});
	}, [gamesData]);

	useEffect(() => {
		window.api.onUpdateBgUrl((args) => {
			if (args.url) {
				updateBgVideoUrl(args.url, args.gameId);
			}
		});
		window.api.onGameExit((args) => {
			handleGameExit(args.gameId);
		});
		window.api.onGameLaunchError((args) => {
			console.error(args.gameId, args.msg);
		});
	}, [updateBgVideoUrl]);

	useEffect(() => {
		window.store
			.get("games")
			.then((data: string) => {
				if (data) {
					setGamesData(JSON.parse(data) ?? gamesData);
				}
				setIsGameDataLoaded(true);
			})
			.catch((e) => {
				console.error(e);
				setIsGameDataLoaded(true);
			});

		window.store
			.get("settings")
			.then((data: string) => {
				if (data) {
					setSettings(JSON.parse(data) ?? settings);
				}
				setIsSettingsLoaded(true);
			})
			.catch((e) => {
				console.error(e);
				setIsSettingsLoaded(true);
			});
	}, []);

	useEffect(() => {
		const g = gamesData.find((g) => g.id === selectedGameId);
		setCurrentGame(g ?? currentGame);
	}, [gamesData]);

	useEffect(() => {
		if (isGameDataLoaded) {
			console.log("save games data");
			window.store.set("games", JSON.stringify(gamesData));
		}
	}, [gamesData, isGameDataLoaded]);

	useEffect(() => {
		if (isSettingsLoaded) {
			console.log("save settings");
			if (settings.langauge && Object.keys(translations).includes(settings.langauge)) {
				// @ts-ignore settings.language must be key of translations
				changeLanguage(settings.langauge);
			}
			window.store.set("settings", JSON.stringify(settings));
		}
	}, [settings, isSettingsLoaded]);

	const handleOpenNewGameModal = () => {
		setShowNewGameModal(true);
	};

	const handleOpenSettingsModal = () => {
		setShowSettingsModal(true);
	};

	const handleNewGame = (game: Game) => {
		setGamesData(prevState => {
			return [...prevState, game];
		});
		setTimeout(() => {
			handleSelectGame(game.id);
		}, 100);
	};

	const handleDeleteGame = (id: string) => {
		setGamesData((prevState) => {
			const index = prevState.findIndex(g => g.id === id);
			if (index !== -1) {
				const newState = [...prevState];
				const next = newState[index + 1];
				if (next) {
					handleSelectGame(next.id);
				} else {
					const last = newState[index - 1];
					if (last) {
						handleSelectGame(last.id);
					} else {
						setCurrentGame(null);
						setSelectedGameId(null);
					}
				}
				newState.splice(index, 1);
				return newState;
			} else {
				return prevState;
			}
		});
	};

	const handleUpdateSettings = (changes: Partial<Settings>) => {
		setSettings(prevState => {
			return {
				...prevState,
				...changes
			};
		});
	};

	const handleUpdateGameData = (id: string, data: Partial<GameData>) => {
		setGamesData(prevState => {
			const index = prevState.findIndex(g => g.id === id);
			if (index !== -1) {
				const newState = [...prevState];
				newState[index].data = {
					...newState[index].data,
					...data
				};
				return newState;
			} else {
				return prevState;
			}
		});
	};

	return (
		<div className="w-full h-full flex flex-row items-center justify-between">
			<HeadLine/>
			<SideBar
				openSettingsModal={handleOpenSettingsModal}
				openNewGameModal={handleOpenNewGameModal}
				games={gamesData}
				selectedId={selectedGameId ?? ""}
				setSelectedId={handleSelectGame}
			/>
			<div className="grow bg-[#030712] w-full h-full">
				{currentGame ? (
					<GamePage
						game={currentGame}
						onDelete={handleDeleteGame}
						updateGameData={handleUpdateGameData}
					/>
				) : (
					<WelcomePage
						openNewGameModal={handleOpenNewGameModal}
						games={gamesData}
						handleSelectGame={handleSelectGame}
					/>
				)}
			</div>
			<NewGameModal show={showNewGameModal} setShow={setShowNewGameModal} onNewGame={handleNewGame}/>
			<SettingsModal
				show={showSettingsModal}
				setShow={setShowSettingsModal}
				settings={settings}
				updateSettings={handleUpdateSettings}
			/>
		</div>
	);
}

export default App;
