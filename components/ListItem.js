import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {vh} from 'react-native-expo-viewport-units';

const ListItem = ({singleMedia, navigation}) => {
  const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        navigation.navigate('Single', singleMedia);
      }}
    >
      <View style={styles.leftContainer}>
        <Image
          style={styles.images}
          source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.titles}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
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
  navigation: PropTypes.object,
};

export default ListItem;
