import React, { useCallback, useState } from "react";

const LobbyScreen = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const handelSubmit = useCallback(
        (e) => {
        e.preventDefault();
        console.log({
            email, 
            room,
        });
    }, [email, room]
    );
    return(
        <div>
            <h1>Lobby</h1>
            <form onSubmit={handelSubmit}>
                <label>Email ID</label>
                <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /><br/>
                <label>Room Code</label>
                <input 
                type="text" 
                id="room"
                value={room}
                onChange={(e) => {setRoom(e.target.value)}}
                /><br />
                <button>Join</button>
            </form>
        </div>
    )
}

export default LobbyScreen;