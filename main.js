//Se crea la clase producto
class Producto {
    constructor(nombre, categoria, cantidad, proveedorAlternativo) {
      this.nombre = nombre;
      this.categoria = categoria;
      this.cantidad = cantidad;
      this.proveedorAlternativo = proveedorAlternativo;
    }
    // En caso que agregemos mas productos
    actualizarCantidad(cant) {
      this.cantidad = cant;
    }
    //Para cuando se vende
    vender(cant) {
      this.cantidad -= cant;
    }
  }
//clase que representa el pedido
  class Pedido {
    constructor(cliente, productos = []) {
      this.cliente = cliente;
      this.productos = productos;
      this.estado = "Pendiente";
    }
//metodo para completar  
    completar(){
      this.estado = "completado";
    }
    // metodo para cancelar
    cancelar(){
      this.estado = "cancelado";
    }
  }
  //Seccion donde verificamos si el proveedor alternativo tiene ficha
  function buscarProveedorAlternativo(producto){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        if(producto.proveedorAlternativo && producto.proveedorAlternativo.includes('OK')){
          resolve(10);
        }else {
          reject(new Error(`No se consiguio el producto-->> ${producto.nombre} con el proveedor alternativo.`));
        }
      }, 2000);
    });
  }
  //Clase inventario, es la que tiene la seccion de historial y pedidos
  class Inventario{
    constructor(){
      this.productosL = new Map();
      this.historial = [];
    }
    // Agrega un producto al inventario
    agregarProducto(producto){
      this.productosL.set(producto.nombre, producto);
    }
    // Obtiene un producto por su nombre
    obtenerProducto(nombre){
      return this.productosL.get(nombre);
    }
    async procesarPedidoConProveedorAlternativo(pedido){
      let faltaStock = false;
  
      for (const item of pedido.productos){
        const productoSolo = this.obtenerProducto(item.nombre);
        if (!productoSolo || productoSolo.cantidad < item.cantidad) {
          faltaStock = true;
          break;
        }
      }
  
      if (faltaStock){
        console.log(`No hay una cantidad suficiente para su pedido, ${pedido.cliente}: Probando con proveedores alternativos...`);
      }
  //Zona de errores--->>>
      try{
        for(const item of pedido.productos){
          let productoSolo = this.obtenerProducto(item.nombre);
  
          if(!productoSolo || productoSolo.cantidad < item.cantidad){
            const cantidadExtra = await buscarProveedorAlternativo({
              nombre: item.nombre,
              proveedorAlternativo: productoSolo ? productoSolo.proveedorAlternativo : "NoOK"});
            if(!productoSolo){
              productoSolo = new Producto(item.nombre, 'Desconocida', cantidadExtra, "OK");
              this.agregarProducto(productoSolo);
            }else{
              productoSolo.actualizarCantidad(productoSolo.cantidad + cantidadExtra);
            }
            console.log(`Producto ${item.nombre} encontrado con el proveedor alternativo.`);
          }
        }
  
        console.log(`Todos los productos fueron encontrados con proveedores alternativos. Procesando el pedido...`);
        for (const item of pedido.productos){
          const productoSolo = this.obtenerProducto(item.nombre);
          productoSolo.vender(item.cantidad);
        }
        pedido.completar();
        console.log(`El pedido de ${pedido.cliente} ha sido completado.`);
      }catch (error){
        console.log(error.message);
        console.log(`No se pudo completar el pedido para ${pedido.cliente}.`);
        pedido.cancelar();
        console.log(`El pedido de ${pedido.cliente} ha sido cancelado.`);
      }finally{
        this.historial.push(pedido);
      }
    }
  
    // Muestra el historial de todos los pedidos
    mostrarHistorial(){
      console.log('Historial de pedidos:');
      for (const pedido of this.historial) {
        console.log(`Cliente: ${pedido.cliente}, Estado: ${pedido.estado}! su producto->>> ${pedido.nombre}`);
      }
    }
  }
  //esta es la parte de la promesa, se crea el pedido
  async function asincronia(){
    // Creamos el inventario
    const inventario = new Inventario();
//Creacion de productos--En esa seccion se define la cantidad de los productos, y se analiza si será necesario la busqieda adicional
    // Ok->si
    const producto1 = new Producto("Redragon", "Tecnologia", 4, "Ok");
    // noOk -> no
    const producto2 = new Producto("Logitech", "Tecnologia", 4, "NoOk");
    inventario.agregarProducto(producto1);
    const pedidoElkin = new Pedido("Elkin", [
      { nombre: "Logitech", cantidad: 2 },
    ]);
    inventario.agregarProducto(producto2);
    const pedidoNestor = new Pedido("Nestor", [
      { nombre: "Redragon", cantidad: 2 },
    ]);
    await inventario.procesarPedidoConProveedorAlternativo(pedidoElkin);
    await inventario.procesarPedidoConProveedorAlternativo(pedidoNestor);
  
    inventario.mostrarHistorial();
  }
  //Esta es la funcion principal!Importante--->>>
asincronia();
  