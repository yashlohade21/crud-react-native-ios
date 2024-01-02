import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { db, doc, updateDoc } from '../firebase/index';

const EditScreen = ({ route, navigation }) => {
  const { id, title, getNotesList } = route.params;
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSaveEdit = async () => {
    const notesRef = doc(db, 'notes', id);

    await updateDoc(notesRef, {
      title: editedTitle,
    });

    // Refresh the notes list after saving the edit
    getNotesList();

    navigation.goBack(); // Navigate back to the previous screen

    setEditedTitle('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Note</Text>
      <TextInput
        style={styles.input}
        value={editedTitle}
        onChangeText={(text) => setEditedTitle(text)}
      />
      <Pressable onPress={handleSaveEdit}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    ...Platform.select({
      ios: {
        borderBottomColor: 'black',
      },
      android: {},
    }),
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditScreen;
