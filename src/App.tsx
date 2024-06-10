import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FindMagicItems from './components/FindMagicItems';
import CritHitsAndMisses from './components/CritHitsAndMisses';
import GroupRolls from './components/GroupRolls';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>D&D Assistant</h1>
      </header>
      <main>
        <Router>
        <Routes>
          <Route path="/" element={<FindMagicItems />} />
          <Route path="/find-magic-items" element={<FindMagicItems />} />
          <Route path="/crit-hits-and-misses" element={<CritHitsAndMisses />} />
          <Route path="/group-rolls" element={<GroupRolls />} />
        </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
