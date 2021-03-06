const express = require('express');
const UsuarioController = require('./Controller/Usuario')
const VerificaoController = require('./Controller/VerificacaoController');
const RecuperacaoController = require('./Controller/RecuperacaoController');
const FilmesSeriesController = require('./Controller/FilmesSeriesController');
const AdministradorController = require('./Controller/AdministradorController');


const Routes = express.Router();



Routes.post('/user',UsuarioController.create);
Routes.get('/user/valida',UsuarioController.valida);
Routes.get('/valida',VerificaoController.verifica);
Routes.post('/recuperacaosenha',RecuperacaoController.criarToken);
Routes.post('/reset',RecuperacaoController.resetarSenha);

Routes.post('/filmesSeries/inserir',FilmesSeriesController.create);
Routes.post('/filmesSeries/atualizar',FilmesSeriesController.update);
Routes.post('/filmesSeries/excluir',FilmesSeriesController.exclude);

Routes.post('/filmesSeries/addFavorito',FilmesSeriesController.addFavorito);
Routes.post('/filmesSeries/removeFavorito',FilmesSeriesController.removeFavorito);

Routes.get('/adicionadosRecentemente/listar',FilmesSeriesController.listarAdicionadosRecentemente);
Routes.get('/filmesSeries/listar',FilmesSeriesController.list);
Routes.get('/filmesSeries/getImg',FilmesSeriesController.getCartaz);
Routes.get('/filmesSeries/information',FilmesSeriesController.getInfomation);

Routes.get('/valida/adm',AdministradorController.valida);










module.exports = Routes; //Linha 4