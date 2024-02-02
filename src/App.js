import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  //useEffect for displaying all countries on initial load and on clearing search data
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setSearchData(data);
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  function searchCountries() {
    if (searchText === "") {
      setSearchData(countries);
      return;
    }

    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((country) =>
          country.name.common.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchData(filteredData);
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }

  //another useEffect for performing Country Search based on Search Text.
  useEffect(
    () => {
      searchCountries();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchText]
  );

  const cardStyle = {
    width: "200px",
    height: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    height: "100vh",
    marginTop: "30px",
  };

  const searchBoxContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
  };

  const searchBox = {
    width: "800px",
    height: "30px",
  };

  return (
    <div>
      <div style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
        <form
          style={searchBoxContainer}
          onSubmit={(e) => {
            e.preventDefault();
            searchCountries();
          }}
        >
          <input
            style={searchBox}
            type="text"
            value={searchText}
            onChange={(e) => handleSearch(e)}
            placeholder="Search for countries..."
          />
        </form>
      </div>
      <div style={containerStyle}>
        {searchData.map((country) => (
          <div key={country.cca3} style={cardStyle} className="countryCard">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={imageStyle}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
