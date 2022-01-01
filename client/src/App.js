import CharacterProvider from './providers/CharacterProvider';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <CharacterProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<MainPage />}/>
            <Route exact path="/chat/:id" element={<ChatPage />}/>
          </Routes>
        </Router>
      </CharacterProvider>
    </div>
  );
}

export default App;
