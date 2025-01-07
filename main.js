/*Programa que simule--------------------------------------->>>
### Flujo de Ejecución

1. **Agregando Productos al Inventario**:
   - Los productos deben ser agregados al inventario al inicio del programa.
   - Si un producto no está disponible, se debe intentar con el proveedor alternativo.

2. **Procesando Pedidos**:
   - Los pedidos deben procesarse uno por uno. Se debe verificar si todos los productos están disponibles en el inventario.
   - Si faltan productos, se deben buscar proveedores alternativos. Si el producto se encuentra, se debe actualizar el inventario y completar el pedido. Si no se encuentra el producto, el pedido debe cancelarse.

3. **Historial de Pedidos**:
   - El sistema debe mantener un historial de los pedidos procesados y mostrar el estado de cada uno (completado o cancelado) al final de la ejecución.

Usando clases inventario,pedido y producto----------------------------->>>
1. **Clase Producto**:
   - Representa un producto del inventario.
   - Debe contener las siguientes propiedades:
     - `nombre`: nombre del producto.
     - `categoria`: categoría a la que pertenece el producto.
     - `cantidad`: cantidad disponible en inventario.
     - `proveedorAlternativo`: nombre del proveedor alternativo en caso de falta de stock.
   - Métodos esperados:
     - `actualizarCantidad(cantidad)`: actualiza la cantidad de stock del producto.
     - `vender(cantidad)`: reduce la cantidad de un producto vendido.

2. **Clase Pedido**:
   - Representa un pedido realizado por un cliente.
   - Debe contener las siguientes propiedades:
     - `cliente`: nombre del cliente.
     - `productos`: lista de productos en el pedido.
     - `estado`: estado del pedido (pendiente, completado, cancelado).
   - Métodos esperados:
     - `completar()`: marca el pedido como completado.
     - `cancelar()`: marca el pedido como cancelado.

3. **Clase Inventario**:
   - Representa el inventario donde se almacenan los productos.
   - Debe contener las siguientes propiedades:
     - `productos`: un `Map` o estructura similar para almacenar los productos.
   - Métodos esperados:
     - `agregarProducto(producto)`: agrega un producto al inventario.
     - `obtenerProducto(nombre)`: busca un producto por su nombre.
     - `procesarPedido(pedido)`: procesa un pedido verificando si los productos están disponibles.
     - `procesarPedidoConProveedorAlternativo(pedido)`: intenta buscar proveedores alternativos si un producto no está disponible.
     - `mostrarHistorial()`: muestra el historial de los pedidos procesados.
  */
 //Clase de producto
 //Funcion para completar o cancelar pedido

/*No hay stock suficiente para procesar el pedido de Juan. Intentando con proveedores alternativos...
Producto Pantalón encontrado con el proveedor alternativo.
Todos los productos fueron encontrados con proveedores alternativos. Procesando el pedido...
El pedido de Juan ha sido completado.

No hay stock suficiente para procesar el pedido de María. Intentando con proveedores alternativos...
No se pudo encontrar el producto Pantalón con el proveedor alternativo.
No se pudo completar el pedido para María.
El pedido de María ha sido cancelado.

Historial de pedidos:
Cliente: Juan, Estado: completado
Cliente: María, Estado: cancelado */






function productoBusqueda(producto) {
    LISTA_PRODUCTOS_PRINCIPAL.forEach((elemento)=>{
        if(elemento.nombre === producto){
            return true;
        }else{
            console.log();
        }
    })
}
class Producto {
    constructor(nombre,categoria,cantidad,proveedorAlternativo) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.proveedorAlternativo = proveedorAlternativo;
    }
    //funcion para actualizar la cantidad
    actualizarCant = function(cantidad){
        this.cantidad = cantidad;
    }
    vender = function(cantProductos){
        this.cantidad -= cantProductos;
    }

};
//Clase de pedido
class Pedido {
    constructor(nombreCliente, producto, estadoPedido) {
        this.nombreCliente = nombreCliente;
        this.productos = producto;
        this.estadoPedido = estadoPedido;
    };
    buscandoPedido = function(producto,cantidad) {
        for(let i = 0; LISTA_PRODUCTOS_PRINCIPAL.length;i++){
            if(LISTA_PRODUCTOS_PRINCIPAL[i].nombre === producto){
                if(lISTA_PRODUCTOS[i].cantidad < cantidad){
                    console.log(`No hay stock suficiente para el pedido de ${this.nombreCliente}`);
                }
            }
        }
        console.log("Producto no disponible")
    }
};
//Clase de inventario
class Inventario {
    constructor(productos) {
       this.productos = productos; 
    };
};
//Agregando productos
var producto1 = new Producto("Nvidia", "Graficas", 18, "Alkomprar");
var producto2 = new Producto("Logitech", "Mouse", 15, "Exito");
var producto3 = new Producto("Redragon", "Teclado", 9, "Amazon");
var producto4 = new Producto("Razer", "Microfono", 19, "Mercado Libre");
var producto5 = new Producto("Samsung", "Monitor", 7, "Metro");
//Agregando a la lista de productos
const lISTA_PRODUCTOS = new Set([producto1,producto2,producto3,producto4,producto5]);
//Guardamos en Set, para que no se repitan valores de los productos
const LISTA_PRODUCTOS_PRINCIPAL = [...lISTA_PRODUCTOS];
const pedidoUsuario = new Pedido();
pedidoUsuario.nombreCliente = "Elkin";
pedidoUsuario.producto = "Samsung";
var historial = [];
historial.push(pedidoUsuario);


console.log(pedidoUsuario);
