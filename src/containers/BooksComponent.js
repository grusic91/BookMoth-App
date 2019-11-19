import React from "react";
import { BookCard } from "./BookCard";

class BooksComponent extends React.Component {
  constructor() {
    super();
    this.state= {
      books: [
        {
          title: "The Gulag Archipelago",
          author: "Alexandr Solzhenitsyn",
          language: "Englisch",
          publisher: "Harvill Press; 01 edition (30 Jan 2003)",
          category: "novel",
          pages: 496,
          description: "The Gulag Archipelago is Solzhenitsyn's masterwork, a vast canvas of camps, prisons, transit centres and secret police, of informers and spies and interrogators and also of heroism, a Stalinist anti-world at the heart of the Soviet Union where the key to survival lay not in hope but in despair.",
        },
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          language: "Englisch",
          publisher: "Houghton Mifflin Harcourt (September 18, 2012)",
          category: "novel",
          pages: 300,
          description: "A glorious account of a magnificent adventure, filled with suspense and seasoned with a quiet humor that is irresistible . . . All those, young or old, who love a fine adventurous tale, beautifully told, will take The Hobbit to their hearts",
        },
        {
          title: "Sapiens: A Brief History of Humankind ",
          author: "Yuval Noah Harari",
          language: "Englisch",
          publisher: "Harper (10 Feb 2015)",
          category: "novel",
          pages: 464,
          description: "international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be “human.",
        },
        {
          title: "Iliad ",
          author: " Homer",
          language: "Englisch",
          publisher: "Wordsworth Classics; New ed edition (September 1, 2003)",
          category: "ep",
          pages: 448,
          description: "One of the greatest stories ever told, Iliad has survived for thousands of years because of its insightful portrayal of man and its epic story of war, duty, honor, and revenge.",
        }
      ]
    }
  };

  BookCard() {
    return this.state.books.map((book, idx) => {
      return (
        <BookCard key={idx} book={book} />
      );
    });
  }
  render() {
    return (
      <div className="row">
        { this.BookCard() }
      </div>

    )
  }
}

export default BooksComponent;
