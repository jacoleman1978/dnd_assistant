import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FindMagicItems from './components/FindMagicItems';

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
        </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
