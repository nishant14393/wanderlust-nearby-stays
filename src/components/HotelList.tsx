
import React from 'react';
import { Hotel } from '../types/Hotel';
import HotelCard from './HotelCard';

interface HotelListProps {
  hotels: Hotel[];
  userLocation: { lat: number; lng: number } | null;
}

const HotelList: React.FC<HotelListProps> = ({ hotels, userLocation }) => {
  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No hotels found</div>
        <div className="text-gray-400">Try adjusting your search criteria</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;
