window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    // let Icon = document.querySelector('.icon');



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.weatherapi.com/v1/forecast.json?key=413cd6113fbb4e02822141131212811&q=belgium&days=6&aqi=yes&alerts=yes${lat},${long}`
            
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temp_c} = data.current;
                // Set DOM Element from the API
                temperatureDegree.textContent = temp_c;
                temperatureDescription.textContent = data.current.condition.text;
                locationTimezone.textContent = data.location.tz_id;
                // Icon.textContent = data.current.condition.icon;
                // Set Icon
                setIcons(data.current.condition.icon, document.querySelector(".icon"));
                // setIcons('.icon')
                
            }); 
        });
        function setIcons(icon, iconID){
            const skycons = new Skycons({color:"white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }
    }
});