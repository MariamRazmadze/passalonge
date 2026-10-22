async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export async function getBooks() {
  const data = await fetchJson(`/api/books`);
  return data.books;
}
export async function getBook(id: string | undefined) {
  const data = await fetchJson(`/api/books/${id}`);
  return data.book;
}

export async function getHostBooks() {
  const data = await fetchJson(`/api/host/books`);
  return data.books;
}

export async function getHostBook(id: string | undefined) {
  const data = await fetchJson(`/api/host/books/${id}`);
  return data.books[0];
}
