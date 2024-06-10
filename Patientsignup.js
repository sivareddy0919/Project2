import React, { useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

const PatientSignup = () => {
  const [patientName, setPatientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');

  const handleSignup = () => {
    if (password !== reenterPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }

    const signupApiUrl = 'http://192.168.31.121/Database/Patientsignup.php';
    
    fetch(signupApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        patientName, 
        contactNumber, 
        email, 
        gender, 
        age, 
        bloodGroup, 
        username, 
        password,
        reenterPassword
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Signup Response:', data);
        if (data.status === 'success') {
          Alert.alert('Signup successful!');
        } else {
          Alert.alert('Signup failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Signup Error:', error);
        Alert.alert('Signup failed. Please try again later.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Patient Signup</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={patientName}
          onChangeText={setPatientName}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TextInput
          style={styles.input}
          placeholder="E-Mail"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TextInput
          style={styles.input}
          placeholder="Blood Group"
          value={bloodGroup}
          onChangeText={setBloodGroup}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setusername}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TextInput
          style={styles.input}
          placeholder="Re-enter Password"
          secureTextEntry={true}
          value={reenterPassword}
          onChangeText={setReenterPassword}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginText} onPress={() => console.log("Navigate to Login screen")}>
          <Text style={[styles.logintext, { fontSize: 18, color: '#3a3a3a' }]}>Already a user? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.0001,
    paddingTop: windowHeight * 0.0010,
  },
  topContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#603F83FF',
    borderBottomWidth: 0,
    borderBottomColor: 'black',
    height: windowHeight * 0.14,
    top: windowHeight * -0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    flexGrow: 1,
    marginTop: 20,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: windowHeight * 0.03,
    width: '80%',
    backgroundColor: '#F9F9F9',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    left: 37,
  },
  button: {
    alignSelf: 'center',
    width: '30%',
    marginTop: 20,
    backgroundColor: '#603F83FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    alignItems: 'center',
  },
  logintext: {
    fontSize: 16,
    color: '#3a3a3a',
  },
});

export default PatientSignup;
