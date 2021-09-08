import * as React from "react";
import { useBookList } from "utils/books";

export default function BookList() {
  const { books } = useBookList('""&maxResults=2');

  return (
    <div>
      <hr />
      <h1>Discover new books!</h1>
      {books && (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book?.volumeInfo?.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
