import React, { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
	const [playerUsername, setPlayerUsername] = useState(null);

	const setPlayerData = (username) => {
		setPlayerUsername(username);
	};

	return (
		<PlayerContext.Provider value={{ playerUsername, setPlayerData }}>
			{children}
		</PlayerContext.Provider>
	);
};
