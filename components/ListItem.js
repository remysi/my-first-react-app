import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {vh} from 'react-native-expo-viewport-units';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.luokkaClass}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.images}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.titles}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  luokkaClass: {
    display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      backgroundColor: 'lightgray',
      margin: 16,
      borderTopWidth: 13,
      borderBottomWidth: 13,
      borderColor: 'lightgray',
      borderStyle: 'solid',
      borderRadius: 10,
  },
  leftContainer: {
    height: vh(40),
      width: '40%',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: 'lightgray',
  },
  rightContainer: {
    width: '60%',
      backgroundColor: 'lightgray',
      padding: 10,
  },
  titles: {
    fontWeight: 'bold',
      fontSize: 20,
  },
  images: {
    height: '100%',
      borderRadius: 5,
    // height: vh(20),
    // width: vh(20),
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
