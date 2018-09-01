import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {

  state = {
    items: new Array(100).fill(0).map((a, i) => i).map(i => ({
      key: i,
      title: `Note numer ${i}`,
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
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
