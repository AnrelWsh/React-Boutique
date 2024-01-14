import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetProductsQuery, useGetCommentsQuery, useCreateCommentMutation } from '../Services/API';
import Header from '../comp/Header';

function SingleProduct() {
  const { id } = useParams();
  const { data: products, isFetching } = useGetProductsQuery();
  const { data: comments, isFetching: commentsIsFetching } = useGetCommentsQuery(id);
  const [inputValue, setInputValue] = useState("");
  const [createComment] = useCreateCommentMutation();
  const [username, setUsername] = useState("");

  if (isFetching) {
    return <p>Fetching...</p>;
  }

  const foundProduct = products.find(singleProduct => singleProduct.id === id);

  const formSubmit = (event) => {
    event.preventDefault();

    console.log(`Input Value: ${inputValue}`);
    console.log(`Username: ${username}`);

    createComment({ id, username: username, comment: inputValue });

    setInputValue('');
  };

  return (
    <div>
      <Header />
      {(isFetching || commentsIsFetching) ? (
        <p>Loading...</p>
      ) : foundProduct ? (
        <div>
          <h1>{foundProduct.title}</h1>
          <p>{foundProduct.price} €</p>
          <img src={foundProduct.image} width="150px" alt='Product'/>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
          <form onSubmit={formSubmit}>
            <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder="Comment" />
            <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default SingleProduct;