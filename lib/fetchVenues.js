// lib/fetchVenues.js
export async function fetchVenues(lat, lng) {
    try {
      const response = await fetch(`/api/venues?lat=${lat}&lng=${lng}`);
      if (!response.ok) {
        console.error("Error fetching data from the proxy route:", response.statusText);
        return [];
      }
  
      const data = await response.json();
      return data.results.map((venue) => ({
        id: venue.place_id,
        name: venue.name,
        address: venue.vicinity,
        rating: venue.rating,
        user_ratings_total: venue.user_ratings_total, // Adding total user ratings
        priceLevel: venue.price_level || 1,
        photo: venue.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${venue.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
          : null,
        opening_hours: venue.opening_hours // Add opening hours to the returned data
      }));
    } catch (error) {
      console.log("Error in fetchVenues function:", error);
      return []; // Return an empty array if there’s an error
    }
  }
  