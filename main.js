'use strict'

const section= document.querySelector('#container section');
// const article = document.querySelector('#container section article')
const input = document.querySelector('#input');
const button = document.querySelector('#button');
const botonInsertarElementos = document.querySelectorAll('.insertar');
const letraGriega= document.querySelectorAll('.letra-griega');
const ol = document.querySelector('#lista')
const body = document.querySelector('body');
const container = document.querySelector('#container');
let oracionesEnPantalla;
let botonesEliminarOracion;
let botonesEliminarElemento;
let botonElementoApretado= true;

let textoSeleccionado;
let elementoPadreArticle;
let inicio;
let fin;
let numeroOracionActual;
let arrayElementos= [];

const cancelarElemento = document.querySelectorAll('.cancelar')



// ________ Muestra en pantalla todas las oraciones y elementos almacenados en "arrayOraciones" (por lo tanto tambien en el localStorage)_______
const mostrarOraciones= ()=>{

/* borra todo lo q haya en pantalla (parte oraciones) */
    ol.innerHTML = '';
    margenesDeElementos();
/* recorre array general y va creando elementos html por cada oracion q haya creada */
    arrayOraciones.forEach(element=>{
        let li = document.createElement('LI');
        let article = document.createElement('ARTICLE');
        let nuevoInput = document.createElement('INPUT');
        let nuevoBoton = document.createElement('BUTTON');
        nuevoInput.setAttribute('value', element.texto);
        nuevoInput.setAttribute('type','text')
        nuevoInput.setAttribute('disabled','disabled')
        nuevoInput.classList.add('sentences')
        nuevoInput.setAttribute('id',`oracion${element.oracion}`)
        nuevoBoton.setAttribute('type', 'button');
        nuevoBoton.setAttribute('id', 'boton'+element.oracion)
        nuevoBoton.classList.add('boton-eliminarOracion');
        nuevoBoton.textContent= 'x';
   
        article.appendChild(nuevoInput);
        article.appendChild(nuevoBoton);
        li.appendChild(article);
        ol.appendChild(li);
        section.appendChild(ol);
        

/* si hay elementos ya creados en la oracion q esta recorriendo, recorre "elementos" de array general y va creando elementos html por cada elemento q haya creado */
        if (element.elementos != undefined) {

            element.elementos.forEach(index=>{
                let span = document.createElement('SPAN');
                let botonEliminarSpan= document.createElement('button')
                // botonEliminarSpan.style.width= '3px'
                botonEliminarSpan.textContent= 'x';
                botonEliminarSpan.classList.add('boton-eliminarElemento');
                let arranque;
                span.style.width= `${index.cantidadPixeles}px`;

                if (body.firstElementChild != container ) {
                    span.style.left= `${index.pixelesInicio}px`;
                }else{
                    span.style.left= `${index.pixelesInicio-window.screen.availWidth*0.205-5}px`;
                }
                span.textContent= index.elemento;
                span.setAttribute('id',index.elemento + element.oracion);
                span.setAttribute('value', index.elemento)
                
                if (index.elementosInternos == 1) {
                    span.classList.add('segundosElementos')
                }else if(index.elementosInternos == 2){
                    span.classList.add('tercerosElementos')
                }
                span.appendChild(botonEliminarSpan)
                document.getElementById('oracion'+element.oracion).parentElement.appendChild(span)
            })
        }

    })
/* actualiza la variable "oracionesEnPantalla" para q almacene todas las oraciones q existan ahora y llama a las funciones q permiten seleccionar parte de oraciones
    y borrar oraciones (las activa, porque recien cuando termina esta funcion aparecen los elementos q usan esas funciones) */
    oracionesEnPantalla = document.querySelectorAll('.sentences')
    botonesEliminarOracion = document.querySelectorAll('.boton-eliminarOracion')
    botonesEliminarElemento = document.querySelectorAll('.boton-eliminarElemento')
    // seleccionarParteOraciones();
    borrarOracion();
    borrarElemento();
    
}





// ________ Captura evento cuando hago click en el boton de añadir oraciones _______
/* crea objeto de la oracion nueva - agrega el nuevo objeto al array - agrega el array al localStorage - deja vacio el input. */

button.addEventListener('click',(e)=>{;
    e.preventDefault();
    if (input.value !='' && input.value != ' ') { 
        let oracionNueva= {
            oracion: cantidadOraciones,
            texto: input.value
        }
        cantidadOraciones++
        arrayOraciones.push(oracionNueva);
        localStorage.setItem('oraciones', JSON.stringify(arrayOraciones)) 
        input.value= '';
        mostrarOraciones()    
    }else{
        alert('Ingresar oracion valida...')
    }
})


