import cities from "../citiesData/cities_data.json";

const formattedCities = cities.map((city) => ({
  id: city.id,
  name: city.name,
  latlng: [Number(city.latitude), Number(city.longitude)],
  region: city.region,
}));

const useCities = () => {
  const getAll = () => formattedCities;

  const getByValue = (value: string) => {
    return formattedCities.find((item) => item.name === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCities;
