import { useContext } from 'react'
import { makeStyles, Typography, Grid } from '@material-ui/core'
import PokemonDetailContext from '../../contexts/PokemonDetailContext'

const useStyles = makeStyles({
  root: {
    padding: 12,
  },
  GridItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: 8
  },
  GridItemRight: {
    justifyContent: 'flex-end'
  },
  TypographyLabel: {
    fontWeight: 'bold'
  },
  TypographyValueWithBackground: {
    color: '#fff',
    padding: '4px 8px 4px 8px',
    textTransform: 'capitalize',
    borderRadius: 4
  }
})

const PokemonGeneralInformation = () => {
  const classes = useStyles()
  const { pokemon } = useContext(PokemonDetailContext)

  return (
    <Grid container className={classes.root}>
      <Grid item xs={4} className={`${classes.GridItem}`}>
        <Typography variant='subtitle1' className={classes.TypographyLabel}>
          ID
        </Typography>
      </Grid>
      <Grid item xs={8} className={classes.GridItem}>
        <Typography variant='subtitle1'>
          {pokemon?.id}
        </Typography>
      </Grid>
      <Grid item xs={4} className={`${classes.GridItem}`}>
        <Typography variant='subtitle1' className={classes.TypographyLabel}>
          Height
        </Typography>
      </Grid>
      <Grid item xs={8} className={classes.GridItem}>
        <Typography variant='subtitle1'>
          {pokemon?.height * 10} cm
        </Typography>
      </Grid>
      <Grid item xs={4} className={`${classes.GridItem}`}>
        <Typography variant='subtitle1' className={classes.TypographyLabel}>
          Weight
        </Typography>
      </Grid>
      <Grid item xs={8} className={classes.GridItem}>
        <Typography variant='subtitle1'>
          {pokemon?.weight / 10} kg
        </Typography>
      </Grid>
      <Grid item xs={4} className={`${classes.GridItem}`}>
        <Typography variant='subtitle1' className={classes.TypographyLabel}>
          Abilities
        </Typography>
      </Grid>
      <Grid item xs={8} className={classes.GridItem}>
        {pokemon?.abilities.map((ability, index) => (
          <Typography variant='subtitle1' key={index} className={`${pokemon?.types[0]?.type?.name} ${classes.TypographyValueWithBackground}`}>
            {ability?.ability?.name}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={4} className={`${classes.GridItem}`}>
        <Typography variant='subtitle1' className={classes.TypographyLabel}>
          Types
        </Typography>
      </Grid>
      <Grid item xs={8} className={classes.GridItem}>
        {pokemon?.types.map((type, index) => (
          <Typography variant='subtitle1' key={index} className={`${type?.type?.name} ${classes.TypographyValueWithBackground}`}>
            {type?.type?.name}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={4} className={`${classes.GridItem}`}>
        <Typography variant='subtitle1' className={classes.TypographyLabel}>
          Forms
        </Typography>
      </Grid>
      <Grid item xs={8} className={classes.GridItem}>
        {pokemon?.forms.map((form, index) => (
          <Typography variant='subtitle1' key={index} className={`${pokemon?.types[0]?.type?.name} ${classes.TypographyValueWithBackground}`}>
            {form?.name}
          </Typography>
        ))}
      </Grid>
    </Grid>
  )
}

export default PokemonGeneralInformation