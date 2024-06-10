import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Doctordashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  const [glucoseEntries, setGlucoseEntries] = useState([]);
  const [glucoseLevel, setGlucoseLevel] = useState('');

  const handleProfileNavigation = () => {
    navigation.navigate('Doctorprofile');
  };

  const handlesearchIconClick = () => {
    navigation.navigate('DoctorSearch');
  };

  const handlesignOutIconClick = () => {
    navigation.navigate('Doctorlogin');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>{username}</Text>
        <TouchableOpacity onPress={handleProfileNavigation}>
          <FontAwesome name="user-circle-o" size={35} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            <Image source={require('./assets/scroll1.png')} style={styles.image} />
            <Image source={require('./assets/scroll2.png')} style={styles.image} />
            <Image source={require('./assets/scroll3.png')} style={styles.image} />
          </ScrollView>
        </View>
        <View style={styles.grayContainer}>
          {/* Content of the gray container */}
        </View>
        <View style={styles.additionalGrayContainer}>
          {/* Content of the additional gray container */}
          <FontAwesome name="home" size={35} style={styles.homeIcon} />
          <FontAwesome name="search" size={32} style={styles.searchIcon} onPress={handlesearchIconClick} />
          <FontAwesome name="sign-out" size={35} style={styles.signOutIcon} onPress={handlesignOutIconClick} />
        </View>
        <View style={styles.newContainer}>
          {/* Content of the new container */}
        </View>
        <ScrollView style={styles.scrollView}>
          {glucoseEntries.map(entry => (
            <Text key={entry.id} style={styles.entryText}>
              {entry.timestamp}: {entry.level} mg/dL
            </Text>
          ))}
        </ScrollView>
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
    height: windowHeight * 0.14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upperContainer: {
    marginTop: windowHeight *-0.09,
    borderRadius: 10,
    width: '90%',
    paddingVertical: windowHeight * 0.080,
    paddingHorizontal: windowWidth * -0.010,
    top: windowHeight * 0.04,
    left:windowWidth* 0.05,
  },
  grayContainer: {
    backgroundColor: '#DDD',
    borderRadius: 10,
    width: '90%',
    paddingVertical: windowHeight * 0.07,
    marginBottom: windowHeight * 0.02,
    left:windowWidth* 0.06,
  },
  newContainer: {
    backgroundColor: '#DDD',
    borderRadius: 10,
    width: '75%',
    paddingVertical: windowHeight * 0.15,
    marginBottom: windowHeight * 0.3,
    marginTop: windowHeight * -0.41,
    left:windowWidth* 0.13,
  },
  additionalGrayContainer: {
    backgroundColor: '#603F83FF',
    borderRadius: 15,
    width: '90%',
    paddingVertical: windowHeight * 0.022,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.1,
    marginTop: windowHeight * 0.32,
    left:windowWidth* 0.06,
  },
  homeIcon: {
    color: '#000000',
    
  },
  searchIcon: {
    color: '#000000',
  },
  signOutIcon: {
    color: '#000000',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: windowHeight*0.17,
  },
  profileIcon: {
    color: '#000000',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  image: {
    width: windowWidth * 0.9,
    height: windowHeight *0.20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  entryText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Doctordashboard;
