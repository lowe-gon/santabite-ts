import * as Location from 'expo-location';

/**
 * Requests permission from the user to access location services in the background.
 * * @returns {Promise<Location.PermissionStatus>} The resulting permission status.
 */
export async function requestLocationPermission(): Promise<Location.PermissionStatus> {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  return status;
}

/**
 * Checks the current foreground location permission status without prompting the user.
 * * @returns {Promise<Location.PermissionStatus>} The current permission status.
 */
export async function checkLocationPermission(): Promise<Location.PermissionStatus> {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status;
}

/**
 * Retrieves the device's current geographical location if foreground permissions are granted.
 * * @returns {Promise<Location.LocationObject | null>} The location object data, or null if permission is denied or an error occurs.
 */
export async function getCurrentLocation(): Promise<Location.LocationObject | null> {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status !== 'granted') return null;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    return location;
  } catch (error) {
    console.error('Error getting location: ', error);
    return null;
  }
}

/**
 * Reverse geocodes a set of geographical coordinates into a human-readable address.
 * * @param {Pick<Location.LocationObjectCoords, 'latitude' | 'longitude'>} coords - The latitude and longitude coordinates.
 * @returns {Promise<Location.LocationGeocodedAddress | null>} The first matching address object, or null if not found/an error occurs.
 */
export async function reverseGeoCode(
  coords: Pick<Location.LocationObjectCoords, 'latitude' | 'longitude'>,
): Promise<Location.LocationGeocodedAddress | null> {
  try {
    const response = await Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    if (response.length > 0) {
      return response[0]!;
    }

    return null;
  } catch (error) {
    console.error('Error during reverse geocoding:', error);
    return null;
  }
}

export type LocationProps = Partial<Location.LocationGeocodedAddress> & {
  coords: Pick<Location.LocationObjectCoords, 'latitude' | 'longitude'>;
};

export type RequestAndGeoLocationProps = {
  location: LocationProps | null;
  status: string;
  error: string | null;
};

/**
 * Requests foreground location permissions, retrieves the current device coordinates,
 * and reverse geocodes them into a human-readable address.
 * * @returns {Promise<RequestAndGeoLocationProps | null>} An object containing the combined location data,
 * permission status, and any error message, or null if permissions are denied.
 */
export async function requestAndGeoLocation(): Promise<RequestAndGeoLocationProps | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const geoCodeAddress = await reverseGeoCode(coords);

    return {
      location: {
        ...(geoCodeAddress ?? {}),
        coords,
      },
      status,
      error: null,
    };
  } catch (error) {
    return {
      location: null,
      status: 'denied' as Location.PermissionStatus,
      error: error instanceof Error ? error.message : 'Failed to get location',
    };
  }
}
