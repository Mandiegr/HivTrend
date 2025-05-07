import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type ContentType = 'posts' | 'videos' | 'saved' | 'liked';

interface ContentItem {
  id: string;
  type: 'image' | 'video';
  uri: string;
  isSaved: boolean;
  isLiked: boolean;
}

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ContentType>('posts');
  
  const contentData: ContentItem[] = [
    { id: '1', type: 'image', uri: 'https://i.pinimg.com/736x/bb/50/d4/bb50d4d5b81f1da7103997a9ce3a74cb.jpg', isSaved: true, isLiked: true },
    { id: '2', type: 'video', uri: 'https://i.pinimg.com/736x/24/12/59/24125965d8bd64f24a09c3000760853d.jpg', isSaved: false, isLiked: true },
    { id: '3', type: 'image', uri: 'https://i.pinimg.com/736x/bb/50/d4/bb50d4d5b81f1da7103997a9ce3a74cb.jpg', isSaved: true, isLiked: false },
    { id: '4', type: 'video', uri: 'https://i.pinimg.com/736x/24/12/59/24125965d8bd64f24a09c3000760853d.jpg', isSaved: true, isLiked: true },
    { id: '5', type: 'image', uri: 'https://i.pinimg.com/736x/bb/50/d4/bb50d4d5b81f1da7103997a9ce3a74cb.jpg', isSaved: false, isLiked: false },
    { id: '6', type: 'video', uri: 'https://i.pinimg.com/736x/24/12/59/24125965d8bd64f24a09c3000760853d.jpg', isSaved: true, isLiked: true },
    { id: '7', type: 'image', uri: 'https://i.pinimg.com/736x/bb/50/d4/bb50d4d5b81f1da7103997a9ce3a74cb.jpg', isSaved: true, isLiked: true },
    { id: '8', type: 'image', uri: 'https://i.pinimg.com/736x/bb/50/d4/bb50d4d5b81f1da7103997a9ce3a74cb.jpg', isSaved: true, isLiked: true },
    { id: '9', type: 'image', uri: 'https://i.pinimg.com/736x/bb/50/d4/bb50d4d5b81f1da7103997a9ce3a74cb.jpg', isSaved: true, isLiked: true },
  ];

 
  const filteredContent = contentData.filter(item => {
    switch (activeTab) {
      case 'videos':
        return item.type === 'video';
      case 'saved':
        return item.isSaved;
      case 'liked':
        return item.isLiked;
      default:
        return true; 
    }
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://i.pinimg.com/736x/81/04/74/8104745b6cca62e71ae1ebada6328f20.jpg' }} style={styles.avatar} />
        <Text style={styles.username}>Amanda GR</Text>
        <View style={styles.stats}>
          <Text>Posts: {contentData.length}</Text>
          <Text>Seguidores: 340</Text>
          <Text>Seguindo: 210</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}>
            <Text>...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>create canal</Text>
          </TouchableOpacity>
        </View>
      </View>

   
      <View style={styles.tabs}>
        <TouchableOpacity 
          onPress={() => setActiveTab('posts')}
          style={styles.tabButton}
        >
          <FontAwesome
            name="th-large"
            size={24}
            color={activeTab === 'posts' ? '#00000' : '#8E8E93'}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab('videos')}
          style={styles.tabButton}
        >
          <FontAwesome
            name="play-circle"
            size={24}
            color={activeTab === 'videos' ? '#00000' : '#8E8E93'}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab('saved')}
          style={styles.tabButton}
        >
          <FontAwesome
            name="bookmark"
            size={24}
            color={activeTab === 'saved' ? '#00000' : '#8E8E93'}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab('liked')}
          style={styles.tabButton}
        >
          <FontAwesome
            name="heart"
            size={24}
            color={activeTab === 'liked' ? '#00000' : '#8E8E93'}
          />
        </TouchableOpacity>
      </View>

      {/* Filtered Content Grid */}
      <View style={styles.posts}>
        {filteredContent.map((item) => (
          <View key={item.id} style={styles.postContainer}>
            <Image source={{ uri: item.uri }} style={styles.postImage} />
            {item.type === 'video' && (
              <FontAwesome 
                name="play-circle" 
                size={24} 
                color="white" 
                style={styles.videoIcon} 
              />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: { 
    alignItems: 'center', 
    padding: 20 
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50 
  },
  username: { 
    marginTop: 10, 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  stats: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginTop: 10,
    paddingHorizontal: 20
  },
  actions: { 
    flexDirection: 'row', 
    marginTop: 10,
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    backgroundColor: '#00000',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100,
    alignItems: 'center'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderColor: '#00000',
    backgroundColor: '#FFF'
  },
  tabButton: {
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  posts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  postContainer: {
    position: 'relative',
    margin: 5
  },
  postImage: { 
    width: 120, 
    height: 120,
    borderRadius: 5
  },
  videoIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    opacity: 0.8
  },
  savedIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    opacity: 0.8
  },
  likedIcon: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    opacity: 0.8
  }
});