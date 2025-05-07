import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Link } from 'expo-router';


type RootStackParamList = {
  Search: undefined;
  BrandProducts: { brandName: string };

};

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

const brands = [
  { id: 1, name: 'SHEIN', logo: 'https://i.pinimg.com/736x/13/6f/d2/136fd2ec27accd1e7abaa09c7fe685f7.jpg' },
  { id: 2, name: 'Zara', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1200px-Zara_Logo.svg.png' },
  { id: 3, name: 'Renner', logo: 'https://assets.multiplan.com.br/Multiplan/filer_public/0f/22/0f226695-103d-43ef-b4df-37935a6f27c6/cover-renner.webp' },
  { id: 7, name: 'Converse', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/2560px-Converse_logo.svg.png' },
  { id: 4, name: 'H&M', logo: 'https://static.vecteezy.com/ti/vetor-gratis/p1/23871121-hm-marca-logotipo-simbolo-branco-projeto-galinhas-e-mauritz-roupas-moda-ilustracao-com-preto-fundo-gratis-vetor.jpg' },
  { id: 5, name: 'Nike', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpE-ugNKmDb_r8ZvspD2amj_w09-woUcLrqUogfHWntt6r4_NlEzU426XHCrRLDHBrApU&usqp=CAU' },
  { id: 6, name: 'Adidas', logo: 'https://cdn.logojoy.com/wp-content/uploads/20231013154329/Adidas-logo-2005-600x319.png' },
  { id: 8, name: 'C&A', logo: 'https://www.globalempregos.com.br/wp-content/uploads/2022/11/logo-cea-1.png' },
  { id: 9, name: 'FARM', logo: 'https://e3ba6e8732e83984.cdn.gocache.net/uploads/image/file/181294/regular_farm.png' },
];

export default function SearchScreen({ navigation }: SearchScreenProps) {
  return (
    <ScrollView style={styles.container}>
    <TextInput
      style={styles.searchBar}
      placeholder="Buscar produtos, marcas..."
    />
    <Text style={styles.sectionTitle}>Marcas Populares</Text>
    
    <View style={styles.brandsContainer}>
      {brands.map((brand) => (
        <Link 
          key={brand.id} 
          href={{ 
            pathname: "/brand",
            params: { 
              brandName: brand.name,
              initialBrandFilter: brand.name
            }
          }} 
          asChild
        >
          <TouchableOpacity style={styles.brandCard}>
            <Image source={{ uri: brand.logo }} style={styles.brandLogo} />
            <Text style={styles.brandName}>{brand.name}</Text>
          </TouchableOpacity>
        </Link>
      ))}

<Text style={styles.sectionTitle}>Sugestões para você</Text>

<View style={styles.suggestions}>

  {[...Array(4)].map((_, i) => (

    <TouchableOpacity key={i} style={styles.suggestionItem}>

      <Text style={styles.suggestionText}>Vestido floral</Text>

    </TouchableOpacity>

  ))}

</View>    
    </View>
  </ScrollView>
  );
}


  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
      padding: 15,
      backgroundColor: '#f8f8f8',
      alignItems: 'center'
    },
    logo: { fontSize: 22, fontWeight: 'bold' },
    searchBar: {
      margin: 10,
      padding: 10,
      backgroundColor: '#eee',
      borderRadius: 8
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 15,
      marginTop: 20,
      marginBottom: 10
    },
    brandsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 10
    },
    brandCard: {
      width: '30%',
      alignItems: 'center',
      marginBottom: 15,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 8
    },
    brandLogo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 5
    },
    brandName: {
      fontWeight: '600'
    },
    suggestions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 10
    },
    suggestionItem: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 20,
      margin: 5
    },
    suggestionText: {
      color: '#555'
    }
  });
