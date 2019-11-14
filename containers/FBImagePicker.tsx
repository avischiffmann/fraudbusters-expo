import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import { Alert, Button, Image, Text, TouchableOpacity, View } from 'react-native';

interface State {
  image: MediaLibrary.AssetInfo | null;
  location: any;
}

export class FBImagePicker extends React.Component {
  state: State = {
    image: null,
    location: null,
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontWeight: 'bold', fontSize: 50, color: "red"}}>
          FraudBusters
        </Text>
        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
        {!image && <Button color="red" title="Take photo" onPress={this.takePhoto} />}
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text>Find My Coords?</Text>
          <Text>Location: {this.state.location}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
