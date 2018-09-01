import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Constants } from 'expo'

export default class App extends React.Component {

  state = {
    items: new Array(20).fill(0).map((a, i) => i).map(i => ({
      key: `${i}`,
      title: `Note no ${i}`,
      content: `Lorem ipsum dolor sit amet.`,
    })),
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.items} renderItem={this.renderItem} />
      </View>
    );
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemContent}>{item.content}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    alignSelf: "stretch",
  },
  item: {
    paddingHorizontal: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  itemContent: {
    marginBottom: 10,
  }
});
