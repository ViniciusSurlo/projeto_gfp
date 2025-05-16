import { useNavigate } from "react-router-dom"
import React, {useState, useEffect} from 'react'
export default function Principal() {
    const [usuario, setUsuario] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const buscarUsuario =  () => {
          const UsuarioLogado = localStorage.getItem('UsuarioLogado');
          if (UsuarioLogado){
            setUsuario(JSON.parse(UsuarioLogado));
            console.log(UsuarioLogado);   
          }else {
            navigate('/')
          }
        }
        buscarUsuario();
      }, []);

      const botaoLogout =  () => {
        try {
            localStorage.removeItem('UsuarioLogado')
            navigate('/')    
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
        
      }
    return (
      <div>
        <div style={{display: 'flex', flexDirection: 'row ', justifyContent: 'space-between', alignItems: 'center'}}>
          {/* <p>Usuário: {usuario.nome}</p>          */}
          <button onClick={botaoLogout}>Sair</button>
        </div>
        <div style={{padding: '20px'}}>
          <h2>Principal</h2>
        </div>
      </div>
    )
}