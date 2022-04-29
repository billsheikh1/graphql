const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { 
    buildSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema
 } = require('graphql'); 
 const { movies, directors } = require('./data.json');
 const cors = require('cors');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    description: 'This represents a movie',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        releaseYear: { type: new GraphQLNonNull(GraphQLInt) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLInt) },
        directors: {
            type: DirectorType,
            resolve: (movie: typeof MovieType) => {
                return directors.find((director: typeof DirectorType) => director.id === movie.directorId);
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    description: 'This represents a director',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        citizenship: { type: new GraphQLNonNull(GraphQLString) },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (director: typeof DirectorType) => {
                return movies.find((movie: typeof MovieType) => movie.directorId === director.id)
            }
        }
    })
});

const RootType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        movie: {
            type: MovieType,
            description: 'Movie',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent: any, args: any) => movies.find((movie: typeof MovieType) => movie.id === args.id)
        },
        director: {
            type: DirectorType,
            description: 'Director',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent: any, args: any) => directors.find((director: typeof DirectorType) => director.id === args.id)
        },
        movies: {
            type: new GraphQLList(MovieType),
            description: 'List of all Movies',
            resolve: () => movies
        },
        directors: {
            type: new GraphQLList(DirectorType),
            description: 'List of all Directors',
            resolve: () => directors
        }
    })
});

const schema = new GraphQLSchema({
    query: RootType
});


const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, console.log('Listening on port 4000'));