import { useState, useEffect, useContext } from 'react'
import { makeStyles, Card, CardMedia, Typography, Box, IconButton } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useLocation, useHistory } from 'react-router-dom'
import { MyPokemonContext } from '../../contexts/MyPokemonContext'
import { FaTimes } from 'react-icons/fa'
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
  CardHeaderSubTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
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

const MyPokemonListCard = ({ name, nickname, onClick }) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const { getMyPokemon } = useContext(MyPokemonContext)
  const [pokemonDetail, setPokemonDetail] = useState(false)

  const cutString = (name, length = 12) => {
    return name.length > length ? name.substr(0, length) + "\u2026" : name;
  }

  const handlePokemmonListCard = () => {
    history.push({ pathname: `/pokemon/${pokemonDetail.name}`, state: { referrer: location.pathname } })
  }

  useEffect(() => {
    if(name && nickname) setPokemonDetail(getMyPokemon().find(pokemon => pokemon.name === name && pokemon.nickname === nickname))
    // eslint-disable-next-line
  }, [name, nickname])

  return (
    <>
      {!name ? <Skeleton variant="rect" width={160} height={245} /> :
        <Card className={classes.root}>
          <Box className={classes.CardHeader}>
            <Box className={classes.CardHeaderSubTitleWrapper}>
              <Typography variant='subtitle2' className={classes.CardHeaderSubTitle}>
                {cutString(pokemonDetail?.nickname ?? '')}
              </Typography>
              <IconButton size='small' onClick={onClick} data-name={name} data-nickname={nickname}>
                <FaTimes />
              </IconButton>
            </Box>
            <Typography variant='h6' className={classes.CardHeaderTitle} onClick={handlePokemmonListCard}>
              {pokemonDetail.name}
            </Typography>
          </Box>
          <LazyLoad height={200} offset={100} className={classes.CardMediaWrapper}>
            <CardMedia
              component='img'
              image={pokemonDetail.image}
              title={pokemonDetail.name}
              onClick={handlePokemmonListCard}
            />
          </LazyLoad>
        </Card>
      }
    </>
  )
}

export default MyPokemonListCard