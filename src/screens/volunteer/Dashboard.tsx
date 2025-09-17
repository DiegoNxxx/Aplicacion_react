import React from 'react';
import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../context/DataContext';
import { theme, commonStyles } from '../../styles/theme';

const VolunteerDashboard: React.FC = () => {
  const { entregas, logout } = useData();
  const navigation = useNavigation<any>();
  const activas = entregas.filter(e => e.estado === 'activo');
  const pasadas = entregas.filter(e => e.estado === 'pasado');

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', style: 'destructive', onPress: logout },
      ]
    );
  };

  const renderItem = ({ item }: any) => (
    <Pressable style={styles.card} onPress={() => navigation.navigate('BusquedaProductos', { entregaId: item.id })}>
      <Text style={styles.cardTitulo}>{item.titulo}</Text>
      <Text style={styles.cardDetalle}>{item.fecha} · {item.ubicacion}</Text>
      <Text style={styles.cardAccion}>Registrar productos</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.seccionTitulo}>Entregas activas</Text>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnTxt}>Cerrar sesión</Text>
        </Pressable>
      </View>
      <FlatList data={activas} keyExtractor={i => i.id} renderItem={renderItem} contentContainerStyle={styles.list} />

      <Text style={[styles.seccionTitulo, { marginTop: theme.spacing.lg }]}>Entregas pasadas</Text>
      <FlatList data={pasadas} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View style={[styles.card, { opacity: 0.6 }]}> 
          <Text style={styles.cardTitulo}>{item.titulo}</Text>
          <Text style={styles.cardDetalle}>{item.fecha} · {item.ubicacion}</Text>
          <Text style={styles.cardAccion}>Finalizada</Text>
        </View>
      )} contentContainerStyle={styles.list} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: theme.spacing.lg, 
    backgroundColor: theme.colors.background 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  seccionTitulo: { 
    ...theme.typography.h3, 
    color: theme.colors.text,
  },
  logoutBtn: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  logoutBtnTxt: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
    fontSize: 12,
  },
  list: { gap: theme.spacing.sm },
  card: {
    ...commonStyles.card,
    marginBottom: theme.spacing.sm,
  },
  cardTitulo: { 
    ...theme.typography.h4, 
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  cardDetalle: { 
    color: theme.colors.textSecondary, 
    marginBottom: theme.spacing.sm,
    ...theme.typography.body,
  },
  cardAccion: { 
    color: theme.colors.primary, 
    ...theme.typography.body,
  },
});

export default VolunteerDashboard;


