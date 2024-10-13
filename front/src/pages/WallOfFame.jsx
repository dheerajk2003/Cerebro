import logo from '../assets/AkatsukiLogo.png';
import eye from '../assets/eye.png';
import { useState, useEffect } from 'react';

export default function WallOfFame() {
    const [users, setUsers] = useState([]);

    async function getLeaderboard(){
        const response = await fetch(`http://localhost:3000/getPoints`);
        const data = await response.json();
        console.log(data);
        setUsers(data.leaderboard);    
    }

    useEffect(() => {
        getLeaderboard();
    }, []);

    return (
        <div className="w-1/2 p-4 bg-gray-100 border border-gray-300 pt-20">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center justify-center gap-3">
                    <img src={logo} alt="" className="h-12" />
                    <h1 className="text-3xl font-bold mb-8 text-red-700">The Wall of Fame</h1>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <img src={eye} alt="" className="h-8" />
                    <h3></h3>  
                </div>
            </div>
            {
                        (users != null && users.length > 0) ? 
                        users.map((user, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-white mb-2 border border-gray-200 rounded"
                            >
                                {/* Profile Picture */}
                                {index+1}
                                <img
                                    src=""
                                    alt=""
                                    className="w-10 h-10 rounded-full ml-2"
                                />
            
                                {/* Name */}
                                <div className="ml-4 flex-1 text-lg font-semibold">{user.name}</div>
            
                                {/* Score */}
                                <div className="flex items-center justify-betweentext-lg font-bold text-gray-700"><img src={eye} alt="" className="h-5" />{user.points}</div>
                            </div>
                        ))
                         : "No users yet"
                    }
        </div>
    );
}