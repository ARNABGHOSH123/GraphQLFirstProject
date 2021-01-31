import {gql} from '@apollo/client'

const getAuthorsQuery = gql`
  query GetAuthors{
    authors{
      id
      name
    }
  }
`;

const getBookListQuery = gql`
  query GetBooks{
    books{
      id
      name
    }
  }
`;

const getBookDetailsQuery = gql`
  query GetBookDetails($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`;

const addBookMutation = gql`
  mutation AddBook($name: String!,$genre: String!,$authorId: ID!){
    addBook(name: $name,genre: $genre,authorId: $authorId){
      name
      id
    }
  }
`;

export {getAuthorsQuery,getBookListQuery,addBookMutation,getBookDetailsQuery};
