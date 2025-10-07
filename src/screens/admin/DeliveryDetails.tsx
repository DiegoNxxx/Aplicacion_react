import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useData } from '../../context/DataContext';
import { theme, commonStyles } from '../../styles/theme';

// Componente principal que muestra los detalles de una entrega específica
const DeliveryDetails: React.FC = () => {

  // Hook para obtener la información que viene desde la navegación (por ejemplo: { id: '123' })
  const route = useRoute<any>();
  const { id } = route.params || {};

  // Trae los datos del contexto global (lista de entregas y participantes)
  const { entregas, participantes } = useData();

  // Busca la entrega específica cuyo id coincide con el que se recibió por parámetros
  const entrega = entregas.find(e => e.id === id);

  // Si no se encuentra una entrega con ese id, muestra un mensaje de error
  if (!entrega) 
    return (
      <View style={styles.container}>
        <Text>No encontrada</Text>
      </View>
    );

  // Filtra los participantes que pertenecen a esta entrega (usando los IDs guardados en entrega.participantes)
  const participantesData = participantes.filter(p => entrega.participantes.includes(p.id));

  // Renderiza el contenido de la pantalla
  return (
    <View style={styles.container}>
      
      {/* Título de la entrega */}
      <Text style={styles.titulo}>{entrega.titulo}</Text>

      {/* Información adicional: fecha, ubicación y camión */}
      <Text style={styles.detalle}>
        {entrega.fecha} · {entrega.ubicacion} · {entrega.camion}
      </Text>

      {/* Sección de participantes */}
      <Text style={styles.seccion}>Participantes</Text>
      
      {/* Lista con los nombres de los participantes de esta entrega */}
      <FlatList
        data={participantesData}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}> 
            <Text style={styles.itemTxt}>{item.nombre}</Text>
          </View>
        )}
        // Espaciado entre los elementos
        contentContainerStyle={{ gap: 8 }}
      />

      {/* Sección de registros de productos entregados */}
      <Text style={[styles.seccion, { marginTop: 16 }]}>
        Registros de productos
      </Text>

      {/* Lista con los registros de productos (quién los entregó y cuándo) */}
      <FlatList
        data={entrega.registros || []}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}> 
            <Text style={styles.itemTxt}>{item.productoNombre}</Text>
            <Text style={styles.detalle}>
              Por {item.voluntarioNombre} · {item.fechaHora}
            </Text>
          </View>
        )}
        // Si aún no hay registros, muestra un texto
        ListEmptyComponent={
          <Text style={styles.detalle}>Sin registros aún.</Text>
        }
        contentContainerStyle={{ gap: 8 }}
      />
    </View>
  );
};

// Estilos para los componentes visuales
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