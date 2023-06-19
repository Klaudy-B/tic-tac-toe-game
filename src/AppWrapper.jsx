import { useState } from "react";
import App from "./App";

function AppWrapper(){
    const [seed, setSeed] = useState(false);
    return <div className="app-wrapper">
        <App key={seed} />
        <button onClick={()=>{setSeed(!seed)}}>New game</button>
    </div>
}
export default AppWrapper;
