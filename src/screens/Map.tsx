import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import MapView, {Coordinate, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

interface componentNameProps {}

type MapCoordinate = {
  latitude: number;
  longitude: number;
}


const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}


// const getDelta = (lat: number, long: number, accuracy: number) => {
//   const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
//   const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
//   const longDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

//   return {
//     latitude: lat,
//     longitude: long,
//     latitudeDelta: latDelta,
//     longitudeDelta: longDelta,
//     accuracy: accuracy,
//   };
// };

export function getRegionForCoordinates(points: MapCoordinate[]) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX:number, maxX:number, minY:number, maxY : number;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
}



const componentName = (props: componentNameProps) => {

  const [location, setLocation] = React.useState<Region | undefined>(initialRegion);
  const [mapRef, setMapRef] = React.useState<MapView | null>();
  
  React.useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true, 
      timeout: 15000
    })
    .then(currentLocation => {
      console.log(currentLocation)
      //const region = getDelta(location.latitude, location.longitude, 2);
      /// const region = { ...location, latitude: currentLocation.latitude, longitude: currentLocation.longitude }
      // Falla al calcular els deltas... 
      const region = getRegionForCoordinates([{latitude: currentLocation.latitude, longitude: currentLocation.longitude}])
      console.log(region)
      setLocation(region as Region)
    })
    .catch(error => console.log(error))
  }, [])

  React.useEffect(() => {
    console.log("fitting")
    //mapRef?.fitToCoordinates();
  }, [mapRef])



  const mapView = React.useMemo(() => {
    return <MapView ref={ref => setMapRef(ref)}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{...location} as Region}
        zoomEnabled={true}
        
    />
  }, [location])

  return (
    <View style={styles.container}>
      {mapView}
    </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%'

  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center"
  },
  activityIndicator : {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
 });
