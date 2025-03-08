import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

const Home = () => {
  const [crowdData, setCrowdData] = useState([]);
  const [ecoOptions, setEcoOptions] = useState([]);
  const [wasteBins, setWasteBins] = useState([]);

  useEffect(() => {
    // Fetch mock data for demo
    setCrowdData([
      { id: 1, location: "Mall Road, Shimla", density: "High" },
      { id: 2, location: "Solang Valley", density: "Moderate" },
    ]);

    setEcoOptions([
      "Electric Taxi Services",
      "Bicycle Rentals",
      "Eco-Friendly Trekking Routes",
    ]);

    setWasteBins([
      { lat: 31.1048, lng: 77.1734, status: "Full" },
      { lat: 32.2432, lng: 77.1892, status: "Empty" },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Smart Tourism Management - Himachal Pradesh</h1>
      
      <motion.div className="grid md:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Real-Time Crowd Management</h2>
            {crowdData.map((spot) => (
              <p key={spot.id}>{spot.location}: {spot.density} Crowd</p>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Eco-Friendly Travel Options</h2>
            <ul>
              {ecoOptions.map((option, index) => (
                <li key={index}>✔ {option}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Waste Management</h2>
            <MapContainer center={[31.1048, 77.1734]} zoom={8} style={{ height: "200px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {wasteBins.map((bin, index) => (
                <Marker key={index} position={[bin.lat, bin.lng]}>
                  <Popup>Waste Bin Status: {bin.status}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-6 text-center">
        <Button className="bg-green-600 hover:bg-green-700">Plan Your Eco-Friendly Trip</Button>
      </div>
    </div>
  );
};

export default Home;
