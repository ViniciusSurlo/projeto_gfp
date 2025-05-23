import express from 'express';
import { testarConexao } from './db.js';
import cors from 'cors';
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubcategorias from './routes/rotasSubcategorias.js';
import RotasContas from './routes/RotasContas.js';
import RotasTransacoes from './routes/RotasTransacoes.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from './swagger.js';

const app = express();

testarConexao()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
    res.redirect('/api-docs')
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
app.get('/categorias/filtrarCategoria', rotasCategorias.filtrarCategoria)
app.post('/categorias',  rotasCategorias.novaCategoria)
app.get('/categorias', autenticarToken, rotasCategorias.listarTodas)
app.delete('/categorias/:id', autenticarToken, rotasCategorias.Deletar)
app.put('/categorias/:id', rotasCategorias.atualizarTodosCampos)
app.patch('/categorias/:id', autenticarToken, rotasCategorias.Atualizar)
app.get('/categorias/:id', rotasCategorias.ListarporID)

// Rotas subcategorias
app.get('/subcategorias', rotasSubcategorias.filtrarNome)
app.post('/subcategorias', rotasSubcategorias.novaSubCategoria)
app.delete('/subcategorias/:id', rotasSubcategorias.deletarSubcategoria)
app.get('/subcategorias', rotasSubcategorias.listarSubcategorias)
app.get('/subcategorias/:id', rotasSubcategorias.ListarporID)
app.put('/subcategorias/:id', rotasSubcategorias.atualizartodosCampos)
app.patch('/subcategorias/:id', rotasSubcategorias.Atualizar)

// Rotas contas
app.get('/contas', autenticarToken, RotasContas.ListarTodas)
app.get('/contas/filtrarNome', RotasContas.filtrarNome)
app.post('/contas', RotasContas.NovasContas)
app.get('/contas/:id', RotasContas.BuscarId)
app.patch('/contas/:id', RotasContas.AtualizarContas)
app.put('/contas/:id', RotasContas.atualizarTodosCampos)
app.delete('/contas/:id', RotasContas.deletar)

// Rotas transacoes
app.post('/transacoes', RotasTransacoes.criarTransacao)
app.get('/transacoes/somarTransacoes', RotasTransacoes.somarTransacoes)
app.get('/transacoes/transacoesVencidas/:id_usuario', RotasTransacoes.transacoesVencidas)
app.get('/transacoes/filtroData', RotasTransacoes.filtrarPorData)
app.get('/transacoes', RotasTransacoes.listarTransacoes)
app.put('/transacoes/:id', RotasTransacoes.atualizarTodosCampos)
app.patch('/transacoes/:id', RotasTransacoes.AtualizarTransacao)
app.get('/transacoes/:id', RotasTransacoes.listarporId)
app.delete('/transacoes/:id', RotasTransacoes.deletarTransacao)
const porta = 3000;
app.listen(porta, () =>{
    console.log(`Api  http://localhost:${porta}`);
})
