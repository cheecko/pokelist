import { useState, useEffect } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import PokemonsContext from '../contexts/PokemonsContext'
import { GET_POKEMONS } from '../constants/queries'
import { useQuery } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component'
import LazyLoad from 'react-lazyload'
import PokemonListCard from '../components/PokemonPage/PokemonListCard'
import Header from '../components/Header'

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

const Pokemon = () => {
  const classes = useStyles()
  const [limit] = useState(window.screen.width > 991 ? 40 : 20)
  const [gqlVariables] = useState({ limit: limit, offset: 0 })
  const [pokemons, setPokemons] = useState(new Array(limit).fill(null))
  const [lastPage, setLastPage] = useState(false)

  const handleNextPage = () => {
    fetchMore({
      variables: { offset: pokemons.length },
      updateQuery: (pv, { fetchMoreResult }) => {
        console.log(pv)
        console.log(fetchMoreResult)
        fetchMoreResult.pokemons.results.length !== 0 ? setPokemons(pokemons => [...pokemons, ...fetchMoreResult.pokemons.results]) : setLastPage(true)
      }
    })
  }

  const { data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: gqlVariables
  })

  useEffect(() => {
    if(data) setPokemons(data.pokemons.results)
  }, [data])

  console.log(data)
  console.log(pokemons)

  return (
    <PokemonsContext.Provider value={{pokemons}}>
      <Header title='PokeList' />
      <Box className={classes.root}>
        <Box className={classes.BoxPageContainer}>
          <InfiniteScroll
            dataLength={pokemons.length}
            next={handleNextPage}
            hasMore={!lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>You have seen all pokemons</b>
              </p>
            }
            style={{ overflow: 'hidden' }}
            scrollThreshold="400px"
          >
            <Box className={classes.PokemonListCardContainer}>
              {pokemons.map((pokemon, index) => (
                <LazyLoad height={200} offset={200} key={index} className={classes.PokemonListCardWrapper}>
                  <PokemonListCard name={pokemon?.name} />
                </LazyLoad>
              ))}
            </Box>
          </InfiniteScroll>
        </Box>
      </Box>
    </PokemonsContext.Provider>
  )
}

export default Pokemon
