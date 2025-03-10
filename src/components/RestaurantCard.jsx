import { CDN_URL } from "../utils/constants";
const RestaurantCard = ({
  name,
  cloudinaryImageId,
  rating,
  cuisine,
  deliveryTime,
}) => {
  return (
    <div className="restaurant-card">
      <img
        src={CDN_URL + cloudinaryImageId}
        className="res-logo"
        alt="Restaurant"
      />
      <h3>{name}</h3>
      <p>{cuisine.join(",")}</p>
      <p>{rating} stars</p>
      <p>{deliveryTime} minutes</p>
    </div>
  );
};

export default RestaurantCard;
