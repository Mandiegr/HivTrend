import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 3 - 12; 

const favoriteItems = [
  { id: '1', uri: 'https://i.pinimg.com/736x/40/7b/a0/407ba013d18114b2e656ac49b904ca9a.jpg', type: 'image' },
  { id: '2', uri: 'https://i.pinimg.com/736x/4f/65/41/4f654150a39f49a71253f57e074af0a3.jpg', type: 'image' },
  { id: '3', uri: 'https://i.pinimg.com/736x/c8/0e/dd/c80edd09c839cf591cceb287898d62da.jpg', type: 'image' },
  { id: '4', uri: 'https://i.pinimg.com/736x/30/b1/81/30b1818507a4f61dde6a81f957849cd9.jpg', type: 'image' },
];

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.type === 'image' ? (
              <Image
                source={{ uri: item.uri }}
                style={styles.media}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.videoPlaceholder}>🎥</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  row: { justifyContent: 'space-between' },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    width: imageSize,
    height: imageSize,
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  videoPlaceholder: {
    backgroundColor: '#ccc',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    borderRadius: 8,
  },
});
