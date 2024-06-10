import React, { useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const { width, height } = Dimensions.get('window');

const SugarTrackingScreen = () => {
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleFromDateChange = (event, selectedDate) => {
    setShowFromDatePicker(false);
    setFromDate(selectedDate || fromDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    setShowToDatePicker(false);
    setToDate(selectedDate || toDate);
  };

  const showFromDatepicker = () => {
    setShowFromDatePicker(true);
  };

  const showToDatepicker = () => {
    setShowToDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* Content of the container at the top */}
        <Text style={styles.heading}> Patient Record</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>From</Text>
        <TouchableOpacity onPress={showFromDatepicker}>
          <Text style={styles.dateInput}>  {fromDate.toDateString()}</Text>
        </TouchableOpacity>
        {showFromDatePicker && (
          <DateTimePicker
            testID="fromDateTimePicker"
            value={fromDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleFromDateChange}
          />
        )}

        <Text style={styles.label}>To</Text>
        <TouchableOpacity onPress={showToDatepicker}>
          <Text style={styles.dateInput}>  {toDate.toDateString()}</Text>
        </TouchableOpacity>
        {showToDatePicker && (
          <DateTimePicker
            testID="toDateTimePicker"
            value={toDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleToDateChange}
          />
        )}

        {/* Export to PDF Button */}
        <TouchableOpacity style={styles.button} onPress={() => console.log("Export to PDF")}>
          <Text style={styles.buttonText}>Export to PDF</Text>
        </TouchableOpacity>

        {/* View In Graph Button */}
        <TouchableOpacity style={styles.button} onPress={() => console.log("View In Graph")}>
          <Text style={styles.buttonText}>View In Graph</Text>
        </TouchableOpacity>

        {/* Additional Gray Container */}
        <View style={styles.additionalGrayContainer}>
          {/* Content of the additional gray container */}
          <FontAwesome name="home" size={35} style={styles.homeIcon} />
          <FontAwesome name="bell" size={30} style={styles.bellIcon} />
          <FontAwesome name="sign-out" size={35} style={styles.signOutIcon} />
        </View>
        {/* End of Additional Gray Container */}
      </ScrollView>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.1, // 10% of the screen width
    paddingTop: windowHeight * 0.05, // 5% of the screen height
  },
  topContainer: {
    paddingTop: windowHeight * 0.03,
    backgroundColor: '#603F83FF',
    borderBottomWidth: 0,
    borderBottomColor: 'black',
    height: windowHeight * 0.13,
    width: '150%',
    left: windowHeight * -0.1,
    justifyContent: 'center',
    alignItems: 'center',
    top: windowHeight * -0.051,
  },
  heading: {
    fontSize: 22, // Adjust the font size as needed
    fontWeight: 'bold',
  },
  formContainer: {
    flexGrow: 1, // Occupy remaining space
    marginTop: 20, // Adjust spacing between top container and form
  },
  dateInput: {
    fontSize: 18,
    borderWidth: 1, // Changed from 0 to 1 to add a border
    borderColor: '#000000', // Changed to black
    borderRadius: 15,
    left: 37,
    padding: 12, // Increased padding
    marginBottom: windowHeight * 0.03,
    width: '80%',
    backgroundColor: '#E0E0E0', // Changed background color
  },
  label: {
    fontSize: 20,
    marginLeft: 37,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'center', // Align to center horizontally
    width: '60%', // Set button width to 60% of the screen width
    marginTop: 20, // Add margin from the previous element
    backgroundColor: '#603F83FF', // Button background color
    borderRadius: 15, // Button border radius
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 7, // Horizontal padding
    alignItems: 'center', // Center align children horizontally
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 20, // Font size
    fontWeight: 'bold', // Bold font weight
  },
  additionalGrayContainer: {
    backgroundColor: '#603F83FF',
    borderRadius: 20,
    width: '60%',
    paddingVertical: windowHeight * -0.01,
    paddingHorizontal: width * 0.40,
    marginBottom: windowHeight * 0.025,
    top: windowHeight * 0.24,
    height: windowHeight * 0.09,
    // styles for additional gray container
  },
  homeIcon: {
    width: 40, // Adjust width of the icon
    height: 40, // Adjust height of the icon
    marginRight: 10, // Adjust spacing between icons if needed
    color: '#000000', // Color of the home icon
    right: width * 0.3,
    top: windowHeight * 0.025,
  },
  bellIcon: {
    width: 40, // Adjust width of the icon
    height: 40, // Adjust height of the icon
    marginRight: 10, // Adjust spacing between icons if needed
    color: '#000000', // Color of the bell icon
    top: windowHeight * -0.022,
    right: width * 0.02,
    left: width * -0.03,
  },
  signOutIcon: {
    width: 40, // Adjust width of the icon
    height: 40, // Adjust height of the icon
    marginRight: 10, // Adjust spacing between icons if needed
    color: '#000000', // Color of the sign-out icon
    left: width * 0.25,
    top: windowHeight * -0.077,
  },
});

export default SugarTrackingScreen;
