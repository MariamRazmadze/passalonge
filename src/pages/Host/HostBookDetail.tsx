import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router";
import type { Book } from "../Books/Books";

export default function HostBookDetail() {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const { id } = useParams();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  useEffect(() => {
    fetch(`/api/host/books/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentBook(data.books[0] ?? null));
  }, [id]);
  if (!currentBook) {
    return <h1>Loading...</h1>;
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
        <Outlet />
      </div>
    </section>
  );
}
