import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';

type Message = {
  id: string;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  userId: string;
};

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const userId = 'user123';

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: uuidv4(),
      text: message,
      userId,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      const newMessage: Message = {
        id: uuidv4(),
        imageUrl: result.assets[0].uri,
        userId,
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const handleSendVideo = () => {
    Alert.prompt('Enviar vídeo', 'Cole a URL do vídeo:', (url) => {
      if (url) {
        const newMessage: Message = {
          id: uuidv4(),
          videoUrl: url,
          userId,
        };
        setMessages(prev => [...prev, newMessage]);
      }
    });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.message, item.userId === userId && styles.myMessage]}>
      {item.text && <Text style={styles.text}>{item.text}</Text>}
      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.media} />}
      {item.videoUrl && (
        <Text style={styles.videoText}>🎥 Vídeo: <Text style={{ color: 'blue' }}>{item.videoUrl}</Text></Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chat}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handlePickImage}>
          <Ionicons name="image" size={24} color="blue" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendVideo}>
          <Ionicons name="videocam" size={24} color="green" style={styles.icon} />
        </TouchableOpacity>

        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Digite uma mensagem..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chat: {
    padding: 10,
  },
  message: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    marginHorizontal: 5,
  },
  media: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
  },
  videoText: {
    fontSize: 16,
    marginTop: 5,
  },
});