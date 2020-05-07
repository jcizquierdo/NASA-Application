let main = document.getElementById('main');


function fetchNearEarthObjects() {
  event.preventDefault();
  $('#main').show();
  $('#map-id').hide();
  $('.description').html('');
  $('.description').html('<div class="description">'
  + '<p>NEOO is an application that lets you search for any objects that were near Earth on any given date! '
    + 'These objects range from asteroids to comets and when displayed the user can see the object\'s name, estimated diameter, if the object is potentially dangerous to us and a link to a detailed JPL NASA website of that object. This JPL website includes an amazing diagram comparing the objects orbit to our planet\'s orbit around the sun.' 
    + 'Enter a date and try it for yourself!</p></div>')
  let date = document.getElementById('searchDate').value;
  console.log("date="+date);
      fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date='+date+'&end_date='+date+
        '&api_key=58quQOPaEHya8ShD5JVzTSjU2Ece7FNGSAFe9rVT')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);

        // create indiv containers for each data object

        let neoLength = response.near_earth_objects[date].length;

        $('#main').html('');

        for (let x = 0; x < neoLength; x++) {
          // Create Card Div 
          $('#main').append('<div id='+x+' class="card cell small-6 large-4"></div>');
          $('this').addClass('info-contain');

          // Name of Object
          var name = response.near_earth_objects[date][x].name;
          $('#'+x).html('<div class="card-divider">'+name+'</div>');

          // Speed
          let speedRef = response.near_earth_objects[date][x].close_approach_data[0].relative_velocity
          speed = +speedRef.miles_per_hour;
          $('#'+x).append('<div class="card-section">Speed ' + speed.toFixed(2) + ' km/h');

          // Diameter 
          let diamRef = response.near_earth_objects[date][x].estimated_diameter.meters
          minRef = diamRef.estimated_diameter_min.toFixed(2);
          maxRef = diamRef.estimated_diameter_max.toFixed(2);
          $('#'+x).append('<div class="card-section">Diameter between '+minRef+' and '+maxRef+' meters.</div>')

          let hazardous = response.near_earth_objects[date][x].is_potentially_hazardous_asteroid
          if (hazardous == true) {
            $('#'+x).addClass('red')
            hazardous = 'Yes!';
          }  else {
            $('#'+x).addClass('green')
            hazardous = 'No.';
          }
          $('#'+x).append('<div class="card-section">Is it hazardous to us? '+hazardous+ '</div>')
          

          // JPL URL
          var url = response.near_earth_objects[date][x].nasa_jpl_url;
          $('#'+x).append('<div class="card-section"><a target="_blank" href="'+url+'">JPL Link</a></div>')
        }
        
      });
}

// Add if hazardous or not
