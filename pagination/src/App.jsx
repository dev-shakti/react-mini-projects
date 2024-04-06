import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function getProducts() {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMsg(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  function clickHandler(selectedPage) {
    const length = products.length / 10;

    if (selectedPage <= length && selectedPage >= 1) {
      setPage(selectedPage);
    }
  }

  if (errorMsg != null) {
    return <div className="laoding">{errorMsg}</div>;
  }

  if (loading) {
    return <div className="laoding">Loading !!! Please wait..</div>;
  }

  return (
    <>
      <div className="product-list">
        {products && products.length
          ? products.slice(page * 10 - 10, 10 * page).map((prod) => (
              <div className="product-card" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <div className="product-content">
                  <h3 className="prod-title">{prod.title}</h3>
                  <h3 className="prod-brand">{prod.brand}</h3>
                  <div className="prod-info">
                    <p className="prod-price">${prod.price}</p>
                    <p className="prod-rating">{prod.rating}</p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      {products && products.length > 0 && (
        <div className="pagiantion">
          <span onClick={() => clickHandler(page - 1)}  className={
              page >1 ? "" : "pagination_disabled"
            }>◀</span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => clickHandler(i+1)}
                className={page === i + 1 ? "pagination__selected" : ""}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => clickHandler(page + 1)}
            className={
              page < products.length / 10 ? "" : "pagination_disabled"
            }
          >
            ▶
          </span>
        </div>
      )}
    </>
  );
}

export default App;
