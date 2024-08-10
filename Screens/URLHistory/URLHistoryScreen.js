import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Linking, TouchableOpacity, Alert, RefreshControl, Button } from "react-native";
import { useAtom } from "jotai";
import { userIdAtom } from '../userAtom';
import { firebase } from "../../components/firebaseConfig";
import { userDocIdAtom } from '../userAtom';

const UrlHistory = () => {
    const [userDocId] = useAtom(userDocIdAtom);
    const [urlList, setUrlList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchUrlHistory();
    }, [userDocId]);

    const fetchUrlHistory = async () => {
        if (userDocId) {
            try {
                setLoading(true);
                const doc = await firebase.firestore().collection("users").doc(userDocId).get();
                if (doc.exists) {
                    const data = doc.data();
                    if (data.URLs) {
                        const urls = Object.entries(data.URLs).map(([url, attribute], index) => ({ id: index + 1, url, attribute }));
                        setUrlList(urls);
                    } else {
                        setUrlList([]);
                    }
                } else {
                    setUrlList([]);
                }
            } catch (error) {
                console.error("Error fetching URL history:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchUrlHistory().then(() => setRefreshing(false));
    };

    const handleUrlPress = (url, isMalicious) => {
        if (isMalicious === "MALWARE" || isMalicious === "PHISHING" || isMalicious === "DEFACEMENT") {
            Alert.alert(
                'Malicious Link',
                'This link seems to be malicious. Do you want to continue?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => openUrl(url),
                    },
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                'Open URL',
                `Do you want to open ${url} in the default browser?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => openUrl(url),
                    },
                ],
                { cancelable: false }
            );
        }
    };
    
    const openUrl = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    const clearAllHistory = async () => {
        try {
            setLoading(true);
            await firebase.firestore().collection("users").doc(userDocId).update({
                URLs: firebase.firestore.FieldValue.delete()
            });
            setUrlList([]); // Update urlList state after clearing history
        } catch (error) {
            console.error("Error clearing URL history:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        let labelStyle = styles.safeLabel;
        let labelText = "Safe";
    
        if (item.attribute === "MALWARE" || item.attribute === "PHISHING" || item.attribute === "DEFACEMENT") {
            labelStyle = styles.maliciousLabel;
            labelText = "Malicious";
        }
        
    
        return (
            <TouchableOpacity onPress={() => handleUrlPress(item.url, item.attribute)}>
                <View style={styles.itemContainer}>
                    <Text style={styles.urlText}>{item.url}</Text>
                    <Text style={labelStyle}>{labelText}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    
    
    if (loading) {
        return (
            <View style={styles.loadingcontainer}>
                <Text style={styles.loadingTxt}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>URL History</Text>
                <TouchableOpacity onPress={clearAllHistory}>
                    <Text style={styles.clearAllButton}>Clear All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={urlList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            />
        </View>
    );

    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60, 
        paddingHorizontal: 20,
    },
    loadingcontainer: {
        flex: 1,
        marginTop: 60, 
        paddingHorizontal: 20,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    NoUrlcontainer: {
        flex: 1,
        marginTop: 60, 
        paddingHorizontal: 20,
    },
    NoUrltxtcontainer: {
        flex: 1,
        marginTop: 60, 
        paddingHorizontal: 20,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    nourlTxt: {
        fontSize: 20, 
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    loadingTxt: {
        fontSize: 20, 
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24, 
        fontWeight: 'bold',
        textAlign: 'center',
    },
    clearAllButton: {
        // backgroundColor: '#fffff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        color: 'red',
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    urlText: {
        fontSize: 16,
    },
    maliciousLabel: {
        color: 'red',
        fontWeight: 'bold',
    },
    safeLabel: {
        color: 'green',
        fontWeight: 'bold',
    },
    listContent: {
        marginTop: 20, 
    },
});

export default UrlHistory;