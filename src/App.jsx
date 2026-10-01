
import { useState } from 'react'


//Componente1
function Encabezado(props) {

    return (

        <header className="text-white p-5 mb-4">

            <h1 className="text-center fw-bold">
                Tienda de abarrotes Paola
            </h1>

            <p className="text-center fs-5">
                Abarrotes Paolaaa
            </p>

            <div className="text-center mt-3">

                <span className="badge badge-perros m-1">
                    Productos: {props.total}
                </span>

            </div>

        </header>

    )

}


function MostrarEstado(props) {

    if (props.producto.disponible) {

        return (

            <span className="estado-disponible">
                Disponible
            </span>

        )

    }

    return (

        <span className="estado-prestado">
            No disponible
        </span>

    )

}


//Componente de card para mostrar los productos
function TarjetaProducto(props) {

    function obtenerClaseBoton() {

        if (props.producto.disponible) {

            return "btn btn-prestar w-100"

        }

        return "btn btn-devolver w-100"

    }


    function obtenerTextoBoton() {

        if (props.producto.disponible) {

            return "Vender producto"

        }

        return "Volver a disponible"

    }


    return (

        <div className="col-md-4 col-lg-4 mb-4">

            <div className="card h-100 shadow">

                <img
                    src={props.producto.imagen}
                    className="card-img-top"
                    alt={props.producto.producto}
                />

                <div className="card-body d-flex flex-column">

                    <h5 className="card-title fw-bold">
                        {props.producto.producto}
                    </h5>

                    <p className="card-text">
                        <strong>Categoría:</strong> {props.producto.categoria}
                    </p>

                    <p className="card-text">

                        <strong>Estado:</strong>{" "}

                        <MostrarEstado
                            producto={props.producto}
                        />

                    </p>

                    <div className="mt-auto">

                        <button
                            className={obtenerClaseBoton()}

                            onClick={() => {

                                if (props.producto.disponible) {

                                    props.prestarProducto(
                                        props.producto.id
                                    )

                                } else {

                                    props.devolverProducto(
                                        props.producto.id
                                    )

                                }

                            }}

                        >

                            {obtenerTextoBoton()}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}


//Componente 3 para ver la lista de los productos
//y con el map recorrer los productos
function ListaProductos(props) {

    return (

        <div className="row">

            {props.productos.map((producto) => (

                <TarjetaProducto
                    key={producto.id}
                    producto={producto}
                    prestarProducto={props.prestarProducto}
                    devolverProducto={props.devolverProducto}

                />

            ))}

        </div>

    )

}


function Informacion(props) {

    return (

        <div className="alert informacion text-center shadow-sm">

            {props.mensaje}

        </div>

    )

}


// COMPONENTE PRINCIPAL

function App() {

    const productosIniciales = [

        {
            id: 1,
            producto: "Conchas Mexicanas",
            categoria: "Pan dulce",
            disponible: true,
            imagen: "https://media.cocinavital.mx/2023/04/panes-mexicanos.jpg"
        },

        {
            id: 2,
            producto: "Frijoles",
            categoria: "Granos",
            disponible: true,
            imagen: "https://images.cookforyourlife.org/wp-content/uploads/2015/08/Basic-Black-Beans-2-e1666973834544.jpg"
        },

        {
            id: 3,
            producto: "Lechuga",
            categoria: "Verduras",
            disponible: true,
            imagen: "https://media.istockphoto.com/id/181072765/es/foto/lechuga-aislado.webp?s=2048x2048&w=is&k=20&c=Tiz7kYrjxLtNxTm5ovVD8B1tN7HDIUyx1o8UzP_0aMs="
        },

        {
            id: 4,
            producto: "Elotes",
            categoria: "Verduras",
            disponible: true,
            imagen: "https://www.honduras.com/wp-content/uploads/2020/10/receta-de-elotes.jpg"
        },

    ]


    const [productos, setProductos] =
        useState(productosIniciales)


    const [contador, setContador] =
        useState(3)


    function prestarProducto(id) {

        const nuevosProductos = productos.map(
            (producto) => {

                if (producto.id === id) {

                    return {...producto, disponible: false
                    }

                }

                return producto

            }
        )

        setProductos(nuevosProductos)

    }


    function devolverProducto(id) {

        const nuevosProductos = productos.map(
            (producto) => {

                if (producto.id === id) {

                    return {
                        ...producto,
                        disponible: true
                    }

                }

                return producto

            }
        )

        setProductos(nuevosProductos)

    }


    function contarDisponibles(listaProductos) {

        const disponibles = listaProductos.filter(
            (producto) => producto.disponible === true
        )

        return disponibles.length

    }


    const cantidadDisponibles =
        contarDisponibles(productos)


    const mensaje =
        `Hay ${cantidadDisponibles} productos disponibles`


    //Intervalo
    setInterval(() => {

        if (contador > 0) {

            setContador(contador - 1)

        }

    }, 1000)


    return (

        <div>

            <Encabezado
                total={productos.length}
                disponibles={cantidadDisponibles}
            />

            <div className="container">

                {contador > 0 ? (

                    <div className="text-center">

                        <h2>
                            El catálogo aparecerá en:
                        </h2>

                        <h1>
                            {contador}
                        </h1>

                    </div>

                ) : (

                    <div>

                        <Informacion
                            mensaje={mensaje}
                        />

                        <div className="catalogo mb-4">

                            <h2 className="text-center fw-bold">
                                Catálogo de productos
                            </h2>

                            <p className="text-center text-muted">
                                Selecciona un producto para venderlo o volver a disponible.
                            </p>

                        </div>

                        <ListaProductos
                            productos={productos}
                            prestarProducto={prestarProducto}
                            devolverProducto={devolverProducto}
                        />

                    </div>

                )}

            </div>

        </div>

    )

}

export default App
