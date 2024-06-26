import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Alert,
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackParamList } from "../App";
import { auth } from "../firebase";
import { useLanguage } from '../contexts/LanguageContext';

const StartScreen: React.FC = () => {
    type homeScreenProp = StackNavigationProp<StackParamList>;
    const navigation = useNavigation<homeScreenProp>();
    const { language } = useLanguage();
  
    // ログアウトボタンが押されたときの処理
    const handleLogout = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        Alert.alert("ログアウト中にエラーが起きました");
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {language === 'ja' ? (
            <>
              <Text style={styles.text}>{auth.currentUser?.email}さん</Text>
              <Text style={[styles.text, { marginBottom: 50 }]}>
                今日も頑張りましょう！
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.text}>{auth.currentUser?.email}</Text>
              <Text style={[styles.text, { marginBottom: 50 }]}>
                Keep up the good work today!
              </Text>
            </>
          )}
          <TouchableOpacity
            style={[styles.button, { marginBottom: 50 }]}
            onPress={() => navigation.navigate("Play")}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <Button
            title= {language === 'ja' ? ("ログアウト→") : ("Logout→")} 
            onPress={() => {
              handleLogout();
              navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: "blue",
      padding: 20,
      borderRadius: 10,
      width: 150,
    },
    buttonText: {
      color: "white",
      fontSize: 24,
      textAlign: "center",
    },
    text: {
      color: "black",
      fontSize: 24,
      textAlign: "center",
    },
  });
  
  export default StartScreen;