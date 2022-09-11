import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../hooks/ApiHooks';

import {Input, Button, Text, Card} from '@rneui/themed';


const LoginForm = () => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''},
  });


  const logIn = async (loginCredentials) => {
    try {
      // console.log('Button pressed', isLoggedIn);
      const userData = await postLogin(loginCredentials);
      await AsyncStorage.setItem('userToken', userData.token);
      setUser(userData.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login - logIn', error);
    }
  };

  return (
    <Card>
      <Card.Title style={{ marginTop: 20 }}>Login</Card.Title>

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Username'
            autoCapitalize='none'
            errorMessage={
              (errors.username?.type === 'required' && (
                <Text>This is required.</Text>
              )) ||
              (errors.username?.type === 'minLength' && (
                <Text>Min 3 chars!</Text>
              ))
            }
          />
        )}
        name="username"
      />


      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            placeholder='Password'
            errorMessage={
              errors.password?.type === 'required' && <Text>This is required.</Text>
              || errors.password?.type === 'minLength' && <Text>Min 3 chars!</Text>
            }
          />
        )}
        name="password"
      />


      <Button
        title="Sign in!"
        onPress={handleSubmit((data) => logIn(data))} />
    </Card>
  );
};

export default LoginForm;
