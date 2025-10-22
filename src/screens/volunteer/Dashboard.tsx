import React from 'react';
<<<<<<< HEAD
import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
=======
import { FlatList, StyleSheet, Text, View, Pressable, Alert, Image, Dimensions } from 'react-native';
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../context/DataContext';
import { theme, commonStyles } from '../../styles/theme';

const VolunteerDashboard: React.FC = () => {
<<<<<<< HEAD
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
=======
  const { entregas } = useData();
  const navigation = useNavigation<any>();

  const activas = entregas.filter(e => e.estado === 'activo');
  const pasadas = entregas.filter(e => e.estado === 'pasado');

  // Logout handled in navigation

  const screenHeight = Dimensions.get('window').height;

  // Tarjeta de entrega activa
  const renderItem = ({ item }: any) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('BusquedaProductos', { entregaId: item.id })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={styles.cardTitulo}>{item.titulo}</Text>
          <Text style={styles.cardDetalle}>{item.fecha} · {item.ubicacion}</Text>
          <Text style={styles.cardAccion}>Registrar productos</Text>
        </View>
        <Image
          source={require('../../../assets/Camion.png')}
          style={{ width: 70, height: 60, borderRadius: 8 }}
          resizeMode="cover"
        />
      </View>
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
    </Pressable>
  );

  return (
    <View style={styles.container}>
<<<<<<< HEAD
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
=======
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.seccionTitulo}>Entregas activas</Text>
        {/* Logout button removed, will be handled in navigation */}
      </View>

      {/* Lista de entregas activas */}
      <FlatList
        data={activas}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Image
              source={require('../../../assets/EmptyBox.png')}
              style={{ width: 80, height: 80, marginBottom: 10 }}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>No hay entregas activas</Text>
          </View>
  }
      />

      {/* Entregas pasadas con maxHeight 40% */}
      <Text style={[styles.seccionTitulo, { marginTop: theme.spacing.lg }]}>Entregas pasadas</Text>
      <View style={{ maxHeight: screenHeight * 0.4 }}>
        <FlatList
          data={pasadas}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { opacity: 0.6 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.cardTitulo}>{item.titulo}</Text>
                  <Text style={styles.cardDetalle}>{item.fecha} · {item.ubicacion}</Text>
                  <Text style={styles.cardFinalizada}>Completada</Text>
                </View>
                <Image
                  source={require('../../../assets/Ready.png')}
                  style={{ width: 70, height: 60, borderRadius: 8 }}
                  resizeMode="cover"
                />
              </View>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      </View>
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
    </View>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { 
    flex: 1, 
    padding: theme.spacing.lg, 
    backgroundColor: theme.colors.background 
=======
  container: {
    flex: 1,
    backgroundColor: '#FFB97A',
    paddingHorizontal: 10,
    paddingTop: 32,
    paddingBottom: 40,
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
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
<<<<<<< HEAD
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
=======
    backgroundColor: '#FFF3E0',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  cardBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  vermasBtn: {
    backgroundColor: '#2ECC40',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vermasBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  cardDetalle: {
    color: '#555',
    fontSize: 14,
    marginBottom: 2,
  },
  // removed duplicate cardTitulo
  // removed duplicate cardDetalle
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
  cardAccion: { 
    color: theme.colors.primary, 
    ...theme.typography.body,
  },
<<<<<<< HEAD
});

export default VolunteerDashboard;


=======
  cardFinalizada: {
    color: 'green',
    ...theme.typography.body,
  },
emptyBox: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: theme.spacing.lg,
},
emptyText: {
  textAlign: 'center',
  color: theme.colors.textSecondary,
  fontStyle: 'italic',
},

});

export default VolunteerDashboard;
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
