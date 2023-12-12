import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = async () => {
    // Verificați și validați datele introduse
    if (!email || !password || !username || password !== confirmPassword) {
      alert(
        "Completați toate câmpurile, introduceți un nume de utilizator și asigurați-vă că parolele coincid."
      );
      return;
    }

    // Creați un obiect de date pentru a trimite la server
    const data = {
      email,
      username,
      password,
    };

    try {
      const url = "https://www.gavrilencu.com/authorization/Token";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Eroare la înregistrare");
      }

      const responseData = await response.json();
      // Gestionarea răspunsului - depinde de cum e structurat răspunsul serverului
      console.log("Înregistrare cu succes:", responseData);
    } catch (error) {
      console.error("A apărut o eroare la înregistrare:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmă Parola"
        secureTextEntry
        placeholderTextColor="#888"
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282c35", // Modern background color
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff", // White text color
  },
  input: {
    width: "80%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd", // Light gray border color
    borderRadius: 8,
    backgroundColor: "#fff", // White background
    color: "#333", // Text color
  },
  button: {
    width: "80%",
    paddingVertical: 16,
    backgroundColor: "#007bff", // Blue button color
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    marginTop: 20,
    color: "#007bff",
  },
});
