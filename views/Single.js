import {ScrollView, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/variables';
import {Card, ListItem, Text, Avatar} from '@rneui/themed';
import FullSizeImage from '../components/FullSizeImage';

// contains the posted image, user id and profile picture of the poster. Currently image of a cat.
const Single = ({route}) => {
  const {filename, title, description, user_id} = route.params;
  return (
    <ScrollView>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <FullSizeImage
          source={{uri: mediaUrl + filename}}
          PlaceholderContent={<ActivityIndicator />}
          style={{marginBottom: 12}}
        />
        <Card.Divider />
        <ListItem>
          <Text>{description}</Text>
        </ListItem>
        <ListItem>
          <Avatar
            source={{uri: 'https://placekitten.com/160'}} />
            <Text>{user_id}</Text>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
