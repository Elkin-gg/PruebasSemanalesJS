const listaMesas = [
    { id: 1, capacidad: 4, estado: true },
    { id: 2, capacidad: 5, estado: true },
    { id: 3, capacidad: 6, estado: true },
    { id: 4, capacidad: 5, estado: true },
    { id: 5, capacidad: 8, estado: true }
];

const historialUsuariosReservas = [];
const listaMenus = [];

class Mesa {
    constructor(id, capacidad) {
        this.id = id;
        this.capacidad = capacidad;
        this.estado = true;
    }
}

class Menu {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

class Cliente {
    constructor(nombre, cantPersonas, menuSeleccionado) {
        if (!nombre || cantPersonas <= 0 || !menuSeleccionado) {
            throw new Error("Datos del cliente inválidos: nombre, cantidad de personas o menú faltante.");
        }
        this.nombre = nombre;
        this.cantPersonas = cantPersonas;
        this.menuSeleccionado = menuSeleccionado;
        this.mesaAsignada = null;
        this.estadoReserva = "pendiente";
        this.fechaReserva = new Date();
    }
}

function mostrarEstadoMesas() {
    console.log("Estado de las mesas:");
    console.table(listaMesas.map(mesa => ({
        Id: mesa.id,
        Capacidad: mesa.capacidad,
        Estado: mesa.estado ? "Disponible" : "Ocupada"
    })));
}

function registrarReserva(cliente) {
    historialUsuariosReservas.push({
        cliente: cliente.nombre,
        cantPersonas: cliente.cantPersonas,
        menuSeleccionado: cliente.menuSeleccionado,
        mesaAsignada: cliente.mesaAsignada,
        estadoReserva: cliente.estadoReserva,
        fechaReserva: cliente.fechaReserva,
    });
    console.log(`Reserva registrada para ${cliente.nombre}.`);
}

const gestionMesas = {
    ocuparMesa(id) {
        const mesa = listaMesas.find(m => m.id === id);
        if (mesa && mesa.estado) {
            mesa.estado = false;
        } else {
            throw new Error(`Mesa con ID ${id} no está disponible.`);
        }
    },
    desocuparMesa(id) {
        const mesa = listaMesas.find(m => m.id === id);
        if (mesa && !mesa.estado) {
            mesa.estado = true;
        } else {
            throw new Error(`Mesa con ID ${id} ya está disponible.`);
        }
    },
    verificarDisponibilidad(cantPersonas) {
        return listaMesas.find(mesa => mesa.estado && mesa.capacidad >= cantPersonas);
    },
    agregarMesa(capacidad) {
        const nuevoId = listaMesas.length + 1;
        const nuevaMesa = new Mesa(nuevoId, capacidad);
        listaMesas.push(nuevaMesa);
        console.log(`Mesa nueva agregada: ID ${nuevoId}, Capacidad ${capacidad}.`);
        return nuevaMesa;
    }
};

async function verificarMesasDisponibles(cliente) {
    return new Promise(resolve => {
        setTimeout(() => {
            let mesa = gestionMesas.verificarDisponibilidad(cliente.cantPersonas);
            if (!mesa) {
                mesa = gestionMesas.agregarMesa(cliente.cantPersonas);
            }
            resolve(mesa);
        }, 3000);
    });
}

async function procesarReserva(cliente) {
    try {
        console.log(`Procesando reserva para ${cliente.nombre} (${cliente.cantPersonas}) con el menú "${cliente.menuSeleccionado}".`);
        const mesa = await verificarMesasDisponibles(cliente);
        gestionMesas.ocuparMesa(mesa.id);
        cliente.mesaAsignada = mesa.id;

        const menu = listaMenus.find(m => m.nombre.toLowerCase() === cliente.menuSeleccionado.toLowerCase());
        if (!menu || menu.cantidad <= 0) {
            throw new Error(`Menú "${cliente.menuSeleccionado}" no está disponible.`);
        }

        menu.cantidad -= 1;

        cliente.estadoReserva = "completado";
        console.log(`Reserva completada: ${cliente.nombre} ha reservado la mesa ${mesa.id} con el menú "${menu.nombre}".`);

        registrarReserva(cliente);
    } catch (error) {
        cliente.estadoReserva = "cancelada";
        console.error(`Error al procesar reserva para ${cliente.nombre}: ${error.message}`);
    }
}

function mostrarHistorial() {
    console.log("Cargando historial de reservas...");
    return new Promise(resolve => {
        setTimeout(() => {
            console.table(historialUsuariosReservas);
            resolve(historialUsuariosReservas);
        }, 3000);
    });
}

listaMenus.push(new Menu("Pizza", 2, 18));
listaMenus.push(new Menu("Arroz", 3, 18));
listaMenus.push(new Menu("Pasta", 7, 18));
listaMenus.push(new Menu("Carne", 5, 18));
listaMenus.push(new Menu("Sopa", 9, 18));

mostrarEstadoMesas();

const cliente1 = new Cliente("Elkin", 7, "Arroz");
const cliente2 = new Cliente("Andrey", 9, "Sopa");
const cliente3 = new Cliente("Gil", 3, "Carne");

procesarReserva(cliente1);
procesarReserva(cliente2);
procesarReserva(cliente3);

mostrarHistorial();
