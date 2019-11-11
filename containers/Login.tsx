import * as React from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackScreenProps;
}

export class Login extends React.Component<Props> {
  state = {
    username: '',
    password: '',
  };

  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
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
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
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
          onPress={() => Alert.alert('Button clicked!')}
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
