import {View, Text, Button, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useLogin, useUser} from '../hooks/ApiHooks';

const RegisterForm = () => {
  const {IsLoggedIn, setIsLoggedIn} = useContext(MainContext);
  //const {postLogin} = useLogin();
  const {postUser} = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {username: '', email: '', password: '', full_name: ''},
  });


  const register = async (userData) => {
    console.log('register userData', userData);
    try {
      const result = await postUser(userData);
      console.log('registration result', result);
      // AUTOLOGIN? {postLogin -> save token -> setLoggedIn to true}

      // console.log('Button pressed', isLoggedIn);
      // const userData = await postLogin(loginCredentials);
      // await AsyncStorage.setItem('userToken', userData.token);
      // setIsLoggedIn(true);
    } catch (error) {
      console.error('RegisterForm error - register', error);
    }
  };

  return (
    <View>
      <Text>Registeration Form</Text>

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({ field: { onChange, onBlur, value }}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Username'
          />
        )}
        name="username"
      />

      {errors.username?.type === 'required' && <Text>This is required.</Text>}
      {errors.username?.type === 'minLength' && <Text>Min 3 chars!</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Email'
          />
        )}
        name="email"
      />

      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            placeholder='Password'
          />
        )}
        name="password"
      />
      {errors.password?.type === 'required' && <Text>This is required.</Text>}
      {errors.password?.type === 'minLength' && <Text>Min 3 chars!</Text>}

      <Controller
        control={control}
        rules={{
          required: false,
          minLength: 3,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Full name'
          />
        )}
        name="full_name"
      />

      <Button
        title="Register!"
        onPress={handleSubmit(register)} />
    </View>
  );
};

export default RegisterForm;
