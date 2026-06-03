import countries from 'world-countries';

type TCountryProps = {
  name: string;
  flag: string;
  code: string;
  iso: string;
};

export function getCallingCountry(iso: string): TCountryProps {
  const countryList: TCountryProps[] = countries
    .map(({ name, flag, idd, cca2 }) => ({
      flag,
      name: name.common,
      code: idd.root + (idd.suffixes ? idd.suffixes[0] : ''), // dial code
      iso: cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const country = countryList.find((c) => c.iso === iso);

  if (!country) {
    throw new Error(`Country with ISO code ${iso} not found`);
  }
  return country;
}
