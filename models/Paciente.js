import mongoose from 'mongoose';

// Definimos cómo será la estructura de datos de los pacientes. El Schema
const pacientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    propietario: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    sintomas: {
        type: String,
        required: true,
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario',
    },
}, {
    timestamps: true, //para que se creen columnas de editado y creado
})

// Declaramos el modelo Paciente e indicamos cuál será el schema que tendrá
const Paciente = mongoose.model("Paciente", pacientesSchema);

export default Paciente;