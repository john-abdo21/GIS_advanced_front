import { useSelector } from 'react-redux';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM'; //for osm 
import { Style, Fill, Stroke, Circle } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import { useEffect, useRef } from 'react';

const getVectorLayer = () => {
  const vectorSource = new VectorSource({
    // features: features,
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  return vectorLayer;
}

const MapView = () => {
  // const riverView = useSelector((state) => state.data.riverView);
  // const lakeView = useSelector((state) => state.data.lakeView);
  // const forestView = useSelector((state) => state.data.forestView);
  // const stationView = useSelector((state) => state.data.stationView);

  const ReverData = useSelector((state) => state.data.river);
  const LakeData = useSelector((state) => state.data.lake);
  const ForestData = useSelector((state) => state.data.forest);
  const LandData = useSelector((state) => state.data.land);
  const HospitalData = useSelector((state) => state.data.hospital);

  const mapRef = useRef(null); // ref to store the Map instance
  //openlayer map show when components mounted
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        getVectorLayer(),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:3857',
      }),
    });
    mapRef.current = map;
    return () => {
      map.setTarget(null);
    }

  }, []);
  const pointStyle = new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({
        color: 'red',
      }),
      stroke: new Stroke({
        color: 'black',
        width: 1,
      }),
    }),
  });

  // Style for lines
  const lineStyle = new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 2,
    }),
  });

  // Style for polygons
  const polygonStyle = new Style({
    fill: new Fill({
      color: 'rgba(0,255,0,0.2)',
    }),
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  });

  // Style for lake polygons
  const lakepolygonStyle = new Style({
    fill: new Fill({
      color: '#38b5d933',
    }),
    stroke: new Stroke({
      color: '#38b5d9',
      width: 1,
    }),
  });
  const forestpolygonStyle = new Style({
    fill: new Fill({
      color: '#27950533',
    }),
    stroke: new Stroke({
      color: '#279505',
      width: 1,
    }),
  });
  const landpolygonStyle = new Style({
    fill: new Fill({
      color: '#ff000033',
    }),
    stroke: new Stroke({
      color: '#ff0000',
      width: 0.3,
    }),
  });
  const hospitalpolygonStyle = new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({
        color: 'red',
      }),
      stroke: new Stroke({
        color: 'black',
        width: 1,
      }),
    }),
  });
  //show feature when searchResult changed
  useEffect(() => {
    if (!ReverData) return;
    const start_time = new Date();
    const end_time = new Date();
    // console.log(`${end_time - start_time} ms`);
    // console.log(ReverData)
    // console.log('GeoJSON:', geojson);
    const vectorSource = mapRef.current.getLayers().getArray()[1].getSource(); // Assuming VectorLayer is at index 1
    // vectorSource.clear();
    const format = new GeoJSON();
    ReverData.forEach(item=>
    {
    // console.log('item',item[0])
    const RiverFeatures = format.readFeatures(item[0], {
      dataProjection: 'EPSG:3857', // Specify the data projection as EPSG:4326
      featureProjection: 'EPSG:3857', // Specify the feature projection as EPSG:3857
    });
    // Apply styles to the features based on their geometry type
    RiverFeatures.forEach((feature) => {
      const geometryType = feature.getGeometry().getType();
      if (geometryType === 'Point') {
        feature.setStyle(pointStyle);
      } else if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
        feature.setStyle(lineStyle);
      } else if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
        feature.setStyle(polygonStyle);
      }
    });
    vectorSource.addFeatures(RiverFeatures);
  });
  }, [ReverData]);

  useEffect(() => {
    if (!LakeData) return;
    const start_time = new Date();
    const end_time = new Date();
    // console.log(`${end_time - start_time} ms`);
    // console.log(LakeData)
    const format = new GeoJSON();
    const vectorSource = mapRef.current.getLayers().getArray()[1].getSource(); // Assuming VectorLayer is at index 1
    // vectorSource.clear();
    LakeData.forEach(item=>
    {
    // console.log('item',item[0])
    const LakeFeatures = format.readFeatures(item[0], {
      dataProjection: 'EPSG:3857', // Specify the data projection as EPSG:4326
      featureProjection: 'EPSG:3857', // Specify the feature projection as EPSG:3857
    });
    // Apply styles to the features based on their geometry type
    LakeFeatures.forEach((feature) => {
      const geometryType = feature.getGeometry().getType();
      if (geometryType === 'Point') {
        feature.setStyle(pointStyle);
      } else if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
        feature.setStyle(lineStyle);
      } else if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
        feature.setStyle(lakepolygonStyle);
      }
    });
    vectorSource.addFeatures(LakeFeatures);
  })
  }, [LakeData]);

  useEffect(() => {
    // console.log('ForestData')
    if (!ForestData) return;
    const start_time = new Date();
    const end_time = new Date();
    // console.log(`${end_time - start_time} ms`);
    // console.log(ForestData)
    const format = new GeoJSON();
    const vectorSource = mapRef.current.getLayers().getArray()[1].getSource(); // Assuming VectorLayer is at index 1
    // vectorSource.clear();
    ForestData.forEach(item=>
    {
    // console.log('item',item[0])
    const ForestFeatures = format.readFeatures(item[0], {
      dataProjection: 'EPSG:3857', // Specify the data projection as EPSG:4326
      featureProjection: 'EPSG:3857', // Specify the feature projection as EPSG:3857
    });
    // Apply styles to the features based on their geometry type
    // console.log('Modified ForestFeatures',ForestFeatures)
    ForestFeatures.forEach((feature) => {
      const geometryType = feature.getGeometry().getType();
      if (geometryType === 'Point') {
        feature.setStyle(pointStyle);
      } else if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
        feature.setStyle(lineStyle);
      } else if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
        feature.setStyle(forestpolygonStyle);
      }
    });
    vectorSource.addFeatures(ForestFeatures);
    })
  }, [ForestData]);

  useEffect(() => {
    // console.log('LandData')
    if (!LandData) return;
    const start_time = new Date();
    const end_time = new Date();
    // console.log(`${end_time - start_time} ms`);
    const format = new GeoJSON();
    const vectorSource = mapRef.current.getLayers().getArray()[1].getSource(); // Assuming VectorLayer is at index 1
    // vectorSource.clear();
    LandData.forEach(item=>
    {
    // console.log('item',item[0])
    const LandFeatures = format.readFeatures(item[0], {
      dataProjection: 'EPSG:3857', // Specify the data projection as EPSG:4326
      featureProjection: 'EPSG:3857', // Specify the feature projection as EPSG:3857
    });
    // Apply styles to the features based on their geometry type
    // console.log('Modified',LandFeatures)
    LandFeatures.forEach((feature) => {
      const geometryType = feature.getGeometry().getType();
      if (geometryType === 'Point') {
        feature.setStyle(pointStyle);
      } else if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
        feature.setStyle(lineStyle);
      } else if (geometryType === 'Polygon' || geometryType === 'MultiPolygon') {
        feature.setStyle(landpolygonStyle);
      }
    });
    // if (vectorSource !== null) {
    //   var allFeatures = vectorSource.getFeatures();
    //   var isRExist = allFeatures.some(function (feature) {
    //     // Compare each feature with R
    //     return LandFeatures.includes(feature);
    //   });
    //   if (vectorSource && isRExist)
    //     vectorSource.removeFeatures(LandFeatures);
    // }
    vectorSource.addFeatures(LandFeatures);
  })
  }, [LandData]);

  useEffect(() => {
    // console.log('HospitalData')
    if (!HospitalData) return;
    const start_time = new Date();
    const end_time = new Date();
    // console.log(`${end_time - start_time} ms`);
    // console.log(HospitalData)
    const format = new GeoJSON();
    const vectorSource = mapRef.current.getLayers().getArray()[1].getSource(); // Assuming VectorLayer is at index 1
    // vectorSource.clear();
    HospitalData.forEach(item=>
    {
    // console.log('item',item[0])
    const HospitalFeatures = format.readFeatures(item[0], {
      dataProjection: 'EPSG:3857', // Specify the data projection as EPSG:4326
      featureProjection: 'EPSG:3857', // Specify the feature projection as EPSG:3857
    });
    // Apply styles to the features based on their geometry type
    HospitalFeatures.forEach((feature) => {
      const geometryType = feature.getGeometry().getType();
      if (geometryType === 'Point') {
        feature.setStyle(pointStyle);
      } else if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
        feature.setStyle(lineStyle);
      } else if (geometryType === 'Polygon' || geometryType === 'MultiPolygon' || geometryType === 'MultiPoint') {
        feature.setStyle(hospitalpolygonStyle);
      }
    });
    vectorSource.addFeatures(HospitalFeatures);
  })
  }, [HospitalData]);
  // useEffect(() => {
  //   if (vectorSource !== null) {
  //     var allFeatures = vectorSource.getFeatures();
  //     var isRiverFeaturesExist = allFeatures.some(function (feature) {
  //       // Compare each feature with RiverFeatures
  //       return RiverFeatures.includes(feature);
  //     });

  //     if (riverView)
  //       vectorSource.addFeatures(RiverFeatures);
  //     else
  //       if (vectorSource && isRiverFeaturesExist)
  //         vectorSource.removeFeatures(RiverFeatures);
  //   }
  // }, [riverView])

  return (
    <div className='map'>
      <div id="map" className='map' ref={mapRef} ></div>
    </div>
  );
}

export default MapView;