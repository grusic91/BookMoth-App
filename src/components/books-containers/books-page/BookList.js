import React from "react";
import { BookCard } from "./BookCard";

export const BookList = React.memo(({books}) => {
    const renderBookCards = () => books.map(book => <BookCard key={book._id} book={book} />);
    return <div className="cards">{renderBookCards()}</div>
});
