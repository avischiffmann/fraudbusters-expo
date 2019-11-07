import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export class FBImagePicker extends React.Component {
  state = {
    image: null,
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }

    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }
  };

  takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
    });

    console.log(result);

    if (result.cancelled === false) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <Button
              title="Take photo"
              onPress={this.takePhoto}
          />
        </View>
    );
  }
}
