const API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;

export async function searchPlaces(category, location) {
  try {
    const res = await fetch(
      `https://api.foursquare.com/v3/places/search?query=${category}&near=${location}&limit=10`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    const data = await res.json();
    const results = data.results || [];

    const placesWithPhotos = await Promise.all(
      results.map(async (place) => {
        const photoUrl = await getPhotoUrl(place.fsq_id);
        return { ...place, photoUrl };
      })
    );

    return placesWithPhotos;
  } catch (error) {
    return [];
  }
}

export async function getSuggestions(query) {
  try {
    const res = await fetch(
      `https://api.foursquare.com/v3/autocomplete?query=${query}&types=geo&limit=5`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    const data = await res.json();
    return (data.results || []).map((item) => ({ text: item.text }));
  } catch (error) {
    return [];
  }
}

async function getPhotoUrl(fsq_id) {
  try {
    const res = await fetch(
      `https://api.foursquare.com/v3/places/${fsq_id}/photos`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    const photos = await res.json();
    if (photos.length > 0) {
      return `${photos[0].prefix}original${photos[0].suffix}`;
    }
  } catch (error) {}
  return null;
}
