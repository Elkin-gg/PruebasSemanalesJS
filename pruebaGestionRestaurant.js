//creamos la clase menu para el restaurante.
const historialUsuariosReservas = [];
class Menu {
    constructor(nombre,cantidad,precio) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}
//creamos la clase de la mesa con los metodos necesarios.
class Mesa  {
    constructor(id, capacidad) {
        this.id = id;
        this.capacidad = capacidad;
        this.estado = "libre";//predefinimos el estado por defecto de la mesa
    }
    ocupar(){
        this.estado = "ocupada";
    }
    liberar(){
        this.estado = "libre";
    }
}
//creamos la clase que va representar cliente
class Cliente {
    constructor(nombre, cantPersonas, menuSeleccionado) {
        this.nombre = nombre;
        this.cantPersonas = cantPersonas;
        this.menuSeleccionado = menuSeleccionado;
        this.mesaAsignada = null;
        this.estadoReserva = "pendiente";
        this.fechaReserva = new Date();
    }
}
//creamos la lista de menus.
const listaMenus = [];
//Agregamos lso elementos a la lista
listaMenus.push(new Menu("Arroz chino", 4, 13));
listaMenus.push(new Menu("Pollo asado", 7, 12));
listaMenus.push(new Menu("Sancocho", 16, 21));

//lista para agregar las mesas
const listaMesas = [];
//Zona de las funciones
function mostrarEstadoMesas() {
    console.log("Estado de las mesas:");
    console.table(listaMesas.map(mesa=>({
        Id : mesa.id,
        capacidad : mesa.capacidad,
        estado : mesa.estado
    })))
}

//funcion para mostrar el historial de las reservas

function mostrarHistorial() {
    console.log("Cargando historial de reservas...");
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(historialUsuariosReservas);
        }, 3000);
    })
}
function agregarMesa(id, capacidad = 4) {
    const nuevaMesa = new Mesa(id, capacidad);
    listaMesas.push(nuevaMesa);
}
//con el for agregamos la cantidad de mesas disponibles, la podemos variar
for(let i = 0; i<=5; i++){
    agregarMesa(i, 4);
}
//si vamos agregar mesas de diferentes cantidades es solo jugar con la logica del for

//para almacenar el registro de las reservas, el historial

function verificarMesasDisponibles(cantPersonas) {
    return new Promise((resolve)=>{
        setTimeout(() => {
            //vamos a usar directamente un booleano
            resolve(listaMesas.find(mesa=>mesa.estado === "libre" && mesa.capacidad >= cantPersonas) || null); //en caso de no consiga    
        }, 3000);
    })
}
 async function procesarReserva(cliente) {
    try {
        console.log(`Procesando reserva... para: ${cliente.nombre} (${cliente.cantPersonas}) con el menu "${cliente.menuSeleccionado}"`)
    //esperando para verificar si las mesas estan disponibles

    let mesa = await verificarMesasDisponibles(cliente.cantPersonas);//este nos retorna true o false dependiendo si se cumple la condicion

    if(!mesa){
        const nuevoId = listaMesas.length +1;
        agregarMesa(nuevoId, 4);;
        mesa = listaMesas.find(m => m.id === nuevoId);
        throw new Error(`No hay mesas disponibles para ${cliente.cantPersonas} personas, agregando una nueva mesa... ID: ${nuevoId} y capacidad de 4 para ${cliente.nombre}`);

        //buscar si está disponible el plato en el menu, usando minusculas para evitar las complicaciones
    }
    const menu = listaMenus.find(m => m.nombre.toLowerCase() === cliente.menuSeleccionado.toLowerCase());
    if(!menu){
        cliente.estadoReserva = "cancelada";
        throw new Error(`Menu "${cliente.menuSeleccionado}" no está disponible. Reserva cancelada."`)
    }else{
        cliente.mesaAsignada = mesa.id;
        mesa.ocupar();

        cliente.estadoReserva = "completado";

        console.log(`Reserva completada: ${cliente.nombre} ha reservado la mesa ${mesa.id} con el menu "${menu.nombre}"`);

        //agregar el pedido al historial de los pedidos
        historialUsuariosReservas.push({
            cliente: cliente.nombre,
            cantPersonas : cliente.cantPersonas,
            menuSeleccionado : cliente.menuSeleccionado,
            mesaAsignada : cliente.mesaAsignada,
            estadoReserva : cliente.estadoReserva,
            fechaReserva : cliente.fechaReserva,
        })
        console.table(historialUsuariosReservas);
     
    }
    } catch (error) {
        console.error(error.message);
    }finally{
        
    }
    
}
//flujo principal del programa
listaMenus.push(new Menu("Pizza", 2, 18));
console.log("Nuevo menú agregado: Pizza");

mostrarEstadoMesas();

const cliente1 = new Cliente("Elkin", 3, "Arriz chino"); 
const cliente2 = new Cliente("Andrey", 3, "sancocho"); 
const cliente3 = new Cliente("Gil", 3, "pollo asado");
procesarReserva(cliente1);
procesarReserva(cliente2);
procesarReserva(cliente3);

//agregando el nuevo alimento al menu

mostrarHistorial();


