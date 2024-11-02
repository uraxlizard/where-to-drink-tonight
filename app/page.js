"use client";
import { useState, useEffect } from "react";
import { fetchVenues } from "../lib/fetchVenues";
import TabList from "../components/TabList";
import VenueCard from "../components/VenueCard";

export default function Page() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("За хапване");

  const categories = ["За хапване", "За пииване", "Повечето ходят", "Нови"];

  useEffect(() => {
    const fetchData = async (latitude, longitude) => {
      const venueData = await fetchVenues(latitude, longitude);
      console.log(venueData); // Log the fetched venues for debugging
      setVenues(venueData);
      setLoading(false);
    };

    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchData(latitude, longitude); // Fetch venues using the retrieved coordinates
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false); // Stop loading if there's an error
      }
    );
  }, []);

  const handleTabChange = (category) => {
    setSelectedCategory(category);
    // If additional logic for tab change is needed, implement it here
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-10 text-white flex flex-col items-center">
      <header className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl px-6 py-4 text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Къде ми се ходи тази вечер?</h1>
        <p className="text-lg">Изберете град и открийте най-добрите места за забавление!</p>
      </header>

      <TabList
        categories={categories}
        onTabChange={handleTabChange}
        selectedCategory={selectedCategory}
      />

      <div className="w-full max-w-md">
        {loading ? (
          <p>Зареждане на заведенията...</p>
        ) : (
          venues.length > 0 ? (
            venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
          ) : (
            <p>Няма намерени заведения.</p> // Handle case when no venues are found
          )
        )}
      </div>
    </div>
  );
}
