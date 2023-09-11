import React from "react";
import {
	GoogleMap,
	withGoogleMap,
	withScriptjs,
	Polygon,
} from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";
import { setGoogleMapShow } from "../features/filter/ShowReducer"
import proj4 from "proj4";

import "./utils/googlemap.css";

// Define the EPSG:3857 and EPSG:4326 coordinate systems
proj4.defs(
	"EPSG:3857",
	"+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"
);
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");

// Convert EPSG:3857 coordinates to EPSG:4326
const convertCoordinates = (x, y) => {
	const point = proj4(proj4.defs("EPSG:3857"), proj4.defs("EPSG:4326"), [x, y]);
	return { lat: point[1], lng: point[0] };
};

const MapComponent = withScriptjs(
	withGoogleMap(() => {
    const geometryData = useSelector(state => state.show.properties.geometry.flatCoordinates ,[])
    console.log('geometryData',geometryData);
    const polygonCoordinates = [];

    for (let i = 0; i < geometryData.length; i += 2) {
      const lat = geometryData[i];
      const lng = geometryData[i + 1];
      polygonCoordinates.push([lat, lng]);
    }

		const convertedPolygonCoordinates = polygonCoordinates.map(([x, y]) =>
			convertCoordinates(x, y)
		);

    const findPolygonCenter = polygonCoordinates => {
      if (!polygonCoordinates || polygonCoordinates.length === 0) {
        return null;
      }
    
      const numPoints = polygonCoordinates.length;
    
      let sumX = 0;
      let sumY = 0;
      for (const [x, y] of polygonCoordinates) {
        sumX += x;
        sumY += y;
      }
    
      const centerX = sumX / numPoints;
      const centerY = sumY / numPoints;
    
      return [centerX, centerY];
    }

    const centerCoordinate = findPolygonCenter(polygonCoordinates);

		const center = convertCoordinates(centerCoordinate[0], centerCoordinate[1]);

		return (
			<GoogleMap defaultZoom={12} defaultCenter={center}>
				<Polygon
					paths={convertedPolygonCoordinates}
					options={{
						strokeColor: "#FF0000",
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: "#FF0000",
						fillOpacity: 0.35,
					}}
				/>
			</GoogleMap>
		);
	})
);

const App = () => {
  const dispatch = useDispatch();
  
  const goBackToOriginal = () => {
    dispatch(setGoogleMapShow(false));
  }

	return (
		<div
			style={{
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: "0"
      }}
		>
      <button
        className="prec"
        style={{
          position: "fixed",
        }}
        onClick={goBackToOriginal}
      >
        BACK
      </button>
			<MapComponent
				googleMapURL={`https://maps.googleapis.com/maps/api/js`}
				loadingElement={<div style={{ height: "100%" }} />}
				containerElement={<div style={{ height: "100%" }} />}
				mapElement={<div style={{ height: "100%" }} />}
			/>
		</div>
	);
};

export default App;
