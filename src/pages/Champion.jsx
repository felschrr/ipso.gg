import React, { useState } from "react";
import championsList from "../assets/versions/13.23.1/13.23.1/data/en_US/championFull.json";
import { useParams } from "react-router-dom";

const Champion = () => {
	const { championKey } = useParams();
	const champion = championsList[championKey];

	const [activeSpell, setActiveSpell] = useState(0);

	const handleSpellClick = (index) => {
		setActiveSpell(index);
	};

	return (
		<>
			<h3 className="text-3xl font-bold dark:text-white">
				<img
					className="max-w-full h-auto"
					src={champion.icon}
					alt={champion.name}
				/>
				{champion.name}
			</h3>

			<div className="sm:hidden">
				<label htmlFor="spellTabs" className="sr-only">
					Select spell
				</label>
				<select
					id="spellTabs"
					value={activeSpell}
					onChange={(e) => handleSpellClick(parseInt(e.target.value))}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					{Object.keys(champion.abilities).map(
						(abilityKey, abilityIndex) => (
							<option key={abilityIndex} value={abilityIndex}>
								<img
									src={champion.abilities[abilityKey][0].icon}
									alt={abilityKey}
									className="mr-2 w-5 h-5"
								/>
								{abilityKey}
							</option>
						)
					)}
				</select>
			</div>

			<ul className="hidden w-1/3 text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
				{Object.keys(champion.abilities).map(
					(abilityKey, abilityIndex) => (
						<li key={abilityIndex} className="w-full">
							<a
								href="#"
								onClick={() => handleSpellClick(abilityIndex)}
								className={`inline-block w-full p-4 ${
									activeSpell === abilityIndex
										? "text-white bg-blue-700"
										: "bg-gray-600 hover:text-white hover:bg-blue-500"
								} border-r border-gray-200 dark:border-gray-700 rounded-s-lg`}
								aria-current={
									activeSpell === abilityIndex
										? "page"
										: undefined
								}>
								<img
									src={champion.abilities[abilityKey][0].icon}
									alt={abilityKey}
									className="mr-2 w-full h-auto"
								/>
								{abilityKey}
							</a>
						</li>
					)
				)}
			</ul>

			<div>
				{champion.abilities[
					Object.keys(champion.abilities)[activeSpell]
				].map((spell, index) => {
					let values = [];
					if (spell.cooldown !== null) {
						values = spell.cooldown.modifiers[0].values;
					}
					const areAllValuesEqual = values.every(
						(value, index, array) => value === array[0]
					);

					return (
						<div
							key={`${
								Object.keys(champion.abilities)[activeSpell]
							}-${index}`}>
							<h4 className="font-bold text-md dark:text-white">
								{spell.name}
							</h4>
							{spell.effects.map((effect) => (
								<p
									key={effect.id}
									className="text-gray-500 dark:text-gray-400">
									{effect.description}
								</p>
							))}
							{spell.cooldown && (
								<>
									{!areAllValuesEqual && (
										<p className="font-bold text-gray-500 dark:text-white">
											Cooldown:
											{values.map((value, index) => (
												<span key={index}>
													{index > 0 && " / "} {value}
													s
												</span>
											))}
										</p>
									)}
									{areAllValuesEqual && (
										<p className="font-bold text-gray-500 dark:text-white">
											Cooldown: {values[0]}s
										</p>
									)}
								</>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Champion;
