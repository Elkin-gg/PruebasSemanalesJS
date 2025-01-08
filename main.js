class Producto {
    constructor(nombre, categoria, cantidad, proveedorAlternativo) {
      this.nombre = nombre;
      this.categoria = categoria;
      this.cantidad = cantidad;
      this.proveedorAlternativo = proveedorAlternativo;
    }
    actualizarCantidad(cant) {
      this.cantidad = cant;
    }
    vender(cant) {
      this.cantidad -= cant;
    }
  }
  class Pedido {
    constructor(cliente, productos = []) {
      this.cliente = cliente;
      this.productos = productos;
      this.estado = "Pendiente";
    }
    completar(){
      this.estado = "completado";
    }
    cancelar(){
      this.estado = "cancelado";
    }
    mostrarNombreProducto(){
      return (this.productos[0].nombre);
    }
  }
  function buscarProveedorAlternativo(producto){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        if(producto.proveedorAlternativo){
          resolve(10);
        }else {
          reject(new Error(`No se consiguio el producto: ${producto.nombre}, con el proveedor alternativo.`));
        }
      }, 2000);
    });
  }
  //Clase inventario
  class Inventario{
    constructor(){
      this.productosLista = new Map();
      this.historial = [];
    }
    // Agrega un producto al inventario
    agregarProducto(producto){
      this.productosLista.set(producto.nombre, producto);
    }
    // Obtiene un producto por su nombre
    obtenerProducto(nombre){
      return this.productosLista.get(nombre);
    }
    async procesarPedidoConProveedorAlternativo(pedido){
      let faltaStock = false;
  
      for (const ITEM_ of pedido.productos){
        const productoSolo = this.obtenerProducto(ITEM_.nombre);
        if (!productoSolo || productoSolo.cantidad < ITEM_.cantidad) {
          faltaStock = true;
          break;
        }
      }
  
      if (faltaStock){
        console.log(`No hay una cantidad suficiente para su pedido, ${pedido.cliente}: Probando con proveedores alternativos...`);
      }
  //Zona de errores
      try{
        for(const ITEM_ of pedido.productos){
          let productoSolo = this.obtenerProducto(ITEM_.nombre);
          if(!productoSolo || productoSolo.cantidad < ITEM_.cantidad){
            const cantidadExtra = await buscarProveedorAlternativo({
              nombre: ITEM_.nombre,
              proveedorAlternativo: productoSolo ? productoSolo.proveedorAlternativo : true});
            if(!productoSolo){
              productoSolo = new Producto(ITEM_.nombre, "Desconocida", cantidadExtra, true);
              this.agregarProducto(productoSolo);
            }else{
              productoSolo.actualizarCantidad(productoSolo.cantidad + cantidadExtra);
            }
            console.log(`Producto ${ITEM_.nombre} encontrado con el proveedor alternativo.`);
          }
        }
  
        console.log(`Todos los productos fueron encontrados con proveedores alternativos. Procesando el pedido...`);
        for (const item of pedido.productos){
          const productoSolo = this.obtenerProducto(item.nombre);
          productoSolo.vender(item.cantidad);
        }
        pedido.completar();
        console.log(`Su pedido, ${pedido.cliente}, ha sido completado.`);
      }catch (error){
        console.log(error.message);
        console.log(`No se pudo completar el pedido para ${pedido.cliente}.`);
        pedido.cancelar();
        console.log(`Su pedido, ${pedido.cliente}, ha sido cancelado.`);
      }finally{
        this.historial.push(pedido);
      }
    }
  
    //Historial de los pedidos
    mostrarHistorial(){
      console.log("Historial de pedidos:");
      for (const pedido of this.historial) {
        console.log(`Cliente: ${pedido.cliente}, Estado: ${pedido.estado}! con su producto ${pedido.mostrarNombreProducto()}`);
      }
    }
  }

  async function asincronia(){
    const inventario = new Inventario();
    const producto1 = new Producto("Redragon", "Tecnologia", 8, true);
    const producto2 = new Producto("Logitech", "Tecnologia", 8, false);
    inventario.agregarProducto(producto1);
    const pedidoElkin = new Pedido("Elkin", [
      { nombre: "Logitech", cantidad: 7 },//Cantidad de productos solicitados, puede variar
    ]);
    inventario.agregarProducto(producto2);
    const pedidoNestor = new Pedido("Nestor", [
      { nombre: "Redragon", cantidad:9 },
    ]);
    await inventario.procesarPedidoConProveedorAlternativo(pedidoElkin);
    await inventario.procesarPedidoConProveedorAlternativo(pedidoNestor);
  
    inventario.mostrarHistorial();
  }
asincronia();
