import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const SWidth = Dimensions.get('window').width;
import firestore from '@react-native-firebase/firestore';
const TodoList = ({
  todo,
  setTodo,
  setText,
  stateLift,
  check,
  setCheck,
  text,
}) => {
  // const [firestoreTodo, setFireStoreTodo] = useState([]);
  // const [firestoreTodo2, setFireStoreTodo2] = useState([]);
  const [condition, setCondition] = useState(false);
  useEffect(() => {
    setCheck(check);
    console.log('ans', todo);

    const user = async () => {
      await firestore()
        .collection('Users')
        .get()
        .then(val => setTodo(val.docs[0]._data.todo));
    };
    user();
    if (condition == true) {
      const con = () => {
        firestore()
          .collection('Users')
          .doc('todoList')
          .update({todo})
          .then(() => {
            console.log('User deleted!');
          });
      };
      con();
    }
  }, [check, condition]);

  const onDelete = index => {
    const res = todo.filter(arr => {
      return index !== arr.id;
    });
    setTodo(res);
    setCheck(true);
    console.log('updated', todo);
  };
  const onEdit = (name, data) => {
    setText(name);
    stateLift(data);
    // const arrIndex = firebaseTodo.findIndex(val => {
    //   return val.id == index;
    // });
    // const res = firebaseTodo[arrIndex].push(text);
    // firestore()
    //   .collection('Users')
    //   .doc('todoList')
    //   .update({
    //     res,
    //   })
    //   .then(() => {
    //     console.log('User updated!');
    //   });
    // setTodo(firebaseTodo[arrIndex].push(text));
    // console.log(arrIndex);
  };

  return (
    <ScrollView style={styles.container}>
      {todo == undefined
        ? null
        : todo.map((item, key) => {
            return (
              <View key={item.id} style={styles.list}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 12,
                  }}>
                  <View style={{flex: 8}}>
                    <Text style={styles.txt}>{item.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => onEdit(item.name, item.id)}>
                    <Entypo name="edit" color="#fff" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onDelete(item.id)}>
                    <MaterialCommunityIcons
                      name="delete"
                      color="#fff"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
    </ScrollView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
  },
  list: {
    height: 50,
    backgroundColor: '#FEB676',
    marginBottom: 10,
    borderRadius: 10,
  },
  txt: {},
});
