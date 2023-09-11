import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM"; //for osm
import { Style, Fill, Stroke, Circle } from "ol/style";
import { Select } from "ol/interaction";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";

import { setProperties, setDetailShow } from "../filter/ShowReducer";

const getVectorLayer = () => {
	const vectorSource = new VectorSource({
		// features: features,
	});
	const vectorLayer = new VectorLayer({
		source: vectorSource,
	});

	return vectorLayer;
};

const MapView = () => {
	const dispatch = useDispatch();
	const searchResult = useSelector((state) => state.filter.searchFilter);

	const advancedSearchResult = useSelector(
		(state) => state.complex.advancedSearch
	);

	const landResult = searchResult["land"];
	const forestResult = searchResult["forest"];
	const riverResult = searchResult["river"];
	const inlandwaterResult = searchResult["inlandwater"];
	const othersResult = searchResult["others"];
	const unionResult = searchResult["union"];

	const store = useSelector((state) => state.options);

	const land_color = store.landOption.color;
	const forest_color = store.options.forest.color;
	const river_color = store.options.river.color;
	const lake_color = store.options.lake.color;
	const town_color = store.options.town.color;

	const store_show = useSelector((state) => state.show);

	const store_real = useSelector((state) => state);
	// console.log("store =>", store_real);

	const fromTableItems = store_show.fromTableToDraw;
	const savedItems = store_show.savedGeomToDraw;

	const fill_alpha = "33";

	const mapRef = useRef(null);

	//define styles
	const pointStyle = new Style({
		image: new Circle({
			radius: 5,
			fill: new Fill({
				color: "red",
			}),
			stroke: new Stroke({
				color: "black",
				width: 1,
			}),
		}),
	});

	// Style for lines
	const lineStyle = new Style({
		stroke: new Stroke({
			color: river_color,
			width: 2,
		}),
	});

	// Style for polygons
	const polygonStyle = new Style({
		fill: new Fill({
			color: "rgba(0,255,0,0.2)",
		}),
		stroke: new Stroke({
			color: "green",
			width: 1,
		}),
	});

	// Style for lake polygons
	const lakepolygonStyle = new Style({
		fill: new Fill({
			color: lake_color + fill_alpha,
		}),
		stroke: new Stroke({
			color: lake_color,
			width: 1,
		}),
	});
	const forestpolygonStyle = new Style({
		fill: new Fill({
			color: forest_color + fill_alpha,
		}),
		stroke: new Stroke({
			color: forest_color,
			width: 1.5,
		}),
	});
	let landpolygonStyle = new Style({
		fill: new Fill({
			color: land_color + fill_alpha,
		}),
		stroke: new Stroke({
			color: land_color,
			width: 0.5,
		}),
	});
	const unionpolygonStyle = new Style({
		fill: new Fill({
			color: "#000000",
		}),
		stroke: new Stroke({
			color: "#000000",
			width: 0,
		}),
	});
	const hospitalpolygonStyle = new Style({
		image: new Circle({
			radius: 5,
			fill: new Fill({
				color: town_color + fill_alpha,
			}),
			stroke: new Stroke({
				color: "black",
				width: 1,
			}),
		}),
	});
	const showpolygonStyle = new Style({
		fill: new Fill({
			color: "#aa0000aa",
		}),
		stroke: new Stroke({
			color: "#aa0000",
			width: 2,
		}),
	});
	const selectedpolygonStyle = new Style({
		fill: new Fill({
			color: "#0000aaaa",
		}),
		stroke: new Stroke({
			color: "#0000aa",
			width: 2,
		}),
	});
	const savedpolygonStyle = new Style({
		fill: new Fill({
			color: "#000000aa",
		}),
		stroke: new Stroke({
			color: "#aaaa00",
			width: 2,
		}),
	});

	useEffect(() => {
		const map = new Map({
			target: "map",
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				getVectorLayer(),
			],
			view: new View({
				center: [0, 0],
				zoom: 2,
				projection: "EPSG:3857",
			}),
		});

		mapRef.current = map;

		const vectorLayerForTable = new VectorLayer({
			name: "fromTableItemsLayer",
			source: new VectorSource(),
		});
		const vectorLayerForForest = new VectorLayer({
			name: "ForestLayer",
			source: new VectorSource(),
		});
		const vectorLayerForSaved = new VectorLayer({
			name: "SavedLayer",
			source: new VectorSource(),
		});
		const vectorLayerForLand = new VectorLayer({
			name: "LandLayer",
			source: new VectorSource(),
		});
		const vectorLayerForAdvancedSearch = new VectorLayer({
			name: "AdvancedSearchLayer",
			source: new VectorSource(),
		});

		mapRef.current.addLayer(vectorLayerForTable);
		mapRef.current.addLayer(vectorLayerForForest);
		mapRef.current.addLayer(vectorLayerForSaved);
		mapRef.current.addLayer(vectorLayerForLand);
		mapRef.current.addLayer(vectorLayerForAdvancedSearch);

		return () => {
			map.setTarget(null);
		};
	}, []);

	const selectInteraction = new Select({
		condition: (event) => event.type === "click",
	});
	selectInteraction.on("select", (event) => {
		const selectedFeatures = event.target.getFeatures();
		if (selectedFeatures.getLength() > 0) {
			const selectedFeature = selectedFeatures.item(0);
			const properties = selectedFeature.getProperties();
			selectedFeature.setStyle(selectedpolygonStyle);
			dispatch(setProperties(properties));
			dispatch(setDetailShow(true));
			console.log("properties", properties);
		}
	});

	useEffect(() => {
		landpolygonStyle.fill_ = new Fill({
			color: store.landOption.color + fill_alpha,
		});
	}, [store]);
	useEffect(() => {
		if (fromTableItems) {
			console.log("fromTableItems", fromTableItems);
			const vectorfromTableItemsSource = mapRef.current
				.getLayers()
				.getArray()[2]
				.getSource();
			vectorfromTableItemsSource.clear();
			const format = new GeoJSON();
			fromTableItems.forEach((item) => {
				if (item) {
					const ShowFromTableFeatures = format.readFeatures(item, {
						dataProjection: "EPSG:3857",
						featureProjection: "EPSG:3857",
					});
					ShowFromTableFeatures.forEach((feature) => {
						const geometryType = feature.getGeometry().getType();
						if (geometryType === "Point") {
							feature.setStyle(pointStyle);
						} else if (
							geometryType === "LineString" ||
							geometryType === "MultiLineString"
						) {
							feature.setStyle(lineStyle);
						} else if (
							geometryType === "Polygon" ||
							geometryType === "MultiPolygon"
						) {
							feature.setStyle(showpolygonStyle);
						}
						const extent = feature.getGeometry().getExtent();
						const map = mapRef.current;
						map.getView().fit(extent, { padding: [450, 450, 450, 450] });
					});
					vectorfromTableItemsSource.addFeatures(ShowFromTableFeatures);
				}
			});
		}
	}, [fromTableItems, store]);

	useEffect(() => {
		const vectorUnionSource = mapRef.current
			.getLayers()
			.getArray()[1]
			.getSource(); // Assuming VectorLayer is at index 1
		// vectorUnionSource.clear(); // Clear existing features
		if (unionResult && unionResult[0] && unionResult[0][0]) {
			const geometryData = JSON.parse(unionResult[0][0]);
			const format = new GeoJSON(); // Clear existing features
			const UnionFeature = format.readFeature(geometryData, {
				dataProjection: "EPSG: 3035",
				featureProjection: "EPSG: 3857",
			});
			const geometryType = UnionFeature.getGeometry().getType();
			if (geometryType === "Point") {
				UnionFeature.setStyle(pointStyle);
			} else if (
				geometryType === "LineString" ||
				geometryType === "MultiLineString"
			) {
				UnionFeature.setStyle(lineStyle);
			} else if (
				geometryType === "Polygon" ||
				geometryType === "MultiPolygon"
			) {
				UnionFeature.setStyle(unionpolygonStyle);
			}
			vectorUnionSource.addFeatures(UnionFeature);
			const extent = UnionFeature.getGeometry().getExtent();
			const map = mapRef.current;
			map.getView().fit(extent, { padding: [50, 50, 50, 50] });
		}
	}, [unionResult, store]);

	useEffect(() => {
		const vectorLandSource = mapRef.current
			.getLayers()
			.getArray()[5]
			.getSource();
		vectorLandSource.clear();
		const map = mapRef.current;
		map.addInteraction(selectInteraction);

		if (landResult) {
			const format = new GeoJSON();
			landResult.forEach((item, index) => {
				const LandFeatures = format.readFeatures(item[0], {
					dataProjection: "EPSG:3857",
					featureProjection: "EPSG:3587",
				});

				LandFeatures.forEach((feature) => {
					feature.setProperties({
						type: "Land",
						id: item[1],
						name: item[2],
						location: item[3],
						area: item[4],
						aed: item[5],
					});
					const geometryType = feature.getGeometry().getType();
					if (geometryType === "Point") {
						feature.setStyle(pointStyle);
					} else if (
						geometryType === "LineString" ||
						geometryType === "MultiLineString"
					) {
						feature.setStyle(lineStyle);
					} else if (
						geometryType === "Polygon" ||
						geometryType === "MultiPolygon"
					) {
						feature.setStyle(landpolygonStyle);
					}
					feature.set("selectable", true);
				});

				if (store.landOption.show) {
					vectorLandSource.addFeatures(LandFeatures);
				}
			});
		}
	}, [landResult, store]);

	useEffect(() => {
		const vectorForestSource = mapRef.current
			.getLayers()
			.getArray()[3]
			.getSource();

		if (forestResult) {
			const format = new GeoJSON();
			vectorForestSource.clear();
			forestResult.forEach((item) => {
				const ForestFeatures = format.readFeatures(item[0], {
					dataProjection: "EPSG:4326",
					featureProjection: "EPSG:3857",
				});
				ForestFeatures.forEach((feature) => {
					feature.setProperties({
						type: "Forest",
					});
					const geometryType = feature.getGeometry().getType();
					if (geometryType === "Point") {
						feature.setStyle(pointStyle);
					} else if (
						geometryType === "LineString" ||
						geometryType === "MultiLineString"
					) {
						feature.setStyle(lineStyle);
					} else if (
						geometryType === "Polygon" ||
						geometryType === "MultiPolygon"
					) {
						feature.setStyle(forestpolygonStyle);
					}
				});

				if (store.options.forest.show) {
					vectorForestSource.addFeatures(ForestFeatures);
				}
			});
		}
	}, [forestResult, store]);

	useEffect(() => {
		if (riverResult) {
			const vectorRiverSource = mapRef.current
				.getLayers()
				.getArray()[1]
				.getSource();

			const format = new GeoJSON();
			riverResult.forEach((item) => {
				const RiverFeatures = format.readFeatures(item[0], {
					dataProjection: "EPSG:3857",
					featureProjection: "EPSG:3857",
				});
				RiverFeatures.forEach((feature) => {
					feature.setProperties({
						type: "River",
					});
					const geometryType = feature.getGeometry().getType();
					if (geometryType === "Point") {
						feature.setStyle(pointStyle);
					} else if (
						geometryType === "LineString" ||
						geometryType === "MultiLineString"
					) {
						feature.setStyle(lineStyle);
					} else if (
						geometryType === "Polygon" ||
						geometryType === "MultiPolygon"
					) {
						feature.setStyle(landpolygonStyle);
					}
				});

				if (store.options.river.show) {
					vectorRiverSource.addFeatures(RiverFeatures);
				}
			});
		}
	}, [riverResult, store]);

	useEffect(() => {
		if (othersResult) {
			const vectorOtherSource = mapRef.current
				.getLayers()
				.getArray()[1]
				.getSource();

			const format = new GeoJSON();
			othersResult.forEach((item) => {
				const OthersFeatures = format.readFeatures(item[0], {
					dataProjection: "EPSG:3857",
					featureProjection: "EPSG:3857",
				});
				OthersFeatures.forEach((feature) => {
					feature.setProperties({
						type: "Facilities",
					});
					const geometryType = feature.getGeometry().getType();
					if (geometryType === "Point") {
						feature.setStyle(pointStyle);
					} else if (
						geometryType === "LineString" ||
						geometryType === "MultiLineString"
					) {
						feature.setStyle(lineStyle);
					} else if (
						geometryType === "Polygon" ||
						geometryType === "MultiPolygon"
					) {
						feature.setStyle(landpolygonStyle);
					}
				});

				if (store.options.town.show) {
					vectorOtherSource.addFeatures(OthersFeatures);
				}
			});
		}
	}, [othersResult, store]);

	useEffect(() => {
		if (inlandwaterResult) {
			const vectorInlandwaterSource = mapRef.current
				.getLayers()
				.getArray()[1]
				.getSource();

			const format = new GeoJSON();
			inlandwaterResult.forEach((item) => {
				const LandFeatures = format.readFeatures(item[0], {
					dataProjection: "EPSG:3857",
					featureProjection: "EPSG:3857",
				});
				LandFeatures.forEach((feature) => {
					feature.setProperties({
						type: "Inlandwater",
					});
					const geometryType = feature.getGeometry().getType();
					if (geometryType === "Point") {
						feature.setStyle(pointStyle);
					} else if (
						geometryType === "LineString" ||
						geometryType === "MultiLineString"
					) {
						feature.setStyle(lineStyle);
					} else if (
						geometryType === "Polygon" ||
						geometryType === "MultiPolygon"
					) {
						feature.setStyle(landpolygonStyle);
					}
				});

				if (store.options.lake.show) {
					vectorInlandwaterSource.addFeatures(LandFeatures);
				}
			});
		}
	}, [inlandwaterResult, store]);

	useEffect(() => {
		const vectorSavedSource = mapRef.current
			.getLayers()
			.getArray()[4]
			.getSource();
		vectorSavedSource.clear();
		console.log("savedItems", savedItems);

		if (savedItems) {
			console.log("saved items", savedItems);
			const format = new GeoJSON();
			savedItems.forEach((item) => {
				const SavedFeatures = format.readFeatures(JSON.parse(item[12]), {
					dataProjection: "EPSG:3857",
					featureProjection: "EPSG:3857",
				});
				SavedFeatures.forEach((feature) => {
					const geometryType = feature.getGeometry().getType();
					if (geometryType === "Point") {
						feature.setStyle(pointStyle);
					} else if (
						geometryType === "LineString" ||
						geometryType === "MultiLineString"
					) {
						feature.setStyle(lineStyle);
					} else if (
						geometryType === "Polygon" ||
						geometryType === "MultiPolygon"
					) {
						feature.setStyle(savedpolygonStyle);
					}
				});

				vectorSavedSource.addFeatures(SavedFeatures);
			});
		}
	}, [savedItems, store]);

	useEffect(() => {
		const vectorAdvancedSearchSource = mapRef.current
			.getLayers()
			.getArray()[6]
			.getSource();
		vectorAdvancedSearchSource.clear();
		const map = mapRef.current;
		map.addInteraction(selectInteraction);

		if (advancedSearchResult) {
			const format = new GeoJSON();
			advancedSearchResult.forEach((item, index) => {
				const AdvancedSearchFeatures = format.readFeatures(
					JSON.parse(item[12]),
					{
						dataProjection: "EPSG:3857",
						featureProjection: "EPSG:3587",
					}
				);

				AdvancedSearchFeatures.forEach((feature) => {
					feature.setProperties({
						type: "Land",
						id: item[2],
						name: item[6],
						location: item[7],
						area: item[10],
						aed: item[11],
					});
					const geometryType = feature.getGeometry().getType();
					if (geometryType === "Point") {
						feature.setStyle(pointStyle);
					} else if (
						geometryType === "LineString" ||
						geometryType === "MultiLineString"
					) {
						feature.setStyle(lineStyle);
					} else if (
						geometryType === "Polygon" ||
						geometryType === "MultiPolygon"
					) {
						feature.setStyle(landpolygonStyle);
					}
					feature.set("selectable", true);
				});

				if (store.landOption.show) {
					vectorAdvancedSearchSource.addFeatures(AdvancedSearchFeatures);
					const extent = AdvancedSearchFeatures[0].getGeometry().getExtent();
					const map = mapRef.current;
					map.getView().fit(extent, { padding: [50, 50, 50, 50] });
				}
			});
		}
	}, [advancedSearchResult, store]);

	return (
		<div className="map">
			<div id="map" className="map" ref={mapRef}></div>
		</div>
	);
};

export default MapView;
