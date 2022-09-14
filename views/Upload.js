import React, {useState} from 'react';
import {Button, Card, Input, Text} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';

const Upload = () => {
  const {postMedia} = useMedia;
  const [image, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {title: '', description: ''},
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('file: ', result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('file', {
        uri: image.uri,
        name: 'testi.jpg',
        type: 'image/jpeg',
      });
      const token = await AsyncStorage.getItem('userToken');
      const post = await postMedia(token, formData);
    } catch (e) {
      console.log('Error with submitting', e);
    }
  };

  return (
    <Card>
      <Card.Image source={{uri: image?.uri || 'https://placekitten.com/300'}} />
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
            placeholder='Title'
            autoCapitalize='words'
            errorMessage={
              (errors.title?.type === 'required' && (
                <Text>This is required.</Text>
              )) ||
              (errors.title?.type === 'minLength' && (
                <Text>Min 3 chars!</Text>
              ))
            }
          />
        )}
        name="title"
      />


      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder='Description'
          />
        )}
        name="description"
      />


      <Button title="Select media" onPress={pickImage} />
      <Button title="Upload media" onPress={handleSubmit(onSubmit)} />
    </Card>
  );
};

export default Upload;
