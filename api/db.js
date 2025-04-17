import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg
dotenv.config()

const BD = new Pool({
    // connectionString: process.env.DATABASE_URL
    user: 'postgres',  // Nome usuário do Banco de Dados
    host: 'localhost', //  Endereço do servidor
    database: 'bd_gfp',  // Nome do Banco de Dados
    password: 'admin',   // Senha do Banco de Dados
    port: 5432, // Porta de conexão servidor
})

const testarConexao = async () => {
    try {
        const client = await BD.connect() //Tenta estabelecer a conexão com o banco de dados
        console.log(`Conexão com o banco de dados estabelecida`);
        client.release() //Libera a conexão ao cliente
        
    } catch(error){
        console.error(`Erro ao conectar ao banco de Dados: ${error.message}`);
    }
}

export {BD, testarConexao}
