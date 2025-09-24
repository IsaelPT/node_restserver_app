const mongoose = require('mongoose');


const dbConexion = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}



module.exports = {
    dbConexion
};