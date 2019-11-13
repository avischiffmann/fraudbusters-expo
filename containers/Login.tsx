import * as React from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
}

interface State {
  'access-token': string;
  client: string;
  email: string;
  expiry: number;
  password: string;
  'token-type': string;
  uid: string;
}

interface ExtendedHeaders extends Headers {
  client: string;
  expiry: number;
  uid: string;
}

interface ExtendedResponse extends Response {
  headers: ExtendedHeaders;
}

export class Login extends React.Component<Props, State> {
  state: State = {
    'access-token': '',
    client: '',
    email: '',
    expiry: 0,
    password: '',
    'token-type': '',
    uid: '',
  };

  async onLogin() {
    const { email, password } = this.state;

    await fetch(`http://dev.cadabra.me:3000/api/v1/auth/sign_in?email=${email}&password=${password}`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response: ExtendedResponse) => {
        this.setState({
          'access-token': response.headers['access-token'],
          client: response.headers.client,
          email,
          expiry: response.headers.expiry,
          password: '',
          'token-type': response.headers['token-type'],
          uid: response.headers.uid,
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
        const errorMessage = `${err.error}\nError #${err.status}: ${err.statusText}`;
        Alert.alert(errorMessage);
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            ...styles.title,
            color: 'rgb(0, 108, 255)',
          }}
        >
          Fraud
        </Text>
        <Text
          style={{
            ...styles.title,
            color: 'rgb(255, 59, 48)',
          }}
        >
          Busters
        </Text>
        <Image
          source={require('../assets/fraudbusters_logo.png')}
          style={styles.image}
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
        <TouchableOpacity
          onPress={this.onLogin.bind(this)}
          style={{
            ...styles.button,
            backgroundColor: 'rgb(0, 108, 255)',
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Camera')}
          style={{
            ...styles.button,
            backgroundColor: 'rgb(255, 59, 48)',
          }}
        >
          <Text>Take Photo Offline</Text>
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
    paddingVertical: 10,
    width: 200,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 200,
    marginBottom: 10,
    width: 200,
  },
  input: {
    borderColor: 'black',
    borderRadius: 6,
    borderWidth: 1,
    height: 44,
    marginBottom: 10,
    padding: 10,
    width: 200,
  },
  title: {
    fontFamily: 'Ubuntu',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
