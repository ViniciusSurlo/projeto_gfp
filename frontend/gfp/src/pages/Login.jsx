import { useNavigate, Link } from "react-router-dom";
// import { useState } from "react";
import { enderecoServidor } from "../utils";
import React, { useState, useEffect } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/principal");
  };
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [lembrar, setlembrar] = useState(false);

  useEffect(() => {
    const buscarUsuarioLogado =  () => {
      console.log('buscando usuario logado');
      const UsuarioLogado = localStorage.getItem('UsuarioLogado');
      console.log(UsuarioLogado);
      
      if (UsuarioLogado) {
        const usuario = JSON.parse(UsuarioLogado)
        if (usuario.lembrar == true) {
          navigate('/principal');
        }
      }
    }
    buscarUsuarioLogado();
  }, [])

  async function botaoEntrar(e) {
    e.preventDefault();

    try {
      if (email == "" || senha == "") {
        throw new Error("Preencha todos os campos!");
      }
      // Autenticando utilizando a API de backend com o fetch
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: {"content-type": "application/json", "authorization": "Bearer " + localStorage.getItem('token')},
        body: JSON.stringify({
            email: email,
            senha: senha
        })
      });

      if(resposta.ok){
        const dados = await resposta.json()
        setMensagem('Login bem-sucedido! ✅')
        // Ou navegar para outra página
        handleSubmit()
        localStorage.setItem('UsuarioLogado', JSON.stringify(...dados, lembrar ))
      } else {
        setMensagem('Email ou senha incorretos ❌')
        throw new Error('Email ou senha incorretos ❌')
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(error.message);
      return;
    }
  }



  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.formBox}>
          <h1 style={styles.title}>
            Gerenciamento
            <br />
            Financeiro Pessoal
          </h1>
          <form onSubmit={botaoEntrar}>
            <label htmlFor="username" style={styles.label}>
              Email
            </label>
            <input id="username" type="text" style={styles.input}
              placeholder="Digite seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <label htmlFor="password" style={styles.label}>
              Senha
            </label>
            <input id="password" type="password" style={styles.input}
             placeholder="Digite sua senha"
             value={senha}
             onChange={(e) => setSenha(e.target.value)}
            />

            <div style={styles.options}>
              {/* <label>
                <input type="checkbox" style={styles.checkbox} />
                Remember
              </label> */}
              {/* <Link to="#" style={styles.link}>
                Forgot Password?
              </Link> */}
            </div>
            <div>

            </div>
            <button type="submit" style={styles.button}>
              Entrar
            </button>

            <div style={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
              <input type="checkbox" style={{marginRight: "5px"}}
                checked={lembrar} onChange={(e) => setlembrar(e.target.checked)}/>
              <label htmlFor="">Lembrar-me</label>
            </div>


          </form>
        </div>
        <div style={styles.imageBox}>
          <img
            src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-login_114360-739.jpg?t=st=1745519192~exp=1745522792~hmac=8d452098ba4870c2170eba481558a86d70d3822867ac4903c90ca59de98410c7&w=740"
            alt="Ilustração de login"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#dfe7fd",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    display: "flex",
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    maxWidth: "960px",
    width: "100%",
  },
  formBox: {
    padding: "3rem",
    background: "#edf2f7",
    flex: 1,
  },
  imageBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom right, #a18cd1,rgb(93, 6, 128))",
  },
  image: {
    maxWidth: "90%",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#2a2a2a",
  },
  label: {
    display: "block",
    fontWeight: "600",
    margin: "1rem 0 0.25rem",
    color: "#3c3c3c",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "none",
    borderBottom: "2px solid #a3a3a3",
    background: "transparent",
    fontSize: "1rem",
    marginBottom: "1rem",
    outline: "none",
  },
  inputFocus: {
    borderBottom: "2px solid #6a0dad",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
    marginBottom: "1.5rem",
    fontSize: "0.9rem",
  },
  link: {
    textDecoration: "none",
    color: "#6a0dad",
  },
  checkbox: {
    marginRight: "0.5rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    background: "linear-gradient(90deg, #6a0dad, #8a2be2)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
};
