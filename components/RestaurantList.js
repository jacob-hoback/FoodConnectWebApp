"use client"

import RestaurantCard from '@/components/cards/RestaurantCard';
import { fetchAllRestaurants } from '@/lib/actions/restaurant.actions'; // Adjust the path as necessary
import { useEffect, useState } from 'react';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const response = await fetchAllRestaurants();
        if (response.success) {
          setRestaurants(response.data);
        } else {
          setError('Failed to load restaurants');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    loadRestaurants();
  }, []);

  return (
    <div>
      <h2>Featured Restaurants</h2>
      {error && <p>Error: {error}</p>}
      {!error && (
        <ul>
          {restaurants.map((restaurant, index) => (/*
            <li key={index}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
              <p>{restaurant.logo}</p>
              <p>{restaurant.menu}</p>
              <p>{restaurant.hours}</p>
              <p>{restaurant.email}</p>
              <p>{restaurant.phone}</p>
              <p>{restaurant.address}</p>
            </li>
            */
            <RestaurantCard
              key={index}
              restaurant={restaurant}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantList;
