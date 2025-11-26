import { StatusBar } from "expo-status-bar";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import imgLogo from "./assets/pngwing.com.png";
import btnAdd from "./assets/add button.png";
import imgLixeira from "./assets/54324.png";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";

export default function App() {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [editando, setEditando] = useState(null); // índice da tarefa sendo editada
  const [textoEditado, setTextoEditado] = useState("");
  const [prioridade, setPrioridade] = useState('baixa');
  const [filtro, setFiltro] = useState('todas');

  const handleAdd = () => {
    if (tarefa.trim() === "") return;
    setTarefas([{ texto: tarefa, feito: false, prioridade }, ...tarefas]);
    setTarefa("");
    setPrioridade('baixa');
  };

  const handleDelete = (index) => {
    const novasTarefas = tarefas.filter((_, i) => i !== index);
    setTarefas(novasTarefas);
  };

  const handleToggleFeito = (index) => {
    const novasTarefas = tarefas.map((t, i) =>
      i === index ? { ...t, feito: !t.feito } : t
    );
    setTarefas(novasTarefas);
  };

  const handleEdit = (index) => {
    setEditando(index);
    setTextoEditado(tarefas[index].texto);
  };

  const handleSaveEdit = (index) => {
    const novasTarefas = tarefas.map((t, i) =>
      i === index ? { ...t, texto: textoEditado } : t
    );
    setTarefas(novasTarefas);
    setEditando(null);
    setTextoEditado("");
  };

  const handleClearAll = () => {
    setTarefas([]);
  };

  const tarefasFiltradas = tarefas.filter(t =>
    filtro === 'todas' ? true : t.prioridade === filtro
  );

  const pendentes = tarefas.filter(t => !t.feito).length;
  const concluidas = tarefas.filter(t => t.feito).length;

  const renderItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: item.feito ? '#e0ffe0' : '#fff' }}>
      <TouchableOpacity onPress={() => handleToggleFeito(index)}>
        <Text style={{ flex: 1, textDecorationLine: item.feito ? 'line-through' : 'none', color: item.feito ? '#888' : '#000' }}>
          {editando === index ? (
            <TextInput
              value={textoEditado}
              onChangeText={setTextoEditado}
              style={{ backgroundColor: '#eee', padding: 4, borderRadius: 8, width: '80%' }}
            />
          ) : item.texto}
        </Text>
      </TouchableOpacity>
      <View style={[styles.prioridadeTag, {backgroundColor: item.prioridade === 'alta' ? '#dc3545' : item.prioridade === 'media' ? '#ffc107' : '#198754'}]}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>{item.prioridade.charAt(0).toUpperCase() + item.prioridade.slice(1)}</Text>
      </View>
      {editando === index ? (
        <TouchableOpacity onPress={() => handleSaveEdit(index)}>
          <Text style={{ color: '#0d6efd', marginLeft: 8, fontWeight: 'bold', fontSize: 16 }}>Salvar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleEdit(index)} style={styles.botaoEditar}>
          <Text style={styles.textoEditar}>Editar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => handleDelete(index)}>
        <Image source={imgLixeira} style={{ width: 24, height: 24, marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );

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
          style={styles.input}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButtonInsideInput}>
          <Image source={btnAdd} style={styles.botaoAdd} />
        </TouchableOpacity>
      </View>
      <View style={styles.prioridadeContainerCentralizada}>
        <TouchableOpacity onPress={() => setPrioridade('baixa')} style={[styles.prioridadeBotao, prioridade === 'baixa' && styles.prioridadeSelecionada]}>
          <Text style={styles.prioridadeTexto}>Baixa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPrioridade('media')} style={[styles.prioridadeBotao, prioridade === 'media' && styles.prioridadeSelecionada]}>
          <Text style={styles.prioridadeTexto}>Média</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPrioridade('alta')} style={[styles.prioridadeBotao, prioridade === 'alta' && styles.prioridadeSelecionada]}>
          <Text style={styles.prioridadeTexto}>Alta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contadorContainer}>
        <Text style={{color: '#0d6efd'}}>Pendentes: {pendentes} | Concluídas: {concluidas}</Text>
      </View>
      <View style={styles.clearAllContainer}>
        <TouchableOpacity onPress={handleClearAll} style={styles.botaoLimparTudo}>
          <Text style={styles.textoLimparTudo}>Limpar Tudo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewTarefas}>
        <FlashList
          data={tarefasFiltradas}
          renderItem={renderItem}
          estimatedItemSize={50}
          keyExtractor={(item, index) => index.toString()}
        />
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
    alignSelf: 'center',
    marginBottom: 8,
  },
  botaoAdd: {
    width: 32,
    height: 32,
  },
  viewInput: {
    width: "80%",
    alignSelf: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  viewTarefas: {
    width: "80%",
    flex: 1,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0d6efd',
    paddingRight: 44, // espaço para o botão
  },
  addButtonInsideInput: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: [{ translateY: -16 }], // centraliza verticalmente considerando altura do botão
    zIndex: 1,
  },
  clearAllContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  botaoLimparTudo: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  textoLimparTudo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoEditar: {
    backgroundColor: '#0d6efd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  textoEditar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  prioridadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  prioridadeBotao: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 2,
    borderWidth: 0,
  },
  prioridadeSelecionada: {
    backgroundColor: '#0d6efd',
  },
  prioridadeTexto: {
    color: '#333',
    fontWeight: 'bold',
  },
  prioridadeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  filtroBotao: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  filtroSelecionado: {
    backgroundColor: '#0d6efd',
  },
  contadorContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  prioridadeContainerCentralizada: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
    alignSelf: 'center',
  },
  adicionarContainer: {
    alignSelf: 'center',
    marginTop: 8,
  },
});