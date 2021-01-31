import {useQuery} from '@apollo/client';
import {getBookDetailsQuery} from '../queries/queries';

function BookDetails({bookId}) {
  const {loading,error,data} = useQuery(getBookDetailsQuery,{variables: {id: bookId}});
  if(loading){
    return(
      <div id="book-details">
        Loading...
      </div>
    )
  }
  if(error){
    return(
      <div id="book-details">
        {error.message}
      </div>
    )
  }
  const displayBookDetails = (book) => {
    if(book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(({name,id})=>(
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      );
    }else {
      return(
        <div id="book-details">
          No book selected...
        </div>
      )
    }
  }
  return (
    <div id="book-details">
      {displayBookDetails(data.book)}
    </div>
  );

}

export default BookDetails;
