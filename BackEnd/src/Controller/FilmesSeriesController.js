const connection = require('../database/connection');
const crypto  = require('crypto');
const knex = require("knex");


module.exports = {

    async create (request,response) {

        const res = {
            status: "",
            response: ""
        };

        try {

            const data = JSON.stringify(request.body);
            
            const {tipo, titulo,direcao,
                elenco,
                genero,
                ano_lancamento,
                duracao, descricao, cartaz} = JSON.parse(data);
            let state = 1;

            const registry = await connection('filmeSerie').insert({
                tipo,
                titulo,
                direcao,
                elenco,
                genero,
                ano_lancamento,
                duracao,
                descricao,
                state,
                cartaz
            });

            res.response = await connection('filmeSerie').select().where('idFilmeSerie', '=', registry);
            res.status = "success";

        } 
        catch(e) {
            console.log('Error: FilmesSeriesController: create: ' + e);
            res.status = "error";
        } 
        finally {
            response.json(res);
        }

    },


    async update (request,response) {

        const res = {
            status: "",
            response: ""
        };

        try {

            const data = request.body;
            const {id, filmeSerie } = JSON.parse(data.data);



            const tipo = filmeSerie.tipo;
            const titulo = filmeSerie.titulo;
            const direcao = filmeSerie.direcao;
            const elenco = filmeSerie.elenco;
            const genero = filmeSerie.genero;
            const ano_lancamento = filmeSerie.ano_lancamento;
            const duracao = filmeSerie.duracao;
            const descricao = filmeSerie.descricao;
            const cartaz = filmeSerie.cartaz;

            const registry = await connection('filmeSerie').update({
                tipo,
                titulo,
                direcao,
                elenco,
                genero,
                ano_lancamento,
                duracao,
                descricao,
                cartaz
            }).where('idFilmeSerie', '=', id);

            res.response = await connection('filmeSerie').select().where('idFilmeSerie', '=', registry);
            res.status = "success";

        } 
        catch(e) {
            console.log('Error: FilmesSeriesController: update: ' + e);
            res.status = "error";
        } 
        finally {
            response.json(res);
        }

    },


    async exclude (request,response) {
        
        const res = {
            status: "",
            response: ""
        };

        try {

            const data = JSON.stringify(request.body);
            const {idFilmeSerie} = JSON.parse(data);

            await connection('filmeSerie').update('state', 0).where('idFilmeSerie', '=', idFilmeSerie);
            
            
            res.response = "Registro deletado com sucesso";
            res.status = "success";

        } 
        catch(e) {
            console.log('Error: FilmesSeriesController: exclude: ' + e);
            res.status = "error";
        } 
        finally {
            response.json(res);
        }

    },


    async list (request,response) {

        const res = {status: ""};
        const query = {state: 1};

        const {usuario, filtrarFavoritos} = request.query;

        if(usuario)
            query.idUsuario = usuario;

        try {

            if(filtrarFavoritos) {
                res.response = await connection('filmeSerie').innerJoin('favoritos', 'favoritos.idFilmeSerie', 'filmeSerie.idFilmeSerie').select().where(query);
            } else {
                res.response = await connection('filmeSerie').select().where(query);
            }

            res.status = "success";
            
        } 
        catch(e) {
            console.log('Error: FilmesSeriesController: list: ' + e);
            res.status = "error";
        } 
        finally {
            response.json(res);
        }

    },

    async getInfomation (request,response) {

        const res = {status: ""};

        const {idFilmeSerie} = request.query;
        console.log(request);

        try {

            res.response = await connection('filmeSerie').select().where('idFilmeSerie', '=', idFilmeSerie);
            res.status = "success";
            
        } 
        catch(e) {
            console.log('Error: FilmesSeriesController: list: ' + e);
            res.status = "error";
        } 
        finally {
            response.json(res);
        }

    },

    async getCartaz (request,response) {

        const {id} = request.query;
        const res = {status: ""};

        try {

            res.response = await connection('filmeSerie').select().where('idFilmeSerie', '=', id);
            res.status = "success";
            
        } 
        catch(e) {
            console.log('Error: FilmesSeriesController: list: ' + e);
            res.status = "error";
        } 
        finally {
            response.json(res);
        }

    },

    async addFavorito (request,response) {

        const res = {
            status: "",
            response: ""
        };

        try {

            const data = JSON.stringify(request.body);
            
            const {idUsuario, idFilmeSerie} = JSON.parse(data);

            const registry = await connection('favoritos').insert({
                idUsuario,
                idFilmeSerie
            });

            res.status = "success";

        } 
        catch(e) {
            console.log('Error: FilmesSeriesController: create: ' + e);
            res.status = "error";
        } 
        finally {
            response.json(res);
        }

    },

    async removeFavorito (request,response) {

        const res = {
            status: "",
            response: ""
        };

        try {

            const data = JSON.stringify(request.body);
            
            const {idUsuario, idFilmeSerie} = JSON.parse(data);

            const registry = await connection('favoritos').where({
                idUsuario,
                idFilmeSerie
            }).del();

            res.status = "success";

        } 
        catch(e) {
            console.log('Error: FilmesSeriesController: removeFavorito: ' + e);
            res.status = "error";
        } 
        finally {
            response.json(res);
        }

    },

    async listarAdicionadosRecentemente(request, response) {

        const res = {status: ""};
        const query = {state: 1};

        const {usuario, filtrarFavoritos} = request.query;

        const t = 'NOW() - INTERVAL 1 MONTH;';

        try {

            res.response = await connection('filmeSerie').select().where(query).andWhere('created_on', '>=', knex.raw(t));
            res.status = "success";
            
        } 
        catch(e) {
            console.log('Error: FilmesSeriesController: listarAdicionadosRecentemente: ' + e);
            res.status = "error";
        } 
        finally {
            response.json(res);
        }

    },


}