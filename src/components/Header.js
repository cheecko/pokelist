import { AppBar, Toolbar, IconButton, Typography, Tooltip } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { FaChevronLeft } from 'react-icons/fa'
import { CgPokemon } from "react-icons/cg"

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    maxWidth: 'inherit',
    backgroundColor: '#3D7DCA',
    boxShadow: '0 0 20px #3D7DCA',
  },
  IconButton: {
    fontSize: '1rem',
    padding: 12,
    color: '#fff',
  },
  Typography: {
    color: '#fff',
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
    flex: 'auto',
  }
})

const BackButtonHeader = ({ rootClassName, title, backButton = false, myPokemonButton = true }) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()

  const handleMyPokemonButton = () => {
    history.push({ pathname: `/my-pokemon`})
  }

  const handleBackButton = () => {
    location.state?.referrer ? history.goBack() : history.push({ pathname: `/`})
  }

  return (
    <AppBar position='static' className={` ${rootClassName} ${classes.root}`}>
      <Toolbar variant='dense'>
        {backButton &&
          <Tooltip title='Back'>
            <IconButton onClick={handleBackButton} className={classes.IconButton}>
              <FaChevronLeft />
            </IconButton>
          </Tooltip>
        }
        <Typography variant='subtitle1' className={classes.Typography}>{title}</Typography>
        {myPokemonButton &&
          <Tooltip title='My Pokemon List'>
            <IconButton onClick={handleMyPokemonButton} className={classes.IconButton}>
              <CgPokemon />
            </IconButton>
          </Tooltip>
        }
      </Toolbar>
    </AppBar>
  )
}

export default BackButtonHeader