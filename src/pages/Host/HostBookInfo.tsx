import { useHostBook } from "./HostBookDetail";

export default function HostBookInfo() {
  const { currentBook } = useHostBook();

  return (
    <section className="host-book-detail-info">
      <h4>
        Title: <span>{currentBook.title}</span>
      </h4>
      <h4>
        Category: <span>{currentBook.type}</span>
      </h4>
      <h4>
        Description: <span>{currentBook.description}</span>
      </h4>
      <h4>
        Visibility: <span>Public</span>
      </h4>
    </section>
  );
}
