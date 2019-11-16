import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import { Alert, Button, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

interface State {
  image: MediaLibrary.AssetInfo | null;
  location: any;
  hasPhoto: boolean;
}

export class FBImagePicker extends React.Component {
  state: State = {
    image: null,
    location: null,
    hasPhoto: false,
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 20000,
      },
    );
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL, Permissions.LOCATION);

      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }

    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL, Permissions.LOCATION);

      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }
  };

  takePhoto = async () => {
    console.log("guard")
    console.log(navigator.geolocation.getCurrentPosition)
    console.log("guard")

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
    });

    if (result.cancelled === true) { // cancelled check needed so that TS knows the proper type of 'result'
      console.log(JSON.stringify(result));
      return;
    }

    const asset = await MediaLibrary.createAssetAsync(result.uri);
    const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
    console.log(assetInfo);

    this.setState({ image: asset });
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.buttonPlacement}>
      {
          !this.state.hasPhoto
            ?<Image source={require('../assets/camera.png')}
          style={styles.cameraImage} /> 
          :null 
        }
        {image && <Image source={{ uri: image.uri }} style={{ width: 430, height: 800 }} />}

         <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: 'rgb(254, 213, 33)',
          }}
          onPress={this.takePhoto}
        >
          <Text style={{...styles.buttonTextBlack}}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 6,
    elevation: 3,
    height: 44,
    margin: 10,
    paddingTop: 13,
    width: 350,
    bottom: 0,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  buttonTextBlack: {
    color: 'rgb(0, 0, 0)',
    fontWeight: 'bold',
    textAlignHorizontal: 'center',
    textAlignVertical: 'center',
  },
  buttonPlacement: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 80,
    alignItems: 'center',
  },
  cameraImage: {
    height: 80.7142857143,
    marginVertical: 300,
    width: 101.25,
    //justifyContent: "center",
    paddingBottom : 50
  }
});
