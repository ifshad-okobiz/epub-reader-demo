import React from "react";
import { ReaderPage } from "../../../components/ReaderPage";
import { useNavigate } from "react-router";

function Books() {
  const [books, setBooks] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  console.log(books);

  const handleBookClick = (book) => {
    navigate(`/books/${book._id}`, { state: book });
  };

  return (
    <div className="w-1/2 mx-auto mt-5">
      <h1 className="text-2xl font-semibold mb-5">Available Books</h1>
      <div className="grid grid-cols-3 gap-3">
        {books.map((book, i) => (
          <div key={i} className="bg-rose-100 rounded shadow-md p-4">
            <h1 className="font-medium">{book.name}</h1>
            <p className="text-opacity-70">{book.title}</p>
            <button onClick={() => handleBookClick(book)}>Read</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
