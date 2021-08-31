const parteOculta = document.querySelector('#parteOculta');
const botonMenu = document.querySelector('#botonMenu');
const mostrarTutorial = document.querySelector('#mostrarTutorial')
const mostrarListaElementos = document.querySelector('#mostrarListaElementos');
const listaElementos = document.querySelector('#listaElementos');
const botonDiccionarioGriego = document.querySelector('#botonDiccionarioGriego');
const diccionarioGriego = document.querySelector('#diccionarioGriego');
const eliminar = document.querySelector('#eliminar');
const listaEliminar = document.querySelector('#listaEliminar');
const botonesEliminar = document.querySelectorAll('#listaEliminar button');
const eliminarOracion = document.querySelector('#eliminarOracion');
const eliminarElementos = document.querySelector('#eliminarElementos');
const botonGuardar = document.querySelector('#botonGuardar');
const guardarpdf = document.querySelector('#guardarpdf');
const iconoInfo = document.querySelector('#iconoInfo');
const imgInfo = document.querySelector('#imgInfo');


botonMenu.addEventListener('click',()=>{
    parteOculta.classList.toggle('menu-visible')
    botonMenu.classList.toggle('haciendo-focus-menu')
})

mostrarTutorial.addEventListener('click',()=>{
    localStorage.setItem('tutorial', 'true');
    window.location.reload();
})

const mostrarListaElementosFuncion = ()=>{
    cancelarSeleccionEliminar();
    cancelarSeleccion();
    deseleccionarDiccionarioGriego();
    deseleccionarEliminar();
    deseleccionarGuardar();
    listaElementos.classList.toggle('lista-elementos-visible');
    mostrarListaElementos.classList.toggle('haciendo-focus');
    mostrarListaElementos.lastElementChild.classList.toggle('girar-icono');
}
mostrarListaElementos.addEventListener('click',mostrarListaElementosFuncion)


const botonDiccionarioGriegoFuncion = ()=>{
    cancelarSeleccionEliminar();
    cancelarSeleccion();
    deseleccionarListaElementos();
    deseleccionarEliminar();
    deseleccionarGuardar();
    diccionarioGriego.classList.toggle('mostrar-diccionario-griego');
    botonDiccionarioGriego.classList.toggle('haciendo-focus');
    botonDiccionarioGriego.lastElementChild.classList.toggle('girar-icono');
}
botonDiccionarioGriego.addEventListener('click', botonDiccionarioGriegoFuncion)


const eliminarFuncion = ()=>{
    cancelarSeleccionEliminar();
    cancelarSeleccion();
    deseleccionarListaElementos();
    deseleccionarDiccionarioGriego();
    deseleccionarGuardar();
    listaEliminar.classList.toggle('eliminar-visible');
    eliminar.classList.toggle('haciendo-focus');
    eliminar.lastElementChild.classList.toggle('girar-icono');
}
eliminar.addEventListener('click',eliminarFuncion);


const botonGuardarFuncion = ()=>{
    cancelarSeleccionEliminar();
    cancelarSeleccion();
    deseleccionarListaElementos();
    deseleccionarDiccionarioGriego();
    deseleccionarEliminar();
    guardarpdf.classList.toggle('menu-guardar-visible');
    botonGuardar.classList.toggle('haciendo-focus');
    botonGuardar.lastElementChild.classList.toggle('girar-icono');
}
botonGuardar.addEventListener('click',botonGuardarFuncion);


botonesEliminar.forEach(e=>{
    e.addEventListener('click',()=>{

        cancelarSeleccionEliminar();
        e.classList.add('elementoSeleccionado');
        e.parentElement.classList.add('fondoElementoSeleccionado');
        e.nextElementSibling.classList.add('cancelarVisible');
        e.nextElementSibling.textContent= 'x';
    })
})

eliminarOracion.addEventListener('click',()=>{
    botonesEliminarOracion.forEach(element => {
        element.style.display= 'flex';
    });
});

eliminarElementos.addEventListener('click',()=>{
    botonesEliminarElemento.forEach(element=>{
        element.style.display= 'inline';
    })
})


const cancelarSeleccionEliminar = ()=>{
    botonesEliminar.forEach(e=>{
        e.classList.remove('elementoSeleccionado');
        e.parentElement.classList.remove('fondoElementoSeleccionado');
        e.nextElementSibling.classList.remove('cancelarVisible');
        e.nextElementSibling.textContent= 'v';
        botonesEliminarOracion.forEach(element=>{
            
            element.style.display = 'none';

        })
        botonesEliminarElemento.forEach(element=>{
            
            element.style.display = 'none';
            
        })
    })
}

cancelarElemento.forEach(e=>{
    e.addEventListener('click',cancelarSeleccionEliminar)
})

const deseleccionarDiccionarioGriego = ()=>{
    diccionarioGriego.classList.remove('mostrar-diccionario-griego');
    botonDiccionarioGriego.classList.remove('haciendo-focus');
    botonDiccionarioGriego.lastElementChild.classList.remove('girar-icono');
}

const deseleccionarEliminar = ()=>{

    listaEliminar.classList.remove('eliminar-visible');
    eliminar.classList.remove('haciendo-focus');
    eliminar.lastElementChild.classList.remove('girar-icono');
}

const deseleccionarListaElementos = ()=>{
    listaElementos.classList.remove('lista-elementos-visible');
    mostrarListaElementos.classList.remove('haciendo-focus');
    mostrarListaElementos.lastElementChild.classList.remove('girar-icono');
}

const deseleccionarGuardar = ()=>{
    guardarpdf.classList.remove('menu-guardar-visible');
    botonGuardar.classList.remove('haciendo-focus');
    botonGuardar.lastElementChild.classList.remove('girar-icono');
}

iconoInfo.addEventListener('mouseover',()=>{
    imgInfo.style.display= 'block';
    container.style.zIndex= '-1';
})
iconoInfo.addEventListener('mouseout',()=>{
    container.style.zIndex= '0';
    imgInfo.style.display= 'none'
})