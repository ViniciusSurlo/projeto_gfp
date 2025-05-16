import { BD } from "../db.js";


class RotasTransacoes {
    static async criarTransacao(req, res) {
        const {valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual} = req.body;
        try{
            const transacao = await BD.query(`
                INSERT INTO transacoes 
                (valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, 
                id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual]);
            return res.status(201).json(transacao[0]);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar transação", message: error.message });
        }
    }  
    static async listarTransacoes(req, res) {
        try {
            const transacoes = await BD.query(`
                select t.valor as valor_transacao, t.descricao, t.data_transacao, t.data_vencimento, 
	            t.tipo_transacao, l.nome as nome_conta, c.nome as nome_categoria, s.nome as nome_subcategoria, 
	            u.nome as nome_usuario from transacoes t 
	            join conta l on t.id_conta = l.id_conta
	            join categorias c on t.id_categoria = c.id_categoria 
	            join subcategorias s on t.id_subcategoria = s.id_subcategoria
	            join usuarios u on t.id_usuario = u.id_usuario`);
            return res.status(200).json(transacoes.rows); // Retorna lista de transações
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao listar transações", message: error.message });
        }
    }
    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual } = req.body;
        try{
            const transacao = await BD.query(`UPDATE transacoes SET valor = $1, descricao = $2, data_transacao = $3, data_vencimento = $4,
                data_pagamento = $5, tipo_transacao = $6, id_local_transacao = $7, id_categoria = $8,
                id_subcategoria = $9, id_usuario = $10, num_parcelas = $11, parcela_atual = $12 WHERE id_transacao = $13 RETURNING *`, 
                [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id]);
                return res.status(200).json(transacao[0]);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar transação", message: error.message });
        }
    }
    static async AtualizarTransacao(req, res) {
        const { id } = req.params;
        const {valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual} = req.body;
    try {
        // Inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
        const campos = []
        const valores = [] 
        // Verifica quais campos foram fornecidos
        if(valor !== undefined){
            campos.push(`valor = $${valores.length + 1}`)
            valores.push(valor)
        }
        if(descricao!== undefined){
            campos.push(`descricao = $${valores.length + 1}`)
            valores.push(descricao)
        }
        if(data_transacao!== undefined){
            campos.push(`data_transacao = $${valores.length + 1}`)
            valores.push(data_transacao)
        }
        if(data_vencimento!== undefined){
            campos.push(`data_vencimento = $${valores.length + 1}`)
            valores.push(data_vencimento)
        }
        if(data_pagamento!== undefined){
            campos.push(`data_pagamento = $${valores.length + 1}`)
            valores.push(data_pagamento)
        }
        if(tipo_transacao!== undefined){
            campos.push(`tipo_transacao = $${valores.length + 1}`)
            valores.push(tipo_transacao)
            }
        if(id_local_transacao!== undefined){
            campos.push(`id_local_transacao = $${valores.length + 1}`)
            valores.push(id_local_transacao)
        }
        if(id_categoria!== undefined){
            campos.push(`id_categoria = $${valores.length + 1}`)
            valores.push(id_categoria)
        }
        if(id_subcategoria!== undefined){
            campos.push(`id_subcategoria = $${valores.length + 1}`)
            valores.push(id_subcategoria)
        }
        if (campos.length === 0){
            return res.status(400).json({erro: "Informe os campos a serem atualizados"})
        }
        if (id_usuario !== undefined){
            campos.push(`id_usuario = $${valores.length + 1}`)
            valores.push(id_usuario)
        }
        if (num_parcelas !== undefined){
            campos.push(`num_parcelas = $${valores.length + 1}`)
            valores.push(num_parcelas)
        }
        if (valor_parcela !== undefined){
            campos.push(`valor_parcela = $${valores.length + 1}`)
            valores.push(valor_parcela)
        
        // Montar a query
        const query = `UPDATE local_transacao SET ${campos.join(',')}
        WHERE id_local_transacao = ${id} returning *`
        
        // Executar a query
        const transacao = await BD.query(query, valores)

        // Verifica se a transacao foi atualizada
        if(transacao.rows.length === 0){
            return res.status(404).json({erro: "transacao não encontrada"})
        }
        return res.status(200).json(transacao.rows[0])
    }
    } catch(error){
        return res.status(500).json({error: "Erro ao atualizar dados da transacao", error: error.message});
    }
}
    static async deletarTransacao(req, res) {
        const { id } = req.params;
        try {
            const transacao = await BD.query(`update transacoes set ativo = false WHERE id_transacao = $1 RETURNING *`, [id]);
            if(transacao.rows.length === 0){
                return res.status(404).json({erro: "transacao não encontrada"})
                }
                return res.status(200).json(transacao.rows[0]) // Retorna a transacao deletada
                } catch (error) {
                    return res.status(500).json({ error: "Erro ao deletar transacao", message: error.message });
                }
                }
    static async listarporId(req, res) {
        const { id } = req.params;
        try{
            const transacoes = await BD.query(`
                select t.valor as valor_transacao, t.descricao, t.data_transacao, t.data_vencimento, 
	            t.tipo_transacao, l.nome as nome_local_transacao, c.nome as nome_categoria, s.nome as nome_subcategoria, 
	            u.nome as nome_usuario from transacoes t 
	            join local_transacao l on t.id_local_transacao = l.id_local_transacao
	            join categorias c on t.id_categoria = c.id_categoria 
	            join subcategorias s on t.id_subcategoria = s.id_subcategoria
	            join usuarios u on t.id_usuario = u.id_usuario where id_transacao = $1`, [id]);
        } catch(error){
            return res.status(500).json({error: "Erro ao listar transacao", message: error.message});
        }
    }
    // Criar uma rota que permite filtar transacoes por data de vencimento ou data de pagamento
    // Dentro de um intervalo especifico

    static async filtrarPorData(req, res) {
        const { data_inicial, data_final, tipo_data } = req.query;

        let colunaData
        if(tipo_data == "vencimento"){
            colunaData = "data_vencimento"
        } else if(tipo_data == "pagamento"){
            colunaData = "data_transacao"
        } else{
            return res.status(400).json({error: "Tipo de data inválido. Use 'vencimento' ou 'pagamento'"});
        }

        try {
            const query = `
                SELECT t.*, u.nome as nome_usuario, ct.nome 
                from transacoes as t
                left join usuarios as u on t.id_usuario = u.id_usuario
                JOIN contas as ct on t.id_conta = ct.id_conta
                where ${colunaData} between $1 and $2
                order by ${colunaData} asc
            `

            const transacoes = await BD.query(query, [data_inicial, data_final]);

            res.status(200).json(transacoes.rows);
        } catch(error){
            console.error("Erro ao filtrar transações:", error);
            return res.status(500).json({error: "Erro ao filtrar transacoes", message: error.message});
        }
    }
    // Somando transacoes entrada ou saída
    static async somarTransacoes(req, res) {
        const { tipo, id_usuario } = req.query;
        try {
            const tipoTransacao = tipo.toUpperCase()
            const query =`
                select sum(valor) as total 
                from transacoes 
                where tipo_transacao = $1 and id_usuario = $2
                `
            const resultado = await BD.query(query, [tipoTransacao, id_usuario]);

            let total = resultado.rows[0].total
            if(total == null){
                total = 0
            }
            res.status(200).json({total: parseFloat(total)});
        } catch (error) {
            console.error("Erro ao somar transações:", error);
            return res.status(500).json({error: "Erro ao somar transações", message: error.message});
        }
    }
    
    static async transacoesVencidas(req, res){
        const { id_usuario } = req.params;
        try {
            const query = `
                select t.valor, t.data_transacao, t.data_vencimento, t.data_pagamento,
                u.nome as nome_usuario,
                c.nome as nome_conta,
                ct.nome as nome_categoria,
                sct.nome as nome_subcategoria
                from transacoes as t
                left join usuarios as u on t.id_usuario = u.id_usuario
                left join contas as c on t.id_conta = c.id_conta
                left join categorias as ct on t.id_categoria = ct.id_categoria
                left join subcategorias as sct on t.id_subcategoria = sct.id_subcategoria
                where t.data_vencimento < current_date --filtra transacoes vencidas
                and t.id_usuario = $1
                order by t.data_vencimento asc
            `
            const resultado = await BD.query(query, [id_usuario]);

            const formatarDataBr = (data) => {
                if(!data) return null
                return new Date(data).toLocaleDateString('pt-BR')// Conver a data para BR
            }

            const dadosFormatados = resultado.rows.map(t => ({
                ...t,
                data_transacao : formatarDataBr(t.data_transacao),
                data_vencimento : formatarDataBr(t.data_vencimento),
                data_pagamento : formatarDataBr(t.data_pagamento),
            }))
            res.status(200).json(dadosFormatados);
        } catch (error) {
            console.error("Erro ao listar transações vencidas:", error);
            return res.status(500).json({error: "Erro ao listar transações vencidas", message: error.message});
        }
    }
}

export default RotasTransacoes;