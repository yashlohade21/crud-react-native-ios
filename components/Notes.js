import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Platform } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { db, doc, updateDoc, deleteDoc } from '../firebase/index';
import { useNavigation } from '@react-navigation/native';

const Notes = (props) => {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(props.isChecked);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.title);
  
    const updateIsChecked = async () => {
      if (props.id) {
        const notesRef = doc(db, 'notes', props.id);
        await updateDoc(notesRef, {
          isChecked: isChecked,
        });
      }
    };
  
    const deleteNoteItem = async () => {
      if (props.id) {
        await deleteDoc(doc(db, 'notes', props.id));
        props.getNotesList();
      }
    };

    const handleEditPress = () => {
      setIsEditing(true);
      navigation.navigate('Edit', {
        id: props.id,
        title: props.title,
        getNotesList: props.getNotesList,
      });
    };
  
    const handleSaveEdit = async () => {
        const notesRef = doc(db, 'notes', props.id);
        await updateDoc(notesRef, {
          title: editedTitle,
        });
      
        // Refresh the notes list after saving the edit
        props.getNotesList();
      
        setIsEditing(false);
        updateIsChecked();
      };
  
    useEffect(() => {
      updateIsChecked();
    }, [isChecked]);
  
    return (
      <View style={styles.container}>
        <Pressable onPress={() => setIsChecked(!isChecked)}>
          {isChecked ? (
            <AntDesign name="checkcircle" size={24} color="black" />
          ) : (
            <AntDesign name="checkcircleo" size={24} color="black" />
          )}
        </Pressable>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedTitle}
            onChangeText={(text) => setEditedTitle(text)}
            onBlur={handleSaveEdit}
            autoFocus
          />
        ) : (
          <Text style={styles.title}>{props.title}</Text>
        )}
        <Pressable onPress={handleEditPress}>
          <MaterialIcons name="edit" size={24} color="black" />
        </Pressable>
        <Pressable onPress={deleteNoteItem}>
          <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  editInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '500',
    borderBottomWidth: 1,
    paddingVertical: 5,
    color: 'black',
  },
});

export default Notes;