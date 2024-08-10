
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { firebase } from "../../components/firebaseConfig";
import LottieView from 'lottie-react-native';

const RegisterPage = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno, setPhone] = useState("");
    const [password1, setPass1] = useState("");
    const [password2, setPass2] = useState("");
    const emailInputRef = useRef(null);
    const fullNameRef = useRef(null);
    const password1InputRef = useRef(null);
    const password2InputRef = useRef(null);
    const phoneNoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateName = (name) => {
        // Regular expression for name validation
        const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
        return nameRegex.test(name);
    };

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        // Regular expression for phone number validation
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const validatePassword = (password) => {
        // Password should be at least 6 characters long
        return password.length >= 6;
    };

    const validateInput = () => {
        const validations = [
            {
                condition: !name || !email || !phoneno || !password1 || !password2,
                errorMessage: "Please fill in all fields."
            },
            {
                condition: !validateName(name),
                errorMessage: "Invalid name. Name cannot contain numbers or special characters."
            },
            {
                condition: !validateEmail(email),
                errorMessage: "Invalid email address."
            },
            {
                condition: !validatePhoneNumber(phoneno),
                errorMessage: "Invalid phone number."
            },
            {
                condition: !validatePassword(password1),
                errorMessage: "Password should be at least 6 characters long."
            },
            {
                condition: password1 !== password2,
                errorMessage: "Passwords do not match."
            }
        ];

        const invalidValidation = validations.find(validation => validation.condition);
        if (invalidValidation) {
            alert(invalidValidation.errorMessage);
            return false;
        }
        return true;
    };
    const registerUser = async () => {
        if (!validateInput()) {
            return;
        }
        try {
            setIsLoading(true);
            await firebase.auth().createUserWithEmailAndPassword(email, password1);
            const user = firebase.auth().currentUser;
            const userId = user.uid;
            await createUserCollection(userId, name, email, phoneno);
            setIsLoading(false);
            Alert.alert('User Successfully Created.');
            navigation.navigate("login");
        } catch (error) {
            setIsLoading(false);
            console.error('Error signing up:', error);
            Alert.alert('Error', 'Failed to register. Please try again later.');
        }
    };

    const createUserCollection = async (uid, name, email, phone) => {
        try {
            await firebase.firestore().collection("users").add({
                name,
                email,
                phone,
                uid
            });
        } catch (error) {
            console.error('Error creating user collection:', error);
            throw new Error('Error creating user collection:', error);
        }
    };
    return (
        <SafeAreaView testID="registerPage" style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 10, marginTop: 50, alignItems: "center" }}>
                    <Text testID="title" style={styles.title}>Register</Text>
                    <Text testID="slogan" style={styles.slogan}>Join SeeQuRe: Where Security Meets Simplicity</Text>

                </View>

                <View style={{ marginBottom: 12 }} testID="createAccountSection">
                    <Text style={styles.subtitle}>Create Account</Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 400,
                        marginVertical: 8
                    }} testID="fullNameLabel">Full Name</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            ref={fullNameRef}
                            placeholder='Enter your Full Name'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(e) => {
                                setName(e)
                            }}
                            testID="fullNameInput"
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }} testID="emailSection">
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            ref={emailInputRef}
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(e) => {
                                setEmail(e)
                            }}
                            testID="emailInput"
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }} testID="phoneSection">
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Mobile Number</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='+94'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: "100%"
                            }}
                        />

                        <TextInput
                            ref={phoneNoRef}
                            placeholder='Enter your phone number'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            onChangeText={(e) => {
                                setPhone(e)
                            }}
                            testID="phoneInput"
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }} testID="passwordSection">
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            ref={password1InputRef}
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(e) => {
                                setPass1(e)
                            }}
                            testID="passwordInput"
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginBottom: 12 }} testID="confirmPasswordSection">
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Confirm Password</Text>

                    <View style={{
                        width: "100%",
                        height: 40,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            ref={password2InputRef}
                            placeholder='Re Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(e) => {
                                setPass2(e)
                            }}
                            testID="confirmPasswordInput"
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }} testID="termsCheckboxSection">
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.blue : undefined}
                        testID="termsCheckbox"
                    />

                    <Text>I agree to the terms and conditions</Text>
                </View>

                {/* <Button
                    title="Sign Up"
                    filled
                    onPress={() => registerUser(name, email, phoneno, password1)}
                    style={{
                        marginTop: 10,
                        marginBottom: 4,
                        height: 40,
                    }}
                    testID="signupButton"
                /> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isLoading && (
              <LottieView
                source={require('../../components/loading.json')}
                autoPlay
                loop
                style={{ width: 200, height: 180 }}
              />
            )}
          </View>
          {!isLoading && (
                    <Button
                    title="Sign Up"
                    filled
                    onPress={() => registerUser(name, email, phoneno, password1)}
                    style={{
                        marginTop: 10,
                        marginBottom: 4,
                        height: 40,
                    }}
                    testID="signupButton"
                    />
                    )}

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: 'center',
                    marginVertical: 10
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black, flex: 0.6, lineHeight: 15, paddingTop: 6 }}>Already have an account ? </Text>
                    <Button
                        title="Login"
                        onPress={() => navigation.navigate("login")}
                        testID="loginButton" // Add this testID
                        style={{ borderRadius: 0, borderWidth: 0, backgroundColor: 'transparent' }}
                    />

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default RegisterPage;


const COLORS = {
    white: "#FFFFFF",
    black: "#222222",
    primary: "#007260",
    secondary: "#39B68D",
    blue: "#2f90d8",
    grey: "#CCCCCC"
}

const Button = (props) => {
    const filledBgColor = props.color || COLORS.blue;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.blue;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 16, ... { color: textColor } }}>{props.title}</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        paddingBottom: 5,
        paddingVertical: 5,
        borderColor: COLORS.blue,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 32,
        // fontWeight: 'bold',
        marginVertical: 1,
        color: COLORS.black,
        marginBottom: 10,

    },
    slogan: {
        fontSize: 16,
        color: COLORS.black,
        textAlign: 'center',

    },
    subtitle: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: "bold",
        marginTop: 15
    },

})


