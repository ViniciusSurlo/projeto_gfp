import { useNavigate } from "react-router-dom"
import React, {useState, useEffect} from 'react'
export default function Principal() {
    const [usuario, setUsuario] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const buscarUsuario = async () => {
          const UsuarioLogado = await localStorage.getItem('UsuarioLogado');
          if (UsuarioLogado){
            setUsuario(JSON.parse(UsuarioLogado));
            console.log(UsuarioLogado);   
          }else {
            navigate('/')
          }
        }
        buscarUsuario();
      }, []);

      const botaoLogout = async () => {
        try {
            localStorage.removeItem('UsuarioLogado')
            navigate('/')    
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
        
      }
    return (
        <h1>Tela Principal</h1>
    )
}