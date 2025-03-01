import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the type for the notification object
interface Notification {
  id: string;
  title: string;
  image: string; // path to the image in assets
  datetime: string; // datetime field
  station: string; // name of the train station
}

const NotificationPage: React.FC = () => {
  // Sample notification data with added image, datetime, and station fields
  const notifications: Notification[] = [
    { 
      id: '1', 
      title: 'Violence Detected ‼', 
      image: require('../../assets/images/footage4.jpeg'), // Example image
      datetime: '2025-03-01 3:15 PM', 
      station: 'Churchill Station' 
    },
    { 
      id: '2', 
      title: 'Violence Reported ‼', 
      image: require('../../assets/images/user.jpeg'), // Example image
      datetime: '2025-03-01 12:00 PM', 
      station: 'Central Station' 
    },
    { 
      id: '3', 
      title: 'Violence Detected ‼', 
      image: require('../../assets/images/footage2.jpeg'), // Example image
      datetime: '2025-03-01 1:30 PM', 
      station: 'Park Station' 
    },
    { 
      id: '4', 
      title: 'Violence Detected ‼', 
      image: require('../../assets/images/footage3.jpeg'), // Example image
      datetime: '2025-03-01 2:00 PM', 
      station: 'Main Station' 
    },
    { 
        id: '5', 
        title: 'Violence Reported ‼', 
        image: require('../../assets/images/user.jpeg'), // Example image
        datetime: '2025-03-01 1:30 PM', 
        station: 'Bay Enterprise Square Station' 
      },
  ];

  // Render each notification item
  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={styles.card} onPress={() => alert(`You clicked on: ${item.title}`)}>
      {/* Display the image */}
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.datetime}>{item.datetime}</Text>
      <Text style={styles.station}>Location: {item.station}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
    </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#023E8A',
      padding: 20,
    },
    header: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row', // To allow for icons or other elements
      },
      headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
      },
    card: {
      backgroundColor: '#fff',
      marginBottom: 15,
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    image: {
      width: '100%', // Set to 100% to take full width of the card
      height: 200,   // Set a fixed height for the rectangle
      borderRadius: 10,  // Optional: make rounded corners
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    datetime: {
      fontSize: 12,
      color: '#888',
      marginTop: 5,
    },
    station: {
      fontSize: 12,
      color: '#888',
      marginTop: 5,
    },
  });
  
  export default NotificationPage;
  
