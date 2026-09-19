import { useHostBook } from "./HostBookDetail";

export default function HostBookPhotos() {
  const { currentBook } = useHostBook();
  return <img src={currentBook.imageUrl} className="host-book-detail-image" />;
}
