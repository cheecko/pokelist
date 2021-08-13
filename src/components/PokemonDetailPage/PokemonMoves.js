import { useContext } from 'react'
import { makeStyles, Typography, Box, Button } from '@material-ui/core'
import PokemonDetailContext from '../../contexts/PokemonDetailContext'

const useStyles = makeStyles({
  Typography: {
    padding: '8px 0px 8px 0px'
  },
  Box: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8
  },
  Button: {
    textTransform: 'capitalize'
  }
})

const PokemonMoves = () => {
  const classes = useStyles()
  const { pokemon } = useContext(PokemonDetailContext)

  return (
    <Box>
      <Typography variant='h5' className={classes.Typography}>
        Moves
      </Typography>
      <Box className={classes.Box}>
        {pokemon?.moves.map((move, index) => (
          <Button variant="outlined" key={index} className={classes.Button}>
            {move.move.name?.replace('-', ' ')}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default PokemonMoves