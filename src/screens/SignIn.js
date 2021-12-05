import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
const SWidth = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {loginUser} from '../redux/actions/UserLogin';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {WEB_CLIENT_ID} from '@env';
const SignIn = ({navigation}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  const onPress = async () => {
    // onGoogleButtonPress().then(() => console.log('Signed in with Google!'));
    try {
      const res = await onGoogleButtonPress();
      dispatch(loginUser(res.additionalUserInfo));
      navigation.navigate('Todo');
      setError(false);
      console.log('res', res.additionalUserInfo);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      console.log(error);
    }
  };
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
        onPress={onPress}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{marginRight: 20}}>
            <AntDesign name="googleplus" size={20} color="#fff" />
          </View>
          <View>
            <Text style={styles.txt}>Login with Google</Text>
          </View>
        </View>
      </TouchableOpacity>
      {error ? (
        <View style={styles.networkError}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              width: SWidth * 0.8,
            }}>
            <View style={{marginLeft: 30}}>
              <Feather name="alert-triangle" color="#fff" size={24} />
            </View>
            <View style={{marginLeft: 50}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                Network Error
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'tomato',
    width: SWidth * 0.8,
    padding: 18,
  },
  txt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  networkError: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
