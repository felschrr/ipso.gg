import React, { useState } from "react";
import championsList from "../assets/versions/13.23.1/13.23.1/data/en_US/championFull.json";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Champions = () => {
	const [championSearchText, setChampionSearchText] = useState("");
	const [selectedRole, setSelectedRole] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Vous pouvez effectuer des actions supplémentaires si nécessaire
	};

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};

	const handleSearchText = (e) => {
		setChampionSearchText(e.target.value);
	};

	const handleRoleSelect = (role) => {
		setSelectedRole(role);
		setDropdownOpen(false); // Ferme le dropdown après la sélection
	};

	const handleDropdownToggle = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const getRoles = () => {
		const rolesSet = new Set();

		Object.values(championsList).forEach((champion) => {
			if (champion.roles) {
				champion.roles.forEach((role) => rolesSet.add(role));
			}
		});

		return Array.from(rolesSet).sort();
	};

	const filteredChampions = Object.keys(championsList).filter(
		(champion) =>
			champion.toLowerCase().includes(championSearchText.toLowerCase()) &&
			(selectedRole === "" ||
				championsList[champion].roles.includes(selectedRole))
	);

	return (
		<div className="mx-auto w-2/3">
			<form onSubmit={handleSubmit}>
				<div className="flex mb-4">
					<label
						htmlFor="search-dropdown"
						className="text-sm font-medium text-gray-700 sr-only dark:text-white">
						Champion Search
					</label>
					<button
						id="dropdown-button"
						data-dropdown-toggle="dropdown"
						className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
						type="button"
						onClick={handleDropdownToggle}>
						{selectedRole ? selectedRole : "All Roles"}{" "}
						<svg
							className="w-2.5 h-2.5 ms-2.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 4 4 4-4"
							/>
						</svg>
					</button>
					<div className="relative w-full">
						<input
							type="search"
							id="search-dropdown"
							className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300  dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
							placeholder="Search Champions..."
							required
							onChange={handleSearchText}
						/>
						<button
							type="submit"
							className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ">
							<svg
								className="w-4 h-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
							<span className="sr-only">Search</span>
						</button>
					</div>
					<div
						id="dropdown"
						className={`${
							dropdownOpen ? "block" : "hidden"
						} z-10 w-44 bg-white rounded-lg divide-y divide-gray-100 shadow dark:bg-gray-700`}>
						<ul
							className="py-2 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="dropdown-button">
							<li>
								<button
									type="button"
									onClick={() => handleRoleSelect("")}
									className={`inline-flex px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>
									All Roles
								</button>
							</li>
							{getRoles().map((role, index) => (
								<li key={index}>
									<button
										type="button"
										onClick={() => handleRoleSelect(role)}
										className={`inline-flex px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>
										{capitalizeFirstLetter(role)}
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</form>
			<ul className="flex flex-wrap justify-center items-center">
				{filteredChampions.map((championKey, index) => (
					<motion.li
						key={index}
						className="p-2 w-1/8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 0.5,
							delay: index * 0.01,
							ease: "easeIn",
						}} // Ajoutez ease-in
					>
						<Link to={`/champion/${championKey}`}>
							<motion.img
								whileHover={{ scale: 1.05 }}
								className="max-w-full h-auto rounded-lg shadow-xl dark:shadow-gray-800"
								src={championsList[championKey].icon}
								alt={championsList[championKey].name}
							/>
						</Link>
					</motion.li>
				))}
			</ul>
		</div>
	);
};

export default Champions;
