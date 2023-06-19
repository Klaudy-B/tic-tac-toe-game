import { useState } from 'react';
import './App.css';

function App() {
  const [player, setPlayer] = useState(1);
  const coordinates = [
    [0,0],[0,1],[0,2],
    [1,0],[1,1],[1,2],
    [2,0],[2,1],[2,2]
  ]
  
  const [players, setPlayers] = useState(
    {
      "1": {turn: 0, points: [], letter: "x", jsxclass: "one"},
      "2": {turn: 0, points: [], letter: "o", jsxclass: "two"}
    }
  )
  const [win, setWin] = useState({value: false, player: 0});
  const checkForAWin = (player, playerNumber, lastPoint)=>{
    for(let j=0; j<player.points.length-1; j++){
      for(let k=j+1; k<player.points.length; k++){
        if(
          ((player.points[j][0]-lastPoint[0])*(player.points[k][1]-lastPoint[1])
          -(player.points[j][1]-lastPoint[1])*(player.points[k][0]-lastPoint[0]))
          ===0
        ){
          setWin({value: true, player: playerNumber});
          break;
        }
      }
    }
  }
  
  const Listener = (event, player)=>{
    if(win.value){
      return;
    }
    if(event.target.className==='blank'){
      event.target.className = players[`${player}`].jsxclass;
      event.target.innerText = players[`${player}`].letter;
      let newPlayers = {};
      newPlayers[`${player}`] = {
        turn: players[`${player}`].turn+1,
        points: [...players[`${player}`].points, coordinates[event.target.id]],
        letter: players[`${player}`].letter,
        jsxclass: players[`${player}`].jsxclass
      }
      newPlayers[`${-player+3}`] = {...players[`${-player+3}`]}
      setPlayers(newPlayers);
      setPlayer(-player+3);
    }
    if(players[`${player}`].turn>=2){
      checkForAWin(players[`${player}`], player, coordinates[event.target.id]);
    }
  }
  return (
    <>
    {!(players[1].turn+players[2].turn===9)&&!win.value&&<header>Player <span className={players[`${player}`].jsxclass}>{player}</span>'s turn</header>}
    {win.value&&<header className='win'>Player <span className={players[`${win.player}`].jsxclass}>{win.player}</span> wins</header>}
    {(players[1].turn+players[2].turn===9&&!win.value)&&<header>It's a draw</header>}
    <main>
      <div className='wrapper'>
        {
          coordinates.map((coordinate, index)=>{
              return <div key={index} id={index} className='blank' onClick={(e)=>{Listener(e, player)}}>
              </div>
            }
          )
        }
      </div>
    </main>
    </>
  )
}

export default App;
