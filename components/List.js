import {FlatList, StyleSheet} from "react-native";
import React from "react";
import ListItem from './ListItem';
import {useMedia} from "../hooks/ApiHooks";

const List = (props) => {
  const {mediaArray} = useMedia();
  return (
    <FlatList style={styles.flatListStyle}
              data={mediaArray}
              renderItem={
                ({item}) => <ListItem
                  navigation={props.navigation} // without destucturing
                  singleMedia={item}
                />
              }
    />
  );
};

const styles = StyleSheet.create({
  flatListStyle: {
    backgroundColor: '#ffffff',
    width: '100%',
  },
});

export default List;
