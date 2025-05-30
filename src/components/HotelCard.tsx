
import React from 'react';
import { Hotel } from '../types/Hotel';
import { Star, MapPin, Wifi, Car, Coffee } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
        return <Wifi className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'restaurant':
        return <Coffee className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
          ${hotel.price}/night
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 flex-1">{hotel.name}</h3>
          <div className="flex items-center ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700 ml-1">{hotel.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({hotel.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{hotel.distance} mi away</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hotel.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs"
            >
              {getAmenityIcon(amenity)}
              <span className="ml-1">{amenity}</span>
            </div>
          ))}
          {hotel.amenities.length > 3 && (
            <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              +{hotel.amenities.length - 3} more
            </div>
          )}
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
