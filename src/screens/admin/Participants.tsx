import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useData } from '../../context/DataContext';
import { theme, commonStyles } from '../../styles/theme';

const Participants: React.FC = () => {
  const { participantes } = useData();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { seleccionados = [], onDone } = route.params || {};
  const [seleccion, setSeleccion] = useState<string[]>(seleccionados);

  useEffect(() => {
    navigation.setOptions({ headerRight: () => (
      <Text style={{ marginRight: 12, fontWeight: '700' }}>{seleccion.length}</Text>
    )});
  }, [navigation, seleccion]);

  const toggle = (id: string) => {
    setSeleccion(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={participantes}
        keyExtractor={i => i.id}
        contentContainerStyle={{ gap: 8, paddingVertical: 8 }}
        renderItem={({ item }) => {
          const activo = seleccion.includes(item.id);
          return (
            <Pressable style={[styles.item, activo && styles.itemActivo]} onPress={() => toggle(item.id)}>
              <Text style={[styles.itemTxt, activo && styles.itemTxtActivo]}>{item.nombre}</Text>
            </Pressable>
          );
        }}
      />
      <Pressable
        style={styles.primario}
        onPress={() => {
          if (onDone) onDone(seleccion);
          navigation.goBack();
        }}
      >
        <Text style={styles.primarioTxt}>Confirmar selección ({seleccion.length})</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background, 
    padding: theme.spacing.lg 
  },
  item: { 
    ...commonStyles.card,
    padding: theme.spacing.md + 2,
  },
  itemActivo: { 
    backgroundColor: theme.colors.primaryLight 
  },
  itemTxt: { 
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
  itemTxtActivo: { 
    color: theme.colors.primary 
  },
  primario: { 
    ...commonStyles.buttonPrimary, 
    paddingVertical: theme.spacing.md + 2, 
    marginTop: theme.spacing.sm 
  },
  primarioTxt: { 
    ...commonStyles.buttonText,
  },
});

export default Participants;


