import axios from 'axios';
import { getCountryForTimezone } from 'countries-and-timezones';

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export const getHolidays = async (year: number, countryCode: string): Promise<Holiday[]> => {
  // Mock response for June 5th
  //   const mockHolidays: Holiday[] = [
  //     {
  //       date: `${year}-06-05`,
  //       localName: 'World Environment Day',
  //       name: 'World Environment Day',
  //       countryCode: countryCode,
  //       fixed: true,
  //       global: true,
  //       counties: null,
  //       launchYear: 1974,
  //       types: ['Public'],
  //     },
  //     {
  //       date: `${year}-06-05`,
  //       localName: 'National Donut Day',
  //       name: 'National Donut Day',
  //       countryCode: countryCode,
  //       fixed: true,
  //       global: false,
  //       counties: null,
  //       launchYear: 1938,
  //       types: ['Observance'],
  //     },
  //   ];
  //
  //   return mockHolidays;

  const response = await axios.get<Holiday[]>(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
  );
  return response.data;
};

export const getUserCountry = (): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const country = getCountryForTimezone(timezone);

  if (country?.id) {
    return country.id;
  }

  // Fallback to browser language if timezone mapping not found
  const userLanguage = navigator.language || navigator.languages[0];
  return userLanguage.split('-')[1] || 'US';
};
