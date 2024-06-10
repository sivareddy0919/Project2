import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Image, Alert, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DoctorSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = () => {
    const searchApiUrl = 'http://192.168.31.121/Database/Doctorsearch.php'; // Your API endpoint

    fetch(searchApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: searchText }), // Ensure the key 'username' is used here
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data); // Log the response for debugging
        if (data.status === 'error') {
          throw new Error(data.message);
        }
        setSearchResults(data.patients || []); // Ensure the results are an array and set to 'patients'
      })
      .catch(error => {
        console.error('Search Error:', error);
        Alert.alert('Search failed', error.message);
      });
  };

  const renderPatientItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Patientdetails', { patient: item })}>
      <View style={styles.additionalContainer}>
        <Image source={require('./assets/PatientIcon.png')} style={styles.image} />
        {item.username && (
          <Text style={styles.patientName}>Patient Name: {item.username}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Patient Search</Text>
      </View>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={windowWidth * 0.06} color="black" style={styles.searchIcon} />
        <TextInput
          placeholder="Search Patients..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      {Array.isArray(searchResults) && searchResults.length > 0 && (
        <Text style={styles.resultsHeading}>Results</Text>
      )}
      <FlatList
        data={searchResults}
        renderItem={renderPatientItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.resultContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topContainer: {
    paddingTop: windowHeight * 0.02,
    paddingRight: windowWidth * 0.05,
    backgroundColor: '#603F83FF',
    borderBottomColor: 'black',
    height: windowHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
  },
  heading: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: windowHeight * 0.1,
    width: '80%',
    backgroundColor: '#BBB7B7',
    paddingHorizontal: windowWidth * 0.02,
    borderRadius: windowWidth * 0.04,
    top: windowHeight * -0.03,
  },
  searchIcon: {
    marginRight: windowWidth * 0.02,
  },
  searchInput: {
    flex: 1,
    fontSize: windowWidth * 0.04,
    paddingVertical: windowHeight * 0.015,
  },
  resultsHeading: {
    fontSize: windowWidth * 0.05,
    color: 'black',
    marginTop: windowHeight * 0.02,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: windowHeight * 0.05,
    width: '80%',
    backgroundColor: '#BBB7B7',
    alignItems: 'center',
  },
  additionalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight * 0.05,
    backgroundColor: '#BBB7B7',
    borderRadius: 10,
    width: '90%', // Adjusted width to fit better
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.12,
  },
  image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.1,
    marginRight: windowWidth * 0.04,
  },
  patientName: {
    fontSize: windowWidth * 0.05,
    color: 'black',
  },
});

export default DoctorSearch;
