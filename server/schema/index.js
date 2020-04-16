const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');

// Types
const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
} = graphql;


/**
 *  title:  { type: String,
            lowercase: true,
            required: true, max: [200, "Too long, max is 200 characters"]},
  author: { type: String,
            required: true, max: [128, "Too long, max is 128 characters"]},
  language: { type: String },
  edition: { type: String},
  publisher: { type: String },
  category: { type: String, required: true, lowercase: true},
  pages: {type: Number },
  description: { type: String, required: true},
  cratedAt: { type: Date, default: Date.now },
  image_url: {type: String, default: "https://via.placeholder.com/350x250"},
  isbn: {type: String, default: ""},
  users: [{ type: Schema.Types.ObjectId, ref: "User"}]
 */

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID},
        title: { type: GraphQLString},
        genre: { type: GraphQLString},
        category: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
            /**
             * Look into Author collection in mongoDB database and find
             * every author, that has 
             */
                return Author.findById(parent.authorId)
            }
        },
        owners: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                
                /*return users.filter((user) => {
                    // return all users, that have own this book                   
                   return parent.ownersId.includes(user.id)
                })
                */
               return User.find({});
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        born: { type: GraphQLInt},
        die: { type: GraphQLInt},
        books: {
            // list type
            type: new GraphQLList(BookType),
            resolve(parent, args) {                
                //return _.filter(books, {authorId: parent.id})   
                // look for all the books in Book collection based on certain criteria      
               return Book.find({ authorId: parent.id})
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        myBooks: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                /* get back all the books that user owns
                return books.filter(book => {
                    console.log(book.ownersId);
                    return book.ownersId.includes(parent.id);                    
                })
                */ 
            }
        }
    })
});

// Query - All querys
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
    /*get single book */
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                /* code to get data from db
                return _.find(books, {id: args.id}); // find books in books array that has id equal to args.id
                */
               return Book.findById(args.id)
            }
        },

        author: {
/*get single author */
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                /* code to get data from db
                return _.find(authors, {id: args.id})
                */
               return Author.findById(args.id)
            }
        },

        user: {
    // get single user
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                /*
                return _.find(users, {id: args.id});
                */
            }
        },
        
        books: {
    // get list of all books
            type: new GraphQLList(BookType),
            resolve(parent, args){
              return Book.find({});
            }
        },

        authors: {
    // get list of all authosr
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                /*
                return authors
                */
               return Author.find({});
            }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                /*
                return users
                */
               return User.find({})
            }
        }
        
    }
});

/**
 * MUTATIONS - ADD, UPDATE, DELETE
 * addAuthor - when someone wants to add new author to DB
 */


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // ADD AUTHOR TO DB
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString},
                born: { type: GraphQLInt },
                die: { type: GraphQLInt },
                books: { type: new GraphQLList(BookType)}
            },

            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    born: args.born,
                    die: args.die
                });
                // save it to db
                return author.save();
            }
        },

        /**
 *  title:  { type: String,
            lowercase: true,
            required: true, max: [200, "Too long, max is 200 characters"]},
  author: { type: String,
            required: true, max: [128, "Too long, max is 128 characters"]},
  language: { type: String },
  edition: { type: String},
  publisher: { type: String },
  category: { type: String, required: true, lowercase: true},
  pages: {type: Number },
  description: { type: String, required: true},
  cratedAt: { type: Date, default: Date.now },
  image_url: {type: String, default: "https://via.placeholder.com/350x250"},
  isbn: {type: String, default: ""},
  users: [{ type: Schema.Types.ObjectId, ref: "User"}]
 */


        // ADD BOOK TO DB
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLString },
                authorId: { type: GraphQLString },
                category: { type: GraphQLString },
                description: { type: GraphQLString }

            },
            resolve(parent, args) {
                let book = new Book({
                    title: args.title,
                    authorId: args.authorId,

                    category: args.category,
                    description: args.description
                })
                return book.save()
            }
        }
    }

})


// export query schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
