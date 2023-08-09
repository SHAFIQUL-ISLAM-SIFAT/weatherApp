import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  //https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
  const apikey = "671f041c5e5bba9f4e899b0c1141d8d1";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apikey;
    axios
      .get(apiUrl)
      .then((res) => {
        setData(res.data);
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };
  const handleInputChange = (e) => {
    setInputCity(e.target.value);
    //console.log(e.target.value);
  };

  useEffect(() => {
    getWeatherDetails("dhaka");
  }, []);
  const locateMe = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLon(pos.coords.longitude);
    });
  };
  return (
    <div className="col-md-12">
      <div className="weatherbg">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            onChange={handleInputChange}
            value={inputCity}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search Weather Forecast
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={locateMe}
          >
            Locate Me
          </button>
        </div>

        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherresult">
            <img
              className="weathericon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="img"
            />
            <h5 className="weatherCity">
              {data?.name},{data?.sys?.country}
            </h5>
            <h6 className="weatherTemp">
              {(data?.main?.temp - 273.15).toFixed(2)}°C
            </h6>
          </div>
        </div>
        <footer>
          <p>Author:Shafiqul islam</p>
          <p>
            <a href="mailto:sifatislam52@gmail.com">sifatislam52@gmail.com</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
