import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

interface State {
  image: MediaLibrary.AssetInfo | null;
}

export class FBImagePicker extends React.Component {
  state: State = {
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
        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
        {!image && <Button title="Take photo" onPress={this.takePhoto} />}
      </View>
    );
  }
}
