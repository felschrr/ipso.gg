const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const API_KEY = "RGAPI-14314c44-8aef-4687-92d8-a24014cbe59c";

async function getPlayerUUID(playerName, region) {
	try {
		const response = await axios.get(
			`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${API_KEY}`
		);
		return response.data.puuid;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

// async function getPlayerUUID(playerName, region) {
// 	try {
// 		const response = await axios.get(
// 			`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${API_KEY}`
// 		);
// 		return response.data.puuid;
// 	} catch (err) {
// 		console.error(err);
// 		throw err;
// 	}
// }

app.get("/pastGames", async (req, res) => {
	const playerName = req.query.username;
	const region = req.query.region;
	const nbGames = req.query.nbGames;

	try {
		const PUUID = await getPlayerUUID(playerName, region);
		const regionToGameRegion = {
			eun1: "europe",
			euw1: "europe",
			tr1: "europe",
			ru: "europe",
			br1: "americas",
			la1: "americas",
			la2: "americas",
			na1: "americas",
			oc1: "americas",
			jp1: "asia",
			kr: "asia",
			ph2: "asia",
			sg2: "asia",
			th2: "asia",
			tw2: "asia",
			vn2: "asia",
		};
		const gameRegion = regionToGameRegion[region];
		const API_CALL = `https://${gameRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?api_key=${API_KEY}`;
		const gameIDs = await axios.get(API_CALL).then((response) => response.data);
		const matchDataArray = [];
		for (let i = 0; i < nbGames; i++) {
			const matchId = gameIDs[i];
			const matchData = await axios
				.get(`https://${gameRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`)
				.then((response) => response.data)
				.catch((err) => err);
			matchDataArray.push(matchData);
		}
		console.log("matchDataArray ",matchDataArray)
		res.json(matchDataArray);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
