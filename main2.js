'use strict'

class Oracion{

    constructor(valor){
        this.valor = valor;
        let article = document.createElement('article');
        let nuevoInput = document.createElement('INPUT');
        nuevoInput.setAttribute('value', valor);
        nuevoInput.setAttribute('type','text')
        nuevoInput.setAttribute('disabled','disabled')
        nuevoInput.classList.add('sentences')
        // nuevoInput.setAttribute('id',`oracion${listaElementosOracion.length+1}`)
        article.appendChild(nuevoInput)
        section.appendChild(article)
        input.value= '';
        oracion = document.querySelectorAll('.sentences');
        this.seleccionarTexto();
    }


    agregarElemento(textoSeleccionado){
        let span = document.createElement('span');
        span.style.width= `${textoSeleccionado.length*7}px`
        span.style.marginLeft= `${inicio*6}px`
        span.textContent= element.textContent;
        parrafo.appendChild(span)
    }

    seleccionarTexto(){
        oracion.forEach(element=>{
            element.addEventListener('select', (e)=>{
                inicio = e.target.selectionStart;
                fin = e.target.selectionEnd;
                seleccionado = e.target.value.substr(inicio, (fin-inicio));
                parrafo = e.target.parentElement;
            })
        })
    }
}

const section= document.querySelector('#container section');
const input = document.querySelector('#input');
const button = document.querySelector('#button');
const insertar = document.querySelectorAll('.insertar');
let oracion = document.querySelectorAll('.sentences')

let seleccionado;
let parrafo;
let inicio;
let fin;
let listaElementosOracion= [];

button.addEventListener('click',(e)=>{;
    e.preventDefault();

    let oracion1 = new Oracion(input.value)
})

insertar.forEach(element => {
    element.addEventListener('click',()=>{       
        oracion1.agregarElemento(seleccionado)
   })
});