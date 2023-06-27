let presupuesto = 0;
let gastos = [];
let saldo = 0;

function obtenerPresupuesto() {
  const expression = /^[\d]+$/;
  presupuesto = document.getElementById("presupuesto").value;
  if (expression.test(presupuesto) === false) {
    alert("Verifique el campo, debe ser un número");
    return;
  }
  document.getElementById("presupuestoInfo").innerHTML = "$" + Number(presupuesto).toLocaleString("es-CL");
  limpiarIngreso()
}

function agregarGasto() {
  const nombreGasto = document.getElementById("nombreGasto").value;
  const precioGasto = parseFloat(document.getElementById("precioGasto").value);
  const gasto = { nombre: nombreGasto, precio: precioGasto };
  gastos.push(gasto);
  calcularGasto();
  inyectarDatos(gastos);
  limpiarInput()
  
}

function calcularGasto() {
  let resultado = 0;
  for (const gasto of gastos) {
    resultado += gasto.precio;
  }
  saldo = presupuesto - resultado;
  document.getElementById("gastoInfo").innerHTML = "$" + Number(resultado).toLocaleString("es-CL");
  document.getElementById("saldoInfo").innerHTML = "$" + Number(saldo).toLocaleString("es-CL");
}

function inyectarDatos(data) {
  document.getElementById("bodyTable").innerHTML = ""
  data.forEach((element, index) => {

    var row =
      `<tr>
    <td>${element.nombre}</td>
    <td>$${element.precio}</td>
    <td><i class="fa-regular fa-trash-can" onclick = "borrarDatos(${index})"></i></td>
  </tr>`
    document.getElementById("bodyTable").innerHTML += row
  });
}

function borrarDatos(index) {
  gastos.splice(index, 1)
  inyectarDatos(gastos)
  calcularGasto()
}

function limpiarInput(){
  document.getElementById("nombreGasto").value = ''
  document.getElementById("precioGasto").value = ''
}
function limpiarIngreso(){
  document.getElementById("presupuesto").value = ''
}



