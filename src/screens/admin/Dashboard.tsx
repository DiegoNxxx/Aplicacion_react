import React from 'react';
<<<<<<< HEAD
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
=======
import { FlatList, StyleSheet, Text, View, Pressable, Alert, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../context/DataContext';
import { theme, commonStyles } from '../../styles/theme';
import { MaterialIcons } from '@expo/vector-icons';


const AdminDashboard: React.FC = () => {

  const { entregas, finalizarEntrega } = useData();
  const navigation = useNavigation<any>();

  const actuales = entregas.filter(e => e.estado === 'activo');
  const pasadas = entregas.filter(e => e.estado === 'pasado');
  const screenHeight = Dimensions.get('window').height;

  // Logout handled in navigation

  const Card = ({ item }: any) => (
    <View style={styles.card}>
      <View style={{ flex: 1, paddingRight: 10, justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.cardTitulo}>{item.titulo}</Text>
          <Text style={styles.cardDetalle}>{item.fecha} · {item.ubicacion}</Text>
        </View>
        {item.estado === 'activo' && (
          <Pressable
            style={[styles.primario, { marginTop: 7 }]}
            onPress={() =>
              Alert.alert(
                'Finalizar entrega',
                '¿Quieres marcar esta entrega como finalizada?',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Finalizar', style: 'destructive', onPress: () => finalizarEntrega(item.id) }
                ]
              )
            }
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
          >
            <Text style={styles.primarioTxt}>Finalizar</Text>
          </Pressable>
        )}
      </View>
<<<<<<< HEAD
=======

      <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Image
          source={item.estado === 'activo' ? require('../../../assets/Camion.png') : require('../../../assets/Ready.png')}
          style={{ width: 70, height: 60, borderRadius: 8 }}
          resizeMode="cover"
        />
        <Pressable
          onPress={() => navigation.navigate('DetallesEntrega', { id: item.id })}
          style={styles.linkBtn}
        >
          <Text style={styles.linkBtnTxt}>Ver más</Text>
        </Pressable>
      </View>
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
    </View>
  );

  return (
    <View style={styles.container}>
<<<<<<< HEAD
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
=======
      {/* Logout button removed, will be handled in navigation */}

      {/* Logo and welcome message */}
      <View style={styles.headerBox}>
        <Text style={styles.welcomeText}>BIENVENIDO, ISAAC NUÑEZ</Text>
        <Image source={require('../../../assets/BA_image.png')} style={styles.logo} />
      </View>

  <Text style={styles.seccionTitulo}>ENTREGAS DE HOY:</Text>
      <FlatList
        data={actuales}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <Card item={item} />}
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

      <Text style={[styles.seccionTitulo, { marginTop: theme.spacing.lg }]}>ENTREGAS PASADAS:</Text>
      <View style={{ maxHeight: screenHeight * 0.3 }}>
        <FlatList
          data={pasadas}
          keyExtractor={i => i.id}
          renderItem={({ item }) => <Card item={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay entregas pasadas</Text>
          }
        />
      </View>

      {/* Bottom navigation bar */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.bottomBtn} onPress={() => navigation.navigate('NuevaEntrega')}>
          <MaterialIcons name="local-shipping" size={28} color={theme.colors.primary} />
          <Text style={styles.bottomBtnTxt}>Nueva Entrega</Text>
        </Pressable>
        <Pressable style={styles.bottomBtn} onPress={() => navigation.navigate('TodosProductos')}>
          <MaterialIcons name="inventory" size={28} color={theme.colors.primary} />
          <Text style={styles.bottomBtnTxt}>Productos</Text>
        </Pressable>
        <Pressable style={styles.bottomBtn} onPress={() => navigation.navigate('TodosParticipantes')}>
          <MaterialIcons name="group" size={28} color={theme.colors.primary} />
          <Text style={styles.bottomBtnTxt}>Participantes</Text>
        </Pressable>
      </View>
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
    </View>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
  container: {
    flex: 1,
    backgroundColor: '#FFB97A',
    paddingHorizontal: 10,
    paddingTop: 32,
    paddingBottom: 90, // for bottom bar
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    letterSpacing: 0.5,
    flex: 1,
  },
  logo: {
    width: 80,
    height: 60,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  logoutBtn: {
    position: 'absolute',
    top: 18,
    left: 12,
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 6,
  },
  seccionTitulo: {
    ...theme.typography.h4,
    marginVertical: theme.spacing.sm,
    color: theme.colors.text,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  list: { gap: theme.spacing.sm },
  card: {
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
  finalizarBtn: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finalizarBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
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
  entregadaBtn: {
    backgroundColor: '#FFA94D',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entregadaBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  cardTitulo: { ...theme.typography.h4, color: theme.colors.text },
  cardDetalle: { color: theme.colors.textSecondary, ...theme.typography.body },
  linkBtn: { paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs },
  linkBtnTxt: { color: theme.colors.textSecondary, ...theme.typography.caption },
  primario: { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.sm, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm },
  primarioTxt: { color: theme.colors.background, ...theme.typography.caption },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginVertical: theme.spacing.md,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 20,
    paddingBottom: 30,
  },
  bottomBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  bottomBtnTxt: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: 2,
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
  },
});

export default AdminDashboard;
<<<<<<< HEAD


=======
>>>>>>> 14ffc85ee117fe833b0291730a2723e381494113
