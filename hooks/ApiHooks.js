import {useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import {apiUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const json = await doFetch(apiUrl + 'media?limit=7');
      const allMediaData = json.map(async (mediaItem) => {
        return await doFetch(apiUrl + 'media/' + mediaItem.file_id);
      });
      setMediaArray(await Promise.all(allMediaData));
    } catch (error) {
      console.log('something went wrong with fetching media', error);
    }
  };

  // useEffect prevents infinite loop
  // remember to use
  useEffect(() => {
    loadMedia();
  }, []);
  return {mediaArray};
};


const useLogin = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      // tähän osoitteeseen tehdään pyyntö
      return await doFetch(apiUrl + 'login', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {postLogin};
};


const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      // const response = await fetch(apiUrl + 'users/user', options);
      const userData = await doFetch(apiUrl + 'users/user', options);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {getUserByToken};
};

export {useLogin, useMedia, useUser};
