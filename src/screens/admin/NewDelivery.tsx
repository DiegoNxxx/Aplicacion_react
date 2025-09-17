import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../context/DataContext';
import { theme, commonStyles } from '../../styles/theme';

const NewDelivery: React.FC = () => {
  const navigation = useNavigation<any>();
  const { agregarEntrega } = useData();
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [camion, setCamion] = useState('');
  const [participantes, setParticipantes] = useState<string[]>([]);

  const puedeConfirmar = useMemo(() => titulo && fecha && ubicacion && camion, [titulo, fecha, ubicacion, camion]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Nueva entrega</Text>

      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Fecha (YYYY-MM-DD)" value={fecha} onChangeText={setFecha} />
      <TextInput style={styles.input} placeholder="Ubicación" value={ubicacion} onChangeText={setUbicacion} />
      <TextInput style={styles.input} placeholder="Camión" value={camion} onChangeText={setCamion} />

      <Pressable style={styles.secBtn} onPress={() => navigation.navigate('Participantes', { seleccionados: participantes, onDone: setParticipantes })}>
        <Text style={styles.secBtnTxt}>Agregar participantes ({participantes.length})</Text>
      </Pressable>

      <Pressable
        style={[styles.primario, !puedeConfirmar && { opacity: 0.5 }]}
        disabled={!puedeConfirmar}
        onPress={() => {
          agregarEntrega({ titulo, fecha, ubicacion, camion, estado: 'activo', participantes });
          Alert.alert('Entrega creada', 'La nueva entrega ha sido registrada.');
          navigation.goBack();
        }}
      >
        <Text style={styles.primarioTxt}>Confirmar</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: theme.spacing.lg, 
    backgroundColor: theme.colors.background 
  },
  titulo: { 
    ...theme.typography.h2, 
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  input: { 
    ...commonStyles.input, 
    marginBottom: theme.spacing.md 
  },
  secBtn: { 
    ...commonStyles.buttonSecondary, 
    padding: theme.spacing.md, 
    marginBottom: theme.spacing.lg 
  },
  secBtnTxt: { 
    ...commonStyles.buttonTextSecondary,
  },
  primario: { 
    ...commonStyles.buttonPrimary, 
    paddingVertical: theme.spacing.md + 2 
  },
  primarioTxt: { 
    ...commonStyles.buttonText,
  },
});

export default NewDelivery;


