const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(city) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");

        let temp = document.createElement("p");
        let tempNode = document.createTextNode("temperature: "+data.main.temp + " °C ");
        temp.appendChild(tempNode);

        let desc = document.createElement("p");
        let descNode = document.createTextNode("description: "+data.weather[0].description);
        desc.appendChild(descNode);

        let sunrise = document.createElement("p");
        let sunriseNode = document.createTextNode("sunrise: "+data.sys.sunrise);
        sunrise.appendChild(sunriseNode)

        div.setAttribute("id", "conditions");
        let sunset = document.createElement("p");
        let sunsetNode = document.createTextNode("sunset: "+data.sys.sunset);
        sunset.appendChild(sunsetNode);

        let icon = document.createElement("p");
        let iconNode = document.createTextNode("icon: "+data.weather[0].icon);
        icon.appendChild(iconNode)

        let wind = document.createElement("p");
        let windNode = document.createTextNode("wind speed: "+data.wind.speed);
        wind.appendChild(windNode)
        

        div.appendChild(temp);
        div.appendChild(desc);
        div.appendChild(sunrise);
        div.appendChild(sunset);
        div.appendChild(icon);
        div.appendChild(wind);
        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))

}


document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        }else{
            console.log("You must provide a city");
        }
    })
})