// ________ Captura evento de cuando hago click para insertar algun elemento a las oraciones _______
let listaElementoActual=[];
botonInsertarElementos.forEach(nomElemento => {
    nomElemento.addEventListener('click',()=>{
        cancelarSeleccion();
        /* activa una sola vez la funcion de seleccionar texto, sino escribe varias veces lo mismo */
        if (botonElementoApretado == true) {
            seleccionarParteOraciones()
            botonElementoApretado= false;
        }
        nomElemento.classList.add('elementoSeleccionado');
        nomElemento.parentElement.classList.add('fondoElementoSeleccionado');
        nomElemento.nextElementSibling.classList.add('cancelarVisible');
        nomElemento.nextElementSibling.textContent= 'x';
    })
});



// ________ Captura evento de cuando selecciono algo _______
/* cuando se selecciona texto almacena: caracter donde arranca, donde termina, el numero de oracion, texto seleccionado, el elemento padre donde se van a agregar
los elementos del analisis despues, los pixeles donde comienza la seleccion y la cantidad de pixeles seleccionados */
let seleccionarParteOraciones = ()=>{

    setTimeout(()=>{
        
        oracionesEnPantalla.forEach(element=>{
            element.addEventListener('select', (e)=>{
                inicio = e.target.selectionStart;
                fin = e.target.selectionEnd;
                numeroOracionActual = e.target.getAttribute('id').substr(7);
                textoSeleccionado = e.target.value.substr(inicio, (fin-inicio));
                elementoPadreArticle = e.target.parentElement;
                seleccionPixelesActual= pixelesSeleccionados;
                pixelesArranqueActual = pixelesArranque;
                insertarElementos();
            })
        })
    },100)
}


// ___________ INSERTA ELEMENTO NUEVO EN ARRAY GENERAL, DESPUES CUANDO TERMINA LA FUNCION SE MUESTRA NUEVA ARRAY EN PANTALLA______
const insertarElementos = ()=>{
    /* captura el ultimo elemento seleccionado */
    let ultimoElementoSeleccionado;
    botonInsertarElementos.forEach(e=>{
        if (e.classList.contains('elementoSeleccionado')) {
            ultimoElementoSeleccionado = e
        }
    })
/* creo elemento nuevo con sus atributos */
    let elemento= {
        elemento: ultimoElementoSeleccionado.textContent,   // sujeto - predicado - verbo - etc...
        value: textoSeleccionado.length,                    // cantidad de caracteres seleccionados
        inicio: inicio,                                     // numero de caracter donde arranca 
        fin: fin,                                           // numero de caracter donde termina
        pixelesInicio: pixelesArranqueActual,               // cantidad de pixeles desde la izquierda donde arranca seleccion
        cantidadPixeles: seleccionPixelesActual,            // cantidad de pixeles seleccionados
        elementosInternos: 0
    }


/* si todavia no hay elementos en array general creo array de elementos, le agrego el nuevo elemento y agrego el array de elementos al array general */
    if (arrayOraciones[numeroOracionActual].elementos == undefined) {
        arrayElementos.push(elemento)
        arrayOraciones[numeroOracionActual].elementos = arrayElementos;
        localStorage.setItem('oraciones', JSON.stringify(arrayOraciones))
/* si ya hay elementos en array general tomo esos elementos, los agrego al array de elementos y agrego nuevo elemento a este array */
    }else{
        let yaExiste= false
        for(let i in arrayOraciones[numeroOracionActual].elementos){
            if (arrayOraciones[numeroOracionActual].elementos[i].elemento== elemento.elemento) {
                alert('No es posible agregar, esta oracion ya tiene '+elemento.elemento);
                yaExiste= true;
            }else{

                arrayElementos.push(arrayOraciones[numeroOracionActual].elementos[i])
            }
        }
        if (yaExiste== false) {
            
            arrayElementos.push(elemento)
    /* ordeno array de elementos por valor ascendente propiedad value */
            arrayElementos.sort((a,b)=>{
                return (b.value - a.value)
            })
    /* inserto esa array de elementos en array general con todos los objetos */
            arrayOraciones[numeroOracionActual].elementos = arrayElementos;
    
    
    /* agrego array general al localStorage, reemplazando lo q ya habia por el nuevo array modificado */
            localStorage.setItem('oraciones', JSON.stringify(arrayOraciones))
        }
    }
    
/* array elementos vuelve a estar vacio */
    arrayElementos=[]

    /* vuelve a dejar activa la funcion de seleccionar texto cuando haga click en elemento a agregar */
    botonElementoApretado= true

    // element.setAttribute('disabled', 'disabled')
    mostrarOraciones();
    cancelarSeleccion();

}


