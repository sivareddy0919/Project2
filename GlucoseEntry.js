import React, { useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const { width, height } = Dimensions.get('window');

const SugarTrackingScreen = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [sugarConcentration, setSugarConcentration] = useState('');
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleSugarConcentrationChange = (text) => {
    setSugarConcentration(text);
  };

  const handleNoteChange = (text) => {
    setNote(text);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add code to handle form submission, like sending data to backend, etc.
    console.log('Submitted:', { date, time, sugarConcentration, note });
    // Reset form fields
    setTime('');
    setSugarConcentration('');
    setNote('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* Content of the container at the top */}
        <Text style={styles.heading}>Sugar Level Entry</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.dateInput}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity onPress={showTimepicker}>
          <Text style={styles.dateInput}>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Sugar Concentration"
          value={sugarConcentration}
          onChangeText={handleSugarConcentrationChange}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TextInput
          style={styles.textarea}
          placeholder="Note"
          multiline={true}
          numberOfLines={4}
          value={note}
          onChangeText={handleNoteChange}
          placeholderTextColor="#000000" // Black placeholder text color
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
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
    paddingHorizontal: width * 0.01, // 10% of the screen width
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
    marginTop: 10, // Adjust spacing between top container and form
  },
  dateInput: {
    fontSize: 18,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: windowHeight * 0.02,
    width: '80%',
    backgroundColor: '#F9F9F9', // Light grey background color
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
    left: 37,
  },
  input: {
    fontSize: 18, // Adjust the font size as needed
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: windowHeight * 0.02,
    width: '80%',
    backgroundColor: '#F9F9F9', // Light grey background color
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
    left: 37,
  },
  textarea: {
    fontSize: 18, // Adjust the font size as needed
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: windowHeight * 0.02,
    width: '80%',
    height: windowHeight * 0.2, // 20% of the screen height
    backgroundColor: '#F9F9F9', // Light grey background color
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
    right: '-10%',
  },
  button: {
    alignSelf: 'center', // Align to center horizontally
    width: '30%', // Set button width to 50% of the screen width
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
    width: '83%',
    paddingVertical: windowHeight * -0.01,
    paddingHorizontal: width * 0.40,
    marginBottom: windowHeight * 0.025,
    top: windowHeight * 0.12,
    height: windowHeight * 0.09,
    left:'10%'
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
