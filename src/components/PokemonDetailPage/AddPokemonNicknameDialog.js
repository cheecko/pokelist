import { useState, useContext } from 'react'
import { makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button, IconButton } from '@material-ui/core'
import PokemonDetailContext from '../../contexts/PokemonDetailContext'
import { MyPokemonContext } from '../../contexts/MyPokemonContext'
import { FaTimes } from 'react-icons/fa'

const useStyles = makeStyles({
  DialogTitleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  DialogActions: {
    paddingLeft: 24,
    paddingRight: 24
  }
})

const AddPokemonNicknameDialog = ({ open, onClose, setAlertMessage, setAlertType }) => {
  const classes = useStyles()
  const { pokemon } = useContext(PokemonDetailContext)
  const { getMyPokemon, setMyPokemon } = useContext(MyPokemonContext)
  const [pokemonNickname, setPokemonNickname] = useState('')

  const handleChangeCustomOfferMail = (e) => {
    setPokemonNickname(e.target.value)
  }

  // 'You can catch the same pokemon multiple times but need to give a different nickname for each pokemon.' 
  // so what i understand, the same type pokemons does not allow to have same nickname, but different type pokemons allow to have it, because there is no further explaination about it
  // E.g. bulbasaur - john, bulbasaur - john -> wrong, bulbasaur - john, ivysaur - john -> true
  const handleSaveCaughtPokemon = (e) => {
    e.preventDefault()
    if(getMyPokemon().find(list => list.name === pokemon.name && list.nickname === pokemonNickname)) {
      setAlertMessage('Nickname is not available')
      setAlertType('error')
    }else{
      setMyPokemon([...getMyPokemon(), {id: pokemon.id, name: pokemon.name, nickname: pokemonNickname, image: pokemon.sprites.front_default}])
      setAlertMessage('Pokemon is saved')
      setAlertType('success')
      setPokemonNickname('')
      onClose()
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby='form-pokemon-nickname-dialog-title' fullWidth maxWidth='sm'>
        <DialogTitle id='form-pokemon-nickname-dialog-title'>
          <Box className={classes.DialogTitleBox}>
            Add Pokemon Nickname
            <IconButton onClick={onClose} size='small'>
              <FaTimes />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSaveCaughtPokemon}>
            <TextField
              autoFocus
              name='pokemon_nickname'
              fullWidth
              variant='outlined'
              value={pokemonNickname}
              onChange={handleChangeCustomOfferMail}
            />
          </form>
        </DialogContent>
        <DialogActions className={classes.DialogActions}>
          <Button onClick={onClose} variant='contained' color='secondary'>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={handleSaveCaughtPokemon}>
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddPokemonNicknameDialog