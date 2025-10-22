import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// --- Types ---
type CourseType = 'Starter' | 'Mains' | 'Desserts';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
  pairing?: string;
};

type NewMenuItem = {
  name: string;
  description: string;
  course: CourseType;
  price: string;
  pairing: string;
};

type ScreenType = 'home' | 'add' | 'menu';

// --- App ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<NewMenuItem>({
    name: '',
    description: '',
    course: 'Starter',
    price: '',
    pairing: '',
  });

  // Add Menu Item
  const addMenuItem = () => {
    if (!newItem.name || !newItem.price) {
      Alert.alert('Error', 'Please fill in Name and Price');
      return;
    }
    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description,
      course: newItem.course,
      price: parseFloat(newItem.price),
      pairing: newItem.pairing,
    };
    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', description: '', course: 'Starter', price: '', pairing: '' });
    Alert.alert('Success', 'Menu item added successfully!');
    setCurrentScreen('menu');
  };

  // Delete Menu Item
  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // --- Screens ---
  const HomeScreen = () => (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to Happie App!</Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        Chef can add dishes and manage the menu.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('add')}>
        <Text style={styles.buttonText}>Add Menu Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('menu')}>
        <Text style={styles.buttonText}>View Menu</Text>
      </TouchableOpacity>
    </View>
  );

  const AddScreen = () => (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>Add a Menu Item</Text>

      <Text style={styles.label}>Dish Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newItem.name}
        onChangeText={text => setNewItem({ ...newItem, name: text })}
      />

      <Text style={styles.label}>Course *</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={newItem.course}
          onValueChange={value => setNewItem({ ...newItem, course: value as CourseType })}
        >
          <Picker.Item label="Starter" value="Starter" />
          <Picker.Item label="Mains" value="Mains" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description"
        value={newItem.description}
        onChangeText={text => setNewItem({ ...newItem, description: text })}
        multiline
      />

      <Text style={styles.la
