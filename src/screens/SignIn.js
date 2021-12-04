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
import {WEB_CLIENT_ID} from '@env';
const SignIn = ({navigation}) => {
  const [name, setName] = useState('');
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
      dispatch(loginUser(res.user.displayName));
      navigation.navigate('Todo');
      console.log('res', res.user.displayName);
    } catch (error) {
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
});
