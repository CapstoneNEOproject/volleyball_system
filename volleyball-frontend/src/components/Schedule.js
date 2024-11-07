import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Schedule = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/scheduling/games/');
                setGames(response.data);
            } catch (error) {
                console.error("Error fetching game schedule:", error);
            } finally {
                setLoading(false);
            }

        };
    
        fetchGames();
    }, []);

    if(loading) return <p>Loading schedule...</p>;

    return (
        <div>
            <h2>Schedule for Next Month</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <strong>{game.date}:</strong> {game.team1} vs {game.team2} at {game.location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Schedule;