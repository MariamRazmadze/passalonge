import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router";
import type { Book } from "./Books";

export default function BookDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data.book));
  }, [id]);

  const search = location.state?.search || "";
  const type = location.state?.type || "all";
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
        <h2>Loading...</h2>
      )}
    </div>
  );
}
