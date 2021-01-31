import {useQuery,useMutation} from '@apollo/client';
import React,{useState} from 'react';
import {getAuthorsQuery,addBookMutation,getBookListQuery} from '../queries/queries';

function DisplayAuthors() {
  const {loading,error,data} = useQuery(getAuthorsQuery);

  if(loading){
    return (
      <option disabled>Loading Authors..</option>
    );
  }
  if(error){
    return (
      <option disabled>Error..</option>
    );
  }

  return data.authors.map(author=>(
    <option key={author.id} value={author.id}>{author.name}</option>
  ));
}

function AddBook() {
  const [bookState,setBookState] = useState({name: '',genre: '',authorId: ''});
  const [addBook, {data}] = useMutation(addBookMutation);

  const submitForm = (e) => {
    e.preventDefault();
    addBook({variables: {name: bookState.name,genre: bookState.genre,authorId: bookState.authorId},
            refetchQueries: [{query: getBookListQuery}]});
  }
  const handleChangeEvent = (e,field) => {
    const newBookState = bookState;
    newBookState[field] = e.target.value;
    setBookState(newBookState);
  }
  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e)=>handleChangeEvent(e,'name')}/>
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e)=>handleChangeEvent(e,'genre')}/>
      </div>

      <div className="field">
        <label>Author</label>
        <select onChange={(e)=>handleChangeEvent(e,'authorId')}>
          <option>Select Author</option>
          {DisplayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>

  );
}

export default AddBook;
