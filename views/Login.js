import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    try {
      // await AsyncStorage.setItem('userToken', 'abc');
      if (userToken != null) {
        const userData = await getUserByToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {
      // token invalid
      console.error('Login - checkToken', error);
    }
  };

  useEffect(() => {
    // checkToken();
  }, []);

  return (
    <View>
      <LoginForm></LoginForm>
      <RegisterForm></RegisterForm>
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
