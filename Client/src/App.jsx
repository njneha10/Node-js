import React, { useEffect, useState } from "react";

function App() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const productData = async () => {
      try {
        const response = await fetch(`http://localhost:7000/getAllProduct`);
        const json = await response.json();
        console.log(json);
        setProductData(json);
      } catch (error) {
        console.log("error to fetch data", error);
      }
    };
    productData();
  }, []);

  return (
    <>
     
        <div className="row">
          {productData.map((data) => (
            <div className="col-3 mb-4">
              <div className="card" style={{ width: "18rem" }} key={data.id}>
                <img src={data.productImg} className="card-img-top " alt="..." style={{height:"300px"}} />
                <div className="card-body">
                  <h5 className="card-title">Title : {data.name}</h5>
                  <p className="card-text">{data.description}</p>
                  <div className="d-flex">
                  <h5>Price : </h5>
                  <h5 style={{textDecoration:"line-through" }}> {data.old_price}</h5>
                  <h5 className="mx-3">{data.new_price}</h5>
                  </div>
                  <p className="card-text">Category : {data.category}</p>
                  <p className="card-text">Sub-Category : {data.sub_category}</p>
                  <p className="card-text">Rating : {data.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      
    </>
  );
}

export default App;
