import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import FullSizeImage from '../components/FullSizeImage';
import {Avatar, Button, Card, ListItem} from '@rneui/themed';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import MyFiles from './MyFiles';


const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);

  // placekitten... is default if user has no avatar
  const [avatar, setAvatar] = useState('https://placekitten.com/640');

  const {getFilesByTag} = useTag();

  const fetchAvatar = async () => {
    try {
      // array = taulukko
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      // haetaan taulukosta avatar tiedosto    pop palauttaa taulukon viimeisen alkion
      const avatarFile = avatarArray.pop();
      setAvatar(mediaUrl + avatarFile.filename);
      console.log('avatarArray', mediaUrl + avatarFile.filename);
    } catch (error) {
      console.error('fetchAvatar', error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log('Profile', isLoggedIn);

  const logOut = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Profile - logOut', error);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title>
          {user.full_name}
        </Card.Title>
        <FullSizeImage source={{uri: avatar}} />
        <ListItem>
          <Avatar
            icon={{name: 'contact-mail', type: 'material'}}
            containerStyle={{backgroundColor: '#aaa'}}
          />
          <ListItem.Title>{user.email}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Avatar
            icon={{name: 'person', type: 'material'}}
            containerStyle={{backgroundColor: '#aaa'}}
          />
          <ListItem.Title>
            {user.username} (id: {user.user_id})
          </ListItem.Title>
        </ListItem>
        <Button
          title="My posts"
          onPress={() => {
            navigation.navigate('MyFiles');
          }}
        />
        <Button title="Logout" onPress={logOut} />
      </Card>
    </ScrollView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
