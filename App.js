/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,  {Component} from 'react';
import {Text, 
  View,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  useState,
  useEffect

} from 'react-native';

export default class App extends Component{

  constructor(props) {
    super(props)

    this.state = {
       textoEstado: "Desativado",
       horarioAtual: new Date(),
       idTimer: null,
       botaoLiga: "Vai!",
       botaoZera: "Zera",
       segundos: 0,
       decisegundos: 0,
       contagem: 0,
       ultimosSegundos: 0,
       salvatempo: "",
       frase: ""
    }
  }

  liga = () =>{//id = setInterval (método a ser chamado, intervalo de tempo em milissegundos)

    if(this.idTimer!=null){
      
      this.setState({textoEstado: "Desativado"})
      this.setState({botaoLiga: "Vai!"})
      this.setState({botaoZera: "Salvar e Zerar"})
      clearInterval(this.idTimer)
      this.idTimer =null
      
    }
    else{
      this.setState({textoEstado: "Ativado"})
      this.setState({botaoLiga: "Pausar"})
      this.setState({botaoZera: "Salvar e Zerar"})
      
     
      this.idTimer = setInterval(() => {this.setState({segundos:   this.state.decisegundos==9? this.state.segundos+1: this.state.segundos,decisegundos:   this.state.decisegundos==9? 0 :  this.state.decisegundos + 1})},100)
      
    
      
    }
  }

  desliga = () =>{

    if(this.state.botaoZera === "Zerar"){

      this.setState({textoEstado: "Desativado"})
      clearInterval(this.idTimer)
      this.idTimer =null
      this.state.decisegundos = 0
      this.state.segundos =0
      
    }
    else{

      this.setState({textoEstado: "Ativado"})
      this.setState({botaoLiga: "Vai!"})
      this.setState({botaoZera: "Zerar"})
      clearInterval(this.idTimer)
      this.idTimer =null
      this.state.ultimosSegundos = "" + this.state.segundos  + "." + this.state.decisegundos 
      this.state.decisegundos = 0
      this.state.segundos =0
      this.state.salvatempo = "N da contagem                               Tempo"
      this.state.contagem = this.state.contagem + 1
      this.state.frase = ""
      this.state.frase = this.state.frase + this.state.contagem + "                                                        " +   this.state.ultimosSegundos
      
    }
  }

  render(){


    return(
        <View style={{alignItems: 'center'}}>
        
          <ImageBackground source={require('./src/fundo.jpg')}
        style={styles.imageBackground} >
        <Text style={{fontSize: 40, color: 'red', margin: 50}}>{this.state.segundos}.{this.state.decisegundos} </Text>
       
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
            style={styles.botao}
            onPress={this.liga}
            >
              <Text style={{fontSize: 15, color: 'white', margin: 10}}>{this.state.botaoLiga}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.botao}
            onPress={this.desliga}
            >
              <Text style={{fontSize: 15, color: 'white', margin: 10}}>{this.state.botaoZera}</Text>
            </TouchableOpacity>
        </View>

        <View>
          <Text style={{fontSize: 20, color: 'red'}}>{this.state.salvatempo}</Text>
          <Text style={{fontSize: 20, color: 'red'}}>{this.state.frase}</Text>
        </View>
        </ImageBackground>
        
    
        </View>
        

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  imageBackground: {
    width: 850,
    height: 850,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
  imageForeground: {
    width: 250,
    height: 250
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center"
  },
  botao: {
    backgroundColor: 'red',
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    color: 'white',
    margin: 20,
    width: 140
  }
});



