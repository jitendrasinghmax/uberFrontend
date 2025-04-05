import React, { useEffect, useState } from "react";
import { DirectionsRenderer, DirectionsService, GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { useRideContext } from "../../context/rideContext";
import { useSocketContext } from "../../context/socketContext";
import carIcon from "../../assets/car.webp"; // Import the car image
import userLocation from "../../assets/userLocation.png"
const containerStyle = {
    width: "100%",
    height: "400px",
};

const CustomMarker: React.FC<{ position: google.maps.LatLngLiteral }> = () => (
    <div style={{ transform: "translate(-50%, -100%)" }}>
        <img src={carIcon} alt="Car Icon" className="h-12 w-12" /> {/* Increased size */}
    </div>
);
const UserMarker: React.FC<{ position: google.maps.LatLngLiteral }> = () => (
    <div className="h-12 w-12" style={{ transform: "translate(-50%, -100%)" }}> {/* Increased size */}
       <img className="h-12 " src={userLocation} alt="" />
    </div>
);
interface MapProps {
    userType: string;
}

const Map: React.FC<MapProps> = ({ userType }) => {
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace with your API key
    });
    const rideContext = useRideContext();
    const { socket } = useSocketContext();
    const handleDirectionsCallback = (result:any, status:any) => {
        if (status === "OK" && result) {
          setDirections(result); // save the route in state
        }
      };
    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error getting user location:", error);
            },
            { enableHighAccuracy: true }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    useEffect(() => {
        if (rideContext.rideGlobal) {
            socket?.emit(`${userType}-location`, {
                socketId: userType === "user" ? rideContext.rideGlobal.captain.socketId : rideContext.rideGlobal.user.socketId,
                location: userLocation,
            });
        }
    }, [userLocation, rideContext.rideGlobal]);

    socket?.on("update-location", ({ location }) => {
        setMarker(location);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={userLocation || { lat: 0, lng: 0 }} zoom={18}>
              {rideContext.rideGlobal&&(!directions&&(
        <DirectionsService
          options={{
            destination:rideContext.rideGlobal.destination,
            origin:rideContext.rideGlobal.pickup,
            
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={handleDirectionsCallback}
        />
      ))}
            {directions && <DirectionsRenderer directions={directions} />}

            {userLocation && (
                <OverlayView position={userLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    {userType=='user'?<UserMarker position={userLocation} />:<CustomMarker position={userLocation} />}
                </OverlayView>
            )}
            {marker && (
                <OverlayView position={marker} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    {userType=='user'?<CustomMarker position={marker} />:<UserMarker position={marker} />}
                    
                </OverlayView>
            )}
        </GoogleMap>
    );
};

export default Map;