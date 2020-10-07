import React from "react";
import { BookCard } from "./BookCard";

export function BookList ({books}) {
    const renderBookCards = () => books.map(book => <BookCard key={book._id} book={book} />);
    return <div className="cards">{renderBookCards()}</div>
}
