import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

type Product = {
  id: string;
  brand: string;
  category: string;
  name: string;
  image: string;
};

type FilterOption = {
  id: string;
  name: string;
};

type FilterType = 'brand' | 'category' | 'sort';

const productsData: Product[] = [
  { id: '1', brand: 'Zara', category: 'feminino', name: 'Vestido Floral', image: 'https://i.pinimg.com/736x/5d/b9/d1/5db9d181f770dcbc268f4b5afbd066ed.jpg' },
  { id: '2', brand: 'Zara', category: 'masculino', name: 'Camisa Social', image: 'https://i.pinimg.com/736x/ae/95/52/ae95527083b9b3688a1cf5a411f4a9b8.jpg' },
  { id: '3', brand: 'Zara', category: 'acessorios', name: 'brinco', image: 'https://i.pinimg.com/736x/40/b2/8c/40b28c28af0f52c997678cc85a66f201.jpg' },
  { id: '4', brand: 'Zara', category: 'bolsas', name: 'Bolsa Tote', image: 'https://i.pinimg.com/736x/be/5a/9b/be5a9b95b438fb1f4c59e3ea883230f5.jpg' },
  { id: '5', brand: 'Zara', category: 'sapatos', name: 'Sapatilha', image: 'https://i.pinimg.com/736x/f7/4e/ca/f74ecafa78bb060356283ac46db8eb06.jpg' },
  { id: '6', brand: 'Zara', category: 'feminino', name: 'Blusa de Seda', image: 'https://i.pinimg.com/736x/f3/d4/05/f3d4057f9bbcfc24ae31939427efa55c.jpg' },
  { id: '7', brand: 'Nike', category: 'esportivo', name: 'Tênis Esportivo', image: 'https://i.pinimg.com/736x/ac/c8/11/acc8115eaf39a4a9dc653f90769b0170.jpg' },
  { id: '8', brand: 'Adidas', category: 'esportivo', name: 'Tênis Casual Corrida', image: 'https://i.pinimg.com/736x/8b/67/07/8b6707e8fa216aac27eadbbb70ada035.jpg' },
  { id: '9', brand: 'MiuMiu', category: 'bolsas', name: 'bolsa de veniz vinho', image: 'https://i.pinimg.com/736x/9e/4e/9a/9e4e9a2b694b2c580d1d147e51939f67.jpg' },
  { id: '10', brand: 'Converse', category: 'sapatos', name: 'Tênis Casual', image: 'https://i.pinimg.com/736x/29/4e/b4/294eb42c549089fdbecfb76979ccb0c6.jpg' },
  { id: '11', brand: 'Nike', category: 'esportivo', name: 'Tênis Esportivo', image: 'https://i.pinimg.com/736x/42/ba/da/42bada15dbf34275ac91659a94a060e2.jpg' },
  { id: '12', brand: 'MiuMiu', category: 'sapatos', name: 'Mary Jane vinho', image: 'https://i.pinimg.com/736x/c8/0e/dd/c80edd09c839cf591cceb287898d62da.jpg' },
  { id: '13', brand: 'C&A', category: 'Vestidos', name: 'Vestido Tûle de Oncinha', image: 'https://i.pinimg.com/736x/5c/d5/47/5cd5473b9653e3cb5483f92d67fd48e1.jpg' },
  { id: '14', brand: 'Renner', category: 'buttons', name: 'Calça Jeans', image: 'https://i.pinimg.com/736x/75/a9/2b/75a92b43440a89beaf60c78ce4f92e75.jpg' },
  { id: '15', brand: 'FARM', category: 'Vestidos', name: 'Vestido Estampado', image: 'https://i.pinimg.com/736x/ec/08/6e/ec086efd5e234b9683c4cf5753f4b23e.jpg' },
  { id: '16', brand: 'H&M', category: 'feminino', name: 'Blazer', image: 'https://i.pinimg.com/736x/40/0e/13/400e131b55498933cf9618fbc7c3928a.jpg' },
  { id: '17', brand: 'H&M', category: 'feminino', name: 'Cardigan', image: 'https://i.pinimg.com/736x/5e/8b/ff/5e8bff5a82f33141528c1b233844f7ef.jpg' },
  { id: '18', brand: 'SHEIN', category: 'feminino', name: 'Blusa Xadrez', image: 'https://i.pinimg.com/736x/87/88/96/8788963c31033c634ccbf713e4311577.jpg' },

];

const brands: FilterOption[] = [
  { id: 'todos', name: 'Todas' },
  { id: 'Zara', name: 'Zara' },
  { id: 'Nike', name: 'Nike' },
  { id: 'Adidas', name: 'Adidas' },
  { id: 'MiuMiu', name: 'MiuMiu' },
  { id: 'C&A', name: 'C&A' },
  { id: 'Renner', name: 'Renner' },
  { id: 'FARM', name: 'FARM' },
  { id: 'SHEIN', name: 'SHEIN' },
];

const categories: FilterOption[] = [
  { id: 'todos', name: 'Todos' },
  { id: 'feminino', name: 'Feminino' },
  { id: 'masculino', name: 'Masculino' },
  { id: 'esportivo', name: 'Esportivo' },
];

