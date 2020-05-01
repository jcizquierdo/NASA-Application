let main = document.getElementById('main');


function fetchNearEarthObjects() {
  event.preventDefault();
  let date = document.getElementById('searchDate').value;
  console.log("date="+date);
      fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date='+date+'&end_date='+date+
        '&api_key=58quQOPaEHya8ShD5JVzTSjU2Ece7FNGSAFe9rVT')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);

        let neoLength = response.near_earth_objects[date].length;
        console.log("neo = "+neoLength);
        for (let x = 0; x < neoLength; x++) {
          let name = document.createElement('p');
          name.textContent = response.near_earth_objects[date][x].name;
          main.appendChild(name);

          let jplUrl = document.createElement('a');
          jplUrl.textContent = "JPL Link";
          jplUrl.href = response.near_earth_objects[date][x].nasa_jpl_url;
          main.appendChild(jplUrl);
        }

        //let name = document.getElementById('name');
        //name.textContent = response.near_earth_objects[date][0].name;

        //let jplUrl = document.getElementById('jplLink')
        //jplUrl.href = response.near_earth_objects[date][0].nasa_jpl_url;
        
      });
}

// near_earth_objects["2010-05-01"]
//fetchNearEarthObjects();
