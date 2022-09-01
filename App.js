import {StatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ImageBackground,
  Platform,
} from "react-native";

import List from './components/List';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={require('./assets/cat.jpg')}
            resizeMode='cover'
            style={styles.backgroundImage}
            imageStyle={styles.imageRounding}
          >
           <Text style={styles.imageText}>Homeless Kittens</Text>
          </ImageBackground>
        </SafeAreaView>
        <List />
      </SafeAreaView>
        <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1b1b21',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    height: 220,
    backgroundColor: 'white',
    margin: 4,
    borderRadius: 6,
    borderBottomRightRadius: 50,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  imageRounding: {
    borderRadius: 6,
    borderBottomRightRadius: 50,
  },
  Images: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#1f6dff',
    marginTop: 150,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'absolute'
  },
});

export default App;
