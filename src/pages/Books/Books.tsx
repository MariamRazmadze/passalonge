import "../../api/server";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: string;
  description: string;
  imageUrl: string;
  type: string;
};
export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.books));
  }, []);

  const displayedBooks = typeFilter
    ? books.filter((book) => book.type === typeFilter)
    : books;
  const bookElements = displayedBooks.map((book) => (
    <div key={book.id} className="book-tile">
      <Link to={`/books/${book.id}`}>
        <img src={book.imageUrl} />
        <div className="book-info">
          <h3>{book.title}</h3>
          <p>₾{book.price}</p>
        </div>
        <i className={`book-type ${book.type} selected`}>{book.type}</i>
      </Link>
    </div>
  ));
  return (
    <div className="book-list-container">
      <h1>Explore our Book options</h1>
      <div className="van-list-filter-buttons">
        <Link to="?type=buy" className="book-type buy">
          Buy
        </Link>
        <Link to="?type=borrow" className="book-type borrow">
          Borrow
        </Link>
        <Link to="?type=gift" className="book-type gift">
          Gift
        </Link>
        <Link to="." className="book-type clear-filters">
          Clear Filters
        </Link>
      </div>
      <div className="book-list">{bookElements}</div>
    </div>
  );
}
