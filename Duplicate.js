import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const PatientDashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;
  const [glucoseEntries, setGlucoseEntries] = useState([]);
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      scrollViewRef.current?.scrollTo({ x: currentScrollPos + 1, animated: true });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentScrollPos]);

  const scrollViewRef = React.useRef();
  const [currentScrollPos, setCurrentScrollPos] = useState(0);

  const handleAddGlucose = () => {
    if (glucoseLevel.trim() !== '') {
      const newEntry = {
        id: Date.now(),
        level: glucoseLevel.trim(),
        timestamp: new Date().toLocaleString()
      };
      setGlucoseEntries([...glucoseEntries, newEntry]);
      setGlucoseLevel('');
    }
  };

  const handleViewTodayButton = () => {
    navigation.navigate('Todayrecord');
  };

  const handleViewYesterdayButton = () => {
    navigation.navigate('Yesterdayrecord');
  };

  const handleViewGlucoseEntry = () => {
    navigation.navigate('GlucoseEntry');
  };

  const handleGlucoseTracker = () => {
    navigation.navigate('GlucoseTracker');
  };

  const handleProfileNavigation = () => {
    navigation.navigate('Patientprofile');
  };

  const handlesignOutIconClick = () => {
    navigation.navigate('Patientlogin');
  };

  const handleBellIconClick = () => {
    navigation.navigate('PatientNotification');
  };

  const handleDateButton = () => {
    setIsDatePickerVisible(true);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setIsDatePickerVisible(false);
    navigation.navigate('DateScreen', { selectedDate: formattedDate });
  };

  const handleDateCancel = () => {
    setIsDatePickerVisible(false);
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            onScroll={(event) => setCurrentScrollPos(event.nativeEvent.contentOffset.x)}>
            <Image source={require('./assets/scroll1.png')} style={styles.scrollImage} />
            <Image source={require('./assets/scroll2.png')} style={styles.scrollImage} />
            <Image source={require('./assets/scroll3.png')} style={styles.scrollImage} />
          </ScrollView>
        </View>
        <View style={styles.grayContainer}>
          <View style={styles.circleButtonContainer}>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: '#D73636', width: 80, height: 80, borderRadius: 10 }]} onPress={handleViewTodayButton}>
              <Text style={[styles.buttonText, { fontSize: 14 }]}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: '#36D7D7', width: 80, height: 80, borderRadius: 10 }]} onPress={handleViewYesterdayButton}>
              <Text style={[styles.buttonText, { fontSize: 14 }]}>Yesterday</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: '#36D736', width: 80, height: 80, borderRadius: 10 }]} onPress={handleDateButton}>
              <Text style={[styles.buttonText, { fontSize: 14 }]}>Date</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.additionalGrayContainer}>
          <FontAwesome name="home" size={35} style={styles.homeIcon} />
          <FontAwesome name="bell" size={30} style={styles.bellIcon} onPress={handleBellIconClick} />
          <FontAwesome name="sign-out" size={35} style={styles.signOutIcon} onPress={handlesignOutIconClick} />
        </View>
        <TouchableOpacity onPress={handleViewGlucoseEntry} style={[styles.button, styles.GlucoseEntryButton]}>
          <Text style={styles.buttonText}>Glucose Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGlucoseTracker} style={[styles.button, styles.glucoseTrackerButton]}>
          <Text style={styles.buttonText}>Glucose Tracker</Text>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
          {glucoseEntries.map(entry => (
            <Text key={entry.id} style={styles.entryText}>
              {entry.timestamp}: {entry.level} mg/dL
            </Text>
          ))}
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
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
    borderBottomColor: '#FFFFFF',
    height: windowHeight * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperContainer: {
    marginBottom: windowHeight * 0.10,
    backgroundColor: '#BBB7B7',
    borderRadius: 15,
    width: '80%',
    height: windowHeight * 0.2,
    top: windowHeight * 0.04,
  },
  scrollImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.45,
    height: windowWidth * 0.55,
  },
  scrollImage: {
    resizeMode: 'contain',
    width: windowWidth * 0.75,
    height: windowWidth * 0.42,
    marginRight: windowWidth * 0.02,
    borderRadius: 15,
    overflow: 'hidden',
  },
  button: {
    marginBottom: windowHeight * 0.03,
    backgroundColor: '#603F83FF',
    borderRadius: 10,
    paddingVertical: windowHeight * 0.0125,
    paddingHorizontal: windowWidth * 0.15,
    alignItems: 'center',
    top: windowWidth * -0.17
  },
  GlucoseEntryButton: {
    marginBottom: windowHeight * 0.04,
    height: windowHeight * 0.07,
    width: windowWidth * 0.75
  },
  glucoseTrackerButton: {
    marginBottom: windowHeight * 0.03,
    height: windowHeight * 0.07,
    width: windowWidth * 0.76
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowHeight * 0.030,
  },
  scrollView: {
    flex: 1,
    marginBottom: windowHeight * 0.02,
  },
  entryText: {
    fontSize: windowHeight * 0.030,
    marginBottom: windowHeight * 0.01,
  },
  additionalGrayContainer: {
    backgroundColor: '#603F83FF',
    borderRadius: 20,
    width: '60%',
    paddingVertical: windowHeight * -0.01,
    paddingHorizontal: windowWidth * 0.40,
    marginBottom: windowHeight * 0.025,
    top: windowHeight * 0.27,
    height: windowHeight * 0.09,
  },
  grayContainer: {
    backgroundColor: '#DDD',
    width: '88%',
    borderRadius: 10,
    paddingVertical: windowHeight * -0.1,
    height: windowHeight * 0.17,
    marginBottom: windowHeight * 0.02,
  },
  circleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: windowHeight * 0.033,
  },
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  homeIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    color: '#FFFFFF',
    right: windowWidth * 0.3,
    top: windowHeight * 0.025
  },
  bellIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    color: '#FFFFFF',
    top: windowHeight * -0.022,
    right: windowWidth * 0.015
  },
  signOutIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    color: '#FFFFFF',
    left: windowWidth * 0.25,
    top: windowHeight * -0.077,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    left: windowWidth * 0.34,
  },
  profileIcon: {
    color: '#000000',
    marginLeft: 'auto',
  },
});

export default PatientDashboard;
