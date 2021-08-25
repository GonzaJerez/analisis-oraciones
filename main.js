'use strict'

const section= document.querySelector('#container section');
const article = document.querySelector('#container section article')
const input = document.querySelector('#input');
const button = document.querySelector('#button');
const insertar = document.querySelectorAll('.insertar');
let oracion;

let seleccionado;
let parrafo;
let inicio;
let fin;

let oracionActual;
// let contadorElementos=1;
let listaOraciones;
let arrayElementos= [];


// ________ Borra lo q hay en pantalla, agrega nueva oracion a "arrayOraciones" y muestra todas en pantalla _______
const pegarOraciones = (valor)=>{
    section.innerHTML = '';
    let oraciones= {
        oracion: cantidadOraciones,
        texto: valor
    }
    cantidadOraciones++
    arrayOraciones.push(oraciones);
    localStorage.setItem('oraciones', JSON.stringify(arrayOraciones)) 
    input.value= '';
    mostrarOraciones()
    
}


// ________ Muestra en pantalla todas las oraciones y elementos almacenados en "arrayOraciones" (por lo tanto tambien en el localStorage)_______
const mostrarOraciones= ()=>{

    

    arrayOraciones.forEach(element=>{
        let article = document.createElement('article');
        let nuevoInput = document.createElement('INPUT');
        nuevoInput.setAttribute('value', element.texto);
        nuevoInput.setAttribute('type','text')
        nuevoInput.setAttribute('disabled','disabled')
        nuevoInput.classList.add('sentences')
        nuevoInput.setAttribute('id',`oracion${element.oracion}`)
   
        article.appendChild(nuevoInput)
        section.appendChild(article)

        if (element.elemento != undefined) {

            element.elemento.forEach(index=>{
                let span = document.createElement('span');          
                span.style.width= `${index.value*0.9}ch`;
                span.style.marginLeft= `${index.inicio*0.9}ch`;
                span.textContent= index.elemento;
                span.setAttribute('id',index.elemento + element.oracion);
                if (index.margenUno == true) {
                    span.classList.add('segundosElementos')
                }else if(index.margenDos == true){
                    span.classList.add('tercerosElementos')
                }
                document.getElementById('oracion'+element.oracion).parentElement.appendChild(span)
            })
        }

    })

    oracion = document.querySelectorAll('.sentences')
    invocarNuevasOraciones();
}


// ________ Captura evento cuando hago click en el boton de añadir oraciones _______
button.addEventListener('click',(e)=>{;
    e.preventDefault();
    pegarOraciones(input.value)
    
})

// ________ Captura evento de cuando selecciono algo _______
const invocarNuevasOraciones = ()=>{

    oracion.forEach(element=>{
        element.addEventListener('select', (e)=>{
            inicio = e.target.selectionStart;
            fin = e.target.selectionEnd;
            oracionActual = e.target.getAttribute('id').substr(7);
            seleccionado = e.target.value.substr(inicio, (fin-inicio));
            parrafo = e.target.parentElement;
            seleccionPixelesActual= pixelesSeleccionados;
            pixelesArranqueActual = pixelesArranque;
        })
    })
}


// ________ Captura evento de cuando hago click para insertar algun elemento a las oraciones _______
insertar.forEach(element => {
    element.addEventListener('click',()=>{       

        let span = document.createElement('span');
        span.style.width= `${seleccionPixelesActual}px`;
        console.log(pixelesArranque);
        span.style.left= `${pixelesArranqueActual-1}px`;
        span.textContent= element.textContent;
        span.setAttribute('id',element.textContent + oracionActual);
        
    /* creo elemento nuevo con sus atributos */
        let elemento= {
            elemento: element.textContent,
            value: seleccionado.length,
            inicio: inicio,
            fin: fin
        }

    /* modifico propiedades en base a si hay elementos internos o no */
        if (arrayOraciones[oracionActual].elemento != undefined) {
            arrayOraciones[oracionActual].elemento.forEach(e=>{
                if (e.inicio >= elemento.inicio && e.fin <= elemento.fin) {
                    elemento.margenUno = true;
                }
            })
            arrayOraciones[oracionActual].elemento.forEach(e=>{
                if (e.inicio >= elemento.inicio && e.fin <= elemento.fin && e.margenUno == true) {
                    elemento.margenUno = false;
                    elemento.margenDos = true;
                }
            })

            arrayOraciones[oracionActual].elemento.forEach(e=>{
                if (elemento.inicio >= e.inicio && elemento.fin <= e.fin) {
                    if (e.margenUno == true) {
                        e.margenUno = false;
                        e.margenDos = true;
                    }else{
                        e.margenUno = true;
                    }
                }
            })

        }
        
        parrafo.appendChild(span)

    /* si todavia no hay elementos inserto el primero normal */
        if (arrayOraciones[oracionActual].elemento == undefined) {
            arrayElementos.push(elemento)
            arrayOraciones[oracionActual].elemento = arrayElementos;
            localStorage.setItem('oraciones', JSON.stringify(arrayOraciones))
    /* si ya hay elementos tomo esos elementos y le agrego el nuevo */
        }else{
            for(let i in arrayOraciones[oracionActual].elemento){
                arrayElementos.push(arrayOraciones[oracionActual].elemento[i])
            }
    /* ordeno array elementos por valor ascendente propiedad value */
            arrayElementos.push(elemento)
            arrayElementos.sort((a,b)=>{
                return (a.value - b.value)
            })
    /* inserto esa array de elementos en array general con todos los objetos */
            arrayOraciones[oracionActual].elemento = arrayElementos;

    /* agrego clase segun propiedades modificadas anteriormente */
            arrayOraciones[oracionActual].elemento.forEach(e=>{

                if (e.margenUno == true) {
                    document.querySelector('#'+e.elemento+oracionActual).classList.add('segundosElementos')

                }else if(e.margenDos == true){
                    document.querySelector('#'+e.elemento+oracionActual).classList.add('tercerosElementos')

                }
            })
    /* agrego todos los objetos al localStorage */
            localStorage.setItem('oraciones', JSON.stringify(arrayOraciones))
        }
        
        
        arrayElementos=[]
   
        // contadorElementos++;

        element.setAttribute('disabled', 'disabled')
   })
});


// ________ Muestra las oraciones almacenadas en el localStorage cuando inicia la pagina _______
let arrayOraciones= []
let cantidadOraciones;
if (localStorage.getItem('oraciones')== null) {
    arrayOraciones= []
    cantidadOraciones = 0
}else{
    arrayOraciones = [localStorage.getItem('oraciones')]
    arrayOraciones = JSON.parse(arrayOraciones);
    cantidadOraciones = arrayOraciones.length;
}
mostrarOraciones()

;
let pixelesArranque;
let pixelesTerminacion;
let pixelesSeleccionados;
let seleccionPixelesActual;
let pixelesArranqueActual;


window.addEventListener('mousedown',(e)=>{
    pixelesArranque = e.clientX
    console.log(pixelesArranque);
})
window.addEventListener('mouseup',(e)=>{
    pixelesTerminacion= e.clientX;
    pixelesSeleccionados = pixelesTerminacion - pixelesArranque;
})

