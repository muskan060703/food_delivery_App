import { useEffect, useState } from "react";
import { MENU_API } from "./constants";
const useRestaurantMenu = (resId) => {
  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(`${MENU_API}${resId}`);
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
    const categories =  jsonData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(c=>c.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
 )
    const restaurantInfo = jsonData.data.cards[2].card.card.info;
    console.log("Categories : ",categories);
    
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
  return [menuItems, restaurant];
};

export default useRestaurantMenu;
