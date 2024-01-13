import React, { useState } from "react";
import axios from "axios";
import { usePlayerContext } from "../context/playerContext";
import { Team } from "../components";
import queues from "../assets/json/queues.json";

const Profile = () => {
	const [searchText, setSearchText] = useState("");
	const [gameList, setGameList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [serverRegion, setServerRegion] = useState("euw1");
	const { setPlayerData } = usePlayerContext();

	function getPlayerGames() {
		setIsLoading(true);
		setPlayerData(searchText);
		axios
			.get("http://localhost:4000/pastGames", {
				params: {
					username: searchText,
					region: serverRegion,
					nbGames: 5,
				},
			})
			.then(function (response) {
				setGameList(response.data);
        console.log(response.data)
			})
			.catch(function (error) {
				console.error(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	const getQueueName = (queueId) => {
		const queueInfo = queues.find((queue) => queue.queueId === queueId);
		return queueInfo
			? queueInfo.description
					.replace("5v5", "")
					.replace("games", "")
					.trim()
			: "Unknown Queue";
	};

  function getElapsedTime(timestamp) {
    const now = Date.now();
    const gameDate = new Date(timestamp);
    const difference = now - gameDate.getTime();
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    let elapsedTime = "";
    if (days > 0) {
      elapsedTime += `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      elapsedTime += `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    return elapsedTime;
  }
  
  function convertDurationToTime(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  }
  

	const handleSubmit = (e) => {
		e.preventDefault();
		getPlayerGames();
	};

	return (
		<>
			<div className="mx-auto w-1/2">
				<form onSubmit={handleSubmit} className="mx-auto max-w-sm">
					<div className="mb-5">
						<label
							htmlFor="countries"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Select your Region
						</label>
						<select
							onChange={(e) => setServerRegion(e.target.value)}
							id="countries"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option value="euw1">EU West</option>
							<option value="na1">North America</option>
							<option value="eun1">Europe Nordic & East</option>
							<option value="kr">Korea</option>
							<option value="tr1">Turkey</option>
							<option value="jp1">Japan</option>
							<option value="br1">Brazil</option>
							<option value="la1">Latin America North</option>
							<option value="la2">Latin America South</option>
							<option value="oc1">Oceania</option>
							<option value="ru">Russia</option>
							<option value="ph2">Philippines</option>
							<option value="sg2">Singapore</option>
							<option value="th2">Thailand</option>
							<option value="tw2">Taiwan</option>
							<option value="vn2">Vietnam</option>
						</select>
					</div>
					<div className="mb-5">
						<label
							htmlFor="website-admin"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Username
						</label>
						<div className="flex mb-5">
							<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
								<svg
									className="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20">
									<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
								</svg>
							</span>
							<input
								className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								type="text"
								name="usernameInput"
								id="usernameInput"
								placeholder="Enter a username..."
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
							/>
						</div>
					</div>
					<div className="mb-5">
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Search
						</button>
					</div>
				</form>

				<div className="main">
					{isLoading ? (
						<svg
							version="1.1"
							id="L9"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							width="64px"
							height="64px"
							x="0px"
							y="0px"
							viewBox="0 0 100 100"
							enableBackground="new 0 0 0 0"
							xmlSpace="preserve">
							<path
								fill="#fff"
								d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
								<animateTransform
									attributeName="transform"
									attributeType="XML"
									type="rotate"
									dur="1s"
									from="0 50 50"
									to="360 50 50"
									repeatCount="indefinite"
								/>
							</path>
						</svg>
					) : null}

					{gameList.map((gameData, index) => (
						<div
							key={index}
							className={`grid grid-cols-2 p-4 mx-auto w-full bg-white rounded-lg border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 game-${index}`}>
                <div className="col-span-1">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    {getQueueName(gameData.info.queueId)}
                  </h5>
                </div>
                <div className="col-span-1">
                  <h6 className="font-bold text-right text-md dark:text-white">
                    {convertDurationToTime(gameData.info.gameDuration)}
                  </h6>
                  <h6 className="font-bold text-right text-md dark:text-white">
                    {getElapsedTime(gameData.info.gameEndTimestamp)}
                  </h6>
                </div>

							<div className="col-span-1">
								<div className="flex justify-between items-center mb-4"></div>
								<div className="flow-root">
									<Team
										players={gameData.info.participants.slice(
											0,
											5
										)}
										hasWon={gameData.info.teams[0].win}
									/>
								</div>
							</div>

							<div className="col-span-1">
								<div className="flex justify-between items-center mb-4"></div>
								<div className="flow-root">
									<Team
										players={gameData.info.participants.slice(
											5,
											10
										)}
										hasWon={gameData.info.teams[1].win}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Profile;
