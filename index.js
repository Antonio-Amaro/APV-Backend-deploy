import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
// Como lo exportamos como export default podemos asignar el nombre que queramos
import pacienteRoutes from "./routes/pacienteRoutes.js";

// Creamos la aplicación "express" y la asignamos a app
const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1 || !origin){
            // El origen del Request está permitido
            callback(null, true)
        } else {
            new Error('No permitido por CORS')
        }
    }
}

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use('/api/veterinarios', veterinarioRoutes);
// Definimos la ruta 'raíz' y el route que se usará
app.use('/api/pacientes', pacienteRoutes);

// Configuración para que en producción tome el puerto asignado por el host
// Y en caso que no haya uno, se le asigna el 4000
const PORT = process.env.PORT || 4000;

// Indicamos el puerto que estára escuchando nuestro servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`)
});