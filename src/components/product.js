import React from "react";
import  { useReducer, useEffect } from "react";
import Client from 'shopify-buy';
import Carousel from "react-multi-carousel";
import Button from 'react-bootstrap/Button';
import "react-multi-carousel/lib/styles.css";

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 465, min: 0 },
      items: 1
    }
  };

  const client = Client.buildClient({
    domain: 'craftgin-dev.myshopify.com',
    storefrontAccessToken: '00d042dd8f3e9b23cd2ae8ed9bb0ce63'
  });

  const initialState = {
    loading: true,
    products: [],
    errorMessage: null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_PRODUCTS_REQUEST":
        return {
          ...state,
          loading: true,
          errorMessage: null
        };
      case "SEARCH_PRODUCTS_SUCCESS":
        return {
          ...state,
          loading: false,
          products: action.payload
        };
      case "SEARCH_PRODUCTS_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      default:
        return state;
    }
  };

  const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

  const ProductItem = ({ product }) => {
    const poster = product["image"] === "" ? DEFAULT_PLACEHOLDER_IMAGE : product["image"];
    return (
      <div className="product">
            <img alt={`name: ${product.title}`} src={poster}/>
            <h4 className="productTitle">{product["title"]}</h4>
            <p className="productPrice">Your price: {product["price"]}</p>
            <Button variant="primary" className="addCart">ADD TO CART</Button>
      </div>
    );
  };

  const Products = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
      // Fetch a single collection by ID, including its products
      const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI2OTQ2OTQ4MzIxMw==';
      // Set a parameter for first x products, defaults to 20 if you don't provide a param
      useEffect(() => {
      client.collection.fetchWithProducts(collectionId, {productsFirst: 10}).then((collection) => {
        console.log("Collection products3");
        dispatch({
          type: "SEARCH_PRODUCTS_SUCCESS",
          payload: collection.products.map((product) => {
            return {"id":product.attrs["id"]["value"],"title":product.attrs["title"]["value"],"price":product.attrs["variants"][0]["attrs"]["price"]["value"],"image":product.attrs["images"][0]["attrs"]["src"]};
          })
        });
      });
      }, []);
      const { products, errorMessage, loading } = state;
    
      return (
        <div className="products">
            <div className="container">
            <h2>HOT RIGHT NOW!</h2>
              <Carousel responsive={responsive}>
                {loading && !errorMessage ? (
                  <span>loading... </span>
                  ) : errorMessage ? (
                  <div className="errorMessage">{errorMessage}</div>
                  ) : (
                  products.map((product, index) => (
                    <ProductItem key={`${index}-${product.id}`} product={product} />
                  ))
                )}
              </Carousel>
            </div>
      </div>
    );
  };


  export default Products;  