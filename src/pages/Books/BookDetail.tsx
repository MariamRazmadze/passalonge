import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Book } from "./Books";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data.book));
  }, [id]);

  return (
    <div className="book-detail-container">
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all books</span>
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
