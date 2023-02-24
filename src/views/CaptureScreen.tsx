import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataService} from '../services/DataService';
import {IUserContactDetails, IUserDetails} from '../interface';
import {Button, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const CaptureScreen = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  const [userContactDetails, setUserContactDetails] =
    useState<IUserContactDetails>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchData = async () => {
        const fetchedUserDetails = await DataService.fetchUserDetails();
        const fetchedUserContactDetails =
          await DataService.fetchUserContactDetails();
        setUserDetails(fetchedUserDetails);
        setUserContactDetails(fetchedUserContactDetails);
      };
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const handleUserDetailsUpdate = async () => {
    if (userDetails) {
      const updatedData1 = {
        ...setUserDetails,
        surname: userDetails.surname,
        name: userDetails.name,
      };
      await DataService.updateUserDetails(updatedData1);
      setUserDetails(updatedData1);
      Alert.alert('Updated', 'user details successfully updated', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'view changes', onPress: () => navigation.navigate('Display')},
      ]);
    }
  };

  const handleUserContactDetailsUpdate = async () => {
    if (userContactDetails) {
      const updatedData2 = {
        ...userContactDetails,
        cell_no: userContactDetails.cell_no,
        email: userContactDetails.email,
      };
      await DataService.updateUserContactDetails(updatedData2);
      setUserContactDetails(updatedData2);
      Alert.alert('Updated', 'user contacts details successfully updated', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'view changes', onPress: () => navigation.navigate('Display')},
      ]);
    }
  };

  if (!userDetails || !userContactDetails) {
    return <Text>Loading data...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update User Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={userDetails.surname}
        onChangeText={text => setUserDetails({...userDetails, surname: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userDetails.name}
        onChangeText={text => setUserDetails({...userDetails, name: text})}
      />
      <Button
        style={styles.button}
        buttonColor="#42b3f5"
        mode="contained"
        onPress={handleUserDetailsUpdate}>
        Update User Details
      </Button>
      <Divider style={styles.divider} />

      <Text style={styles.heading}>Update User Contact Details</Text>
      <TextInput
        placeholder="cell No."
        style={styles.input}
        value={userContactDetails.cell_no}
        onChangeText={text =>
          setUserContactDetails({...userContactDetails, cell_no: text})
        }
      />
      <TextInput
        placeholder="email"
        style={styles.input}
        value={userContactDetails.email}
        onChangeText={text =>
          setUserContactDetails({...userContactDetails, email: text})
        }
      />
      <Button
        style={styles.button}
        buttonColor="#42b3f5"
        mode="contained"
        onPress={handleUserContactDetailsUpdate}>
        Update Contact Details
      </Button>
    </View>
  );
};

export default CaptureScreen;

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    marginVertical: 6,
    borderRadius: 10,
  },
  container: {
    padding: 10,
  },
  button: {
    marginVertical: 20,
  },
  divider: {
    borderWidth: 1,
    borderColor: '#42b3f5',
    marginBottom: 20,
    borderStyle: 'dashed',
  },
});
