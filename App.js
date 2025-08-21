import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import imgLogo from './assets/pngwing.com.png';
export default function App() {
import { useState } from "react";
import btnAdd from './assets/add button-.png';

  const [tarefa, setTarefa] = useState("")
  return (
    <View style={styles.container}>
      <view>
        <Image source={imgLogo} style={styles.logo}/>
      </view>
      <Text>Henzo</Text>
      <TextInput 
      placeholder="entre com a tarefa" 
      value='{tarefa}'
      onChangeText={setTarefa}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 128, height: 128,
  }
});
