import * as Network from 'expo-network';
import * as React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
}

interface State {
  'access-token': string;
  client: string;
  email: string;
  errorMessage: string;
  expiry: number;
  hasNetworkConnection: boolean;
  password: string;
  'token-type': string;
  uid: string;
}

interface ExtendedHeaders extends Headers {
  map: {
    'access-token': string;
    client: string;
    expiry: number;
    'token-type': string;
    uid: string;
  };
}

interface ExtendedResponse extends Response {
  headers: ExtendedHeaders;
}

export class Login extends React.Component<Props, State> {
  state: State = {
    'access-token': '',
    client: '',
    email: '',
    errorMessage: '',
    expiry: 0,
    hasNetworkConnection: false,
    password: '',
    'token-type': '',
    uid: '',
  };

  async checkNetworkConnection() {
    await Network.getNetworkStateAsync()
      .then((networkState: Network.NetworkState) => {
        if (networkState.isInternetReachable) {
          this.setState({ hasNetworkConnection: true });
        }

        if (!networkState) {
          throw new Error(`There was a problem obtaining the user's connection status.`);
        }
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }

  async onLogin() {
    const { email, password } = this.state;

    await fetch(
      `http://dev.cadabra.me:3000/api/v1/auth/sign_in?email=${email}&password=${password}`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
    })
      .then((response: ExtendedResponse) => {
        this.setState({
          'access-token': response.headers.map['access-token'],
          client: response.headers.map.client,
          email,
          expiry: response.headers.map.expiry,
          password: '',
          'token-type': response.headers.map['token-type'],
          uid: response.headers.map.uid,
        });

        return response.json()
          .then(json => {
            if (response.ok) {
              return json;
            } else {
              return Promise.reject(Object.assign({}, json, {
                status: response.status,
                statusText: response.statusText,
              }));
            }
          });
      })
      .then((response: any) => {
        if (!response) {
          return Promise.reject({
            error: 'Failed to log in to app',
            status: response.errcode,
            statusText: response.message,
          });
        }
      })
      .catch((err: any) => {
        const errorMessage = err.error
          ? `${err.error}\nError #${err.status}: ${err.statusText}`
          : err.errors[0];

        this.setState({ errorMessage });
      });
  }

  render() {
    return (
      <View style={styles.container}>
       <Image
          source={require('../assets/evidenceimage.png')}
          style={styles.image}
        />
       <Image
          source={require('../assets/ESafe.png')}
          style={styles.imageTitle}
        />
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        {
          this.state.errorMessage !== ''
            ? <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            : null
        }
        <TouchableOpacity
          onPress={this.onLogin.bind(this)}
          style={{
            ...styles.button,
            backgroundColor: 'rgb(254, 213, 33)',
          }}
        >
          <Text style={{...styles.buttonTextBlack}}>Login</Text>
        </TouchableOpacity>
        {
          !this.state.hasNetworkConnection
            ? <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Camera')}
                style={{
                  ...styles.button,
                  backgroundColor: 'rgb(0, 0, 0)',
                }}
              >
                <Text style={{...styles.buttonTextYellow}}>Take Photo Offline  </Text>
              </TouchableOpacity>
            : null
        }
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
    width: 300,
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
  buttonTextYellow: {
    color: 'rgb(254, 213, 33)',
    fontWeight: 'bold',
    textAlignHorizontal: 'center',
    textAlignVertical: 'bottom',
  },
  errorMessage: {
    color: 'rgb(255, 59, 48)',
    paddingBottom: 20,
    paddingHorizontal: 40,
    paddingTop: 10,
    textAlign: 'center',
  },
  image: {
    height: 125.75,
    marginBottom: 5,
    width: 83.625,
  },
  imageTitle : {
    height: 91.75,
    marginVertical: 0,
    width: 203.25,
  },
  input: {
    borderColor: 'black',
    borderRadius: 6,
    borderWidth: 1,
    fontWeight: 'bold',
    height: 44,
    marginBottom: 20,
    padding: 10,
    width: 300,
  },
});
