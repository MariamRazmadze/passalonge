import "../../api/server";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getBooks } from "../../api";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  const displayedBooks = typeFilter
    ? books.filter((book) => book.type === typeFilter)
    : books;
  const bookElements = displayedBooks.map((book) => (
    <div key={book.id} className="book-tile">
      <Link
        to={book.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img src={book.imageUrl} />
        <div className="book-info">
          <h3>{book.title}</h3>
          <p>₾{book.price}</p>
        </div>
        <i className={`book-type ${book.type} selected`}>{book.type}</i>
      </Link>
    </div>
  ));

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error... {error.message}</h1>;
  }
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
