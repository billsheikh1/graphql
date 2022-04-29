import './App.css';
import Movies from './Movies';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
       <Movies></Movies>
      </ApolloProvider>
    </div>
  );
}

export default App;
