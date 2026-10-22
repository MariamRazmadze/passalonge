import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router";
import type { Book } from "./Books";
import { getBook } from "../../api";

export default function BookDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function loadBook() {
      setLoading(true);
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [id]);

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error, {error.message}</h1>;
  }
  return (
    <div className="book-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} books</span>
      </Link>
      {book ? (
        <div className="book-detail">
          <img src={book.imageUrl} />
          <i className={`book-type ${book.type} selected`}>{book.type}</i>
          <h2>{book.title}</h2>
          <p className="book-price">${book.price}</p>
          <p>{book.description}</p>
          <button className="link-button">Get this book</button>
        </div>
      ) : (
        <h2>Book not found</h2>
      )}
    </div>
  );
}
