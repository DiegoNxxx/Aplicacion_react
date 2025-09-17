import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useData } from '../../context/DataContext';
import { useRoute } from '@react-navigation/native';
import { theme, commonStyles } from '../../styles/theme';

const ProductSearch: React.FC = () => {
  const { productos, registrarProducto } = useData();
  const route = useRoute<any>();
  const entregaId = route.params?.entregaId as string;
  const [query, setQuery] = useState('');

  const resultados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return productos;
    return productos.filter(p => p.nombre.toLowerCase().includes(q));
  }, [productos, query]);

  const registrar = (productoId: string, productoNombre: string) => {
    registrarProducto(entregaId, { id: productoId, nombre: productoNombre }, 'Voluntario Demo');
    Alert.alert('Registrado', `Producto "${productoNombre}" registrado.`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar producto"
        placeholderTextColor="#999"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={resultados}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingVertical: 8, gap: 8 }}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => registrar(item.id, item.nombre)}>
            <Image source={{ uri: item.imagen }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.nombre}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: theme.spacing.lg, 
    backgroundColor: theme.colors.background 
  },
  input: {
    ...commonStyles.input,
    marginBottom: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    ...commonStyles.card,
    gap: theme.spacing.md,
  },
  imagen: { 
    width: 40, 
    height: 40, 
    borderRadius: theme.borderRadius.sm, 
    backgroundColor: theme.colors.surfaceLight 
  },
  nombre: { 
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
});

export default ProductSearch;


