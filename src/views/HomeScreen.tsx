import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ListItemView from '../components/ListItemView';

type content = {
  key:string,
  displayText : string
  }
  
   const GenerateContent = ():content[] => {
      const listOfDisplayText:content[] = [{key:'0',displayText:'0'}];
      for (let i = 1; i <= 1000; i++) {
        if (i % 100 === 0) {
          listOfDisplayText.push({key:`${i}`,displayText:'beep boop'});
        } else if (i % 20 === 0) {
          listOfDisplayText.push({key:`${i}`,displayText:'boop'});
        } else if (i % 5 === 0) {
          listOfDisplayText.push({key:`${i}`,displayText:'beep'});
        } else {
          listOfDisplayText.push({key:`${i}`,displayText:`${i}`});
        }
      }
      return listOfDisplayText;
    };

const HomeScreen = () => {

  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={GenerateContent()}
        renderItem={({item}) => <ListItemView displayText={item.displayText} />}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default HomeScreen;
