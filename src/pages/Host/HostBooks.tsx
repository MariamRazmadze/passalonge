import { useEffect, useState } from "react";
import { Link } from "react-router";

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: string;
  description: string;
  imageUrl: string;
  type: string;
  hostId: string;
};

export default function Hostbooks() {
  const [books, setbooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/host/books")
      .then((res) => res.json())
      .then((data) => setbooks(data.books));
  }, []);

  const hostbooksEls = books.map((book) => (
    <Link
      to={`/host/books/${book.id}`}
      key={book.id}
      className="host-book-link-wrapper"
    >
      <div className="host-book-single" key={book.id}>
        <img src={book.imageUrl} alt={`Photo of ${book.title}`} />
        <div className="host-book-info">
          <h3>{book.title}</h3>
          <p>{book.price}₾</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section>
      <h1 className="host-books-title">Your listed books</h1>
      <div className="host-books-list">
        {books.length > 0 ? (
          <section>{hostbooksEls}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}
