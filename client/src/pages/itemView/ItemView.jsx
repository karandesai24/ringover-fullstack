import "./itemView.scss";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cart from "../../components/cart/Cart";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "react-spinner-material";
import back from "../../static/assets/back.png";
import RatingComponent from "react-rating";
import check from "../../static/assets/designs/checkbox.png";
import fill from "../../static/assets/star-fill.png";
import empty from "../../static/assets/star-empty.png";
import Rating from "../../components/rating/Rating";
import option3 from "../../static/assets/designs/do3.png";

import option2 from "../../static/assets/designs/do2.png";

import option1 from "../../static/assets/designs/do1.png";
const ItemView = () => {
  const cartRef = useRef();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [designTemplate, setDesignTemplate] = useState(item?.design || {});

  const fetchItem = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/${productId}`,
        {
          withCredentials: true,
        }
      );
      setItem(res.data.product);
      setDesignTemplate(res.data.product.design);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  const handleDesignChange = (name, i) => {
    setDesignTemplate((prev) => ({
      ...prev,
      [name]: i,
    }));
  };

  const hasDesignOption = (option) => {
    return !isNaN(option);
  };

  const handleShare = (data) => {
    navigator.share(data);
  };

  const handleAddToCart = async () => {
    try {
      let userr = localStorage.getItem("user");
      const myObj = JSON.parse(userr);

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products/cart`,

        {
          id: item.product_id,
          user: myObj.userId,
        },
        { withCredentials: true }
      );
      cartRef.current.fetchCartItems();
      toast.success(res.data.message);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (!item || loading) {
    return (
      <div className="list">
        <div className="wrapper wrapper-loader">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="itemView">
      <div className="itemDetails">
        <div className="wrapper">
          <div className="top">
            <img onClick={() => navigate(-1)} src={back} alt="back" />
            <h3>Your Design Space</h3>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={item.images[activeImgIndex]}
                alt={item.name}
                className="activeImg"
              />
              <div className="preview">
                {item.images.map((image, i) => (
                  <img
                    onClick={() => setActiveImgIndex(i)}
                    src={image}
                    alt={item.name}
                    key={i}
                    className={`${
                      activeImgIndex === i ? "previewImg active" : "previewImg"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="right">
              <div className="name">
                <h2>{item.name}</h2>
                <h3>
                  {JSON.stringify(designTemplate) ===
                  JSON.stringify(item.design)
                    ? `By ${item.seller_name}`
                    : `By ${item.seller_name} and you`}
                </h3>
              </div>
              {!!item.average_rating && (
                <div className="reviews">
                  <RatingComponent
                    initialRating={Math.round(item.average_rating)}
                    readonly
                    emptySymbol={
                      <img src={empty} alt="star empty" className="star" />
                    }
                    fullSymbol={
                      <img src={fill} alt="star fill" className="star" />
                    }
                  />
                  <span>{item.rating_count} Reviews</span>
                </div>
              )}
              <div className="price">
                <h2>Rs. {item.price}/-</h2>
                <span>{item.offer}</span>
              </div>
              {!!Object.keys(item.design).length && (
                <div className="design">
                  {hasDesignOption(item.design.front) && (
                    <div className="do front">
                      <h3>Front</h3>
                      <div className="container">
                        <div onClick={() => handleDesignChange("front", 0)}>
                          {designTemplate.front === 0 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option1} alt="option one" />
                        </div>
                        <div onClick={() => handleDesignChange("front", 1)}>
                          {designTemplate.front === 1 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option2} alt="option two" />
                        </div>
                        <div onClick={() => handleDesignChange("front", 2)}>
                          {designTemplate.front === 2 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option3} alt="option three" />
                        </div>
                        <div className="do2"></div>
                        <div className="do3"></div>
                      </div>
                    </div>
                  )}
                  {hasDesignOption(item.design.middle) && (
                    <div className="do middle">
                      <h3>Middle</h3>
                      <div className="container">
                        <div onClick={() => handleDesignChange("middle", 0)}>
                          {designTemplate.middle === 0 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option1} alt="option one" />
                        </div>
                        <div onClick={() => handleDesignChange("middle", 1)}>
                          {designTemplate.middle === 1 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option2} alt="option two" />
                        </div>
                        <div onClick={() => handleDesignChange("middle", 2)}>
                          {designTemplate.middle === 2 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option3} alt="option three" />
                        </div>
                        <div className="do2"></div>
                        <div className="do3"></div>
                      </div>
                    </div>
                  )}
                  {hasDesignOption(item.design.back) && (
                    <div className="do back">
                      <h3>Back</h3>
                      <div className="container">
                        <div onClick={() => handleDesignChange("back", 0)}>
                          {designTemplate.back === 0 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option1} alt="option one" />
                        </div>
                        <div onClick={() => handleDesignChange("back", 1)}>
                          {designTemplate.back === 1 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option2} alt="option two" />
                        </div>
                        <div onClick={() => handleDesignChange("back", 2)}>
                          {designTemplate.back === 2 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option3} alt="option three" />
                        </div>
                      </div>
                    </div>
                  )}
                  {hasDesignOption(item.design.sole) && (
                    <div className="do sole">
                      <h3>Sole</h3>
                      <div className="container">
                        <div onClick={() => handleDesignChange("sole", 0)}>
                          {designTemplate.sole === 0 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option1} alt="option one" />
                        </div>
                        <div onClick={() => handleDesignChange("sole", 1)}>
                          {designTemplate.sole === 1 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img src={option2} alt="option two" />
                        </div>
                        <div onClick={() => handleDesignChange("sole", 2)}>
                          {designTemplate.sole === 2 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <img
                            src={option3}
                            alt="option three"
                            className="soleWhite"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {hasDesignOption(item.design.size) && (
                    <div className="do size">
                      <h3>Size</h3>
                      <div className="container">
                        <div onClick={() => handleDesignChange("size", 0)}>
                          {designTemplate.size === 0 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <span className="sizeField">7</span>
                        </div>
                        <div onClick={() => handleDesignChange("size", 1)}>
                          {designTemplate.size === 1 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <span className="sizeField">8</span>
                        </div>
                        <div onClick={() => handleDesignChange("size", 2)}>
                          {designTemplate.size === 2 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <span className="sizeField">9</span>
                        </div>
                        <div onClick={() => handleDesignChange("size", 3)}>
                          {designTemplate.size === 3 && (
                            <img
                              src={check}
                              alt="checkbox"
                              className="checkbox"
                            />
                          )}
                          <span className="sizeField">10</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Rating id={productId} />
          <div className="actions">
            <button
              onClick={() =>
                handleShare({
                  url: window.location.href,
                  text: item.name,
                  title: `Ringover - ${item.name}`,
                })
              }
            >
              Share Design
            </button>
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      </div>
      <Cart ref={cartRef} />
    </div>
  );
};

export default ItemView;
