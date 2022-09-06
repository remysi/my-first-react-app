import {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>User: {user.username} (id: {user.user_id})</Text>
      <Image source={{uri: avatar}} style={{width: 200, height: 200}}/>
      <Text>Email: {user.email}</Text>
      <Text>User since: {user.time_created}</Text>
      <Button title="Logout" onPress={logOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
