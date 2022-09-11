import {View, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useLogin, useUser} from '../hooks/ApiHooks';

import {Card} from '@rneui/themed';
import {Input, Text, Button} from '@rneui/base';


const RegisterForm = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);
  //const {postLogin} = useLogin();
  const {postUser} = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {username: '', email: '', password: '', full_name: ''},
  });


  const register = async (userData) => {
    console.log('register userData', userData);
    try {
      const result = await postUser(userData);
      console.log('registration result', result);
      // AUTOLOGIN? (postLogin -> save token -> setloggedin to true)
    } catch (error) {
      console.error('RegisterForm error', error);
    }
  };

  return (
    <Card>
      <Card.Title style={{ marginTop: 20 }}>Register</Card.Title>

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({ field: { onChange, onBlur, value }}) => (
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
        }}
        render={({ field: { onChange, onBlur, value }}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Email'
            autoCapitalize='none'
            errorMessage={errors.email && <Text>This is required.</Text>}
          />
        )}
        name="email"
      />


      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({ field: { onChange, onBlur, value }}) => (
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


      <Controller
        control={control}
        rules={{
          required: false,
          minLength: 3,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Full name'
            autoCapitalize='words'
          />
        )}
        name="full_name"
      />

      <Button
        title="Register!"
        onPress={handleSubmit(register)} />
    </Card>
  );
};

export default RegisterForm;
