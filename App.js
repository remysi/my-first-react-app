import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView, Platform} from 'react-native';

import List from './components/List';

const App = () => {
  return (
      <SafeAreaView style={styles.container}>
        <List />
        <StatusBar style="auto" />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default App;
