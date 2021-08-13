import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from './contexts/MyPokemonContext';
// import { offsetLimitPagination } from "@apollo/client/utilities";

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         pokemons: {
//           keyArgs: false,
//           read(existing, { args: { offset, limit }}) {
//             console.log(existing)
//             // A read function should always return undefined if existing is
//             // undefined. Returning undefined signals that the field is
//             // missing from the cache, which instructs Apollo Client to
//             // fetch its value from your GraphQL server.
//             return existing && existing.slice(offset, offset + limit);
//           },
//           merge(existing, incoming, { args: { offset = 0 }}) {
//             console.log(existing)
//             console.log(incoming)
//             // Slicing is necessary because the existing data is
//             // immutable, and frozen in development.
//             const merged = existing ? existing.slice(0) : [];
//             for (let i = 0; i < incoming.results.length; ++i) {
//               merged[offset + i] = incoming.results[i];
//             }
//             console.log(merged)
//             return merged;
//           }
//         }
//       },
//     },
//   },
// })

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: cache
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
