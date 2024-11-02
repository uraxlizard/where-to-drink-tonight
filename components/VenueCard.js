// components/VenueCard.js

const VenueCard = ({ venue }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4">
        {venue.photo && (
          <img
            className="w-full h-48 object-cover"
            src={venue.photo}
            alt={venue.name}
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-500">{venue.name}</h2>
          <p className="text-gray-500">{venue.address}</p>
          <p className="text-gray-700">Какво казват хората: {venue.rating} ({venue.user_ratings_total} ревюта)</p>
          {venue.priceLevel && (
            <p className="text-green-600">
              Парички: {'$'.repeat(venue.priceLevel)}
            </p>
          )}
          {venue.opening_hours?.open_now && (
            <p className="text-green-500">Отворен в момента</p>
          )}
          {!venue.opening_hours?.open_now && (
            <p className="text-red-500">Затворен</p>
          )}
        </div>
      </div>
    );
  };
  
  export default VenueCard;
  