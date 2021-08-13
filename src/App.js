import './App.css';
import { useEffect } from 'react'
import { BrowserRouter, Route, useLocation } from 'react-router-dom'
import Pokemon from './pages/Pokemon';
import PokemonDetail from './pages/PokemonDetail';
import MyPokemon from './pages/MyPokemon';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
          <Route path='/' component={Pokemon} exact />
          <Route path='/pokemon' component={Pokemon} exact />
          <Route path='/pokemon/:name' component={PokemonDetail} exact />
          <Route path='/my-pokemon' component={MyPokemon} exact />
      </BrowserRouter>
    </div>
  );
}

export default App;
