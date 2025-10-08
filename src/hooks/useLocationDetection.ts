import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  region: string;
  country: string;
  city?: string;
}

interface SeasonalInfo {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  month: number;
  hemisphere: 'northern' | 'southern';
}

const regionMapping = {
  // North America
  'United States': 'North America',
  'Canada': 'North America',
  'Mexico': 'North America',
  // Europe
  'Spain': 'Mediterranean',
  'Italy': 'Mediterranean',
  'France': 'Mediterranean',
  'Greece': 'Mediterranean',
  'Portugal': 'Mediterranean',
  'Turkey': 'Mediterranean',
  // Southeast Asia
  'Thailand': 'Southeast Asia',
  'Vietnam': 'Southeast Asia',
  'Malaysia': 'Southeast Asia',
  'Singapore': 'Southeast Asia',
  'Indonesia': 'Southeast Asia',
  'Philippines': 'Southeast Asia',
  'Cambodia': 'Southeast Asia',
  'Laos': 'Southeast Asia',
  'Myanmar': 'Southeast Asia',
  'Brunei': 'Southeast Asia',
  'East Timor': 'Southeast Asia',
  // South America
  'Brazil': 'South America',
  'Argentina': 'South America',
  'Chile': 'South America',
  'Peru': 'South America',
  'Colombia': 'South America',
  'Ecuador': 'South America',
  'Bolivia': 'South America',
  'Venezuela': 'South America',
  'Guyana': 'South America',
  'Suriname': 'South America',
  'French Guiana': 'South America',
  // Africa
  'Nigeria': 'Africa',
  'South Africa': 'Africa',
  'Egypt': 'Africa',
  'Kenya': 'Africa',
  'Ghana': 'Africa',
  'Morocco': 'Africa',
  'Tanzania': 'Africa',
  'Ethiopia': 'Africa',
  // Oceania
  'Australia': 'Oceania',
  'New Zealand': 'Oceania',
  'Fiji': 'Oceania',
  'Papua New Guinea': 'Oceania',
  'Solomon Islands': 'Oceania',
  'Vanuatu': 'Oceania',
  'Samoa': 'Oceania',
  'Tonga': 'Oceania',
  // India (special case)
  'India': 'India'
};

export const useLocationDetection = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seasonalInfo, setSeasonalInfo] = useState<SeasonalInfo | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');

  const determineSeason = (lat: number, month: number): SeasonalInfo => {
    const hemisphere = lat >= 0 ? 'northern' : 'southern';
    let season: 'spring' | 'summer' | 'autumn' | 'winter';

    if (hemisphere === 'northern') {
      if (month >= 3 && month <= 5) season = 'spring';
      else if (month >= 6 && month <= 8) season = 'summer';
      else if (month >= 9 && month <= 11) season = 'autumn';
      else season = 'winter';
    } else {
      // Southern hemisphere - seasons are reversed
      if (month >= 3 && month <= 5) season = 'autumn';
      else if (month >= 6 && month <= 8) season = 'winter';
      else if (month >= 9 && month <= 11) season = 'spring';
      else season = 'summer';
    }

    return { season, month, hemisphere };
  };

  const getRegionFromCoordinates = async (lat: number, lon: number): Promise<string> => {
    try {
      // Using reverse geocoding API (free tier)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
      );
      const data = await response.json();

      const country = data.address?.country || '';
      const mappedRegion = regionMapping[country as keyof typeof regionMapping];

      return mappedRegion || 'Unknown';
    } catch (err) {
      console.error('Error getting region:', err);
      return 'Unknown';
    }
  };

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1; // JavaScript months are 0-11

      // Get region from coordinates
      const region = await getRegionFromCoordinates(latitude, longitude);

      // Get country and city from response
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
        );
        const data = await response.json();

        const locationData: LocationData = {
          latitude,
          longitude,
          region,
          country: data.address?.country || 'Unknown',
          city: data.address?.city || data.address?.town || data.address?.village
        };

        setLocation(locationData);
        setSeasonalInfo(determineSeason(latitude, month));
      } catch (err) {
        // Fallback if geocoding fails
        setLocation({
          latitude,
          longitude,
          region,
          country: 'Unknown'
        });
        setSeasonalInfo(determineSeason(latitude, month));
      }
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location permission denied. Please enable location access.');
            setPermissionStatus('denied');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case err.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred.');
        }
      } else {
        setError('Failed to detect location.');
      }
    } finally {
      setLoading(false);
    }
  };

  const requestPermission = async () => {
    if ('permissions' in navigator) {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        setPermissionStatus(result.state as 'granted' | 'denied' | 'prompt');
        if (result.state === 'granted') {
          detectLocation();
        }
      } catch (err) {
        console.error('Error checking permission:', err);
      }
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return {
    location,
    loading,
    error,
    seasonalInfo,
    permissionStatus,
    detectLocation,
    requestPermission
  };
};