
export interface Hotel {
  id: string;
  name: string;
  address: string;
  rating: number;
  price: number;
  image: string;
  amenities: string[];
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  reviewCount: number;
}
