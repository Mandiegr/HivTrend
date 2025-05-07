import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Configurações</Text>

      <TouchableOpacity style={styles.option}>
        <FontAwesome name="user" size={20} color="#000000" style={styles.icon} />
        <Text style={styles.optionText}>Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <FontAwesome name="bell" size={20} color="#000000" style={styles.icon} />
        <Text style={styles.optionText}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <FontAwesome name="lock" size={20} color="#000000" style={styles.icon} />
        <Text style={styles.optionText}>Privacidade</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <FontAwesome name="paint-brush" size={20} color="#000000" style={styles.icon} />
        <Text style={styles.optionText}>Aparência</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <FontAwesome name="info-circle" size={20} color="#000000" style={styles.icon} />
        <Text style={styles.optionText}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Excluir Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000'
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  icon: {
    marginRight: 15
  },
  optionText: {
    fontSize: 16,
    color: '#000'
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
