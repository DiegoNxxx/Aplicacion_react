import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RootNavigation from './src/navigation';
import { DataProvider } from './src/context/DataContext';

export default function App() {
  return (
    <DataProvider>
      <View style={styles.container}>
        <RootNavigation />
        <StatusBar style="auto" />
      </View>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
