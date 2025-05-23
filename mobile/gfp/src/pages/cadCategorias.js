import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from '@react-navigation/native';
import Estilos, { corPrincipal } from "../styles/Estilos.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enderecoServidor } from "../utils.js";

export default function CadCategorias({ navigation, route }) {
  const [inputNome, setInputNome] = useState("");
  const [inputTipo_transacao, setInputTipo_transacao] = useState("");
  const [inputGasto_fixo, setInputGasto_fixo] = useState(false);
  const [inputCor, setInputCor] = useState();
  const [inputIcone, setInputIcone] = useState();
  const [usuario, setUsuario] = useState("");

  // Hook para verificar se a tela está em foco

  // Executa essa função quando o componente é criado [] vazio

  useEffect(() => {
    buscarUsuarioLogado();
  }, []);

  useEffect(() => {
    if (route.params && route.params.categoria) {
      setInputNome(route.params.categoria.nome);
      setInputTipo_transacao(route.params.categoria.tipo_transacao);
      setInputGasto_fixo(route.params.categoria.gasto_fixo);
      setInputCor(route.params.categoria.cor);
      setInputIcone(route.params.categoria.icone);
    }
  }, [route.params]);
  const buscarUsuarioLogado = async () => {
    const UsuarioLogado = await AsyncStorage.getItem("UsuarioLogado");
    if (UsuarioLogado) {
      setUsuario(JSON.parse(UsuarioLogado));
      console.log(UsuarioLogado);
    } else {
      navigation.navigate("Login");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={botaoSalvar}>
          <MaterialIcons
            name="save"
            size={28}
            color={"#fff"}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, inputNome, inputTipo_transacao, inputGasto_fixo]);

  const botaoSalvar = async () => {
  
          try {
              const dados = {
                  nome: inputNome,
                  tipo_transacao: inputTipo_transacao,
                  gasto_fixo: inputGasto_fixo
              }
              let endpoint = `${enderecoServidor}/categorias`;
              let metodo = "POST";
  
              if(route.params && route.params.Conta){
                  endpoint = `${enderecoServidor}/categorias/${route.params.categoria.id_categoria}`;
                  metodo = "PUT";
              }
              const resposta = await fetch(endpoint, {
                  method: metodo,
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${usuario.token}`
                  },
                  body: JSON.stringify(dados)
              })
      
              if (resposta.ok) {
                  alert("Categoria cadastrada com sucesso!");
                  navigation.goBack();
              }       
          } catch (error) {
              console.error('Erro ao salvar Categoria:', error);
              
          }
          
      }

    return (

        
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
                <Text>Nome da Conta:</Text>
                <TextInput 
                placeholder="Digite o nome da conta"
                style={Estilos.inputCad}
                value={inputNome}
                onChangeText={(text) => setInputNome(text)}
                />
                    
                {/* <Text>Tipo da Conta:</Text>
                <TextInput 
                placeholder="Digite o Tipo de transação"
                style={Estilos.inputCad}
                value={inputTipo}
                onChangeText={(text) =>  setInputTipo_transacao(text)}
                /> */}

                {/* <Text>Saldo da Conta:</Text>
                <TextInput 
                placeholder="Digite o Saldo da conta"
                style={Estilos.inputCad}
                value={inputSaldo}
                onChangeText={(text) => setInputSaldo(text)}
                /> */}
                {/* <View>
                    <Switch value={inputContaPadrao}
                    onValueChange={setInputContaPadrao} 
                    />
                <Text>Conta Padrão</Text>
                </View> */}
            </View>
        </View>

    )
}
