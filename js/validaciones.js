// const inputNacimiento = document.querySelector("#birth");

// inputNacimiento.addEventListener("blur", (evento) => {
//     validacionNacimiento(evento.target);
// });

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    console.log(input.parentElement)
    if (input.validity.valid) {//valida si el input es valido
        input.parentElement.classList.remove("input-container--invalid")//quita el estilo con la clase input-container--invalid
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid")//agrega el estilo con la clase input-container--invalid
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores =[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError ={
    nombre :{
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email :{
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password :{
        valueMissing: "El campo password no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres. máximo12, debe de contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales"
    },
    nacimiento :{
        valueMissing: "El campo nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    celular :{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "No ingresó un número de celular válido 9XXXXXXXX"
    },
    direccion :{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres"
    },
    ciudad :{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 5 a 30 caracteres"
    },
    provincia :{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La provincia debe contener entre 5 a 30 caracteres"
    },
}

const validadores = {
    nacimiento: input => validacionNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput,input) {
    let mensaje ="";

    tipoDeErrores.forEach((error=>{
        if (input.validity[error]) {
            mensaje= mensajesDeError[tipoDeInput][error];
        }
    }))
    return mensaje;
}

function validacionNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje ="";
    if (!mayorEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje);
}
function mayorEdad(fecha) {
    const fechaActual = new Date();
    const direnciaFecha = new Date(fecha.getFullYear() + 18 , fecha.getMonth() , fecha.getDay());
    return direnciaFecha <= fechaActual
}