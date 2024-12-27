import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {

    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado)
    } catch (error) {
        console.log(error)
    }
};

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario._id);

    res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    
    if(id.length !== 24) {
        return res.status(403).json({message: 'Id no válido'});
    }
    
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({msg: 'No encontrado'})
    }

    // En mongoDB cuando se comparan objectIDs, se deben transformar a strings para realizar la comparación correctamente
    if(paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: "Acción no válida"})
    }
    
    res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    
    if(id.length !== 24) {
        return res.status(403).json({message: 'Id no válido'});
    }
    
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({msg: 'No encontrado'})
    }

    // En mongoDB cuando se comparan objectIDs, se deben transformar a strings para realizar la comparación correctamente
    if(paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: "Acción no válida"})
    }
    
    // Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error)
    }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    
    if(id.length !== 24) {
        return res.status(403).json({message: 'Id no válido'});
    }
    
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({msg: 'No encontrado'});
    }

    // En mongoDB cuando se comparan objectIDs, se deben transformar a strings para realizar la comparación correctamente
    if(paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: "Acción no válida"});
    }

    try {
        await paciente.deleteOne();
        res.json({msg: "Paciente eliminado"});
    } catch (error) {
        console.log(error);
    }
};

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
};