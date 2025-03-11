
// Initialize Google Map
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 31.1048, lng: 77.1734 },
        zoom: 8,
    });

    const crowdedAreas = [
        { location: { lat: 31.1048, lng: 77.1734 }, name: "Mall Road, Shimla", status: "High Crowd" },
        { location: { lat: 32.2432, lng: 77.1892 }, name: "Solang Valley", status: "Moderate Crowd" }
    ];

    crowdedAreas.forEach(place => {
        new google.maps.Marker({
            position: place.location,
            map,
            title: place.name,
        }).addListener("click", () => {
            alert(`${place.name} - ${place.status}\nSuggested Alternative: Kufri`);
        });
    });
}

// Fetch tour guides
function loadTourGuides() {
    const guides = ["Rajesh Sharma - English/Hindi", "Neha Verma - Local Guide", "Amit Kumar - Adventure Specialist"];
    const list = document.getElementById("guides-list");
    guides.forEach(guide => {
        const li = document.createElement("li");
        li.textContent = guide;
        list.appendChild(li);
    });
}

// Fetch hotels
function loadHotels() {
    const hotels = ["The Oberoi Cecil", "Hotel Willow Banks", "Clarkes Hotel"]; 
    const list = document.getElementById("hotels-list");
    hotels.forEach(hotel => {
        const li = document.createElement("li");
        li.textContent = hotel;
        list.appendChild(li);
    });
}

// Emergency Contacts
function getEmergencyContacts() {
    document.getElementById("emergency-info").innerHTML = "<p>Police: 100 | Ambulance: 108 | Tourist Helpline: 1363</p>";
}

// Chatbot Functionality
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");
    
    if (userInput.trim() === "") return;
    
    const userMessage = `<p><strong>You:</strong> ${userInput}</p>`;
    chatBox.innerHTML += userMessage;
    document.getElementById("user-input").value = "";

    setTimeout(() => {
        const botResponse = `<p><strong>Bot:</strong> Sorry, I am still learning. Please check the information above.</p>`;
        chatBox.innerHTML += botResponse;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}




// Initialize Google Map
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 31.1048, lng: 77.1734 },
        zoom: 10,
    });

    const crowdedAreas = [
        { location: { lat: 31.1048, lng: 77.1734 }, name: "Mall Road, Shimla", status: "High Crowd" },
        { location: { lat: 32.2432, lng: 77.1892 }, name: "Solang Valley", status: "Moderate Crowd" }
    ];

    crowdedAreas.forEach(place => {
        const marker = new google.maps.Marker({
            position: place.location,
            map,
            title: place.name,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<strong>${place.name}</strong><br>Status: ${place.status}`
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}

// Fetch tour guides
function loadTourGuides() {
    const guides = ["Rajesh Sharma - English/Hindi", "Neha Verma - Local Guide", "Amit Kumar - Adventure Specialist"];
    const list = document.getElementById("guides-list");
    guides.forEach(guide => {
        const li = document.createElement("li");
        li.textContent = guide;
        list.appendChild(li);
    });
}

// Fetch hotels
function loadHotels() {
    const hotels = ["The Oberoi Cecil", "Hotel Willow Banks", "Clarkes Hotel"]; 
    const list = document.getElementById("hotels-list");
    hotels.forEach(hotel => {
        const li = document.createElement("li");
        li.textContent = hotel;
        list.appendChild(li);
    });
}

// Emergency Contacts
function getEmergencyContacts() {
    document.getElementById("emergency-info").innerHTML = "<p>Police: 100 | Ambulance: 108 | Tourist Helpline: 1363</p>";
}

// Chatbot Functionality
function sendMessage() {
    const userInput = document.getElem}

let map, trafficLayer, service;

function initMap() {
    var center = { lat: 31.1048, lng: 77.1734 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: center,
        mapTypeId: "roadmap"
    });
    trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    service = new google.maps.places.PlacesService(map);
}

function fetchRecommendation(location) {
    document.getElementById("suggestion-box").innerText = "Analyzing data...";
    
    service.nearbySearch({
        location: location,
        radius: 5000,
        type: "tourist_attraction"
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            let crowdedPlaces = results.filter(place => place.user_ratings_total && place.user_ratings_total > 500);
            let recommendation = "Recommended - Less Crowd";
            if (crowdedPlaces.length > 5) {
                recommendation = "Not Recommended - Very Crowded";
            } else if (crowdedPlaces.length > 2) {
                recommendation = "Moderate Crowd - Proceed with Caution";
            }
            document.getElementById("suggestion-box").innerText = `Visit Recommendation: ${recommendation}`;
            clearMarkers();
            crowdedPlaces.forEach(place => {
                let markerColor = place.user_ratings_total > 1000 ? "red" : "orange";
                new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: markerColor,
                        fillOpacity: 1,
                        strokeWeight: 1
                    }
                });
            });
        } else {
            document.getElementById("suggestion-box").innerText = "No crowd data available.";
        }
    });
}

function searchPlace() {
    var placeName = document.getElementById("place-input").value;
    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: placeName }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            let location = results[0].geometry.location;
            map.setCenter(location);
            map.setZoom(14);
            new google.maps.Marker({
                map: map,
                position: location,
                title: placeName
            });
            setTimeout(() => fetchRecommendation(location), 1500);
        } else {
            alert("Place not found: " + status);
        }
    });
}

function clearMarkers() {
    for (let i = 0; i < map.markers?.length; i++) {
        map.markers[i].setMap(null);
    }
    map.markers = [];
}

window.onload = function() {
    initMap();
};


