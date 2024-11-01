"use client";

import { useState } from "react";
import { cities, venues } from "../data";
import { motion } from "framer-motion";

export default function Page() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedVenues, setSelectedVenues] = useState([]);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedVenues(venues[city] || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-10 text-white flex flex-col items-center">
      <header className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl px-6 py-4 text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Къде да пия тази вечер?</h1>
        <p className="text-lg">Изберете град и открийте най-добрите места за забавление.</p>
      </header>

      <select
        onChange={handleCityChange}
        className="w-full max-w-md p-3 mb-6 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300"
        value={selectedCity}
      >
      <option value="" disabled>Изберете град</option>
      {cities.map((city) => (
        <option key={city} value={city}>{city}</option>
      ))}
      </select>

      {selectedVenues.length > 0 && (
        <motion.div
          key={selectedCity}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Топ заведения във {selectedCity}:</h2>
          {selectedVenues.map((venue, index) => (
            <motion.div
              key={index}
              className="p-5 bg-white rounded-lg shadow-lg text-black"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold">{venue.name}</h3>
              <p>{venue.description}</p>
              <span className="text-sm font-semibold">Рейтинг: {venue.rating} ⭐</span>
            </motion.div>
          ))}
        </motion.div>
      )}
      
  	<footer className="mt-10 text-center text-sm text-gray-200">
      <p>Създадено за забавление в нощния живот на България 🎉</p>
      <p>Следвайте ни в социалните мрежи: <a href="#" className="underline">Facebook</a> | <a href="#" className="underline">Instagram</a></p>
    </footer>

    </div>
  );
}
