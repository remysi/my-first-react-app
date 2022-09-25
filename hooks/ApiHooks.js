import {useContext, useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import {apiUrl, applicationTag} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';


// jos myFilesOnly arvoa ei olla määritetty, oletusarvoksi laitetaan false
const useMedia = (update, myFilesOnly = false) => {
  const [mediaArray, setMediaArray] = useState([]);
  // tossa otetaan user tänne main contextista
  const {user} = useContext(MainContext);
  const loadMedia = async () => {
    try {
      // const json = await doFetch(apiUrl + 'tags/' + applicationTag);
      let json = await useTag().getFilesByTag(applicationTag);
      console.log(json);

      // opelta se return versio
      if (myFilesOnly) {
        json = json.filter((file) => file.user_id === user.user_id);
      }

      // kääntää json tiedoston oletuksesta (vanhasta uusimpaan) -> (uusimmasta vanhaan)
      json.reverse();

      // muokkaa alkioita ja palauttaa ne tilalle
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
    };
    try {
      // tähän osoitteeseen tehdään pyyntö
      return await doFetch(apiUrl + 'media', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

    const modifyMedia = async (token, data, fileId) => {
      const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify(data),
      };
      try {
        // tähän osoitteeseen tehdään pyyntö
        return await doFetch(apiUrl + 'media/' + fileId, options);
      } catch (error) {
        throw new Error(error.message);
      }
    };

      const deleteMedia = async (token, fileId) => {
        const options = {
          method: 'DELETE',
          headers: {'x-access-token': token},
        };
        try {
          // tähän osoitteeseen tehdään pyyntö
          return await doFetch(apiUrl + 'media/' + fileId, options);
        } catch (error) {
          throw new Error(error.message);
        }
      };

    return {mediaArray, postMedia, modifyMedia, deleteMedia};
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

  const getUserById = (token, user_id) => {
    try {
        const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const userData = doFetch(apiUrl + 'users/' + user_id, options);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // return getUserById
  return {checkUsername, getUserByToken, postUser, getUserById};
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
