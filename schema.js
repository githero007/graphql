export const typeDefs = `#graphql
  type Game{
   id : ID!
   title:String!
   platform : [String!]!
   reviews : [Review!]
  }
  type Review{
   id : ID!
   rating:String!
   content:String!
   game : Game!
   author : Author!
  }
   type Author
   {
    id:ID!
    name:String!
    verified:Boolean!
    reviews:[Review!]
    }

  type Query {
  games:[Game]
  game(id:ID!):Game
  review (id:ID!) : Review
  reviews:[Review]
  author(id:ID!):Author
  authors: [Author]
},
type Mutation {
  deletegame(id: ID!) :[Game]
}
`
//user can only jump upto the array being returned from the query type