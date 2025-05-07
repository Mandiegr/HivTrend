import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const COLUMN_WIDTH = (width - CARD_MARGIN * 3) / 2;

type ItemType = {
  id: string;
  uri: string;
  height: number;
  saved: boolean;
  liked: boolean;
};

const initialData: ItemType[] = [
  {
    id: '1',
    uri: 'https://i.pinimg.com/736x/5d/b9/d1/5db9d181f770dcbc268f4b5afbd066ed.jpg',
    height: 240,
    saved: true,
    liked: false,
  },
  {
    id: '2',
    uri: 'https://i.pinimg.com/736x/f3/d4/05/f3d4057f9bbcfc24ae31939427efa55c.jpg',
    height: 340,
    saved: false,
    liked: false,
  },
  {
    id: '3',
    uri: 'https://i.pinimg.com/736x/40/b2/8c/40b28c28af0f52c997678cc85a66f201.jpg',
    height: 340,
    saved: false,
    liked: false,
  },
  {
    id: '4',
    uri: 'https://i.pinimg.com/736x/ae/95/52/ae95527083b9b3688a1cf5a411f4a9b8.jpg',
    height: 240,
    saved: true,
    liked: false,
  },
  {
    id: '5',
    uri: 'https://i.pinimg.com/736x/f7/4e/ca/f74ecafa78bb060356283ac46db8eb06.jpg',
    height: 340,
    saved: false,
    liked: false,
  },

  {
    id: '6',
    uri: 'https://i.pinimg.com/736x/29/4e/b4/294eb42c549089fdbecfb76979ccb0c6.jpg',
    height: 240,
    saved: true,
    liked: false,
  },
  {
    id: '7',
    uri: 'https://i.pinimg.com/736x/30/b1/81/30b1818507a4f61dde6a81f957849cd9.jpg',
    height: 340,
    saved: false,
    liked: false,
  },
  {
    id: '8',
    uri: 'https://i.pinimg.com/736x/9e/4e/9a/9e4e9a2b694b2c580d1d147e51939f67.jpg',
    height: 240,
    saved: true,
    liked: false,
  },
];



export default function FeedScreen() {
  const [data, setData] = useState<ItemType[]>(initialData);
  const [search, setSearch] = useState('');
  const [leftColumn, setLeftColumn] = useState<ItemType[]>([]);
  const [rightColumn, setRightColumn] = useState<ItemType[]>([]);
  let lastTap: number | null = null;

  useEffect(() => {
    const left: ItemType[] = [];
    const right: ItemType[] = [];
    let leftHeight = 0;
    let rightHeight = 0;

    data.forEach((item) => {
      if (leftHeight <= rightHeight) {
        left.push(item);
        leftHeight += item.height;
      } else {
        right.push(item);
        rightHeight += item.height;
      }
    });

    setLeftColumn(left);
    setRightColumn(right);
  }, [data]);

  const toggleSaved = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  const toggleLike = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const handleDoubleTap = (item: ItemType) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleLike(item.id);
    }
    lastTap = now;
  };

  const renderCard = (item: ItemType) => (
    <TouchableWithoutFeedback key={item.id} onPress={() => handleDoubleTap(item)}>
      <View style={[styles.card, { height: item.height }]}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <FontAwesome
              name={item.liked ? 'heart' : 'heart-o'}
              size={24}
              color={item.liked ? '#460425' : '#0000'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSaved(item.id)}>
            <FontAwesome
              name={item.saved ? 'bookmark' : 'bookmark-o'}
              size={24}
              color={item.saved ? '#460425' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar produtos, marcas..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.columnsContainer}>
        <View style={styles.column}>{leftColumn.map(renderCard)}</View>
        <View style={styles.column}>{rightColumn.map(renderCard)}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
  },
  searchBar: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 8,
    fontSize: 16,
  },
  columnsContainer: {
    flexDirection: 'row',
    paddingHorizontal: CARD_MARGIN,
    justifyContent: 'space-between',
  },
  column: {
    width: COLUMN_WIDTH,
  },
  card: {
    marginBottom: CARD_MARGIN,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
