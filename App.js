import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import imgLogo from './assets/pngwing.com.png'
export default function App() {
  return (
    <View style={styles.container}>
      <view>
        <Image source={imgLogo}/>
      </view>
      <Text>hello app do henzo</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  // },
  logo: {
    width: 200,
    height: 200,}
});
