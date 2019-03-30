
if (!opener) { 
    alert("Acceso denegado. Accede desde el panel principal.");
    document.location.assign('../index.html');
}

document.getElementById("recaudar").onclick = function(){

// queremos lo recaudado - coste de recaudación

	const beneficio = opener.objPartida.recaudacion - 200;

	opener.objPartida.recaudacion = 0;

	opener.objPartida.saldo += beneficio;

	opener.msg('success', 'Se han añadido ' + beneficio + '$ a tu saldo.');

	window.close();

}

