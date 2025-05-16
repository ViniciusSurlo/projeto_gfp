import { StyleSheet } from 'react-native';

export const corPrincipal = '#00C896';
export const corSecundaria = '#00c3ff';
export const corTextos = '#1a1a1a';
export const corFundo = '#f5f9ff';

const Estilos = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
  },
  ItemLista: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 15,
      marginVertical: 6,
      marginHorizontal: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
  },
  imagemLista: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 16,
      backgroundColor: '#e0e0e0',
  },
  textContainer: {
      flex: 1,
      justifyContent: 'center',
  },
  icon: {
      marginLeft: 10,
  },
  tipoConta: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
  },
  nomeLista: {
      fontSize: 14,
      color: '#666',
  },

})


export default Estilos;
