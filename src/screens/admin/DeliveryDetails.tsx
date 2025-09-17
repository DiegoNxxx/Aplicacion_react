import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useData } from '../../context/DataContext';
import { theme, commonStyles } from '../../styles/theme';

const DeliveryDetails: React.FC = () => {
  const route = useRoute<any>();
  const { id } = route.params || {};
  const { entregas, participantes } = useData();
  const entrega = entregas.find(e => e.id === id);

  if (!entrega) return <View style={styles.container}><Text>No encontrada</Text></View>;

  const participantesData = participantes.filter(p => entrega.participantes.includes(p.id));

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{entrega.titulo}</Text>
      <Text style={styles.detalle}>{entrega.fecha} · {entrega.ubicacion} · {entrega.camion}</Text>

      <Text style={styles.seccion}>Participantes</Text>
      <FlatList
        data={participantesData}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}> 
            <Text style={styles.itemTxt}>{item.nombre}</Text>
          </View>
        )}
        contentContainerStyle={{ gap: 8 }}
      />

      <Text style={[styles.seccion, { marginTop: 16 }]}>Registros de productos</Text>
      <FlatList
        data={entrega.registros || []}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}> 
            <Text style={styles.itemTxt}>{item.productoNombre}</Text>
            <Text style={styles.detalle}>Por {item.voluntarioNombre} · {item.fechaHora}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.detalle}>Sin registros aún.</Text>}
        contentContainerStyle={{ gap: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background, 
    padding: theme.spacing.lg 
  },
  titulo: { 
    ...theme.typography.h2, 
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  detalle: { 
    color: theme.colors.textSecondary, 
    marginBottom: theme.spacing.lg,
    ...theme.typography.body,
  },
  seccion: { 
    ...theme.typography.h4, 
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  item: { 
    ...commonStyles.card,
    marginBottom: theme.spacing.sm,
  },
  itemTxt: { 
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
});

export default DeliveryDetails;


