
if (!opener) { 
    alert("Acceso denegado. Accede desde el panel principal.");
    document.location.assign('../index.html');
}

class Edificio {

	constructor(numCelda, nombre){
		this._celda = numCelda;
		this._nombre = nombre;
	}

			get nombre() { 
				return this._nombre;
			}

            
            get celda() { 
                return this._celda;
            } 
            

			inicializar() { 
                
				const celdas = opener.document.getElementsByClassName("celda");

				for (let elm of celdas) {
 						
 						if(elm.dataset.celda === this._celda){
 							
 							elm.dataset.edificio = this._nombre;
 							
 						}
				}

			}

}

class Atraccion extends Edificio { 

	constructor(numCelda, nombre, visitantes){ 
        super (numCelda, nombre),
        this._visitantes = visitantes;
	}

	get tipo(){
		return "atraccion";
	}

	get visitantes(){
		return this._visitantes;
	}
} 

class Puesto extends Edificio {

	constructor(numCelda, nombre, ingresos){
        super (numCelda, nombre),
        this._ingresos = ingresos;
	}

	get tipo(){
		return "puesto";
	}

	get ingresos(){
		return this._ingresos;
	}
}

    const edificios = document.getElementsByClassName('edificio');

    for (let elm of edificios) { 

        elm.onclick = function(){

        	let coste = elm.dataset.coste;

         	let tipo = elm.dataset.tipo;


         		if(opener.objPartida.saldo >= coste) {

         			const celda = document.getElementById("numeroCelda").textContent;

         			const nombre = elm.dataset.nombre; 

         			opener.objPartida.saldo -= coste; 
 

         			if (tipo === "atraccion") {

         				const visitantes = elm.dataset.visitantes;

         				const atraccion = new Atraccion(celda, nombre, visitantes); 

                        //alert(atraccion.tipo);

         				opener.objPartida.parque.push(atraccion);
         		
         				atraccion.inicializar();

         				 opener.msg("success", "Edificio creado correctamente."); 
                         window.close(); 
         			}

         			if (tipo === "puesto") {

         				const ingresos = elm.dataset.ingresos;
         				const puesto = new Puesto(celda, nombre, ingresos);
         				//alert(puesto.nombre);
         				
         				opener.objPartida.parque.push(puesto);
         				puesto.inicializar();
         				opener.msg("success", "Edificio creado correctamente."); 
                        window.close();
         			}
		
         		} else {

         			msg("error", "¡Tu saldo no es suficiente!")
         		}
        }

    }