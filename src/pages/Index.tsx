
import React, { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import HotelList from '../components/HotelList';
import SearchBar from '../components/SearchBar';
import MapView from '../components/MapView';
import LocationPermission from '../components/LocationPermission';
import { Hotel } from '../types/Hotel';
import { generateMockHotels } from '../utils/mockData';

const Index = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const permission = await Geolocation.checkPermissions();
      if (permission.location === 'granted') {
        setHasLocationPermission(true);
        getCurrentLocation();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
      setLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const permission = await Geolocation.requestPermissions();
      if (permission.location === 'granted') {
        setHasLocationPermission(true);
        getCurrentLocation();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setUserLocation(location);
      
      // Generate mock hotels near the user's location
      const nearbyHotels = generateMockHotels(location);
      setHotels(nearbyHotels);
      setLoading(false);
    } catch (error) {
      console.error('Error getting location:', error);
      // Fallback to default location (New York City)
      const defaultLocation = { lat: 40.7128, lng: -74.0060 };
      setUserLocation(defaultLocation);
      const nearbyHotels = generateMockHotels(defaultLocation);
      setHotels(nearbyHotels);
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!hasLocationPermission) {
    return <LocationPermission onRequestPermission={requestLocationPermission} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hotel Finder</h1>
          <p className="text-gray-600">Find the best hotels near you</p>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleMap={() => setShowMap(!showMap)}
          showMap={showMap}
        />

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Map or Hotel List */}
            {showMap ? (
              <MapView
                hotels={filteredHotels}
                userLocation={userLocation}
                onHotelSelect={(hotel) => {
                  console.log('Selected hotel:', hotel);
                  setShowMap(false);
                }}
              />
            ) : (
              <HotelList hotels={filteredHotels} userLocation={userLocation} />
            )}

            {/* Results count */}
            <div className="text-center mt-4 text-gray-600">
              {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
