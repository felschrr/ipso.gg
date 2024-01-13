import summoners from "../assets/versions/13.23.1/13.23.1/data/en_US/summoner.json";
import runesReforged from "../assets/versions/13.23.1/13.23.1/data/en_US/runesReforged.json";

const Player = ({ data }) => {
	const itemKeys = Array.from({ length: 7 }, (_, index) => `item${index}`);
	const summonerSpellKeys = ["summoner1Id", "summoner2Id"];
	const getSummonerSpellInfo = (summonerKey) => {
		const summonerData = Object.values(summoners.data).find(
			(spell) => spell.key == summonerKey
		);
		if (summonerData) {
			return {
				name: summonerData.name,
				imageFull: summonerData.image.full,
			};
		} else {
			return { name: "Sort inconnu", imageFull: "" };
		}
	};

	const getRuneIconUrl = (primaryTree, primaryRune, secondaryTree) => {
		const primaryRuneTree = runesReforged.find((rune) => rune.id === parseInt(primaryTree));
		const primaryRuneData = primaryRuneTree.slots[0].runes.find((rune) => rune.id === parseInt(primaryRune));
		const primaryRuneIcon = primaryRuneData ? primaryRuneData.icon : null;
		const secondaryRuneTreeData = runesReforged.find((rune) => rune.id === parseInt(secondaryTree));
		const secondaryRuneTreeIcon = secondaryRuneTreeData ? secondaryRuneTreeData.icon : null;
		const route = "https://ddragon.canisback.com/img/"
		return {primary: route+primaryRuneIcon, secondary: route+secondaryRuneTreeIcon}
	};

	return (
		<li className="py-3 sm:py-4" key={data.summonerName}>
					<h5 className="font-bold text-md font-boldtext-gray-500 dark:text-gray-400">
						{data.summonerName}
					</h5>
			<div className="grid grid-cols-2 grid-rows-2 gap-4">
				{/* Première ligne */}
				<div className="grid grid-cols-3 col-span-1 row-span-1 items-center">
					<div className="col-span-3 w-12 h-12 md:col-span-1">
						<img
							className="object-cover w-full h-full rounded-full"
							src={`https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${data.championName}.png`}
							alt={data.championName}
						/>
					</div>
					<div className="col-span-3 row-span-1 justify-center items-center space-y-1 md:col-span-1">
						{summonerSpellKeys.map((spellKey, index) => (
							<img
								key={index}
								className="w-6 h-6 rounded-sm"
								src={`https://ddragon.leagueoflegends.com/cdn/13.23.1/img/spell/${
									getSummonerSpellInfo(data[spellKey])
										.imageFull
								}`}
								alt={`Summoner Spell ${index + 1}`}
								title={
									getSummonerSpellInfo(data[spellKey]).title
								}
							/>
						))}
					</div>

					<div className="col-span-3 row-span-1 justify-center items-center space-y-1 md:col-span-1">
							<img
								className="w-4 h-4 rounded-sm"
								src={getRuneIconUrl(data.perks.styles[0].style, data.perks.styles[0].selections[0].perk, data.perks.styles[1].style).primary}
								alt={`Runes`}
							/>
							<img
								className="w-4 h-4 rounded-sm"
								src={getRuneIconUrl(data.perks.styles[0].style, data.perks.styles[0].selections[0].perk, data.perks.styles[1].style).secondary}
								alt={`Runes`}
							/>
					</div>

				</div>

				<div className="flex col-span-1 row-span-1 justify-end items-center">
					<h5 className="font-bold text-md font-boldtext-gray-500 dark:text-gray-400">
						{data.kills} / {data.deaths} / {data.assists}
					</h5>
				</div>

				{/* Deuxième ligne */}
				<div className="flex col-span-3 row-span-1 justify-center items-center space-x-2">
					{itemKeys.map((itemKey, index) =>
						data[itemKey] === 0 ? (
							<div
								key={index}
								className="rounded-md border border-slate-600 bg-slate-700"
								style={{ width: "34px", height: "34px" }}></div>
						) : (
							<img
								key={index}
								className={`w-8 h-8 ${
									index === itemKeys.length - 1
										? "rounded-full"
										: ""
								}`}
								src={`https://ddragon.leagueoflegends.com/cdn/13.23.1/img/item/${data[itemKey]}.png`}
								alt={`Item ${index + 1}`}
							/>
						)
					)}
				</div>
			</div>
		</li>
	);
};

export default Player;
