import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router";
import type { Book } from "../Books/Books";
import { getHostBook } from "../../api";

type ContextType = { currentBook: Book };

export function useHostBook() {
  return useOutletContext<ContextType>();
}

export default function HostBookDetail() {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  useEffect(() => {
    async function fetchHostBook() {
      setLoading(true);
      try {
        const data = await getHostBook(id);
        setCurrentBook(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchHostBook();
  }, [id]);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1>Error, {error.message}</h1>;
  }
  if (!currentBook) {
    return <h1>Book not found</h1>;
  }
  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all books</span>
      </Link>

      <div className="host-book-detail-layout-container">
        <div className="host-book-detail">
          <img src={currentBook.imageUrl} />
          <div className="host-book-detail-info-text">
            <i className={`book-type book-type-${currentBook.type}`}>
              {currentBook.type}
            </i>
            <h3>{currentBook.title}</h3>
            <h4>${currentBook.price}</h4>
          </div>
        </div>
        <nav className="host-book-detail-nav">
          <NavLink
            to="."
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
            end
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentBook } satisfies ContextType} />
      </div>
    </section>
  );
}
