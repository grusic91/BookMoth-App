const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLInt
 } = graphql;


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        description: { type: GraphQLString},
        authors: {
          type: new GraphQLList(AuthorType),
          resolve(parent, args){
            return Author.filter(author => parent.authorId === author.id);
          }
        }        
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        born: { type: GraphQLInt },
        death: { type: GraphQLInt },
        book: {
          type: new GraphQLList(BookType),
          resolve(parent, args){
            return Book.find({authorId: parent.id})
          }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from DB
                return Book.findById(args.id);
            }        
        },
        author: {
          type: AuthorType,
          args: {id: {type: GraphQLID}},
          resolve(parent, args){
              // code to get data from DB
              return Author.findById(args.id);
          }
        },
        books: {
          type: new GraphQLList(BookType),
          resolve(parent, args){
            return Book.find({});
          }
        },
        authors: {
          type: new GraphQLList(AuthorType),
          resolve(parent, args){
            return Author.findById({})
          }
        }
    }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        born: { type: GraphQLInt },
        death: { type: GraphQLInt },
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          born: args.born,
          death: args.death
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        description: { type: GraphQLString},
        authorId: { type: GraphQLID}

      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          description: args.description,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})