import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const DoctorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Initialize navigation hook

  const handleLogin = () => {
    // Perform your login logic here
    const loginApiUrl = 'http://192.168.31.121/Database/Doctorlogin.php';
    
    fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Login Response:', data);
        if (data.status === 'success') {
          Alert.alert('Login successful!');
          navigation.navigate('Doctordashboard', { username }); // Pass username to dashboard screen
        } else {
          Alert.alert('Invalid username or password. Please try again.');
        }
      })
      .catch(error => {
        console.error('Login Error:', error);
        Alert.alert('Login failed. Please try again later.');
      });
  };
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Doctor Login</Text>
      </View>
      <View style={styles.backgroundContainer}>
        <View style={styles.container}>
          <Image
            source={require('./assets/scroll2.png')} // Replace with the actual path to your image
            style={styles.icon}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={text => setUsername(text)}
              placeholderTextColor="#000000" // Black placeholder text color
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholderTextColor="#000000" // Black placeholder text color
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.05,
    backgroundColor: '#603F83FF',
    borderBottomWidth: 0,
    borderBottomColor: 'black',
    height: windowHeight * 0.14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    backgroundColor: '#F0F0F0', // Background color for the container
    justifyContent: 'center',
    width: '90%', // Adjust width as needed
    height: windowHeight * 0.35, // Set to 40% of screen height
    bottom: '-35%',
    borderRadius: windowWidth * 0.06,
    left: windowWidth * 0.05,
  },
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.03,
  },
  icon: {
    width: windowWidth * 0.8, // Relative width for better responsiveness
    height: windowWidth * 0.4, // Maintain aspect ratio
    marginBottom: windowHeight * 0.04, // Add margin bottom
    top: '-14%',
    left:windowWidth*0.08
  },
  inputContainer: {
    width: '130%',
    marginBottom: windowHeight * 0.01,
    left:windowWidth*0.08
  },
  input: {
    fontSize: 18, // Adjust the font size as needed
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: windowHeight * 0.02,
    width: '85%',
    backgroundColor: '#F9F9F9', // Light grey background color
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
    left: 25,
  },
  button: {
    backgroundColor: '#603F83FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: windowWidth * 0.1,
    marginBottom: windowHeight * 0.25,
    left:windowWidth*0.07
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    fontSize: 26, // Adjust the font size as needed
    fontWeight: 'bold',
  },
});

export default DoctorLogin;
