const connection = require('../database/connection');

module.exports = {
    async valida (request,response){
        const {token}  = request.query;
        
        try {
            const [idUser] = connection('usuario').select('idusuario').where('cod','=',token);

            if(!idUser){
                response.redirect('https://mojal.netlify.app');
                
            }else if(idUser == 1){
                response.json({status:true});
            }
        } catch (error) {
            console.log('Erro:'+Error);
            response.redirect('https://mojal.netlify.app');
        }
        
    }
}