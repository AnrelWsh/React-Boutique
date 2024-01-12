import {useGetProductsQuery} from '../Services/API';
import { Link } from 'react-router-dom';
import { useCart } from '../Provider/CartContext';

export default function () {

    let {data, isFetching} = useGetProductsQuery();

    let { cart, addToCart} = useCart();

    return <h1>Home

        {
            isFetching ? <p>ça fetch</p> : <div>
                <br />
                Products Count : {data.length}
                Cart count : {cart.length}
                <Link to={`/cart`}>Go cart</Link>
                <ProductsList />
            </div>
        }

        <button onClick={()=> {
            //createProduct({title: 'Hello', content: 'My Content'})
            addToCart("huj")
        }}>Créer un product</button>

    </h1>
}


function ProductsList() {
  let { data, isFetching } = useGetProductsQuery();
  let { cart, addToCart} = useCart();

  return (
    <div>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((product) => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <p>{product.title} - {product.price} €</p>
              </Link>
            <button onClick={()=> {addToCart(product.title)}}> Ajouter un product </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


