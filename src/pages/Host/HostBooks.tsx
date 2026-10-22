import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getHostBooks } from "../../api";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHostBooks() {
      setLoading(true);
      try {
        const data = await getHostBooks();
        setbooks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchHostBooks();
  }, []);

  const hostbooksEls = books.map((book) => (
    <Link to={book.id} key={book.id} className="host-book-link-wrapper">
      <div className="host-book-single" key={book.id}>
        <img src={book.imageUrl} alt={`Photo of ${book.title}`} />
        <div className="host-book-info">
          <h3>{book.title}</h3>
          <p>{book.price}₾</p>
        </div>
      </div>
    </Link>
  ));
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error {error.message}</h1>;
  }
  return (
    <section>
      <h1 className="host-books-title">Your listed books</h1>
      <div className="host-books-list">
        {books.length > 0 ? (
          <section>{hostbooksEls}</section>
        ) : (
          <h2>You have no listed books yet</h2>
        )}
      </div>
    </section>
  );
}
