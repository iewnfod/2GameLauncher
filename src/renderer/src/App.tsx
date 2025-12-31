import SideBar from "./components/SideBar";
import GamePage from "./components/GamePage";
import {useCallback, useEffect, useState} from "react";
import {Game} from "./lib/games";
import HeadLine from "@renderer/components/HeadLine";
import WelcomePage from "@renderer/components/WelcomePage";
import NewGameModal from "@renderer/modals/NewGameModal";

function App() {
	const [gamesData, setGamesData] = useState<Game[]>([]);
	const [currentGame, setCurrentGame] = useState<Game | null>(null);
	const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
	const [showNewGameModal, setShowNewGameModal] = useState(false);
	const [isGameDataLoaded, setIsGameDataLoaded] = useState<boolean>(false);

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

	useEffect(() => {
		window.api.onUpdateBgUrl((args) => {
			if (args.url) {
				updateBgVideoUrl(args.url, args.gameId);
			}
		});
	}, [updateBgVideoUrl]);

	useEffect(() => {
		window.store.get("games").then((data: string) => {
			if (data) {
				setGamesData(JSON.parse(data) ?? gamesData);
			}
			setIsGameDataLoaded(true);
		}).catch((e) => {
			console.error(e);
			setIsGameDataLoaded(true);
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

	const handleOpenNewGameModal = () => {
		setShowNewGameModal(true);
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
				}
				newState.splice(index, 1);
				return newState;
			} else {
				return prevState;
			}
		});
	};

	return (
		<div className="w-full h-full flex flex-row items-center justify-between">
			<HeadLine/>
			<SideBar openNewGameModal={handleOpenNewGameModal} games={gamesData} selectedId={selectedGameId ?? ""} setSelectedId={handleSelectGame}/>
			<div className="grow bg-[#030712] w-full h-full">
				{currentGame ? (
					<GamePage
						game={currentGame}
						onDelete={handleDeleteGame}
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
		</div>
	);
}

export default App;
