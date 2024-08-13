import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';
const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        reviews() {
            return db.reviews;
        },
        review(parent, args) {
            return db.reviews.find((review) => review.id == args.id);
        },
        authors() {
            return db.authors;
        },
        game(parent, args) {
            return db.games.find((games) => games.id === args.id)
        },
        author(parent, args) {
            return db.authors.find((author) => author.id == args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((a) => a.game_id == parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id == parent.author_id)
        },
        game(parent) {
            return db.games.find((a) => a.id == parent.game_id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((a) => a.author_id == parent.id)
        }
    },
    Mutation: {
        deletegame(parent, args) {
            return db.games.filter((g) => g.id !== args.id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);