import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

const mediaUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route}) => {
  const {filename, title} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{title}</Text>
      <Image
        source={{uri: mediaUrl + filename}}
        style={{width: 300, height: 300}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
