import {useEffect, useState} from 'react';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';


const useMedia = () => {

  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(apiUrl + 'media?limit=12');
      const json = await response.json();
      console.log(json);
      const allMediaData = json.map(async (mediaItem) => {
        const response = await fetch(apiUrl + 'media/' + mediaItem.file_id);
        return await response.json();
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

export {useMedia};
