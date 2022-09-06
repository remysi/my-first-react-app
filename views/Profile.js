import {useContext, useEffect, useState} from 'react';
import {Text, Image, Button, Card, ListItem, Icon, Avatar} from '@rneui/themed';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {apiUrl, mediaUrl} from '../utils/variables';

const Profile = () => {
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
      console.log('avatar', mediaUrl + avatarFile.filename);
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
    <Card>
      <Card.Title>
        User: {user.username} (id: {user.user_id})
      </Card.Title>
      <Card.Image source={{uri: avatar}} />
      <ListItem>
        <Avatar
          icon={{name: 'contact-mail', type: 'material'}}
          containerStyle={{backgroundColor: '#aaa'}}
        />
        <Text>{user.email}</Text>
      </ListItem>
      <ListItem>
        <Icon name='person'/>
        <Text>Full name: {user.full_name}</Text>
      </ListItem>
      <Button title="Logout" onPress={logOut} />
    </Card>
  );
};

export default Profile;
