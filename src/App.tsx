import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavTabs from "./components/NavTabs";
import RollStatSet from "./components/rollStatSet/RollStatSet";
import FindMagicItems from "./components/findMagicItems/FindMagicItems";
import CritHitsAndMisses from "./components/criticalRolls/CritHitsAndMisses";
import GroupRolls from "./components/groupRolls/GroupRolls";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>D&D Assistant</h1>
            </header>
            <main>
                <Router>
                    <NavTabs />
                    <Routes>
                        <Route
                            path="/dnd_assistant"
                            element={<CritHitsAndMisses />}
                        />

                        <Route
                            path="/dnd_assistant/find-magic-items"
                            element={<FindMagicItems />}
                        />
                        <Route
                            path="/dnd_assistant/stat-set"
                            element={<RollStatSet />}
                        />
                        <Route
                            path="/dnd_assistant/group-rolls"
                            element={<GroupRolls />}
                        />
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
