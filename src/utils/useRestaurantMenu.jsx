import {useEffect,useState} from 'react'
import { MENU_API } from './constants';
const useRestaurantMenu = (resId) => {
    const [restaurant,setRestaurant] = useState(null);
    //fetch data 
    useEffect(()=> {
        fetchData();
    },[])
    const fetchData = async () => {
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
    }
return (
    restaurant
)
}

export default useRestaurantMenu;