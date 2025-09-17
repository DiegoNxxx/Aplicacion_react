import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../context/DataContext';
import { theme, commonStyles } from '../../styles/theme';

const AdminDashboard: React.FC = () => {
  const { entregas, iniciarEntrega, finalizarEntrega, logout } = useData();
  const navigation = useNavigation<any>();
  const actuales = entregas.filter(e => e.estado === 'activo');
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

  const Card = ({ item }: any) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitulo}>{item.titulo}</Text>
        <Text style={styles.cardDetalle}>{item.fecha} · {item.ubicacion}</Text>
      </View>
      <View style={styles.cardBtns}>
        <Pressable onPress={() => navigation.navigate('DetallesEntrega', { id: item.id })} style={styles.linkBtn}>
          <Text style={styles.linkBtnTxt}>Ver más</Text>
        </Pressable>
        {item.estado === 'activo' && (
          <Pressable
            onPress={() => {
              finalizarEntrega(item.id);
              Alert.alert('Entrega finalizada', 'La entrega ha sido finalizada.');
            }}
            style={styles.primario}
          >
            <Text style={styles.primarioTxt}>Finalizar</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.titulo}>Entregas</Text>
        <View style={styles.topBarRight}>
          <View style={styles.topBarBtns}>
            <Pressable style={styles.addBtn} onPress={() => navigation.navigate('NuevaEntrega')}>
              <Text style={styles.addBtnTxt}>Nueva</Text>
            </Pressable>
            <Pressable style={styles.addBtn} onPress={() => navigation.navigate('TodosProductos')}>
              <Text style={styles.addBtnTxt}>Productos</Text>
            </Pressable>
            <Pressable style={styles.addBtn} onPress={() => navigation.navigate('TodosParticipantes')}>
              <Text style={styles.addBtnTxt}>Participantes</Text>
            </Pressable>
          </View>
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutBtnTxt}>Cerrar sesión</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Actuales</Text>
      <FlatList data={actuales} keyExtractor={i => i.id} renderItem={({ item }) => <Card item={item} />} contentContainerStyle={styles.list} />

      <Text style={[styles.seccionTitulo, { marginTop: 16 }]}>Pasadas</Text>
      <FlatList data={pasadas} keyExtractor={i => i.id} renderItem={({ item }) => <Card item={item} />} contentContainerStyle={styles.list} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background, 
    padding: theme.spacing.lg 
  },
  topBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: theme.spacing.sm 
  },
  titulo: { 
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  topBarBtns: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  topBarRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: theme.spacing.xs,
  },
  addBtn: { 
    backgroundColor: theme.colors.primary, 
    borderRadius: theme.borderRadius.md, 
    paddingHorizontal: theme.spacing.md, 
    paddingVertical: theme.spacing.sm 
  },
  addBtnTxt: { 
    color: theme.colors.background, 
    ...theme.typography.caption,
  },
  logoutBtn: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  logoutBtnTxt: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
    fontSize: 12,
  },
  seccionTitulo: { 
    ...theme.typography.h4, 
    marginVertical: theme.spacing.sm,
    color: theme.colors.text,
  },
  list: { gap: theme.spacing.sm },
  card: { 
    ...commonStyles.card, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: theme.spacing.md 
  },
  cardTitulo: { 
    ...theme.typography.h4,
    color: theme.colors.text,
  },
  cardDetalle: { 
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  cardBtns: { 
    flexDirection: 'row', 
    gap: theme.spacing.sm 
  },
  linkBtn: { 
    paddingHorizontal: theme.spacing.sm, 
    paddingVertical: theme.spacing.xs 
  },
  linkBtnTxt: { 
    color: theme.colors.textSecondary, 
    ...theme.typography.caption,
  },
  primario: { 
    backgroundColor: theme.colors.primary, 
    borderRadius: theme.borderRadius.sm, 
    paddingHorizontal: theme.spacing.md, 
    paddingVertical: theme.spacing.sm 
  },
  primarioTxt: { 
    color: theme.colors.background, 
    ...theme.typography.caption,
  },
});

export default AdminDashboard;


