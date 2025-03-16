import { CDN_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const [menuItems, restaurant] = useRestaurantMenu(resId);

  return (
    <div className="restaurant-menu">
      <>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.locality}</p>
        <p>{restaurant.costForTwoMessage}</p>

        <img src={CDN_URL + restaurant.cloudinaryImageId} alt="Restaurant" />
        <h2>Menu</h2>
        {menuItems.map((menuItem) => {
          let image = menuItem.card.info.imageId;

          return (
            <div key={menuItem.card.info.id}>
              <h3>{menuItem.card.info.name}</h3>
              <p>{menuItem.card.info.category}</p>
              <p>{menuItem.card.info.price / 100}</p>
              <p>{menuItem.card.info.description}</p>
              <img src={CDN_URL + image} alt={menuItem.card.info.name} />
            </div>
          );
        })}
      </>
    </div>
  );
};

export default RestaurantMenu;
