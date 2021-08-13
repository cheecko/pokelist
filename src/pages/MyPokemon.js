import { useState, useEffect, useContext } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import PokemonsContext from '../contexts/PokemonsContext'
import { MyPokemonContext } from '../contexts/MyPokemonContext'
import LazyLoad from 'react-lazyload'
import MyPokemonListCard from '../components/MyPokemonPage/MyPokemonListCard'
import Header from '../components/Header'
import Toast from '../components/Toast'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5f5f5',
    height: '100%',
    minHeight: '100vh'
  },
  BoxPageContainer: {
    padding: '60px 12px 12px 12px'
  },
  PokemonListCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8
  },
  PokemonListCardWrapper: {
    alignSelf: 'stretch'
  }
})

const MyPokemon = () => {
  const classes = useStyles()
  const { getMyPokemon, setMyPokemon } = useContext(MyPokemonContext)
  const [limit] = useState(window.screen.width > 991 ? 40 : 20)
  const [pokemons, setPokemons] = useState(new Array(limit).fill(null))
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')

  const handleRemovePokemon = (name, nickname) => {
    const filter = getMyPokemon().filter(pokemon => pokemon.name !== name || pokemon.nickname !== nickname)
    setMyPokemon(filter)
    setPokemons(filter)
    setAlertType('success')
    setAlertMessage(`Pokemon is released, Good bye ${nickname}`)
  }

  const handleAlertClose = () => {
    setAlertMessage('')
  }

  useEffect(() => {
    setPokemons(getMyPokemon())
    // eslint-disable-next-line
  }, [])

  console.log(getMyPokemon())
  console.log(pokemons)

  return (
    <PokemonsContext.Provider value={{pokemons}}>
      <Header title='PokeList' backButton />
      <Box className={classes.root}>
        <Box className={classes.BoxPageContainer}>
          <Box className={classes.PokemonListCardContainer}>
            {pokemons.map((pokemon, index) => (
              <LazyLoad height={200} offset={200} key={index} className={classes.PokemonListCardWrapper}>
                <MyPokemonListCard name={pokemon?.name} nickname={pokemon?.nickname} onClick={() => handleRemovePokemon(pokemon?.name, pokemon?.nickname)} />
              </LazyLoad>
            ))}
          </Box>
        </Box>
      </Box>
      <Toast message={alertMessage} type={alertType} handleAlertClose={handleAlertClose} />
    </PokemonsContext.Provider>
  )
}

export default MyPokemon
