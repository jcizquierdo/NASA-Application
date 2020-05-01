let main = document.getElementById('main');


function fetchNearEarthObjects() {
      fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-01&end_date=2021-01-01&api_key=58quQOPaEHya8ShD5JVzTSjU2Ece7FNGSAFe9rVT')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        let name = document.getElementById('name');
        name.textContent = response.near_earth_objects["2021-01-01"][0].name;

        let jplUrl = document.getElementById('jplLink')
        jplUrl.href = response.near_earth_objects["2021-01-01"][0].nasa_jpl_url;
        
      });
}


fetchNearEarthObjects();
