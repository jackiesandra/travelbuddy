export async function getCountryInfo(country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
    const data = await res.json();

    const countryData = data[0];

    return {
      name: countryData.name.common,
      currency: Object.values(countryData.currencies)[0].name,
      language: Object.values(countryData.languages)[0],
      timezone: countryData.timezones[0],
      flag: countryData.flags.svg
    };
  } catch (error) {
    console.error("Error fetching country info:", error);
    return null;
  }
}