// _____ MODIFICA PROPIEDAD "elementosInternos" DE LOS ELEMENTOS EN BASE A CANTIDAD DE ELEMENTOS QUE CONTENGAN____________
/* reinicia todos a 0, va comparando cada elemento con los demas y si contiene uno le agrega margen
compara otra vez y si contiene alguno q ya contenga otro dentro agrega mas margen,
por ultimo agrega nuevas modificaciones al localStorage */
const margenesDeElementos= ()=>{
    
   arrayOraciones.forEach(or=>{
        if (or.elementos != undefined) {
        
            or.elementos.forEach(n=>{
                n.elementosInternos=0;
                or.elementos.forEach(e=>{
                    if (n!=e && e.inicio >= n.inicio && e.fin <= n.fin) {
                        n.elementosInternos=1;
                    }
                })    
            })
     
            or.elementos.forEach(n=>{
             or.elementos.forEach(e=>{
                 if (n!=e && e.inicio >= n.inicio && e.fin <= n.fin && e.elementosInternos == 1) {
                     n.elementosInternos=2;
                 }
             })
            })
        }
    })
    localStorage.setItem('oraciones', JSON.stringify(arrayOraciones));
   
}



// ___________ ELIMINAR ORACION ENTERA ____________________
/* toma el indice desde el id del boton - elimina oracion del array - actualiza propiedad "oracion" en cada elemento del array general - actualiza variable
    cantidadOraciones para q almacene la nueva cantidad de elementos - actualiza array en localStorage */
const borrarOracion = ()=>{
    botonesEliminarOracion.forEach(element=>{

        element.addEventListener('click',e=>{
            arrayOraciones.splice(element.getAttribute('id').substr(5),1);

            for(let indice in arrayOraciones){
                arrayOraciones[indice].oracion = indice;
            }
            cantidadOraciones = arrayOraciones.length;

            localStorage.setItem('oraciones', JSON.stringify(arrayOraciones));
            cancelarSeleccionEliminar();
            mostrarOraciones();
        })
    })
}




// ___________ ELIMINAR ELEMENTOS ______________________
/* toma el contenido del elemento padre del boton (span) y lo compara con la propiedad "elemento" de la oracion (la oracion actual se obtiene mediante
    el id del elemento padre), si son iguales elimina ese elemento del array - actualiza array en localStorage*/
/* si borra un elemento interno entonces al elemento mayor q ya existia le saca margen */
const borrarElemento = ()=>{
    botonesEliminarElemento.forEach(element=>{
        element.addEventListener('click',e=>{
            let elementoAEliminar = element.parentElement.textContent.substr(0,element.parentElement.textContent.length-1)
            let indiceElementoAEliminar = element.parentElement.getAttribute('id').substr(elementoAEliminar.length)
            // let elementoEliminado;

            for(let i in arrayOraciones[indiceElementoAEliminar].elementos){
                if(arrayOraciones[indiceElementoAEliminar].elementos[i].elemento == elementoAEliminar){
                    /* elementoEliminado =  */arrayOraciones[indiceElementoAEliminar].elementos.splice(i,1)[0];
                };
            }

            localStorage.setItem('oraciones', JSON.stringify(arrayOraciones));
            cancelarSeleccionEliminar();
            mostrarOraciones();
            
        })
    })
}

/* _______________ ELIMINAR TODO _______________ */

const borrarTodo = ()=>{
    window.confirm();
    // arrayOraciones = [];
    // localStorage.setItem('oraciones', JSON.stringify(arrayOraciones));
    // mostrarOraciones();
}

document.querySelector('#eliminarTodo').addEventListener('click',()=>{
    let borrarTodo;
    setTimeout(()=>{
        borrarTodo = window.confirm('Seguro que deseas eliminar todo? Los cambios no descargados se perderan.');
        if (borrarTodo == true) {
            arrayOraciones = [];
            localStorage.setItem('oraciones', JSON.stringify(arrayOraciones));
            mostrarOraciones();
        }
        setTimeout(()=>{
            cancelarSeleccionEliminar();
            cantidadOraciones = arrayOraciones.length;
        },10);
    },10)
})

const cancelarSeleccion = ()=>{
    botonInsertarElementos.forEach(e=>{
        e.classList.remove('elementoSeleccionado');
        e.parentElement.classList.remove('fondoElementoSeleccionado');
        e.nextElementSibling.classList.remove('cancelarVisible');
        e.nextElementSibling.textContent= 'v';
    })
}

cancelarElemento.forEach(e=>{

    e.addEventListener('click',cancelarSeleccion)
})



let signoAlmacenado= '';
const signoGriego = document.querySelectorAll('.signos');
signoGriego.forEach(e=>{
    e.addEventListener('click',()=>{
        signoAlmacenado = e.textContent;
    })
})


letraGriega.forEach(e=>{
    e.addEventListener('click',()=>{
        if (signoAlmacenado == '') {
            input.value+= e.textContent;
        }else{
            input.value+=(signoAlmacenado+e.textContent);
        }
        signoAlmacenado='';
    });
})


/* ______________________ TUTORIAL _________________ */

