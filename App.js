import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  // Estados para os dados do usuário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Estados para as preferências do pet
  const [especie, setEspecie] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [idade, setIdade] = useState(null);
  const [porte, setPorte] = useState(null);

  // Validação simples
  const isValid =
    nome &&
    email.includes("@") &&
    celular.length === 15 &&
    nascimento.length === 10 &&
    senha.length >= 6 &&
    senha === confirmarSenha &&
    especie &&
    sexo &&
    idade &&
    porte;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="heart" size={32} color="#FF6B6B" />
          <Text style={styles.title}>Cadastro para Adoção</Text>
          <Text style={styles.subtitle}>Encontre seu novo melhor amigo 🐾</Text>
        </View>

        {/* Dados do Usuário */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person" size={20} color="#4ECDC4" />
            <Text style={styles.sectionTitle}>Seus Dados</Text>
          </View>
          
          <TextInput 
            style={styles.input} 
            placeholder="Nome Completo" 
            value={nome} 
            onChangeText={setNome} 
            placeholderTextColor="#999"
          />

          <TextInput 
            style={styles.input} 
            placeholder="E-mail" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            placeholderTextColor="#999"
          />

          <MaskedTextInput
            mask="(99) 99999-9999"
            onChangeText={(text) => setCelular(text)}
            style={styles.input}
            placeholder="Celular"
            keyboardType="numeric"
            value={celular}
            placeholderTextColor="#999"
          />

          <MaskedTextInput
            mask="99/99/9999"
            onChangeText={(text) => setNascimento(text)}
            style={styles.input}
            placeholder="Data de Nascimento"
            keyboardType="numeric"
            value={nascimento}
            placeholderTextColor="#999"
          />

          <TextInput 
            style={styles.input} 
            placeholder="Senha" 
            secureTextEntry 
            value={senha} 
            onChangeText={setSenha} 
            placeholderTextColor="#999"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Confirmar Senha" 
            secureTextEntry 
            value={confirmarSenha} 
            onChangeText={setConfirmarSenha} 
            placeholderTextColor="#999"
          />
        </View>

        {/* Preferências */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="paw" size={20} color="#FFD166" />
            <Text style={styles.sectionTitle}>Preferências para Adoção</Text>
          </View>

          <Text style={styles.optionLabel}>Espécie</Text>
          <View style={styles.optionRow}>
            <TouchableOpacity 
              style={[styles.optionButton, especie === "Cachorro" && styles.selected]} 
              onPress={() => setEspecie("Cachorro")}
            >
              <Ionicons name="paw" size={20} color={especie === "Cachorro" ? "#fff" : "#4ECDC4"} />
              <Text style={[styles.optionText, especie === "Cachorro" && styles.selectedText]}>Cachorro</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.optionButton, especie === "Gato" && styles.selected]} 
              onPress={() => setEspecie("Gato")}
            >
              <Ionicons name="paw-outline" size={20} color={especie === "Gato" ? "#fff" : "#4ECDC4"} />
              <Text style={[styles.optionText, especie === "Gato" && styles.selectedText]}>Gato</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.optionLabel}>Sexo</Text>
          <View style={styles.optionRow}>
            <TouchableOpacity 
              style={[styles.optionButton, sexo === "Macho" && styles.selected]} 
              onPress={() => setSexo("Macho")}
            >
              <Text style={[styles.optionText, sexo === "Macho" && styles.selectedText]}>Macho</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.optionButton, sexo === "Fêmea" && styles.selected]} 
              onPress={() => setSexo("Fêmea")}
            >
              <Text style={[styles.optionText, sexo === "Fêmea" && styles.selectedText]}>Fêmea</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.optionLabel}>Idade</Text>
          <View style={styles.optionRow}>
            {["Filhote", "Adulto", "Idoso"].map((idadePet) => (
              <TouchableOpacity
                key={idadePet}
                style={[styles.optionButton, idade === idadePet && styles.selected]}
                onPress={() => setIdade(idadePet)}
              >
                <Text style={[styles.optionText, idade === idadePet && styles.selectedText]}>{idadePet}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.optionLabel}>Porte</Text>
          <View style={styles.optionRow}>
            {["Pequeno", "Médio", "Grande"].map((portePet) => (
              <TouchableOpacity
                key={portePet}
                style={[styles.optionButton, porte === portePet && styles.selected]}
                onPress={() => setPorte(portePet)}
              >
                <Text style={[styles.optionText, porte === portePet && styles.selectedText]}>{portePet}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botão */}
        <TouchableOpacity
          style={[styles.submitButton, isValid && styles.submitButtonActive]}
          disabled={!isValid}
          onPress={() => alert("Cadastro enviado com sucesso! 🎉")}
        >
          <Text style={styles.submitText}>Quero Adotar!</Text>
          <Ionicons name="heart" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 25,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2D3748",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#718096",
    marginTop: 5,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#F7FAFC",
    color: "#2D3748",
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: 8,
    marginTop: 5,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  optionButton: {
    flex: 1,
    padding: 14,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#F7FAFC",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  selected: {
    backgroundColor: "#4ECDC4",
    borderColor: "#4ECDC4",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A5568",
    marginLeft: 4,
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 30,
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#CBD5E0",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
  },
  submitButtonActive: {
    backgroundColor: "#FF6B6B",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
});