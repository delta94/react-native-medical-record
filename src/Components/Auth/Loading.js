import React, {useEffect} from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import firebase from '../../environment/config';

const Loading = ({navigation}) => {

  useEffect(() => {
    navigation.addListener("focus", () => {
      firebase.auth().onAuthStateChanged((user) => {
        navigation.navigate(user ? "Home" : "Login");
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#2db7ff" />
    </SafeAreaView>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    "flex": 1,
    "justifyContent": "center",
    "alignItems": "center",
  },
});
