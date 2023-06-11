"use client";

import { useRef, useEffect, useState } from "react";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  draggable: boolean;
  center?: number[];
  onMarkerPositionChange?: (position: L.LatLngExpression) => void;
}

const Map: React.FC<MapProps> = ({
  draggable,
  center,
  onMarkerPositionChange,
}) => {
  const markerRef = useRef<L.Marker>(null);
  const [zoomLevel, setZoomLevel] = useState<number | null>(null);

  const MapComponent = () => {
    const map = useMap();

    useEffect(() => {
      const handleZoomEnd = () => {
        const newZoomLevel = map.getZoom();
        if (zoomLevel !== newZoomLevel) {
          setZoomLevel(newZoomLevel);
        }
      };

      const marker = markerRef.current;
      if (marker && onMarkerPositionChange) {
        const updateMarkerPosition = () => {
          const position = marker.getLatLng();
          //console.log("Marker position:", [position.lat, position.lng]);
          onMarkerPositionChange([position.lat, position.lng]);
        };
        marker.on("dragend", updateMarkerPosition);
      }
      map.on("zoomend", handleZoomEnd);
      return () => {
        map.off("zoomend", handleZoomEnd);
      };
    }, [map, zoomLevel, onMarkerPositionChange]);

    return null;
  };

  return (
    <MapContainer
      center={(center as LatLngExpression) || [39.925533, 32.866287]}
      zoom={center ? 10 : 6}
      scrollWheelZoom={true}
      className="h-[40vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <>
          <MapComponent />
          <Marker
            draggable={draggable}
            position={center as LatLngExpression}
            ref={markerRef}
          />
        </>
      )}
    </MapContainer>
  );
};

export default Map;

// "use client";

// import { useRef } from "react";
// import L from "leaflet";
// import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

// import "leaflet/dist/leaflet.css";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// // @ts-ignore
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// interface MapProps {
//   center?: number[];
//   onChange?: (position: L.LatLngExpression) => void;
// }

// const Map: React.FC<MapProps> = ({ center, onChange }) => {
//   const markerRef = useRef<Marker>(null);

//   const handleMarkerDragEnd = () => {
//     const marker = markerRef.current;
//     if (marker) {
//       const position = marker.getLatLng();
//       console.log("Marker position:", [position.lat, position.lng]);
//       if (onChange) {
//         onChange([position.lat, position.lng]);
//       }
//     }
//   };

//   const DraggableMarker = () => {
//     useMapEvents({
//       dragend: handleMarkerDragEnd,
//     });

//     return center ? (
//       <Marker
//         draggable={true}
//         position={center as L.LatLngExpression}
//         ref={markerRef}
//       />
//     ) : null;
//   };

//   return (
//     <MapContainer
//       center={(center as L.LatLngExpression) || [39.925533, 32.866287]}
//       zoom={center ? 9 : 6}
//       scrollWheelZoom={true}
//       className="h-[50vh] rounded-lg"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <DraggableMarker />
//     </MapContainer>
//   );
// };

// export default Map;

// "use client";

// import L from "leaflet";
// import { MapContainer, Marker, TileLayer } from "react-leaflet";

// import "leaflet/dist/leaflet.css";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// // @ts-ignore
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// interface MapProps {
//   center?: number[];
// }

// const Map: React.FC<MapProps> = ({ center }) => {
//   console.log(`Map: ${center}`);
//   return (
//     <MapContainer
//       center={(center as L.LatLngExpression) || [39.925533, 32.866287]}
//       zoom={center ? 9 : 6}
//       scrollWheelZoom={true}
//       className="h-[50vh] rounded-lg"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {center && (
//         <Marker draggable={true} position={center as L.LatLngExpression} />
//       )}
//     </MapContainer>
//   );
// };

// export default Map;
