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

  /**
   * 2. On just the 3 filter buttons (not the Clear filter button),
   *    conditionally render the className "selected" if the
   *    typeFilter value equals the value that button sets it to.
   *    (We don't have a variable for that, so it'll be a hard-coded
   *    string).
   *
   *    Hint: `...${typeFilter === "simple" ? ...}`
   */

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
        <button
          className={`book-type buy ${typeFilter === "buy" ? "selected" : ""}`}
          onClick={() => setSearchParams({ type: "buy" })}
        >
          Buy
        </button>
        <button
          className={`book-type borrow ${typeFilter === "borrow" ? "selected" : ""}`}
          onClick={() => setSearchParams({ type: "borrow" })}
        >
          Borrow
        </button>
        <button
          className={`book-type gift ${typeFilter === "gift" ? "selected" : ""}`}
          onClick={() => setSearchParams({ type: "gift" })}
        >
          Gift
        </button>
        {typeFilter ? (
          <button
            className="book-type clear-filters"
            onClick={() => setSearchParams({})}
          >
            Clear Filters
          </button>
        ) : null}
      </div>
      <div className="book-list">{bookElements}</div>
    </div>
  );
}
