import "../App.css";
import Footer from "./Footer";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const restaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const jsonData = await data.json();
      console.log("Json :", jsonData?.data?.cards[4]);

      const restaurant =
        jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      console.log("List of restaurant", restaurant);

      setListOfRestaurants(restaurant);
      setFilteredRestaurants(restaurant);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus)
    return (
      <h1>Looks like you are offline. Please check your internet connection.</h1>
    );

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="search"
            className="search-box"
            placeholder="Search for a restaurant"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setFilteredRestaurants(
                listOfRestaurants.filter((restaurant) =>
                  restaurant.info.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) // ✅ Use e.target.value directly
                )
              );
            }}
          />
          <button className="search-btn">Search</button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            console.log("Clicked");

            setFilteredRestaurants(
              listOfRestaurants.filter(
                (restaurant) => restaurant.info.avgRating > 4.1
              )
            );
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="restaurant-container">
        {filteredRestaurants.map((restaurant) => {
          const isPromoted = restaurant.info.open; // Assume 'promoted' is a property

          return (
            <Link to={`/restaurant/${restaurant.info.id}`} key={restaurant.info.id}>
              {isPromoted ? (
                <restaurantCardPromoted
                  name={restaurant.info.name}
                  cloudinaryImageId={restaurant.info.cloudinaryImageId}
                  rating={restaurant.info.avgRating}
                  cuisine={restaurant.info.cuisines}
                  deliveryTime={restaurant.info.sla.deliveryTime}
                />
              ) : (
                <RestaurantCard
                  name={restaurant.info.name}
                  cloudinaryImageId={restaurant.info.cloudinaryImageId}
                  rating={restaurant.info.avgRating}
                  cuisine={restaurant.info.cuisines}
                  deliveryTime={restaurant.info.sla.deliveryTime}
                />
              )}
            </Link>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Body;
