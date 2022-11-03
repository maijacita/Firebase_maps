import React, {useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import HomeScreen from './HomeScreen';
import { useNavigation } from '@react-navigation/core'

const Maps = () => {
    const navigation = useNavigation()

    const [mapRegion, setMapRegion] = useState({
        latitude: 25.0958,
        longitude: 60.4052,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    
    
    const userLocation = async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
      }
      let location = await Location.getCurrentPositionAsync({enableHighAccuraty: true});
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: location.coords.latitudeDelta,
        longitudeDelta: location.coords.longitudeDelta,
      });
      console.log(location.coords.latitude, location.coords.longitude);
    }
    
    useEffect(() => {
      userLocation();
    }, []);

    const goBack = () => {
        navigation.navigate("Home")
      }
  return (
<View style={styles.container}>
      <MapView style={styles.map}
      region={mapRegion}>
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>
      <Button title='Get location' onPress={userLocation} />
      <TouchableOpacity
        onPress={goBack}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Maps

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - Constants.statusBarHeight,
      },
      button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        alignItems: 'center',
        marginBottom:'5%'
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
})