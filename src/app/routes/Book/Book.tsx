import React from "react";
import { useLocation, useParams } from "react-router";

function Book() {
  const { state } = useLocation();
  const { id } = useParams();

  const book = state?.book;

  if (!book) {
    return <p>Book data not found. Please go back and select a book.</p>;
  }

  return (
    <div>
      <h1>Reading: {book.name}</h1>
      <p>Title: {book.title}</p>
      <p>ID: {id}</p>
    </div>
  );
}

export default Book;
