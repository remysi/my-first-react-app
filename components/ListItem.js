import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';
import {vh} from 'react-native-expo-viewport-units';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.mainPostContainer}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.images}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.titles}>{props.singleMedia.title}</Text>
        <Text style={styles.texts}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainPostContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    height: vh(17),
    margin: 16,
    borderTopWidth: 13,
    borderBottomWidth: 13,
    borderColor: '#2d2d38',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  leftContainer: {
    width: '50%',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#2d2d38',
  },
  rightContainer: {
    width: '50%',
    backgroundColor: '#2d2d38',
    padding: 10,
  },
  titles: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  texts: {
    color: '#ffffff',
    fontSize: 12,
  },
  images: {
    height: '100%',
    borderRadius: 5,
    borderBottomLeftRadius: 50,
    // height: vh(20),
    // width: vh(20),
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
