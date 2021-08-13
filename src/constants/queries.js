import { gql } from '@apollo/client'

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        name
        image
      }
    }
  }
`

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      message
      status
      forms {
        name
      }
      height
      weight
      order
      species {
        name
      }
      stats {
        base_stat
        effort
        stat {
          name
        }
      }
      sprites {
        front_default
      }
    }
  }
`

export {GET_POKEMONS, GET_POKEMON}