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

//higher order component 
//it will take the RestaurantCard as an input and gives me the labeled RestaurantCard 
//enhanced restaurant card 
// input -> restaurant card ==> output ==> restaurant card promoted 


 export const withPromotedLabel = (RestaurantCard) => {
return (props) => {
  return (
    <div>
      <label>Promoted</label>
      <RestaurantCard {...props} />
    </div>
  )
}
}

export default RestaurantCard;
