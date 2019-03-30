

// var única accesible desde otra ventana

var objPartida = {
    iniciada: false,
    saldo: 3000,
    recaudacion: 0,
    visitantes: 0,
    parque: [],
    huboSorteo: false
};


// Ejecución paneles

//// PANEL Partida

document.getElementById('nuevaPartida').onclick = function (){ 

    if (!objPartida.iniciada) {

        open("paneles/nuevapartida.html", 'Nueva partida', 'scrollbars=yes,width=500,height=700,toolbar=yes');

    } else {

        msg('error', 'Ya has iniciado una partida previamente, no es posible crear una nueva partida');       

    }
}

//// PANEL Recaudar Caja

document.getElementById('recaudarCaja').onclick = function (){ 

    if (objPartida.recaudacion<=200) {

        msg('error', 'Accede cuando tengas 200€'); 

    } else {
 
        open("paneles/recaudarEntradas.html", 'Recauda', 'scrollbars=yes,width=500,height=400');

    }
}

//// PANEL Nuevo Sorteo

document.getElementById('nuevoSorteo').onclick = function (){ 

    const huboSorteoFormateado = new Date(objPartida.huboSorteo).toLocaleString('es-ES');

    const fechaAhoraClick = new Date().getTime();

    const tiempoEntreSorteos = fechaAhoraClick - objPartida.huboSorteo;

    const fechaAhoraClickFormateado = new Date().toLocaleString('es-ES');

    const fechaNuevoSorteo = objPartida.huboSorteo + 3600000;

    const opcionesDiaFechaNuevoSorteo = {year: '2-digit', month: '2-digit', day: '2-digit'};
    const opcionesHoraFechaNuevoSorteo = {hour: 'numeric', minute: 'numeric', second: 'numeric'};

    const fechaDiaNuevoSorteoFormateado = new Date(fechaNuevoSorteo).toLocaleString('es-ES', opcionesDiaFechaNuevoSorteo);

    const fechaHoraNuevoSorteoFormateado = new Date(fechaNuevoSorteo).toLocaleString('es-ES', opcionesHoraFechaNuevoSorteo);


    if (objPartida.parque.length < 2) {

        msg("error", "Participa cuando tengas 2 edificios");
    
    } else {

            if (objPartida.huboSorteo && tiempoEntreSorteos < 3600000){ 

            msg("error", "No puedes volver participar hasta las " + fechaHoraNuevoSorteoFormateado + "h del día " +fechaDiaNuevoSorteoFormateado, 3000);

            }  

            /*else if (objPartida.huboSorteo && tiempoEntreSorteos >= 3600000) {

                  msg("success", "Ha pasado ya una hora o más desde tu último sorteo ¡puedes volver a participar! ¡suerte!", 3000);

                  open("paneles/nuevoSorteo.html", 'Nuevo Sorteo', 'scrollbars=yes,width=500,height=700');

            }*/

            else {

                open("paneles/nuevoSorteo.html", 'Nuevo Sorteo', 'scrollbars=yes,width=500,height=700');

        }

    }
}


// celdas para crear edificios

    const celdas = document.getElementsByClassName('celda');

    for (let elm of celdas) { 

        elm.onclick = function(){

            if (objPartida.iniciada) {
           

                if(elm.dataset.edificio === "vacia"){
                  

                     let ventana = open("paneles/nuevoEdificio.html", 'Nuevo edificio (nombre ventana)', 'scrollbars=yes,width=700,height=1000,toolbar=yes');

                     ventana.onload = function(){

                        ventana.document.getElementById("numeroCelda").textContent = elm.dataset.celda;

                     }

                } 
                
                else { 
 
                    msg("error", "Elige una casilla sin edificar.");
                }
            }

            else {

                msg("error", "Inicia a la partida antes de construir.");
            }

    }

}



// intervalo de actualización

setInterval( function(){    

    // [TO-DO] - EVOLUCIÓN PARQUE
  

    for (let elm of objPartida.parque) {
            
            if(elm.tipo === "atraccion"){ 

                objPartida.visitantes += Number(elm.visitantes); 
                 
                objPartida.recaudacion += elm.visitantes * 2; 

            }

            if(elm.tipo === "puesto"){ 
                
                objPartida.saldo += Number(elm.ingresos); 
            }


           
    }

    // Actualización estadísticas panel

    document.getElementById('contadorEdificios').textContent = objPartida.parque.length + " edificios";

    document.getElementById('contadorVisitantes').textContent = objPartida.visitantes + " visitantes";

    document.getElementById('contadorRecaudacion').textContent = objPartida.recaudacion + " $ en caja";

    document.getElementById('contadorSaldoActual').textContent = objPartida.saldo + " $";

}, 100);