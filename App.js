import { useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "@rneui/themed";

export default function App() {
  const [textValue, setTextValue] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const onHandleChangeItem = (text) => setTextValue(text);
  const addItem = () => {
    if (textValue === "") return;
    setItemsList((prevState) => [
      ...prevState,
      { id: Date.now(), value: textValue, isChecked: false },
    ]);
    setTextValue("");
  };
  const handleCheckboxChange = (id, newValue) => {
    setItemsList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isChecked: newValue } : item
      )
    );
  };

  const renderListItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.textContainer}
      onPress={() => onHandleModal(index)}
    >
      <View style={styles.listItem}>
        <CheckBox
          size={22}
          value={item.isChecked}
          checked={item.isChecked}
          onPress={() => handleCheckboxChange(item.id, !item.isChecked)}
          style={styles.checkbox}
        />
        <Text style={styles.textItem}>{item.value}</Text>
      </View>
    </TouchableOpacity>
  );

  const onHandleModal = (index) => {
    setItemSelected(index);
    setModalVisible(true);
  };

  const onHandleDeleteItem = () => {
    const newItemsList = itemsList;
    newItemsList.splice(itemSelected, 1);
    setItemsList(newItemsList);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Agregar Item"
          style={styles.input}
          value={textValue}
          onChangeText={onHandleChangeItem}
        />
        <Button title="+ ADD" onPress={addItem} color="#007BFF" />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={itemsList}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalTitle}>
              <Text>Eliminar Elemento</Text>
            </View>
            <View style={styles.modalMessage}>
              <Text>Quiere eliminar el item?</Text>
            </View>
            <View style={styles.modalButton}>
              <Button title="Salir" onPress={() => setModalVisible(false)} />
              <Button title="Eliminar" onPress={() => onHandleDeleteItem()} />
            </View>
          </View>
          <Text>{itemSelected.value}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#F3F3F3",
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#007BFF",
    borderWidth: 1,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  listContainer: {
    width: "100%",
    flex: 1,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  checkbox: {
    marginRight: 10,
  },
  textItem: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    marginBottom: 20,
    alignItems: "center",
  },
  modalMessage: {
    marginBottom: 20,
    alignItems: "center",
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
