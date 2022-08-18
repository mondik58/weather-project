import {SearchData} from '../features/searchCity/SearchCity';

export const addCities = (searchData: SearchData) => {
  let jsonExitingCities = localStorage.getItem('allCities') || '{}';
  let exitingCities = JSON.parse(jsonExitingCities);

  exitingCities[searchData.id] = searchData;

  localStorage.setItem('allCities', JSON.stringify(exitingCities));
};
