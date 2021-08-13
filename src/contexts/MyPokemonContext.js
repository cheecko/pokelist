import { createContext } from 'react'

const MyPokemonContext = createContext()

// only using localstorage, because the data is pretty lightweight and will not save data more than 5MB
// for more than 5MB total data should change it to IndexedDB or Cache Storage

const Provider = ({ children }) => {
  const setMyPokemon = (value) => {
    localStorage.setItem('myPokemon', JSON.stringify(value))
  }

  const getMyPokemon = () => {
    return localStorage.getItem('myPokemon') ? JSON.parse(localStorage.getItem('myPokemon')) : []
  }

  return <MyPokemonContext.Provider value={{ getMyPokemon, setMyPokemon }}>{children}</MyPokemonContext.Provider>
}

export { MyPokemonContext, Provider }