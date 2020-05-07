
function apod() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=q5A4QcS6ue5hwKkgRHgXLFoqEqyJji2i643uscMe')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        $('#apod-img').html('<h2 class="apod-head">NASA Image of the Day</h2>'
        + '<h3 class="apod-head">'+data.title+'</h3>'
        + '<div class="apod-main"><p>'+data.explanation+'</p>'
        + '<img src="'+data.hdurl+'" alt="'+data.title+'"></img>'
        + '<div class="copyright">&copy; Copyright 2020 '+data.copyright+'</div></div>')
    })
}

apod();