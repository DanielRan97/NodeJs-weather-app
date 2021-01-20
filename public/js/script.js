const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const LocationWeatherButton = document.querySelector('#locationWeatherButton');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = search.value;
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';

        fetch(`/weather?address=${location}`).then((response) => {
 
    response.json().then((data) => {
        if(data.error){
        messageOne.textContent = data.error;
          }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
          }
    });
});
});

LocationWeatherButton.addEventListener('click',() => {
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by yout browser!');
}

LocationWeatherButton.setAttribute('disabled', 'disabled');
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';
navigator.geolocation.getCurrentPosition((location) =>{
    const position = {
        lat: location.coords.latitude,
        long: location.coords.longitude
    } 
    fetch(`/weather/location?lat=${position.lat}&long=${position.long}`).then((response) => {
      response.json().then((data) => {
        if(data.error){
          messageOne.textContent = data.error;
            }else{

              messageOne.textContent ='';
              messageTwo.textContent = data.forecast;
            }
      });
    }).then(() => {
      LocationWeatherButton.removeAttribute('disabled');
    })
    
})
})






