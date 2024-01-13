import { Player } from '../components/';

const Team = ({ players, hasWon }) => {
    const ulClassName = hasWon ? 'bg-blue-200 dark:bg-blue-900' : 'bg-red-200 dark:bg-red-900'; 

    return (
        <ul
            role="list"
            className={`px-4 py-2 my-2 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 ${ulClassName}`}>
            {players.map((data, i) => (
                <Player data={data} key={data.summonerName} />
            ))}
        </ul>
    );
};
export default Team;
