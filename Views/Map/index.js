import React from 'react';
import { Platform, StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapMain extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor() {
    super()
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA * ASPECT_RATIO,
      }
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  handlerMarkerPress(data){
    this.props.handlerMarker(data)
  }

  render() {
    return (
      <MapView
        style={styles.container}
        region={this.state.region}
        onRegionChangeComplete={region => this.setState({ region })}
        zoomControlEnabled={true}
        zoomTapEnabled={true}
        zoomEnabled={true}
        scrollEnabled={true}
        draggable={true}
        showsUserLocation={true}
        // pointerEvents={false}
        pitchEnabled={false}
        followsUserLocation={true}
        showsMyLocationButton={false}
        followUserLocation={false}
        showsPointsOfInterest={true}
        showsCompass={true}
        loadingEnabled={true}
        toolbarEnabled={true}
        rotateEnabled={true}
        myLocationButton={true}
      >
        {this.props.markers.map(( val, index ) => {
          return(
            <MapView.Marker
              key={index}
              coordinate={val.map}
              title={val.name}
              description={val.description}
              onPress={() => this.handlerMarkerPress(val)}
            />
          )
        })}
       
         
      </MapView>
    )
  }
}
export default MapMain


const styles = StyleSheet.create({
  container: {
    height: '100%', 
    width: '100%' ,
    zIndex:-1
  },
});