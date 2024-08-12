const d = document;
const textArea = d.querySelector(".form__input")
const imagenMuneco = d.querySelector(".result__img")
const loaderCirculo = d.querySelector(".loader")
const resultadoTitulo = d.querySelector(".result__title")
const resultadoTexto = d.querySelector(".result__text")
const botonEncriptar = d.querySelector(".form__btn")
const botonDesencriptar = d.querySelectorAll(".form__btn")
const botonCopiar = d.querySelector(".result__btn")

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

//funcion para encriptar
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1];
                break
            }
        }
        mensajeEncriptado += encriptada;
    }

    return mensajeEncriptado;
};

//funcion para desencriptar
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
};

//eliminar elementos del contenedor del resultado encriptado
textArea.addEventListener("input", (e)=>{
    loaderCirculo.classList.remove("hidden");
    imagenMuneco.style.display = "none";
    resultadoTitulo.textContent = "Capturando mensaje";
    resultadoTexto.textContent = "";
});

//funcion del boton Encriptar
botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    loaderCirculo.classList.add("hidden");
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "Tu texto es:";
});

botonDesencriptar[1].addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    loaderCirculo.classList.add("hidden");
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeDesencriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "Tu texto es:";
});

botonCopiar.addEventListener("click", ()=>{
    let textoCopiado = resultadoTexto.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=>{
        imagenMuneco.style.display = "block"
        loaderCirculo.classList.add("hidden");
        resultadoTitulo.textContent = "Texto copiado";
        botonCopiar.classList.add("hidden");
        resultadoTexto.textContent = ""
    })
});