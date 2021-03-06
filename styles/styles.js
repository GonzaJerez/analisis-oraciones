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
const botonCircunstanciales = document.querySelector('#botonCircunstanciales');
const listaCircunstanciales = document.querySelector('#listaCircunstanciales')
const botonPredicado = document.querySelector('#botonPredicado');
const listaPredicado = document.querySelector('#listaPredicado')
const botonSujeto = document.querySelector('#botonSujeto');
const listaSujeto = document.querySelector('#listaSujeto')
const botonOracion = document.querySelector('#botonOracion');
const listaOracion = document.querySelector('#listaOracion')

/* CUANDO HAGO CLICK EN BARRA MENU */
botonMenu.addEventListener('click',()=>{
    parteOculta.classList.toggle('menu-visible')
    botonMenu.classList.toggle('haciendo-focus-menu')
})

/* CUANDO HAGO CLICK EN "VER TUTORIAL" */
mostrarTutorial.addEventListener('click',()=>{
    localStorage.setItem('tutorial', 'true');
    window.location.reload();
})

/* CUANDO ABRO MENU "LISTA ELEMENTOS" */
const mostrarListaElementosFuncion = ()=>{
    deseleccionarCircunstanciales();
    deseleccionarPredicado();
    deseleccionarSujeto();
    deseleccionarOracion();
    cancelarSeleccionEliminar();
    cancelarSeleccion();
    deseleccionarDiccionarioGriego();
    listasCaracteresEspeciales.forEach(e=>{
        e.classList.remove('mostrar-caracteres-especiales')
    })
    deseleccionarEliminar();
    deseleccionarGuardar();
    listaElementos.classList.toggle('lista-elementos-visible');
    mostrarListaElementos.classList.toggle('haciendo-focus');
    mostrarListaElementos.lastElementChild.classList.toggle('girar-icono');
}
mostrarListaElementos.addEventListener('click',mostrarListaElementosFuncion)

/* CUANDO ABRO MENU "CIRCUNSTANCIALES" DENTRO DE "LISTA ELEMENTOS" */
botonCircunstanciales.addEventListener('click',()=>{
    deseleccionarPredicado();
    deseleccionarSujeto();
    deseleccionarOracion();
    cancelarSeleccion();
    listaCircunstanciales.classList.toggle('mostrar-circunstanciales');
    botonCircunstanciales.classList.toggle('haciendo-focus')
    botonCircunstanciales.lastElementChild.classList.toggle('girar-icono')
    listaElementos.classList.toggle('tambien-circunstanciales');
})

/* CUANDO ABRO MENU "PREDICADO" DENTRO DE "LISTA ELEMENTOS" */
botonPredicado.addEventListener('click',()=>{
    deseleccionarCircunstanciales();
    deseleccionarSujeto();
    deseleccionarOracion();
    cancelarSeleccion();
    listaPredicado.classList.toggle('mostrar-predicado');
    botonPredicado.classList.toggle('haciendo-focus')
    botonPredicado.lastElementChild.classList.toggle('girar-icono')
    listaElementos.classList.toggle('tambien-predicado');
})

/* CUANDO ABRO MENU "SUJETO" DENTRO DE "LISTA ELEMENTOS" */
botonSujeto.addEventListener('click',()=>{
    deseleccionarCircunstanciales();
    deseleccionarPredicado();
    deseleccionarOracion();
    cancelarSeleccion();
    listaSujeto.classList.toggle('mostrar-sujeto');
    botonSujeto.classList.toggle('haciendo-focus')
    botonSujeto.lastElementChild.classList.toggle('girar-icono')
    listaElementos.classList.toggle('tambien-sujeto');
})

/* CUANDO ABRO MENU "ORACION" DENTRO DE "LISTA ELEMENTOS" */
botonOracion.addEventListener('click',()=>{
    deseleccionarCircunstanciales();
    deseleccionarPredicado();
    deseleccionarSujeto();
    cancelarSeleccion();
    listaOracion.classList.toggle('mostrar-oracion');
    botonOracion.classList.toggle('haciendo-focus')
    botonOracion.lastElementChild.classList.toggle('girar-icono')
    listaElementos.classList.toggle('tambien-oracion');
})


/* CUANDO ABRO MENU "DICCIONARIO GRIEGO" */
const botonDiccionarioGriegoFuncion = ()=>{
    deseleccionarCircunstanciales();
    deseleccionarPredicado();
    deseleccionarSujeto();
    deseleccionarOracion();
    cancelarSeleccionEliminar();
    cancelarSeleccion();
    deseleccionarListaElementos();
    deseleccionarEliminar();
    deseleccionarGuardar();
    diccionarioGriego.classList.toggle('mostrar-diccionario-griego');
    botonDiccionarioGriego.classList.toggle('haciendo-focus');
    botonDiccionarioGriego.lastElementChild.classList.toggle('girar-icono');
    listasCaracteresEspeciales.forEach(e=>{
        e.classList.remove('mostrar-caracteres-especiales')
    })
}
botonDiccionarioGriego.addEventListener('click', botonDiccionarioGriegoFuncion)

