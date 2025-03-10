import { useState, useEffect } from "react";
import { CDN_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const {resId} = useParams();
 
  
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    // const response = await fetch(
    //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.681639921297&lng=76.73262100992038&restaurantId=743869&catalog_qa=undefined&submitAction=ENTER"
    // );
    const response = await fetch(
      `${MENU_API}${resId}`
    );
    const jsonData = await response.json();
    console.log(
      "Cards[4]:",
      jsonData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
        .itemCards[0]
    );
    setMenuItems(
      jsonData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
        .itemCards
    );
    const restaurantInfo = jsonData.data.cards[2].card.card.info;

    const menu = {
      name: restaurantInfo.name,
      id: restaurantInfo.id,
      costForTwoMessage: restaurantInfo.costForTwoMessage,
      locality: restaurantInfo.locality,
      cloudinaryImageId: restaurantInfo.cloudinaryImageId,
      slugString: restaurantInfo.slugString,
    };
    setRestaurant(menu);
    
  };

  return (
    <div className="restaurant-menu">
      <>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.locality}</p>
        <p>{restaurant.costForTwoMessage}</p>

        <img
          src={CDN_URL + restaurant.cloudinaryImageId}
         
          alt="Restaurant"
        />
        <h2>Menu</h2>
        {menuItems.map((menuItem) => {
             let image = menuItem.card.info.imageId
             
          return (
           
            <div key={menuItem.card.info.id}>
              <h3>{menuItem.card.info.name}</h3>
              <p>{menuItem.card.info.category}</p>
              <p>{menuItem.card.info.price / 100}</p>
              <p>{menuItem.card.info.description}</p>
              {/* <img
                src={menuItem.card.info.imageId}
                alt={menuItem.card.info.name}
              /> */}
              <img src={CDN_URL+image} alt={menuItem.card.info.name} />
              
            </div>
          );
        })}
      </>
    </div>
  );
};

export default RestaurantMenu;
