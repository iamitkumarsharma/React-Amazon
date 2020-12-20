import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { db } from "./Firebase";
import Order from "./Order";
function MyOrder() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);
  console.log("order", orders);
  return (
    <div>
      <h1>Your Orders</h1>
      <div>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default MyOrder;
