import {useQuery} from '@apollo/client';
import {getBookListQuery} from '../queries/queries';
import React,{useState} from 'react';
import BookDetails from './BookDetails';

function BookList() {
  const {loading,error,data} = useQuery(getBookListQuery);
  const [selected,setSelected] = useState(null);


  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <ul id='book-list'>
        {data.books.map(book => (
          <li key={book.id} onClick={()=> setSelected(book.id)}>{book.name}</li>
        ))}
      </ul>
      <BookDetails bookId={selected}/>
    </div>
  );
}

export default BookList;
