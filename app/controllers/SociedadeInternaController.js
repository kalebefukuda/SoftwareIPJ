import connect from '../../config/Connection.js'

const con = await connect()
let sociedadeInterna = {}

// Listar sociedades
sociedadeInterna.all = async function(req,res){
    try {
        let sociedade = await con.query('SELECT * FROM sociedade_interna;')
        res.send(sociedade)

    } catch (e) {
        console.log('Erro ao mostrar sociedades',e)
    }
};

// Create
sociedadeInterna.create = async function(req,res){
    try {
        let sociedade = req.body
        let sql = "INSERT INTO sociedade_interna (id_sociedade_interna ,nome_sociedade, foto_sociedade) VALUES (?,?,?);"
        let values = [sociedade.id_sociedade_interna, sociedade.nome_sociedade, sociedade.foto_sociedade];
        let result = await con.query(sql,values)

        res.send({
            status: "inserção concluida",
            result: result
        });

    } catch (e) {
        console.log('Erro na inserção',e)
    }
}

//Update
sociedadeInterna.update = async function(req,res){
    try {
        let idSociedade = req.params.id_sociedade_interna
        let sociedade = req.body
        let sql = "UPDATE sociedade_interna SET nome_sociedade = ?,  foto_sociedade = ? WHERE id_sociedade_interna = ?;"
        const values = [sociedade.nome_sociedade, sociedade.foto_sociedade,idSociedade]

        let result = await con.query(sql, values)

        res.send({
            status: "Update concluido",
            result: result
        })

        
    } catch (e) {
        console.log('Erro ao fazer update',e )
    }
}

//Delete
sociedadeInterna.delete = async function(req,res){
    try {
        let idSociedade = req.params.id_sociedade_interna
        let sql = "DELETE FROM sociedade_interna WHERE id_sociedade_interna = ?;"
        let result = await con.query(sql, [idSociedade])

        res.send({
            status: "Delete concluido ",
            result: result
        })



    } catch (e) {
        console.log('Erro ao deletar Sociedade', e)
    }
}


export {sociedadeInterna}