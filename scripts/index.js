const rideListElement = document.querySelector("#rideList")
const allRides = getAllRides()

allRides.forEach( async ([id, value])=>{

    const ride = JSON.parse(value)
    ride.id = id

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"
    rideListElement.appendChild(itemElement)

    itemElement.addEventListener('click', ()=>{
        window.location.href = `./detail.html?id=${ride.id}`
    })

    const firstPosition = ride.data[0]
    const firstLocationdata = await getLocationData(firstPosition.latitude, firstPosition.longitude)


    const mapID = `map${ride.id}`
    const mapElement = document.createElement("div")
    mapElement.id = mapID
    mapElement.style = "width:100px; height:100px"
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded-4")

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"
   
    const cityDiv = document.createElement("div")
    cityDiv.innerText = `${firstLocationdata.city} - ${firstLocationdata.countryCode}`
    cityDiv.className = "text-primary mb-2"


    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed (ride.data)} Km/h`
    maxSpeedDiv.className = "h5 text-dark"

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`
    distanceDiv.className = "text-dark"

    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duration: ${getDuration(ride)}`
    durationDiv.className = "text-dark"


    const dateDiv = document.createElement("div")
    dateDiv.innerText = `${getStartDate(ride)}`
    dateDiv.className = "text-dark mt-2"

    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)



    const map = L.map(mapID, {
        attributionControl: false,
        zoomControl:false,
        dragging: false,
        scrollWheelZoom: false
    })

    map.setView([firstPosition.latitude, firstPosition.longitude],15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 20,
        minZoom: 5,
    }).addTo(map);

    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)
})
