import { StyleSheet } from 'react-native';

export const corPrincipal = '#59b6ff';
export const corSecundaria = '#706ef9';
export const corTextos = '#f2f2f2';
export const corFundo = '#0d0d0d';
export const corFundo2 = '#262626';

const Estilos = StyleSheet.create({
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // início do degradê
  },
  loginContainer: {
    width: '85%',
    backgroundColor: '#ffffff10',
    padding: 20,
    borderRadius: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#ffffff20',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: corTextos,
    borderWidth: 1,
    borderColor: '#ffffff30',
  },
  label: {
    color: corTextos,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff4b2b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: corTextos,
    fontWeight: 'bold',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rememberText: {
    color: corTextos,
    marginLeft: 8,
  },
  forgotPassword: {
    color: '#ccc',
    marginLeft: 'auto',
    textDecorationLine: 'underline',
  },
});

export default Estilos;
