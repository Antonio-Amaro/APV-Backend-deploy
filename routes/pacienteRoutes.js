import express from 'express'
// Creamos un Router de express para poder definir las rutas, y lo asignamos a router
const router = express.Router();
// Importamos las funciones que usarán nuestras rutas al visitarlas
import { 
    agregarPaciente, 
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
} from '../controllers/pacienteController.js';
import checkAuth from '../middleware/authMiddleware.js';

// Comenzamos a definir rutas en nuestro router
// Esta parte que definiremos se va a concatenar con la ruta raíz /api/pacientes
router.route('/')
    .post(checkAuth, agregarPaciente) // Con esta sintaxis indicamos de una manera más corta
    .get(checkAuth, obtenerPacientes) // las funciones que se ejecutarán al hacer un POST o un GET a la ruta

router.route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;