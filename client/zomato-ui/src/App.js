import "./App.css";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

function MainPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10); // Initialize with default value
  const [skip, setSkip] = useState(0); // Initialize with default value

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://zomato-ordersbydssv2-1.onrender.com/api/orders/${limit}/${skip}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        console.log("data is ", data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [limit, skip]);

  return (
    <div className="container">
      <div className="headtext">
        <h3>List of Orders:</h3>
        <select
          value={limit}
          className="limitSelector"
          onChange={(e) => setLimit(parseInt(e.target.value, 10))}
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          value={skip}
          className="skipSelector"
          onChange={(e) => setSkip(parseInt(e.target.value, 10))}
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div className="productDetails">
        {loading ? (
          <div>Loading, please wait...</div>
        ) : (
          <Orderlist orders={orders} />
        )}
      </div>
    </div>
  );
}

function Orderlist({ orders }) {
  return (
    <ol className="order-list">
      {orders.map((ele) => (
        <li key={ele._id} className="order-item">
          <b>{ele.title}</b> : {ele.description}
        </li>
      ))}
    </ol>
  );
}

export default App;
