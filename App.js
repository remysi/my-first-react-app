import {StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


const mediaArray = [
  {
    'key': '0',
    'title': 'Title 1',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
    'thumbnails': {
      w160: 'http://placekitten.com/160/161',
    },
    'filename': 'http://placekitten.com/2048/1920',
  },
  {
    'key': '1',
    'title': 'Title 2',
    'description': 'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
    'thumbnails': {
      w160: 'http://placekitten.com/160/164',
    },
    'filename': 'http://placekitten.com/2041/1922',
  },
  {
    'key': '2',
    'title': 'Title 3',
    'description': 'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    'thumbnails': {
      w160: 'http://placekitten.com/160/167',
    },
    'filename': 'http://placekitten.com/2039/1920',
  },
];

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={mediaArray}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.luokkaClass}>
                <View style={styles.leftContainer}>
                  <Image
                  // <View style={{ width: vw(100), height: vh(100) }}>
                    // style={{width: vh(20), height: vh(20)}}
                    style={styles.images}
                    source={{uri: item.thumbnails.w160}}
                  />
                </View>
                <View style={ styles.rightContainer }>
                  <Text style={styles.titles}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
      <StatusBar style="auto"/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  luokkaClass: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    margin: 16,
    borderTopWidth: 13,
    borderBottomWidth: 13,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  leftContainer: {
    height: vh(40),
    width: '40%',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
  },
  rightContainer: {
    width: '60%',
    backgroundColor: 'lightgray',
    padding: 10,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  images: {
    height: '100%',
    borderRadius: 5,
    // height: vh(20),
    // width: vh(20),
  }

});

export default App;
