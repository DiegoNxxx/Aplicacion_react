import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import VolunteerDashboard from '../screens/volunteer/Dashboard';
import ProductSearch from '../screens/volunteer/ProductSearch';
import AdminDashboard from '../screens/admin/Dashboard';
import DeliveryDetails from '../screens/admin/DeliveryDetails';
import NewDelivery from '../screens/admin/NewDelivery';
import Participants from '../screens/admin/Participants';
import AllProducts from '../screens/admin/AllProducts';
import AllParticipants from '../screens/admin/AllParticipants';
import { useData } from '../context/DataContext';
import { theme } from '../styles/theme';

export type RootStackParamList = {
  Login: undefined;
  Volunteer: undefined;
  Admin: undefined;
};

export type VolunteerStackParamList = {
  DashboardVol: undefined;
  BusquedaProductos: { entregaId: string };
};

export type AdminStackParamList = {
  DashboardAdmin: undefined;
  DetallesEntrega: { id: string };
  NuevaEntrega: undefined;
  Participantes: { 
    seleccionados: string[]; 
    onDone: (ids: string[]) => void; 
  };
  TodosProductos: undefined;
  TodosParticipantes: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const VolunteerStack = createNativeStackNavigator<VolunteerStackParamList>();
const AdminStack = createNativeStackNavigator<AdminStackParamList>();

const VolunteerStackScreens = () => (
  <VolunteerStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: theme.colors.background,
      headerTitleStyle: { fontWeight: '700' },
    }}
  >
    <VolunteerStack.Screen name="DashboardVol" component={VolunteerDashboard} options={{ title: 'Entregas Activas' }} />
    <VolunteerStack.Screen name="BusquedaProductos" component={ProductSearch} options={{ title: 'Buscar Productos' }} />
  </VolunteerStack.Navigator>
);

const AdminStackScreens = () => (
  <AdminStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: theme.colors.background,
      headerTitleStyle: { fontWeight: '700' },
    }}
  >
    <AdminStack.Screen name="DashboardAdmin" component={AdminDashboard} options={{ title: 'Entregas' }} />
    <AdminStack.Screen name="DetallesEntrega" component={DeliveryDetails} options={{ title: 'Detalles de Entrega' }} />
    <AdminStack.Screen name="NuevaEntrega" component={NewDelivery} options={{ title: 'Nueva Entrega' }} />
    <AdminStack.Screen name="Participantes" component={Participants} options={{ title: 'Participantes' }} />
    <AdminStack.Screen name="TodosProductos" component={AllProducts} options={{ title: 'Productos' }} />
    <AdminStack.Screen name="TodosParticipantes" component={AllParticipants} options={{ title: 'Participantes' }} />
  </AdminStack.Navigator>
);

const RootNavigation = () => {
  const { rol } = useData();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!rol && <RootStack.Screen name="Login" component={Login} />}
        {rol === 'voluntario' && <RootStack.Screen name="Volunteer" component={VolunteerStackScreens} />}
        {rol === 'admin' && <RootStack.Screen name="Admin" component={AdminStackScreens} />}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;


