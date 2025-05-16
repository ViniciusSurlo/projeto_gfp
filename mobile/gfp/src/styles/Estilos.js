import { StyleSheet } from 'react-native';

export const corPrincipal = '#3db1ff';
export const corSecundaria = '#00c3ff';
export const corTextos = '#1a1a1a';
export const corFundo = '#f5f9ff';

const Estilos = StyleSheet.create({
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: corFundo,
  },
  loginContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f4f7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    color: '#000',
    borderWidth: 1,
    borderColor: '#dce3ea',
  },
  label: {
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  button: {
    backgroundColor: corPrincipal,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#eaf6ff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: corPrincipal,
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    color: corPrincipal,
    marginTop: 5,
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  bottomText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
  },
  linkText: {
    color: corSecundaria,
    fontWeight: '600',
  },
});

export default Estilos;
