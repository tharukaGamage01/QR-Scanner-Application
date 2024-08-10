import React from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

// const Stack = createStackNavigator();
const AboutUs = () => {

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.navigationBar}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.logoText}>See
        <Text style={styles.qText}>Q</Text>
        <Text>u</Text>
        <Text style={styles.rText}>R</Text>e
      </Text>
      <Text style={styles.motto}>Where Security Meets Simplicity</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description1}>
        Welcome to SeeQuRe, your go-to platform where security meets simplicity.
        We are dedicated to providing innovative solutions that empower users to safeguard their online experiences effortlessly.
          </Text>

          <Text style={styles.description2}>At SeeQuRe, our mission is simple: to make digital security accessible to everyone.
          We understand the growing importance of protecting personal data and ensuring online safety in today's interconnected world.
          With our intuitive tools and user-friendly interface, we strive to equip individuals with the knowledge and tools
          they need to navigate the digital landscape securely.</Text>

          <Text style={styles.description3}>Join us on this journey towards a safer, more secure online environment.
          Explore SeeQuRe today and experience the difference for yourself.</Text>

          <Text style={styles.description4}>Thank you for choosing SeeQuRe!</Text>
      </View>

      {/* <View style={styles.developerContainer}>
        <View style={styles.developer}>
          <Text style={styles.developerDescription}>
            Development Team: 
          </Text>
          <View style={styles.dd}>
                <Text style={styles.dnames}>Tharuka Gamage</Text>
                <Text style={styles.dnames}>Wishma Pathirage</Text>
                <Text style={styles.dnames}>Thanuja Gamage</Text>
                <Text style={styles.dnames}>Shanuka Himsara</Text>
                <Text style={styles.dnames}>Sehan Damsri</Text>
            </View>
        </View>

      </View> */}
      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};
const COLORS = {
    white: "#FFFFFF",
    black: "#222222",
    darkGreen: "#007260",
    lightGreen: "#82fa63",
    blue: "#2f90d8",
    lightBlue: "#46a7e4",
    grey: "#CCCCCC",
    ash: "#7d7d7d"
};

const styles = StyleSheet.create({
    logoText: {
        fontSize: 32,
    },
    qText: {
        color: COLORS.lightGreen,
        fontWeight: 'bold',
    },
    rText: {
        color: COLORS.lightBlue,
        fontWeight: 'bold',
    },
  scrollViewContainer: {
    marginTop: 50,
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
//   projectName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     marginTop: 50,
//     textAlign: "center",
//     color: "#344055",
//   },
  motto: {
    fontSize: 18,
    marginTop: 20,
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.darkGreen,
  },
  descriptionContainer: {
    width: "90%",
    marginBottom: 1,
  },
  description1: {
    fontSize: 16,
    marginTop:20,
    textAlign: "justify",
    color: COLORS.ash,
  },
  description2: {
    fontSize: 16,
    marginTop:5,
    textAlign: "justify",
    color: COLORS.ash,
  },
  description3: {
    fontSize: 16,
    marginTop:5,
    textAlign: "justify",
    color: COLORS.ash,
  },
  description4: {
    fontSize: 16,
    marginTop:30,
    textAlign: "justify",
    color: COLORS.ash,
  },
  version: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.black,
    marginTop: 245,
  },
  navigationBar: {
    position: 'absolute',
    top: 20,
    left: 10,
  }
});



export default AboutUs;
