const API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;

console.log('🔐 Foursquare API KEY:', API_KEY); // Verifica que no sea undefined

// 🔍 Buscar lugares por categoría y ciudad (sección normal)
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
    console.error("❌ Error fetching places:", error);
    return [];
  }
}

// ✨ Buscar sugerencias (simplificado usando solo 'park')
export async function getSuggestions(city) {
  try {
    console.log('📍 Buscando sugerencias para:', city);

    const res = await fetch(
      `https://api.foursquare.com/v3/places/search?near=${city}&limit=5`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    const data = await res.json();
    console.log('📦 Datos de Foursquare:', data);

    const results = data.results || [];

    const placesWithPhotos = await Promise.all(
      results.map(async (place) => {
        const photoUrl = await getPhotoUrl(place.fsq_id);
        return { ...place, photoUrl };
      })
    );

    return placesWithPhotos;
  } catch (error) {
    console.error('❌ Error fetching Suggestions:', error);
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
  } catch (error) {
    console.warn(`No picture to ${fsq_id}`);
  }
  return null;
}
