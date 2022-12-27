import "./item.scss";

import RatingComponent from "react-rating";
import fill from "../../static/assets/star-fill.png";
import empty from "../../static/assets/star-empty.png";
const Item = ({ item }) => {
  return (
    <div className="item">
      <img src={item.images[1]} alt={item.name} />
      <div>
        <h2 className="center">{item.name}</h2>
        <div className="bottom">
          <span>Rs. {item.price}/-</span>
          <div>
            <RatingComponent
              initialRating={Math.round(item.average_rating)}
              readonly
              emptySymbol={
                <img src={empty} alt="star empty" className="star" />
              }
              fullSymbol={<img src={fill} alt="star fill" className="star" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
