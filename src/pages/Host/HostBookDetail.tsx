import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Book } from "../Books/Books";

export default function HostBookDetail() {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/host/books/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentBook(data.books[0] ?? null));
  }, [id]);
  if (!currentBook) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <img src={currentBook.imageUrl} width={150} />
      <h2>{currentBook.title}</h2>
      <p>{currentBook.price}</p>
      <p>{currentBook.type}</p>
    </div>
  );
}
