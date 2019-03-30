
if (!opener) { 
    alert("Acceso denegado. Accede desde el panel principal.");
    document.location.assign('../index.html');
}

let aleatorio1;
let aleatorio2;

do {
    aleatorio1 = Math.floor(Math.random() * 5) + 1;
} while(aleatorio1 === aleatorio2);

do {
    aleatorio2 = Math.floor(Math.random() * 5) + 1;
} while(aleatorio2 === aleatorio1);


let premio = String(aleatorio1);

let castigo = String(aleatorio2);

console.log("El premio está en el número " + premio);
console.log("El castigo está en el número " + castigo);


 const buttons = document.getElementsByTagName('button');

    for (let elm of buttons) {
 
        elm.onclick = function(){

            const fechaEspSorteo = new Date().getTime();
            opener.objPartida.huboSorteo = fechaEspSorteo;
           
        	//alert("Elegiste el número " + elm.textContent);

        	if (elm.textContent === premio) {

        		opener.objPartida.saldo += 10000;
        		opener.msg('success', '¡ENHORABUENA! Se han añadido 10.000$ a tu saldo.');
        		window.close(); 
        	}

        	else if (elm.textContent === castigo) {

                let elemBorrados = opener.objPartida.parque.splice(-2,2);

                     for (let eli of elemBorrados) {  

                            const celdas = opener.document.getElementsByClassName("celda");

                            for (let elem of celdas) {
                            
                                if(elem.dataset.celda === eli.celda) {
                                
                                    elem.dataset.edificio = "vacia";
                                
                            }
                    }

            }              

                opener.msg("error", "¡TERREMOTO! ¡Castigo con 2 edificos menos!");
				window.close();

        	}

        	else { 
        		opener.msg("warning", "¡SIGUE JUGANDO dentro de una hora!");
        		window.close();
        	}

        }
    }