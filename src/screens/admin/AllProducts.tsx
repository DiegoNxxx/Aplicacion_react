import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useData } from '../../context/DataContext';
import { theme, commonStyles } from '../../styles/theme';

const AllProducts: React.FC = () => {
  const { productos } = useData();

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={i => i.id}
        contentContainerStyle={{ gap: theme.spacing.sm }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagen }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.nombre}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.lg },
  item: { ...commonStyles.card, flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
  imagen: { width: 40, height: 40, borderRadius: theme.borderRadius.sm, backgroundColor: theme.colors.surfaceLight },
  nombre: { ...theme.typography.bodyBold, color: theme.colors.text },
});

export default AllProducts;


