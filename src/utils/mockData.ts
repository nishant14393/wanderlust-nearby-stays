
import { Hotel } from '../types/Hotel';

const hotelNames = [
  'Grand Palace Hotel',
  'City Center Inn',
  'Sunset Resort',
  'Royal Gardens Hotel',
  'Modern Suites',
  'Harbor View Lodge',
  'Downtown Plaza',
  'Comfort Inn & Suites',
  'Luxury Tower Hotel',
  'Boutique Retreat'
];

const amenities = [
  'Free WiFi',
  'Pool',
  'Gym',
  'Spa',
  'Restaurant',
  'Bar',
  'Room Service',
  'Parking',
  'Pet Friendly',
  'Business Center',
  'Concierge',
  'Laundry'
];

const images = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
];

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Radius of the Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
}

export function generateMockHotels(userLocation: { lat: number; lng: number }): Hotel[] {
  const hotels: Hotel[] = [];
  
  for (let i = 0; i < 10; i++) {
    // Generate random coordinates within ~5 miles of user location
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    
    const hotelLocation = {
      lat: userLocation.lat + latOffset,
      lng: userLocation.lng + lngOffset
    };
    
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      hotelLocation.lat,
      hotelLocation.lng
    );
    
    const hotel: Hotel = {
      id: `hotel-${i + 1}`,
      name: hotelNames[i % hotelNames.length],
      address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State`,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
      price: Math.floor(Math.random() * 300) + 80, // $80 to $380
      image: images[i % images.length],
      amenities: amenities.slice(0, Math.floor(Math.random() * 6) + 3),
      distance,
      coordinates: hotelLocation,
      description: `Experience comfort and luxury at ${hotelNames[i % hotelNames.length]}. Perfect for business travelers and vacationers alike.`,
      reviewCount: Math.floor(Math.random() * 500) + 50
    };
    
    hotels.push(hotel);
  }
  
  return hotels.sort((a, b) => a.distance - b.distance);
}
