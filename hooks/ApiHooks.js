import {useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import {apiUrl, applicationTag} from '../utils/variables';

const useMedia = (update) => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const json = await doFetch(apiUrl + 'tags/' + applicationTag);
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
  }, [update]);

  const postMedia = async (token, data) => {
    const options = {
      method: 'POST',
      headers: {'x-access-token': token},
      body: data,
    }
    try {
      // tähän osoitteeseen tehdään pyyntö
      return await doFetch(apiUrl + 'media', options);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return {mediaArray, postMedia};
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

    const checkUsername = async (username) => {
      try {
        const result = await doFetch(apiUrl + 'users/username/' + username);
        console.log('checkUsername():', result);
        return result.available;
      } catch (error) {
        console.log('checkUsername() failed', error);
      }
    };

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

  const postUser = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      // tähän osoitteeseen tehdään pyyntö
      return await doFetch(apiUrl + 'users', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {checkUsername, getUserByToken, postUser};
};

const useTag = () => {
  // tuota getFilesByTag voi aina käyttää kun haluaa etsiä tagin mukaan
  const getFilesByTag = async (tag) => {
    // tähän osoitteeseen tehdään pyyntö
    return await doFetch(apiUrl + 'tags/' + tag);
  };

  const postTag = async (token, tag) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    };
    try {
      // tähän osoitteeseen tehdään pyyntö
      return await doFetch(apiUrl + 'tags', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };


  return {getFilesByTag, postTag};
};

export {useLogin, useMedia, useUser, useTag};
