import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

interface componentNameProps {}

const componentName = (props: componentNameProps) => {

  const [location, setLocation] = React.useState<Region | null>(null);
  const [mapRef, setMapRef] = React.useState<MapView | null>();
  

  React.useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true, 
      timeout: 15000
    })
    .then(location => {
      console.log(location)
      const region = getDelta(location.latitude, location.longitude, 10);
      console.log(region)
      setLocation(region)
    })
    .catch(error => console.log(error))
  }, [])

  React.useEffect(() => {
    console.log("fitting")
    mapRef?.fitToCoordinates();
  }, [mapRef])

  const getDelta = (lat: number, long: number, accuracy: number) => {
      const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
      const latDelta =accuracy / oneDegreeOfLatitudeInMeters;
      const longDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
      
      return {
        latitude:lat,
        longitude:long,
        latitudeDelta:latDelta,
        longitudeDelta:longDelta,
        accuracy:accuracy,
      };
   
  };

  const mapView = React.useMemo(() => {
    if(!location) {
      console.log(!location)
      return <View style={[styles.activityIndicatorContainer, styles.activityIndicator]}>
          <ActivityIndicator  />
        </View>
    }
    console.log("hi ha location")
    return <View style={styles.container}> 
      <MapView ref={ref => setMapRef(ref)}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{...location}}
                />
    </View>
  }, [location])

  return (
    <View>
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
