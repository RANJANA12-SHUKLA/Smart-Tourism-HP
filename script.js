
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
    const userInput = document.getElement}
