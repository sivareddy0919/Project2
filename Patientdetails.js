import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Patientdetails = ({ route, navigation }) => {
  const { patient } = route.params;

  const navigateToGlucoseInsulinRecord = () => {
    // Navigate to Glucose - Insulin Record screen
    // Replace 'GlucoseInsulinRecord' with your actual screen name
    navigation.navigate('Insulinrecord');
  };

  const navigateToPatientTrackingGraph = () => {
    // Navigate to Patient Tracking Graph screen
    // Replace 'PatientTrackingGraph' with your actual screen name
    navigation.navigate('Patientgraph');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Patient Details</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.patientInfoContainer}>
          <Image source={require('./assets/PatientIcon.png')} style={styles.image} />
          <Text style={styles.patientName}>Patient Name: {patient.username}</Text>
          <Text style={styles.patientDetail}>Blood Group: {patient.bloodgroup}</Text>
          <Text style={styles.patientDetail}>Age: {patient.age}</Text>
          <Text style={styles.patientDetail}>Gender: {patient.gender}</Text>
          {/* Add more patient details as needed */}
        </View>
        <TouchableOpacity style={styles.button} onPress={navigateToGlucoseInsulinRecord}>
          <Text style={styles.buttonText}>Glucose - Insulin Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToPatientTrackingGraph}>
          <Text style={styles.buttonText}>Patient Tracking Graph</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    width: '100%',
    paddingVertical: windowHeight * 0.045,
    backgroundColor: '#603F83FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: windowWidth * 0.07,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: windowWidth * 0.05,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: windowHeight * 0.05, // Adjust the margin bottom as desired
  },
  image: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    borderRadius: windowWidth * 0.2,
    marginBottom: windowHeight * 0.01,
  },
  patientName: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: windowHeight * 0.01,
  },
  patientDetail: {
    fontSize: windowWidth * 0.05,
    color: 'black',
    marginBottom: windowHeight * 0.01,
  },
  button: {
    backgroundColor: '#603F83FF',
    padding:windowWidth*0.05,
    borderRadius: windowWidth*0.030,
    marginVertical: 10,
    marginBottom: windowHeight * 0.05, // Adjust the margin bottom as desired
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Patientdetails;
