import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from './contexts/MyPokemonContext';

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