/* CUANDO ABRO MENU "ELIMINAR" */
const eliminarFuncion = ()=>{
    deseleccionarCircunstanciales();
    deseleccionarPredicado();
    deseleccionarSujeto();
    deseleccionarOracion();
    cancelarSeleccionEliminar();
    cancelarSeleccion();
    deseleccionarListaElementos();
    deseleccionarDiccionarioGriego();
    listasCaracteresEspeciales.forEach(e=>{
        e.classList.remove('mostrar-caracteres-especiales')
    })
    deseleccionarGuardar();
    listaEliminar.classList.toggle('eliminar-visible');
    eliminar.classList.toggle('haciendo-focus');
    eliminar.lastElementChild.classList.toggle('girar-icono');
}
eliminar.addEventListener('click',eliminarFuncion);

/* CUANDO ABRO MENU "GUARDAR" */
const botonGuardarFuncion = ()=>{
    deseleccionarCircunstanciales();
    deseleccionarPredicado();
    deseleccionarSujeto();
    deseleccionarOracion();
    cancelarSeleccionEliminar();
    cancelarSeleccion();
    deseleccionarListaElementos();
    deseleccionarDiccionarioGriego();
    listasCaracteresEspeciales.forEach(e=>{
        e.classList.remove('mostrar-caracteres-especiales')
    })
    deseleccionarEliminar();
    guardarpdf.classList.toggle('menu-guardar-visible');
    botonGuardar.classList.toggle('haciendo-focus');
    botonGuardar.lastElementChild.classList.toggle('girar-icono');
}
botonGuardar.addEventListener('click',botonGuardarFuncion);

/* ESTILOS DE CUANDO SELECCIONO ALGUN ITEM DE MENU "ELIMINAR" */
botonesEliminar.forEach(e=>{
    e.addEventListener('click',()=>{

        cancelarSeleccionEliminar();
        e.classList.add('elementoSeleccionado');
        e.parentElement.classList.add('fondoElementoSeleccionado');
        e.nextElementSibling.classList.add('cancelarVisible');
        e.nextElementSibling.textContent= 'x';
    })
})

/* MUESTRA "X" PARA ELIMINAR ELEMENTO U ORACION */
eliminarOracion.addEventListener('click',()=>{
    botonesEliminarOracion.forEach(element => {
        element.style.display= 'flex';
    });
});

eliminarElementos.addEventListener('click',()=>{
    botonesEliminarElemento.forEach(element=>{
        element.style.display= 'contents';
    })
})


/* ELIMINA TODOS LOS ESTILOS DE LOS ITEMS SELECCIONADOS EN MENU "ELIMINAR" */
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

/* ELIMINA ESTILOS DE ITEMS MENU ELIMINAR CUANDO HAGA CLICK EN LA "X" PARA CANCELAR */
cancelarElemento.forEach(e=>{
    e.addEventListener('click',cancelarSeleccionEliminar)
})

/* CIERRA MENU "LISTA ELEMENTOS" */
const deseleccionarListaElementos = ()=>{
    listaElementos.classList.remove('lista-elementos-visible');
    mostrarListaElementos.classList.remove('haciendo-focus');
    mostrarListaElementos.lastElementChild.classList.remove('girar-icono');
}

/* CIERRA MENU "CIRCUNSTANCIALES" DENTRO DE MENU "LISTA ELEMENTOS" */
const deseleccionarCircunstanciales = ()=>{
    listaCircunstanciales.classList.remove('mostrar-circunstanciales');
    botonCircunstanciales.classList.remove('haciendo-focus')
    botonCircunstanciales.lastElementChild.classList.remove('girar-icono')
    listaElementos.classList.remove('tambien-circunstanciales');
}

/* CIERRA MENU "PREDICADO" DENTRO DE MENU "LISTA ELEMENTOS" */
const deseleccionarPredicado = ()=>{
    listaPredicado.classList.remove('mostrar-predicado');
    botonPredicado.classList.remove('haciendo-focus')
    botonPredicado.lastElementChild.classList.remove('girar-icono')
    listaElementos.classList.remove('tambien-predicado');
}

/* CIERRA MENU "SUJETO" DENTRO DE MENU "LISTA ELEMENTOS" */
const deseleccionarSujeto = ()=>{
    listaSujeto.classList.remove('mostrar-sujeto');
    botonSujeto.classList.remove('haciendo-focus')
    botonSujeto.lastElementChild.classList.remove('girar-icono')
    listaElementos.classList.remove('tambien-sujeto');
}

/* CIERRA MENU "ORACION" DENTRO DE MENU "LISTA ELEMENTOS" */
const deseleccionarOracion = ()=>{
    listaOracion.classList.remove('mostrar-oracion');
    botonOracion.classList.remove('haciendo-focus')
    botonOracion.lastElementChild.classList.remove('girar-icono')
    listaElementos.classList.remove('tambien-oracion');
}

