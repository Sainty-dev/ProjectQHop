import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
interface IProps {
  displayText: string;
}
const ListItemView = (props: IProps) => {
  const {displayText} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.display_text}>{displayText}</Text>
    </View>
  );
};

export default ListItemView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderWidth: 0.3,
    borderColor: '#d4d3d2',
  },
  display_text: {
    fontWeight: '500',
    fontSize: 15,
    color: '#7a7978',
  },
});
