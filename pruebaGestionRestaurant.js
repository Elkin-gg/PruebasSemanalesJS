//#2 Sem 11.
/*crear 3 menus distintos.
plan familiar= "arroz chino"
plan amigos = "pollo azado"
plan pareja = "sushi"

debe tener la cantidad de ese producto con el precio.

asignar el numero de la mesa al cliente

Asincronia para:

cuando carga la disponibilidad de las mesas

cuando carga la disponibilidad en el menu 

procesar la reserva

manejo de errores para:

-mesa ocupada
-producto no disponible

se debe crear un historial de los clientes con:

cliente
fecha y hora 
mesa asignada
menu seleccionado
estado de la reserva,completada o cancelada

 */
//Esta es la lista donde estan las mesas, todas estan disponibles
//Crear un for que indique que las mesas

//zona de funciones-------------->>>>

//funcion para agregar los alimentos a la lista de alimentos como obejto
var listaAlimentos = [{
    nombre:null,
    precio:0,
}];
function agregandoAlimentosLista({nombre, precio}) {
   listaAlimentos.push[{nombre:nombre, precio:precio}]; 
}

const MESAS_ = [
    ["┳━┳", "┳━┳", "┳━┳"],
    ["┳━┳", "┳━┳", "┳━┳"],
    ["┳━┳", "┳━┳", "┳━┳"],
];
console.table(MESAS_);
//clase para agregar el menu
var listaMenu  = [];
class Menu {
    constructor(NombreAlimento, precio) {
        this.NombreAlimento = NombreAlimento;
        this.precio = precio;
    }
    almacenandoMenu(){
        return listaMenu = [{nombre:this.NombreAlimento, precio: this.precio}];//retorna cuando se almacena en la lista
    }
    
}
//usando la clase menu
function agregandoAlimentosMenu(nombreAlimento, precio) {
    return alimentos = [{nombreAlimento:nombreAlimento, precio:precio}];
}
var alimentos = [];

agregandoAlimentosLista("papa", 17);
console.log(agregandoAlimentosLista("pan", 16))

class Cliente {
    constructor(nombre, fecha = new Date(), menuAsignado = [], mesaAsignada, estadoReserva = true, cantPersonas) {
        this.nombre = nombre;
        this.fecha = fecha;
        this.cantPersonas = cantPersonas;
        this.menuAsignado = menuAsignado;
        this.mesaAsignada = mesaAsignada;
        this.estadoReserva = estadoReserva;
    }
    asignarMesaUsuario(fila,columna){
        return this.mesaAsignada = `${fila}-${columna}`;//En este se asigna la posicion de la mesa
    }
    menuAsignado(){
        //Seccion donde se le asigna el menu que van a elegir
        this.menuAsignado = ["carne", "pechuga","vegetales"]
    }
    async funcionAsincronaErrores(){
        try {
            if(MESAS_[fila][columna] = "┻━┻" || MESAS_[fila][columna] > MESAS_.length){
                throw new Error("Mesa no disponible");
            }else{
                MESAS_[fila][columna] = "┻━┻"//indica que la mesa ya está ocupada
                this.asignarMesaUsuario();//funcion que asigna el puesto en caso de que se pueda cumplir.
            }
        } catch (error) {
            console.error(error.message);
        }finally{
            console.log("hay mas mesas disponibles");
        }
    }
}

//creando el usuario
const USUARIO1_ = new Cliente();
USUARIO1_.nombre = "Elkin";
let fila = 1;
let columna = 1;
// USUARIO1_.seleccionarMesaComoOcupada(fila,columna);//sale como ocupada
USUARIO1_.mesaAsignada = USUARIO1_.asignarMesaUsuario(fila,columna);//asigna el valor de la posicion de la mesa
console.table(MESAS_)
console.log(`Esta es la posicion de la mesa ${USUARIO1_.mesaAsignada}`)
//Centro del programa

//Agregando alimentos a la lista de alimentos proporcionados por la clase

//Agregaremos 5 alimentos
var menuAlimentos = new Menu("Carne", 18);
agregandoAlimentosLista()




//seccion de errores


//seccion de la funcion asincrona
async function simulandoCargas() {
    try {
        
    } catch (error) {
        console.error(error.message);
    }
}

function funTiempoEspera() {
    return new Promise((reject,resolve)=>{
        setTimeout(() => {
            resolve("");
        }, 2000);
    });
}

//puedo usar los metodos para las validaciones de loas datos
