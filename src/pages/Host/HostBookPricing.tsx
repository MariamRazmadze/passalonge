import { useHostBook } from "./HostBookDetail";

export default function HostBookPricing() {
  const { currentBook } = useHostBook();
  return <h3 className="host-book-price">{currentBook.price}₾</h3>;
}
