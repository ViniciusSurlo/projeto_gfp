import express from 'express';
import { testarConexao } from './db.js';
import cors from 'cors';
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubcategorias from './routes/rotasSubcategorias.js';
import RotasLocalTransacao from './routes/RotasLocalTransacao.js';
import RotasTransacoes from './routes/RotasTransacoes.js';
const app = express();

testarConexao()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API funcionando')
})

// Rotas usuarios
app.post('/usuarios', rotasUsuarios.Novousuario)
app.get('/usuarios', autenticarToken, rotasUsuarios.Listar)
app.get('/usuarios/:id', autenticarToken, rotasUsuarios.ListarporID)
app.put('/usuarios/:id', rotasUsuarios.AtualizartodosCampos)
app.delete('/usuarios/:id', autenticarToken, rotasUsuarios.Deletar)
app.patch('/usuarios/:id', autenticarToken, rotasUsuarios.Atualizar)
app.post('/usuarios/login', rotasUsuarios.login)

// Rotas categorias
app.post('/categorias',  rotasCategorias.novaCategoria)
app.get('/categorias', autenticarToken, rotasCategorias.listarTodas)
app.delete('/categorias/:id', autenticarToken, rotasCategorias.Deletar)
app.put('/categorias/:id', rotasCategorias.atualizarTodosCampos)
app.patch('/categorias/:id', autenticarToken, rotasCategorias.Atualizar)
app.get('/categorias/:id', rotasCategorias.ListarporID)
// Rotas subcategorias
app.post('/subcategorias', rotasSubcategorias.novaSubCategoria)
app.delete('/subcategorias/:id', rotasSubcategorias.deletarSubcategoria)
app.get('/subcategorias', rotasSubcategorias.listarSubcategorias)
app.get('/subcategorias/:id', rotasSubcategorias.ListarporID)
app.put('/subcategorias/:id', rotasSubcategorias.atualizartodosCampos)
app.patch('/subcategorias/:id', rotasSubcategorias.Atualizar)

// Rotas local transacao
app.post('/localtransacao', RotasLocalTransacao.NovasLocalTransacao)
app.get('/localtransacao', RotasLocalTransacao.ListarTodas)
app.get('/localtransacao/:id', RotasLocalTransacao.BuscarId)
app.patch('/localtransacao/:id', RotasLocalTransacao.AtualizarLocalTransacao)
app.put('/localtransacao/:id', RotasLocalTransacao.atualizarTodosCampos)
app.delete('/localtransacao/:id', RotasLocalTransacao.deletar)

// Rotas transacoes
app.post('/transacoes', RotasTransacoes.criarTransacao)
app.get('/transacoes', RotasTransacoes.listarTransacoes)
app.put('/transacoes/:id', RotasTransacoes.atualizarTodosCampos)
app.patch('/transacoes/:id', RotasTransacoes.AtualizarTransacao)
app.get('/transacoes/:id', RotasTransacoes.listarporId)
app.delete('/transacoes/:id', RotasTransacoes.deletarTransacao)
const porta = 3000;
app.listen(porta, () =>{
    console.log(`Api  http://localhost:${porta}`);
})
