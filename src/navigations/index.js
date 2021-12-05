import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Todo from '../screens/Todo';
import SignIn from '../screens/SignIn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const Stack = createNativeStackNavigator();
const index = () => {
  const onPress = async ({navigation}) => {
    try {
      await GoogleSignin.signOut();
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Todo"
          component={Todo}
          options={navigation => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => onPress(navigation)}>
                <MaterialCommunityIcons name="logout" size={20} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;

const styles = StyleSheet.create({});