const sortOptions: FilterOption[] = [
  { id: 'relevancia', name: 'Relevância' },
  { id: 'preco-crescente', name: 'Preço: menor a maior' },
  { id: 'preco-decrescente', name: 'Preço: maior a menor' },
];

export default function BrandProductsScreen() {
  const { brandName, initialBrandFilter } = useLocalSearchParams<{ 
    brandName: string;
    initialBrandFilter?: string;
  }>();

  
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrandFilter ? [initialBrandFilter] : ['todos']
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['todos']);
  const [selectedSort, setSelectedSort] = useState<string>('relevancia');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

  const toggleSelection = (type: FilterType, id: string) => {
    if (type === 'brand') {
      if (id === 'todos') {
        setSelectedBrands(['todos']);
      } else {
        const newSelection = selectedBrands.includes(id)
          ? selectedBrands.filter(b => b !== id)
          : [...selectedBrands.filter(b => b !== 'todos'), id];
        setSelectedBrands(newSelection.length > 0 ? newSelection : ['todos']);
      }
    } else if (type === 'category') {
      if (id === 'todos') {
        setSelectedCategories(['todos']);
      } else {
        const newSelection = selectedCategories.includes(id)
          ? selectedCategories.filter(c => c !== id)
          : [...selectedCategories.filter(c => c !== 'todos'), id];
        setSelectedCategories(newSelection.length > 0 ? newSelection : ['todos']);
      }
    } else {
      setSelectedSort(id);
    }
  };

  const filteredProducts = productsData.filter(product => {
    const brandMatch = selectedBrands.includes('todos') || selectedBrands.includes(product.brand);
    const categoryMatch = selectedCategories.includes('todos') || selectedCategories.includes(product.category);
    return brandMatch && categoryMatch;
  });

  const openFilter = (filterType: FilterType) => {
    setActiveFilter(filterType);
    setModalVisible(true);
  };

  const renderFilterModal = () => {
    if (!activeFilter) return null;

    const data = 
      activeFilter === 'brand' ? brands :
      activeFilter === 'category' ? categories : 
      sortOptions;

    const isSelected = (id: string) => {
      if (activeFilter === 'brand') return selectedBrands.includes(id);
      if (activeFilter === 'category') return selectedCategories.includes(id);
      return selectedSort === id;
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {activeFilter === 'brand' ? 'Marcas' : 
                 activeFilter === 'category' ? 'Categorias' : 'Ordenar por'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              {data.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.filterItem}
                  onPress={() => {
                    toggleSelection(activeFilter, item.id);
                    if (activeFilter === 'sort') setModalVisible(false);
                  }}
                >
                  <Text style={styles.filterItemText}>{item.name}</Text>
                  {isSelected(item.id) && (
                    <FontAwesome name="check" size={16} color="#460425" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            {activeFilter !== 'sort' && (
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  const getActiveFiltersText = () => {
    const brandText = selectedBrands.includes('todos') 
      ? 'Marcas' 
      : selectedBrands.map(b => brands.find(br => br.id === b)?.name).join(', ');
    
    const categoryText = selectedCategories.includes('todos')
      ? 'Categorias'
      : selectedCategories.map(c => categories.find(cat => cat.id === c)?.name).join(', ');

    return `${brandText} + ${categoryText}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>{brandName}</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterTab}
          onPress={() => openFilter('brand')}
        >
          <View style={styles.filterTabContent}>
            <FontAwesome name="tag" size={16} color="#333" style={styles.filterIcon} />
            <Text style={styles.filterTabText} numberOfLines={1}>
              {selectedBrands.includes('todos') 
                ? 'Marcas' 
                : selectedBrands.map(b => brands.find(br => br.id === b)?.name).join(', ')}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.filterTab}
          onPress={() => openFilter('category')}
        >
          <View style={styles.filterTabContent}>
            <FontAwesome name="filter" size={16} color="#333" style={styles.filterIcon} />
            <Text style={styles.filterTabText} numberOfLines={1}>
              {selectedCategories.includes('todos')
                ? 'Categorias'
                : selectedCategories.map(c => categories.find(cat => cat.id === c)?.name).join(', ')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterTab}
          onPress={() => openFilter('sort')}
        >
          <View style={styles.filterTabContent}>
            <FontAwesome name="sort-amount-asc" size={16} color="#333" style={styles.filterIcon} />
            <Text style={styles.filterTabText}>
              {sortOptions.find(s => s.id === selectedSort)?.name || 'Ordenar'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.activeFiltersContainer}>
        <Text style={styles.activeFiltersText}>{getActiveFiltersText()}</Text>
      </View>

      {renderFilterModal()}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productBrand}>{item.brand}</Text>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    minWidth: 100,
  },
  filterTabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    marginRight: 6,
  },
  filterTabText: {
    fontSize: 12,
    color: '#333',
    maxWidth: '80%',
  },
  activeFiltersContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  activeFiltersText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    paddingHorizontal: 16,
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  filterItem: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  filterItemText: {
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#460425',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productsContainer: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    maxWidth: Dimensions.get('window').width / 2 - 16,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productBrand: {
    paddingHorizontal: 8,
    paddingTop: 8,
    fontSize: 12,
    color: '#666',
  },
  productName: {
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  productCategory: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    fontSize: 12,
    color: '#999',
  },
});