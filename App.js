import { StatusBar } from "expo-status-bar";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import imgLogo from "./assets/pngwing.com.png";
import btnAdd from "./assets/add button.png";
import { useState } from "react";

export default function App() {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState([])

  const handleAdd = () => {
    //Alert.alert(tarefa);
    setTarefas([tarefa, ...tarefas])
    setTarefa("");
  };

  //ja importei o flash list e agora tem que usar

  return (
    <View style={styles.container}>
      <View>
        <Image source={imgLogo} style={styles.logo} />
        <Text>todo list</Text>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          placeholder="Add Tarefa"
          value={tarefa}
          onChangeText={setTarefa}
        />
        <TouchableOpacity onPress={handleAdd}>
        <Image source={btnAdd} style={styles.botaoAdd} />
        </TouchableOpacity>
      </View>
      <Text>Open up App.js to start working on your app!</Text>
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
    padding: 10,
  },

  logo: {
    width: 128,
    height: 128,
  },

  botaoAdd: {
    width: 32,
    height: 32,
  },

  viewInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});