/* CIERRA MENU "DICCIONARIO GRIEGO" */
const deseleccionarDiccionarioGriego = ()=>{
    diccionarioGriego.classList.remove('mostrar-diccionario-griego');
    botonDiccionarioGriego.classList.remove('haciendo-focus');
    botonDiccionarioGriego.lastElementChild.classList.remove('girar-icono');
}

/* CIERRA MENU "ELIMINAR" */
const deseleccionarEliminar = ()=>{
    listaEliminar.classList.remove('eliminar-visible');
    eliminar.classList.remove('haciendo-focus');
    eliminar.lastElementChild.classList.remove('girar-icono');
}

/* CIERRA MENU "GUARDAR" */
const deseleccionarGuardar = ()=>{
    guardarpdf.classList.remove('menu-guardar-visible');
    botonGuardar.classList.remove('haciendo-focus');
    botonGuardar.lastElementChild.classList.remove('girar-icono');
}

/* MUESTRA IMAGEN DE AYUDA EN MENU "GUARDAR" */
iconoInfo.addEventListener('mouseover',()=>{
    imgInfo.style.display= 'block';
    container.style.zIndex= '-1';
})
iconoInfo.addEventListener('mouseout',()=>{
    container.style.zIndex= '0';
    imgInfo.style.display= 'none'
})

/* MOSTRAR CARACTERES ESPECIALES */
/* si la letra por la q paso el mouse oculta caracteres especiales los muetra, cuando paso por encima de otra letra estos se ocultan */
letraGriega.forEach((e)=>{
    e.addEventListener('mouseover',()=>{
        listasCaracteresEspeciales.forEach(e=>{
            e.classList.remove('mostrar-caracteres-especiales')
        })
        if (e.nextElementSibling != null) {
            e.nextElementSibling.classList.add('mostrar-caracteres-especiales')
        }
    })
    
})

/* cuando pongo el mouse dentro de los caracteres especiales lo deja visible, cuando saco el mouse fuera lo oculta */
const listasCaracteresEspeciales = document.querySelectorAll('.ocultar-signos');

listasCaracteresEspeciales.forEach(e=>{
    e.addEventListener('mouseover',()=>{
        e.classList.add('mostrar-caracteres-especiales')
    })

    e.addEventListener('mouseout',()=>{
        e.classList.remove('mostrar-caracteres-especiales')
    })
})

/* CUANDO SELECCIONO ELEMENTO "SUJETO DESINENCIAL" DENTRO DE SUBMENU "SUJETO" */
const botonSujetoDesinencial = document.querySelector('#botonSujetoDesinencial');
const personaSujetoDesinencial = document.querySelector('#personaSujetoDesinencial');
const botonSujetoAceptar = document.querySelector('#sujetoAceptar');
const botonSujetoCancelar = document.querySelector('#sujetoCancelar');

botonSujetoDesinencial.addEventListener('click',()=>{
    fondoOscuro.style.display = 'block';
    personaSujetoDesinencial.style.display = 'block';
})

botonSujetoCancelar.addEventListener('click',()=>{
    fondoOscuro.style.display = 'none';
    personaSujetoDesinencial.style.display = 'none';
})

/* MENSAJES DE AYUDA LISTA ELEMENTOS*/

const mensajeAyudaListaElementos = document.querySelector('#mostrarListaElementos .mensajeAyuda')
const mensajeAyudaSujetoDesinencial = document.querySelector('#botonSujetoDesinencial .mensajeAyuda')
const mensajeAyudaTipoOracion = document.querySelector('#botonOracion .mensajeAyuda')

// mensaje de ayuda en lista elementos
document.querySelector('#mostrarListaElementos > svg.bi.bi-info-circle').addEventListener('mouseover',()=>{
    mensajeAyudaListaElementos.style.display = 'block';
    container.style.zIndex= '-1';
})
document.querySelector('#mostrarListaElementos > svg.bi.bi-info-circle').addEventListener('mouseout',()=>{
    mensajeAyudaListaElementos.style.display = 'none';
    container.style.zIndex= '0';
})

// mensaje de ayuda en sujeto desinencial
document.querySelector('#botonSujetoDesinencial > svg').addEventListener('mouseover',()=>{
    mensajeAyudaSujetoDesinencial.style.display = 'block';
    container.style.zIndex= '-1';
})
document.querySelector('#botonSujetoDesinencial > svg').addEventListener('mouseout',()=>{
    mensajeAyudaSujetoDesinencial.style.display = 'none';
    container.style.zIndex= '0';
})

// mensaje de ayuda en tipo oracion
document.querySelector('#botonOracion > svg').addEventListener('mouseover',()=>{
    mensajeAyudaTipoOracion.style.display = 'block';
    container.style.zIndex= '-1';
})
document.querySelector('#botonOracion > svg').addEventListener('mouseout',()=>{
    mensajeAyudaTipoOracion.style.display = 'none';
    container.style.zIndex= '0';
})