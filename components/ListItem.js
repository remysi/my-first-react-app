
import PropTypes from 'prop-types';
import {vh} from 'react-native-expo-viewport-units';
import {mediaUrl} from '../utils/variables';

// kun jo on olemassa esim ListItem niin voidaan importtaa eri nimella käyttämällä 'as'
import {ListItem as RNEListItem, Avatar} from '@rneui/themed';


const ListItem = ({singleMedia, navigation}) => {

  return (
    <RNEListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('Single', singleMedia);
      }}
    >
      <Avatar
        size='large'
        source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
      />

      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

/*
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
 */




ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
