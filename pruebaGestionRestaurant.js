const listaMesas = [
    {id: 1, capacidad: 4, estado: true},
    {id: 2, capacidad: 5, estado: true},
    {id: 3, capacidad: 6, estado: true},
    {id: 4, capacidad: 5, estado: true},
    {id: 5, capacidad: 8, estado: true}
];
//Esta funcion verifica si se supera o no el limite de indices de las mesas.
function ocuparDesocupar(idMesa) {
    if (idMesa >= 0 && idMesa < listaMesas.length) {  
        listaMesas[idMesa].estado = false;
    } else {
        console.error("Índice de mesa no válido:", idMesa);
    }
}
//listas
const historialUsuariosReservas = [];
const listaMenus = [];

//Seccion de clases---->>>

//Esta es la clase que representa menu
class Menu {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

//clase que representa a cliente

class Cliente {
    constructor(nombre, cantPersonas, menuSeleccionado) {
        this.nombre = nombre;
        this.cantPersonas = cantPersonas;
        this.menuSeleccionado = menuSeleccionado;
        this.mesaAsignada = null;
        this.estadoReserva = "pendiente";
        this.fechaReserva = new Date();
    }
    
    alterarMesa(posicion) {
        this.mesaAsignada = posicion;
        listaMesas[posicion].estado = false;
    }
}
//clase que representa a mesa
class Mesa {
    constructor(id, capacidad) {
        this.id = id;
        this.capacidad = capacidad;
    }
}
//Seccion de funciones---->>>

//Este agrega una nueva mesa, solo en caso de que no hayan disponibles con la capacidad solicitada
function agregarMesa(nuevoId, capacidad) {
    const nuevaMesa = new Mesa(nuevoId, capacidad);
    listaMesas.push(nuevaMesa);
    return nuevoId;
}

function mostrarEstadoMesas() {
    console.log("Estado de las mesas:");
    console.table(listaMesas.map(mesa => ({
        Id: mesa.id,
        capacidad: mesa.capacidad,
        estado: mesa.estado
    })));
}

function mostrarHistorial() {
    console.log("Cargando historial de reservas...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(historialUsuariosReservas);
        }, 3000);
    });
}

function verificarMesasDisponibles(cantPersonas) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let mesaValida = null;

            mesaValida = listaMesas.find(mesa => mesa.estado === true && mesa.capacidad >= cantPersonas);

            if (!mesaValida) {
               
                agregarMesa(listaMesas.length + 1, cantPersonas);
                resolve({ nuevaMesa: true, idMesa: listaMesas.length });
            } else {
               
                resolve({ nuevaMesa: false, idMesa: mesaValida.id });
            }
        }, 3000);
    });
}


async function procesarReserva(cliente) {
    try {
        console.log(`Procesando reserva... para: ${cliente.nombre} (${cliente.cantPersonas}) con el menu "${cliente.menuSeleccionado}"`);
        
        
        const { nuevaMesa, idMesa } = await verificarMesasDisponibles(cliente.cantPersonas);

        let mesaAsignada = idMesa;

        if (nuevaMesa) {
            cliente.mesaAsignada = mesaAsignada;  
            console.log(`Mesa nueva asignada: ${mesaAsignada} para ${cliente.nombre} (${cliente.cantPersonas})`);
        } else {
           
            const mesa = listaMesas.find(mesa => mesa.id === mesaAsignada);
            if (mesa && !mesa.estado) {
                
                mesaAsignada = listaMesas.find(mesa => mesa.estado === true && mesa.capacidad >= cliente.cantPersonas).id;
                console.log(`Mesa ${mesa.id} está ocupada. Se le asignará la mesa ${mesaAsignada}.`);
            }
            cliente.mesaAsignada = mesaAsignada;  
            console.log(`Mesa asignada: ${mesaAsignada} para ${cliente.nombre} (${cliente.cantPersonas})`);
        }

     
        const menu = listaMenus.find(m => m.nombre.toLowerCase() === cliente.menuSeleccionado.toLowerCase());
        if (!menu) {
            cliente.estadoReserva = "cancelada";
            throw new Error(`Menu "${cliente.menuSeleccionado}" no está disponible. Reserva cancelada.`);
        }

        
        ocuparDesocupar(cliente.mesaAsignada);
        cliente.estadoReserva = "completado";

        console.log(`Reserva completada: ${cliente.nombre} ha reservado la mesa ${cliente.mesaAsignada} con el menu "${menu.nombre}"`);

       
        historialUsuariosReservas.push({
            cliente: cliente.nombre,
            cantPersonas: cliente.cantPersonas,
            menuSeleccionado: cliente.menuSeleccionado,
            mesaAsignada: cliente.mesaAsignada,
            estadoReserva: cliente.estadoReserva,
            fechaReserva: cliente.fechaReserva,
        });
        
        console.table(historialUsuariosReservas);

    } catch (error) {
        console.error(error.message);
    }
}


listaMenus.push(new Menu("Pizza", 2, 18));
listaMenus.push(new Menu("Arroz", 3, 18));
listaMenus.push(new Menu("Pasta", 7, 18));
listaMenus.push(new Menu("Carne", 5, 18));
listaMenus.push(new Menu("Sopa", 9, 18));

mostrarEstadoMesas();

const cliente1 = new Cliente("Elkin", 7, "Arroz");
const cliente2 = new Cliente("Andrey", 9, "Soppa");
const cliente3 = new Cliente("Gil", 3, "Carne");

procesarReserva(cliente1);
procesarReserva(cliente2);
procesarReserva(cliente3);

mostrarHistorial();



