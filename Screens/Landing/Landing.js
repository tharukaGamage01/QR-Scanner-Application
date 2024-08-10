import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function SeeQuRe() {
  const navigation = useNavigation(); // Initialize navigation

  const handleLetsGoPress = () => {
    // Navigate to login.js screen
    navigation.navigate('login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <LottieView
          source={require('./Qr code.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>
            <View style={styles.appName}>
              <Text style={styles.appNameText}>SeeQuRe</Text>
            </View>
          </Text>
          <Text style={styles.text}>
            " Your advanced QR code scanner and security shield "
          </Text>
        </View>

        <TouchableOpacity onPress={handleLetsGoPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Let's go</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#281b52',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    fontStyle: 'italic', 
    color: '#fff',  
    lineHeight: 23,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  hero: {
    backgroundColor: '#46a7e4',
    margin: 12,
    borderRadius: 16,
    padding: 16,
  },
  lottieAnimation: {
    width: '100%',
    height: 500,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    paddingHorizontal: 6,
    
  },
  appNameText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000000',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
});