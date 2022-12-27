import "./rating.scss";
import { useState, useContext, useEffect } from "react";
import RatingComponent from "react-rating";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth/AuthContext";

import fill from "../../static/assets/star-fill.png";
import empty from "../../static/assets/star-empty.png";
const Rating = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(null);

  const [hasRated, setHasRated] = useState({ rated: false, value: null });

  const getCurrentUser = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/users/${user.userId}`,
      {
        withCredentials: true,
      }
    );
    res.data.user.reviews.forEach((review) => {
      if (review.product === id) {
        setHasRated({ rated: true, value: review.rating });
      }
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleRating = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/reviews/${id}`,
        {
          rating,
        },
        { withCredentials: true }
      );
      setHasRated({ rated: true, value: rating });
      toast.success("Reviewed !!");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="rating">
      <span>{!hasRated.rated ? "Rate Product" : "Rated"}</span>
      <RatingComponent
        readonly={hasRated.rated}
        initialRating={hasRated.rated ? hasRated.value : rating || undefined}
        onChange={(rate) => setRating(rate)}
        emptySymbol={<img src={empty} alt="star empty" className="star" />}
        fullSymbol={<img src={fill} alt="star fill" className="star" />}
      />
      {!!rating && !hasRated.rated && (
        <div>
          <button onClick={handleRating} disabled={!rating}>
            Submit
          </button>
          <button className="reset" onClick={() => setRating(null)}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Rating;
