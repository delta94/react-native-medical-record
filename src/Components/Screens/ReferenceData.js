import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReferenceData = () => {
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState([{code: 1, nom: 'test'}]);
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    firestore()
      .collection('medications')
      .get()
      .then(querySnapshot => {
        let medications = [];
        console.log('Total medications: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          medications.push(documentSnapshot.data());
        });
        setMedications(medications);
        setLoading(false);
      })
      .catch(error => Alert.alert(error));
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardOn(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardOn(false);
  };

  if (loading) {
    return (
      <View style={styles.activityIndicatorView}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <View style={[styles.firstInnerView, {flex: isKeyboardOn ? 1.9 : 0.8}]}>
        <Text style={styles.titleText}>Medications list</Text>
        <View style={styles.searchBarView}>
          <TouchableOpacity style={styles.searchBar}>
            <Ionicons name={'md-search'} color={'grey'} size={30} />
            <TextInput style={styles.searchBarText}>Type Here...</TextInput>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondInnerView}>
        <FlatList
          data={medications}
          keyExtractor={item => item.CODE}
          renderItem={({item}) => (
            <Text style={styles.itemsStyle}> {item.NOM} </Text>
          )}
        />
      </View>
    </View>
  );
};

export default ReferenceData;

const styles = StyleSheet.create({
  activityIndicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  firstInnerView: {
    backgroundColor: 'orange',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'serif',
    marginVertical: 15,
  },
  searchBarView: {
    alignItems: 'center',
    marginBottom: 5,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  searchBarText: {
    width: 320,
    height: 40,
  },
  secondInnerView: {
    flex: 4,
    backgroundColor: 'white',
    padding: 5,
    paddingTop: 10,
  },
  itemsStyle: {
    borderWidth: 0.5,
    borderColor: 'white',
    paddingVertical: 15,
    margin: 8,
    borderRadius: 3,
    elevation: 1,
    paddingLeft: 5,
  },
});
