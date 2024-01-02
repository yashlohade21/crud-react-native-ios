import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Pressable, TextInput, FlatList, ActivityIndicator,} from 'react-native';
import Notes from './Notes';
import { MaterialIcons } from '@expo/vector-icons';
import { app, db, getFirestore, collection, addDoc, getDocs, } from '../firebase/index';

export default function Crud() {
  const [title, setTitle] = useState('');
  const [notesList, setNotesList] = useState([]);

  const addNote = async () => {
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        title: title,
        isChecked: false,
      });
      console.log('Document written with ID: ', docRef.id);
      setTitle('');
      getNotesList(); // Refresh the notes list after adding a new note
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getNotesList = async () => {
    const querySnapshot = await getDocs(collection(db, 'notes'));
    const notes = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      notes.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setNotesList(notes);
  };

  useEffect(() => {
    getNotesList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Notes List</Text>
        <Text style={styles.noOfItems}>{notesList.length}</Text>
      </View>
      {notesList.length > 0 ? (
        <FlatList
          data={notesList}
          renderItem={({ item }) => (
            <Notes
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              getNotesList={getNotesList}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator />
      )}
      <TextInput
        placeholder="Add Note"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addNote}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: '500',
    flex: 1,
  },
  noOfItems: {
    fontSize: 30,
    fontWeight: '500',
    marginRight: 20,
  },
  input: {
    backgroundColor: 'lightgray',
    padding: 10,
    fontSize: 17,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 'auto',
  },
});