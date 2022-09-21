
import PropTypes from 'prop-types';
import {vh} from 'react-native-expo-viewport-units';
import {mediaUrl} from '../utils/variables';

// kun jo on olemassa esim ListItem niin voidaan importtaa eri nimella käyttämällä 'as'
import {
  ListItem as RNEListItem,
  Avatar,
  ButtonGroup,
} from '@rneui/themed';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

// singleMediassa on kaikki postin tiedot, kuten user_id
const ListItem = ({singleMedia, navigation, myFilesOnly}) => {

  // näin otetaan user tiedot postauksesta
  const {user} = useContext(MainContext);

  const {update, setUpdate} = useContext(MainContext);
  const {deleteMedia} = useMedia();

  const doDelete = () => {
    Alert.alert(
      "Deleting a file...",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK",
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            await deleteMedia(token, singleMedia.file_id);
            setUpdate(!update);
          },
        },
      ]);
  };

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

        {/* vain, jos myFilesOnly on true, niin modify ja delete napit näytetään*/}
        {/* myFilesOnly && ( */}

        {/* Tämä ehtolause tekee sen, että vain current userin postauksissa etusivulla näkyy napit */}
        {singleMedia.user_id === user.user_id && (
          <ButtonGroup
            buttons={['Modify', 'Delete']}
            onPress={async (index) => {
              // console.log('button pressed: ', index);
              if (index === 0) {
                // navigates to modify file when modify button is tapped. Also singleMedia has data of the to be modified file
                navigation.navigate('ModifyFile', singleMedia);
              } else {
                // calls function which deletes the post
                doDelete();
              }
            }}
          />
        )}
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
  myFilesOnly: PropTypes.bool,
};

export default ListItem;
