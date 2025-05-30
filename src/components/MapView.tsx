
import React from 'react';
import { Hotel } from '../types/Hotel';
import { MapPin, Star } from 'lucide-react';

interface MapViewProps {
  hotels: Hotel[];
  userLocation: { lat: number; lng: number } | null;
  onHotelSelect: (hotel: Hotel) => void;
}

const MapView: React.FC<MapViewProps> = ({ hotels, userLocation, onHotelSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 relative">
        {/* Simplified map representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Interactive Map View</p>
            <p className="text-sm text-gray-500">Hotels near your location</p>
          </div>
        </div>
        
        {/* Hotel markers */}
        <div className="absolute inset-0 p-4">
          {hotels.slice(0, 5).map((hotel, index) => (
            <div
              key={hotel.id}
              className="absolute bg-white rounded-lg shadow-md p-2 cursor-pointer hover:shadow-lg transition-shadow"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`,
              }}
              onClick={() => onHotelSelect(hotel)}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{hotel.name}</p>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{hotel.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600 text-center">
          Tap on hotel markers to view details
        </p>
      </div>
    </div>
  );
};

export default MapView;
