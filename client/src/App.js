import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import client from './apolloClient';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Home />
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;
