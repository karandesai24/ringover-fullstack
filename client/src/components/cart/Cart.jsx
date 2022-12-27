import "./cart.scss";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "react-spinner-material";
import bag from "../../static/assets/bag.png";
import cancel from "../../static/assets/cancel.png";
import pin from "../../static/assets/pin.png";
import calendar from "../../static/assets/calendar.png";
const Cart = forwardRef((props, ref) => {
  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/cart`,
        {
          withCredentials: true,
        }
      );
      setCartItems(res.data.products || []);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  useImperativeHandle(ref, () => ({ fetchCartItems }));

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/products/cart`,

        { data: { id }, withCredentials: true }
      );
      toast.success(res.data.message);
      fetchCartItems();
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const handleOrder = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/orders/checkout`,
        {
          withCredentials: true,
        }
      );
      fetchCartItems();
      toast.success(res.data.message);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="cart">
        <div className="wrapper wrapper-loader">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="wrapper">
        <div className="top">
          <h2>Cart</h2>
          <img src={bag} alt="bag" />
        </div>
        <div className="center">
          {!!cartItems.length &&
            cartItems.map((item) => (
              <div className="cartItem" key={item.product_id}>
                <div className="imgWrapper">
                  <img src={item.images[1]} alt={item.name} />{" "}
                  <img
                    onClick={() => handleRemove(item.product_id)}
                    src={cancel}
                    alt="cancel"
                  />
                </div>
                <div className="right">
                  <h3>{item.name}</h3>
                  <span>{item.seller_name}</span>

                  <h3>{item.price}</h3>
                </div>
              </div>
            ))}
          {!cartItems.length && <span>What's stopping you, designer?</span>}
        </div>
        <div className="bottom">
          <div className="details">
            <div className="info">
              <img src={pin} alt="pin" />
              <span>Home</span>
            </div>
            <div className="info">
              <img src={calendar} alt="calendar" />
              <span>Select date</span>
            </div>
          </div>
          <button disabled={!cartItems.length} onClick={handleOrder}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
});

export default Cart;
