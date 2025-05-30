
import React from 'react';
import { MapPin, Smartphone } from 'lucide-react';

interface LocationPermissionProps {
  onRequestPermission: () => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onRequestPermission }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Smartphone className="w-16 h-16 text-blue-600" />
            <MapPin className="w-8 h-8 text-red-500 absolute -top-2 -right-2" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Location Access Required
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          To find the best hotels near you, we need access to your location. 
          This helps us show you relevant results and accurate distances.
        </p>
        
        <div className="space-y-3 mb-8">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span>Find hotels within your area</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span>Show accurate distances</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span>Personalized recommendations</span>
          </div>
        </div>
        
        <button
          onClick={onRequestPermission}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          Enable Location Access
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
          Your location data is only used to find nearby hotels and is not stored or shared.
        </p>
      </div>
    </div>
  );
};

export default LocationPermission;
