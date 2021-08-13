import { useState, useEffect, useContext } from 'react'
import { makeStyles, Box, CardMedia, Typography, Grid, IconButton, Tooltip } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useParams } from 'react-router-dom'
import PokemonDetailContext from '../contexts/PokemonDetailContext'
import { MyPokemonContext } from '../contexts/MyPokemonContext'
import { GET_POKEMON } from '../constants/queries'
import { useQuery } from '@apollo/client'
import { CgPokemon } from "react-icons/cg"
import Header from '../components/Header'
import Toast from '../components/Toast'
import PokemonGeneralInformation from '../components/PokemonDetailPage/PokemonGeneralInformation'
import PokemonMoves from '../components/PokemonDetailPage/PokemonMoves'
import AddPokemonNicknameDialog from '../components/PokemonDetailPage/AddPokemonNicknameDialog'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5f5f5',
    height: '100%',
    minHeight: '100vh'
  },
  BoxPageContainer: {
    padding: '60px 12px 12px 12px'
  },
  BoxTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  PokeballIcon: {
    width: '2rem',
    height: '2rem'
  },
  TypographyPokemonNameTitle: {
    textTransform: 'uppercase',
    padding: 8
  },
  Grid: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  GridItemImage: {
    width: '80%',
    alignSelf: 'stretch',
    padding: 8
  },
  PokemonGeneralInformation: {
    padding: 8
  },
  PokemonMoves: {
    padding: 8
  },
  BoxMoves: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8
  },
  Button: {
    textTransform: 'capitalize'
  }
})

const PokemonDetail = () => {
  const classes = useStyles()
  const { getMyPokemon } = useContext(MyPokemonContext)
  const { name } = useParams()
  const [gqlVariables] = useState({ name: name })
  const [pokemon, setPokemon] = useState()
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [catchTimeout, setCatchTimeout] = useState(0)
  const [pokemonNicknameDialog, setPokemonNicknameDialog] = useState(false)

  const { data } = useQuery(GET_POKEMON, {
    variables: gqlVariables
  })

  const handlePokemonNicknammeDialogOnClose = () => {
    setPokemonNicknameDialog(false)
  }

  const handleCatchPokemon = () => {
    setCatchTimeout(3)

    if(Math.random() >= 0.5) {
      setPokemonNicknameDialog(true)
      setAlertType('success')
      setAlertMessage('Pokemon is caught!')
    }else{
      setAlertType('error')
      setAlertMessage('Failed to catch Pokemon!')
    }
  }

  const handleAlertClose = () => {
    setAlertMessage('')
  }

  useEffect(() => {
    if(catchTimeout > 0){
      const timer = setTimeout(() => setCatchTimeout(catchTimeout - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [catchTimeout])

  useEffect(() => {
    if(data) setPokemon(data.pokemon)
  }, [data])

  console.log(data)
  console.log(pokemon)

  return (
    <PokemonDetailContext.Provider value={{pokemon}}>
      <Header rootClassName={pokemon?.types[0]?.type?.name} backButton />
      <Box className={classes.root}>
        <Box className={classes.BoxPageContainer}>
          <Box className={classes.BoxTitle}>
            {pokemon ?
              <>
                <Typography variant='h4' className={classes.TypographyPokemonNameTitle}>
                  {pokemon?.name}
                </Typography>
                <Tooltip title='Catch Pokemon'>
                  <IconButton color="secondary" onClick={handleCatchPokemon} disabled={catchTimeout > 0 ? true : false}>
                    <CgPokemon />
                  </IconButton>
                </Tooltip>
                <Typography variant='subtitle1' className={classes.TypographyPokemonNameTitle}>
                  (Owned {getMyPokemon().filter(myPokemon => myPokemon.name === pokemon?.name).length})
                </Typography>
              </>
            : <Skeleton width={600} height={60} />
            }
          </Box>
          <Grid container className={classes.Grid}>
            <Grid item sm={4} className={classes.GridItemImage}>
              {pokemon ?
                <CardMedia
                  component='img'
                  image={pokemon?.sprites.front_default}
                  title={pokemon?.name}
                />
                : <Skeleton variant="rect" width='100%' height={400} />
              }
            </Grid>
            <Grid item sm={8} className={classes.PokemonGeneralInformation}>
              {pokemon ?
                <PokemonGeneralInformation />
                : <Skeleton variant="rect" width='100%' height={400} />
              }
            </Grid>
          </Grid>
          <Box className={classes.PokemonMoves}>
            {pokemon ?
              <PokemonMoves />
              : <Skeleton variant="rect" width='100%' height={370} />
            }
          </Box>
        </Box>
      </Box>
      <Toast message={alertMessage} type={alertType} handleAlertClose={handleAlertClose} />
      <AddPokemonNicknameDialog open={pokemonNicknameDialog} onClose={handlePokemonNicknammeDialogOnClose} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
    </PokemonDetailContext.Provider>
  )
}

export default PokemonDetail