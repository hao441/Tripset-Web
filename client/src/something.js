const citiesURL = "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json";
const countriesURL = "https://raw.githubusercontent.com/annexare/Countries/master/data/countries.json";
const countryEmojisURL = "https://raw.githubusercontent.com/annexare/Countries/master/dist/more/countries.emoji.min.json";

async function createArray() {
  const citiesResponse = await fetch(citiesURL);
  const cities = await citiesResponse.json();

  const countriesResponse = await fetch(countriesURL);
  const countries = await countriesResponse.json();

  const countryEmojisResponse = await fetch(countryEmojisURL);
  const countryEmojis = await countryEmojisResponse.json();

  const cityCountryPairs = cities.map((city) => {
    const countryCode = city.country;
    const country = countries.find((c) => c.alpha2Code === countryCode);
    const countryName = country.name;
    const countryEmoji = countryEmojis[countryCode];

    return `${city.name}, ${countryName} ${countryEmoji}`;
  });

  return cityCountryPairs;
}

createArray().then((cityCountryPairs) => {
  console.log(cityCountryPairs);
});
