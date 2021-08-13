import { useState, useEffect, useContext } from 'react'
import { makeStyles, Card, CardMedia, Typography, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useLocation, useHistory } from 'react-router-dom'
import PokemonsContext from '../../contexts/PokemonsContext'
import { MyPokemonContext } from '../../contexts/MyPokemonContext'
import LazyLoad from 'react-lazyload'

const useStyles = makeStyles({
  root: {
    width: 160,
    cursor: 'pointer',
    height: '100%'
  },
  CardHeader: {
    padding: 16
  },
  CardHeaderSubTitle: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  CardHeaderTitle: {
    textTransform: 'capitalize'
  },
  CardMediaWrapper: {
    padding: 4
  }
})

const PokemonListCard = ({ name }) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const { pokemons } = useContext(PokemonsContext)
  const { getMyPokemon } = useContext(MyPokemonContext)
  const [pokemonDetail, setPokemonDetail] = useState(false)

  const handlePokemmonListCard = () => {
    history.push({ pathname: `/pokemon/${pokemonDetail.name}`, state: { referrer: location.pathname } })
  }

  useEffect(() => {
    if(!pokemonDetail && name) setPokemonDetail(pokemons.find(pokemon => pokemon.name === name))
  }, [pokemonDetail, name, pokemons])

  return (
    <>
      {!name ? <Skeleton variant="rect" width={160} height={245} /> :
        <Card className={classes.root} onClick={handlePokemmonListCard}>
          <Box className={classes.CardHeader}>
            <Typography variant='subtitle2' className={classes.CardHeaderSubTitle}>
              {`#${pokemonDetail.id}`} (Owned {getMyPokemon().filter(myPokemon => myPokemon.name === pokemonDetail.name).length})
            </Typography>
            <Typography variant='h6' className={classes.CardHeaderTitle}>
              {pokemonDetail.name}
            </Typography>
          </Box>
          <LazyLoad height={200} offset={100} className={classes.CardMediaWrapper}>
            <CardMedia
              component='img'
              image={pokemonDetail.image}
              title={pokemonDetail.name}
            />
          </LazyLoad>
        </Card>
      }
    </>
  )
}

export default PokemonListCard