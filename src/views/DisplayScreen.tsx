import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataService} from '../services/DataService';
import {IUserContactDetails, IUserDetails} from '../interface';
import {Card} from 'react-native-elements';

const DisplayScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  const [userContactDetails, setUserContactDetails] =
    useState<IUserContactDetails>();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchData = async () => {
        const fetchedData1 = await DataService.fetchUserDetails();
        const fetchedData2 = await DataService.fetchUserContactDetails();
        console.log('this is ', fetchedData1);
        setUserDetails(fetchedData1);
        setUserContactDetails(fetchedData2);
      };
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  if (!userDetails && !userContactDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <ImageBackground
          style={styles.BackgroundImage}
          blurRadius={10}
          source={require('../../images/bg.jpg')}>
          <View style={styles.cover}>
            <Image
              style={styles.userImage}
              source={require('../../images/user1.jpg')}
            />
            <Text style={styles.userNameText}>
              {userDetails?.name + ' ' + userDetails?.surname}
            </Text>
            <View style={styles.userContactsRow}>
              <Text style={styles.userContactsText}>
                {userContactDetails?.cell_no}
              </Text>
            </View>
            <Text style={styles.userContactsText}>
              {userContactDetails?.email}
            </Text>
          </View>
        </ImageBackground>
      </Card>
    </View>
  );
};

export default DisplayScreen;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  BackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  cover: {
    backgroundColor: 'transparent',
  },
  userContactsText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
    alignSelf: 'center',
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
});
