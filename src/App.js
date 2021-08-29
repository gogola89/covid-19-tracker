import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
      //console.log(data)
    });
  }, []);


  const onCountryChange = async (event) => {
    const countryValue = event.target.value;
    setCountry(countryValue);

    const url = countryValue === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryValue}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryValue);
        setCountryInfo(data)
      })
  }

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries)
        });
    };
    getCountriesData();
    
  }, []);

  return (
    <div className="app">
      {/* Left side of the app/ left container */}
      <div className="app__left">
        <div className="app__header"> 
          <h1>COVID-19 TRACKER</h1>
          <FormControl>
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide" >Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value} >{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
            <InfoBox
            title="Cases"
            cases={countryInfo.todayCases} 
            total={countryInfo.cases} 
          />
          <InfoBox 
            title="Recoveries" 
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered} 
          />
          <InfoBox 
            title="Deaths" 
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths} 
          />
        </div>
        <Map />
      </div>
      {/* Right side of the app/ right card container */}
      <Card className="app__right">
        <CardContent>
          Live cases by country
          Worldwide new cases
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
