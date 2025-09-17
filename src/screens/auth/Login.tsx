import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';
import { theme, commonStyles } from '../../styles/theme';

const CLAVE = 'ABC123';

const Login: React.FC = () => {
  const { setRol } = useData();
  const [clave, setClave] = useState('');
  const [rolLocal, setRolLocal] = useState<UserRole>('voluntario');

  const onLogin = () => {
    if (clave.trim().length !== 6) {
      Alert.alert('Error', 'La clave debe tener 6 caracteres.');
      return;
    }
    // Validación simple contra clave fija
    if (clave !== CLAVE) {
      Alert.alert('Acceso denegado', 'Clave incorrecta.');
      return;
    }
    setRol(rolLocal);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>BAMX</Text>
      <Text style={styles.subtitulo}>Iniciar sesión</Text>

      <View style={styles.sliderContainer}>
        <Pressable
          style={[styles.sliderBtn, rolLocal === 'voluntario' && styles.sliderBtnActivo]}
          onPress={() => setRolLocal('voluntario')}
        >
          <Text style={[styles.sliderTexto, rolLocal === 'voluntario' && styles.sliderTextoActivo]}>Voluntario</Text>
        </Pressable>
        <Pressable
          style={[styles.sliderBtn, rolLocal === 'admin' && styles.sliderBtnActivo]}
          onPress={() => setRolLocal('admin')}
        >
          <Text style={[styles.sliderTexto, rolLocal === 'admin' && styles.sliderTextoActivo]}>Administrador</Text>
        </Pressable>
      </View>

      <TextInput
        placeholder="Clave de 6 caracteres"
        placeholderTextColor="#999"
        value={clave}
        onChangeText={setClave}
        style={styles.input}
        autoCapitalize="characters"
        maxLength={6}
      />

      <Pressable style={styles.boton} onPress={onLogin}>
        <Text style={styles.botonTexto}>Entrar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.xxl,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  titulo: {
    ...theme.typography.h1,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: theme.colors.primary,
  },
  subtitulo: {
    ...theme.typography.body,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xxl,
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  sliderBtn: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  sliderBtnActivo: {
    backgroundColor: theme.colors.primary,
  },
  sliderTexto: {
    ...theme.typography.caption,
  },
  sliderTextoActivo: {
    color: theme.colors.background,
  },
  input: {
    ...commonStyles.input,
    marginBottom: theme.spacing.lg,
  },
  boton: {
    ...commonStyles.buttonPrimary,
    paddingVertical: theme.spacing.md + 2,
  },
  botonTexto: {
    ...commonStyles.buttonText,
  },
});

export default Login;


