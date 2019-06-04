$(document).ready(function(){
    let lat;
    let long;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            lat = position.coords.latitude;
            long = position.coords.longitude;
            
            var proxy = 'http://cors-anywhere.herokuapp.com/';
            var api = `${proxy}https://api.darksky.net/forecast/877b8bebdcfd5fff42ba415dccc01c0b/${lat},${long}`;
            fetch(api)
             .then(response => response.json())
             .then(data => {
                console.log(data) 
                let tempF = data.currently.temperature;
                let tempC = Math.ceil((tempF - 32) * 5/9);
                let {summary, icon, humidity, windSpeed} = data.currently;
                let timeZone = data.timezone;
                console.log(timeZone)
                $('#loc-span').text(timeZone);
                $('#temp-span').text(tempC);
                $('.icon').text(summary)
                $('.Hval').text(humidity)
                $('.WSval').text(windSpeed);
                $('#celcius').on('click',()=>{
                    $('#temp-span').text(tempC).fadeOut(100).fadeIn()
                    $('#degree').text("C")
                })
                $('#farenheit').on('click',()=>{
                    $('#temp-span').text(Math.floor(tempF)).fadeOut(100).fadeIn()
                    $('#degree').text("F")
                })
                setIcon(icon,document.getElementById('icon'))
             })
            
        })
    }
    function setIcon(icon, iconID){
        let skycons = new Skycons({color: "white"});
        let CurrentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[CurrentIcon]);
        }
})
