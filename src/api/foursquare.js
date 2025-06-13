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
    const results = data.results;

    // Buscar fotos reales para cada lugar
    const placesWithPhotos = await Promise.all(
      results.map(async (place) => {
        try {
          const photoRes = await fetch(
            `https://api.foursquare.com/v3/places/${place.fsq_id}/photos`,
            {
              headers: {
                Authorization: API_KEY,
              },
            }
          );
          const photos = await photoRes.json();
          const photoUrl =
            photos.length > 0
              ? `${photos[0].prefix}original${photos[0].suffix}`
              : null;

          return { ...place, photoUrl };
        } catch {
          return { ...place, photoUrl: null };
        }
      })
    );

    return placesWithPhotos;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}
