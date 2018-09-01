import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, AsyncStorage } from 'react-native';
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'

const STATUS_DONE = 'Done'
const STATUS_NEW = 'New'
const STORAGE_KEY = "notes"
export default class App extends React.Component {

  state = {
    newTitle: '',
    newContent: '',
    notes: [],
  }

  async componentDidMount() {
    try {
      const notes = await AsyncStorage.getItem(STORAGE_KEY)
      this.setState({ notes: JSON.parse(notes) || [] })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          placeholder="Enter note title"
          returnKeyType="done"
          value={this.state.newTitle}
          onChangeText={this.titleTextChanged}
        />
        <TextInput
          placeholder="Enter note content"
          returnKeyType="done"
          value={this.state.newContent}
          onChangeText={this.contentTextChanged}
        />
        <Button style={styles.itemStatusButton}
          onPress={() => this.onAddSubmit()}
          title="Add"
        />

        <FlatList
          data={this.state.notes}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemContent}>{item.content}</Text>
              <StatusIcon {...item} />
            </View>
          )}
          keyExtractor={(item, index) => `${index}`} />
      </View>
    );
  }

  titleTextChanged = text =>
    this.setState(state => ({
      newTitle: text,
    }))

  contentTextChanged = text =>
    this.setState(state => ({
      newContent: text,
    }))

  onAddSubmit() {
    this.setState(state => ({
      notes: state.notes.concat({
        title: state.newTitle,
        content: state.newContent,
        status: STATUS_NEW,
      }),
      newTitle: '',
      newContent: '',
    }))

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.notes));
  }
}

StatusIcon = ({ status }) => (
  <Ionicons
    name={status == "Done" ? "md-checkmark-circle" : "md-checkmark-circle-outline"}
    size={32}
    color={status == "Done" ? "green" : "gray"} />
)

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
  },
  itemStatusButton: {
    justifyContent: 'center'
  }
});
