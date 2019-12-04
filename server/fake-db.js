const Book = require("./models/book");
const User = require("./models/user");
const fakeDbData = require("./data.json");

class FakeDb {
  constructor() {
    //fake books
    this.books = fakeDbData.books;
    //fake users
    this.users = fakeDbData.users;
  }

  async cleanDB() {
    await User.remove({})
    await Book.remove({})
  }

  pushDataToDb() {
    const user = new User(this.users[0]);

    this.books.forEach((book) => {
      const newBook = new Book(book);
      newBook.users = user;

      user.books.push(newBook);
      newBook.save();
    });

    user.save();
  }

  async seedDb() {
    await this.cleanDB();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;