const fondoOscuro = document.querySelector('#fondoOscuro');
const muestraInsertarOracion = document.querySelector('.muestra-insertarOracion');
const muestraHojaEstudio = document.querySelector('.muestra-hojaEstudio');
const muestraListaElementos = document.querySelector('.muestra-listaElementos');
const muestraDiccionarioGriego = document.querySelector('.muestra-diccionarioGriego');
const muestraEliminar = document.querySelector('.muestra-eliminar');
const muestraGuardar = document.querySelector('.muestra-guardar');
const formulario = document.querySelector('#container form');
const menu = document.querySelector('#menu');
const cerrarTutorial = document.querySelectorAll('.cerrarTutorial');

window.addEventListener('load',()=>{
    if(localStorage.getItem('tutorial') == null || localStorage.getItem('tutorial') == 'true'){
        fondoOscuro.style.display= 'block';
        section.style.zIndex= '-1';
        muestraInsertarOracion.style.display= 'block';
        muestraInsertarOracion.style.opacity= '1';
        formulario.style.zIndex= '3';

        muestraInsertarOracion.lastElementChild.addEventListener('click',()=>{
            muestraListaElementos.style.display= 'block';
            muestraInsertarOracion.style.opacity= '0';
            menu.style.zIndex= '3';
            setTimeout(()=>{
                muestraInsertarOracion.style.display= 'none';  
                muestraListaElementos.style.opacity= '1';
            },200)
        })
        muestraListaElementos.lastElementChild.addEventListener('click',()=>{
            muestraDiccionarioGriego.style.display= 'block';
            muestraListaElementos.style.opacity ='0';
            setTimeout(()=>{
                muestraListaElementos.style.display= 'none'; 
                muestraDiccionarioGriego.style.opacity= '1';
                botonDiccionarioGriegoFuncion();
            },200)
        })
        muestraDiccionarioGriego.lastElementChild.addEventListener('click',()=>{
            muestraEliminar.style.display= 'block';
            muestraDiccionarioGriego.style.opacity = '0';
            setTimeout(()=>{
                muestraDiccionarioGriego.style.display= 'none';
                muestraEliminar.style.opacity = '1';
                eliminarFuncion();
            })
        })
        muestraEliminar.lastElementChild.addEventListener('click',()=>{
            muestraGuardar.style.display= 'block';
            muestraEliminar.style.opacity= '0';
            setTimeout(()=>{
                muestraEliminar.style.display= 'none';
                muestraGuardar.style.opacity= '1';
                botonGuardarFuncion();
            })
        })
        muestraGuardar.lastElementChild.addEventListener('click',()=>{
            muestraHojaEstudio.style.display= 'block';
            muestraGuardar.style.opacity= '0';
            setTimeout(()=>{
                muestraGuardar.style.display= 'none';
                muestraHojaEstudio.style.opacity= '1';
                botonGuardarFuncion();
            })
        })
        muestraHojaEstudio.lastElementChild.addEventListener('click',()=>{
            fondoOscuro.style.display= 'none';
            section.style.zIndex= '0';
        })

        localStorage.setItem('tutorial', 'false');

    }
})

cerrarTutorial.forEach(e=>{
    e.addEventListener('click',()=>{
        fondoOscuro.style.display= 'none';
        section.style.zIndex= '0';
    })
})

// ________ CUANDO INICIA LA PAGINA, SI HAY ORACIONES YA CARGADAS EN EL LOCALSTORAGE LAS ALMACENA EN arrayOraciones, SINO CREA arrayOraciones VACIO _______
/* tambien almacena la cantidad de oraciones existentes */
let arrayOraciones= []
let cantidadOraciones;
if (localStorage.getItem('oraciones')== null) {
    arrayOraciones= [];
    cantidadOraciones = 0
    let oracionNueva= {
        oracion: cantidadOraciones,
        texto: 'Esta es una oracion de prueba'
    }
    arrayOraciones.push(oracionNueva)
    cantidadOraciones++
}else{
    arrayOraciones = [localStorage.getItem('oraciones')]
    arrayOraciones = JSON.parse(arrayOraciones);
    cantidadOraciones = arrayOraciones.length;
}
mostrarOraciones()



/* _________SECCION QUE ALMACENA LOS PIXELES EN PANTALLA EN EJE X DONDE SE EMPIECE A SELECCIONAR Y DONDE TERMINE_________ */
let pixelesArranque;
let pixelesTerminacion;
let pixelesSeleccionados;
let seleccionPixelesActual;
let pixelesArranqueActual;

window.addEventListener('mousedown',(e)=>{
    pixelesArranque = e.clientX
})
window.addEventListener('mouseup',(e)=>{
    pixelesTerminacion= e.clientX;
    pixelesSeleccionados = pixelesTerminacion - pixelesArranque;
})
