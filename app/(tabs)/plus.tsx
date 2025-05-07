import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CreatePostScreen() {
  const [text, setText] = useState('');
  const [media, setMedia] = useState<string | null>(null);

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setMedia(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Escreva algo sobre o produto..."
        multiline
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      {media && <Image source={{ uri: media }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={pickMedia}>
        <Text style={styles.buttonText}>Selecionar Foto/Vídeo</Text>
      </TouchableOpacity>
      <Button title="Publicar" color="#460425" onPress={() => console.log('Publicação enviada')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 20 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',

  },
  buttonText: { color: '#ffffff', fontWeight: 'bold' },
});
