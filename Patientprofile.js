import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Dimensions, Text, Alert } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PatientProfile = () => {
  const [profile, setProfile] = useState({
    patientName: '',
    contactNumber: '',
    email: '',
    gender: '',
    age: '',
    bloodGroup: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://192.168.31.121/Database/Patientprofile.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN',
          },
        });
        
        const text = await response.text();
        console.log('Response Text:', text);

        try {
          const data = JSON.parse(text);
          if (data.status === 'success') {
            setProfile(data.data);
          } else if (data.status === 'error' && data.message === 'User not logged in') {
            Alert.alert('You are not logged in. Please log in to access your profile.');
          } else {
            Alert.alert('Failed to fetch profile data.');
          }
        } catch (jsonError) {
          console.error('JSON Parse Error:', jsonError);
          Alert.alert('Failed to parse profile data. Please check the server response.');
        }
      } catch (error) {
        console.error('Profile Fetch Error:', error);
        Alert.alert('Failed to fetch profile data. Please try again later.');
      }
    };

    fetchProfile();
  }, []);

  const { patientName, contactNumber, email, gender, age, bloodGroup } = profile;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        {[
          { label: 'Name', value: patientName },
          { label: 'Contact Number', value: contactNumber },
          { label: 'E-Mail', value: email },
          { label: 'Gender', value: gender },
          { label: 'Age', value: age },
          { label: 'Blood Group', value: bloodGroup },
        ].map((field, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput style={styles.input} value={field.value} editable={false} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: windowWidth * 0.05,
    paddingTop: windowHeight * 0.02,
  },
  topContainer: {
    paddingTop: 20,
    paddingRight: 30,
    backgroundColor: '#603F83FF',
    borderBottomColor: 'black',
    height: windowHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 1.2,
    top: windowHeight * -0.02,
    right: windowWidth * 0.1,
  },
  heading: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#000000',
  },
  formContainer: {
    flexGrow: 1,
    marginTop: windowHeight * 0.03,
    left: windowWidth * 0.1,
  },
  inputContainer: {
    marginBottom: windowHeight * 0.02,
    paddingHorizontal: windowHeight * 0.001,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: windowWidth * 0.046,
    marginBottom: 5,
  },
  input: {
    fontSize: windowWidth * 0.04,
    borderColor: '#FFFFFF',
    borderRadius: windowWidth * 0.04,
    padding: windowWidth * 0.028,
    width: '80%',
    backgroundColor: '#BBB7B7',
    left: windowHeight * -0.002,
  },
});

export default PatientProfile;
