import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { nanoid } from 'nanoid';

const Formulario = () => {

    const objetoEstudiante = {
        nombre: '',
        universidad: '',
        carrera: '',
        edad: '',
        sexo: '',
        correo: '',
        telefono: '',
    }

    const [estudiante, setEstudiante] = useState(objetoEstudiante);
    const [lista, setLista] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('')
    const [error, setError] = useState(null);


    useEffect(() => {
        const obtenerDatos = async () => {
            try {

                const db = firebase.firestore()
                const data = await db.collection('estudiantes').get()
                const array = data.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))

                setLista(array)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerDatos()
    })


    const guardarDatos = async (e) => {
        e.preventDefault()

        if (!estudiante.nombre) {
            setError('Campo nombre vacío');
            return
        }

        if (!estudiante.universidad) {
            setError('Campo universidad vacío');
            return
        }

        if (!estudiante.carrera) {
            setError('Campo carrera vacío');
            return
        }

        if (!estudiante.edad) {
            setError('Campo edad vacío');
            return
        }

        if (!estudiante.sexo) {
            setError('Campo sexo vacío');
            return
        }

        if (!estudiante.correo) {
            setError('Campo correo vacío');
            return
        }

        if (!estudiante.telefono) {
            setError('Campo teléfono vacío');
            return
        }

        try {

            const db = firebase.firestore();
            const nuevoEstudiante = {
                ...estudiante,
            }

            await db.collection('estudiantes').add(nuevoEstudiante);

            setLista([...lista,
            { id: nanoid(), ...estudiante }
            ])

        } catch (error) {
            console.log(error)
        }

        setModoEdicion(false)
        setEstudiante(objetoEstudiante)
        setError(null)

    }

    const confirmarEliminar = (id) => {
        let opcion = window.confirm('¿Está seguro que desea eliminar?')

        if (!opcion) {
        } else {

            eliminar(id);
        }

    }

    const eliminar = async (id) => {
        try {
            const db = firebase.firestore()
            await db.collection('estudiantes').doc(id).delete()
            const aux = lista.filter(item => item.id !== id)
            setLista(aux)
        } catch (error) {
            console.log(error)
        }
    }

    const auxEditar = (item) => {

        const objetoEstudiante = {
            nombre: item.nombre,
            universidad: item.universidad,
            carrera: item.carrera,
            edad: item.edad,
            sexo: item.sexo,
            correo: item.correo,
            telefono: item.telefono,
        }

        setEstudiante(objetoEstudiante);
        setModoEdicion(true);
        setId(item.id);

    }

    const editar = async e => {
        e.preventDefault()

        if (!estudiante.nombre) {
            setError('Campo nombre vacío');
            return
        }

        if (!estudiante.universidad) {
            setError('Campo universidad vacío');
            return
        }

        if (!estudiante.carrera) {
            setError('Campo carrera vacío');
            return
        }

        if (!estudiante.edad) {
            setError('Campo edad vacío');
            return
        }

        if (!estudiante.sexo) {
            setError('Campo sexo vacío');
            return
        }

        if (!estudiante.correo) {
            setError('Campo correo vacío');
            return
        }

        if (!estudiante.telefono) {
            setError('Campo teléfono vacío');
            return
        }

        try {


            const db = firebase.firestore()
            await db.collection('estudiantes').doc(id).update({
                ...estudiante
            })

        } catch (error) {
            console.log(error)
        }

        setEstudiante(objetoEstudiante);
        setModoEdicion(false)
        setError(null)

    }


    const cancelar = () => {

        setEstudiante(objetoEstudiante)
        setModoEdicion(false)
        setError(null)
    }

    return (
        <div className='container-xxl mt-5'>
            <h1 className='text-center'>TALLER REACT-FIREBASE</h1>
            <hr />
            <div className='row'>
                <div className="col-8">
                    <h4 className="text-center">Listado de estudiantes - Total {lista.length}</h4>
                    {lista.length < 1 ?
                        <h2 className='mt-5 text-center'>No hay estudiantes listados aún</h2>
                        :
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Universidad</th>
                                    <th scope="col">Carrera</th>
                                    <th scope="col">Edad</th>
                                    <th scope="col">Sexo</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lista.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.nombre}</td>
                                            <td>{item.universidad}</td>
                                            <td>{item.carrera}</td>
                                            <td>{item.edad}</td>
                                            <td>{item.sexo}</td>
                                            <td>{item.correo}</td>
                                            <td>{item.telefono}</td>
                                            <td>
                                                <button className='btn btn-danger btn-sm float-end mx-2'
                                                    onClick={() => confirmarEliminar(item.id)}>Eliminar
                                                </button>
                                                <button className='btn btn-warning btn-sm float-end'
                                                    onClick={() => auxEditar(item)}>Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {
                            modoEdicion ? 'Editar estudiante' : 'Agregar estudiante'
                        }</h4>
                    <form onSubmit={modoEdicion ? editar : guardarDatos}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Nombre'
                            onChange={(e) => setEstudiante({ ...estudiante, nombre: e.target.value })}
                            value={estudiante.nombre}

                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Universidad'
                            onChange={(e) => setEstudiante({ ...estudiante, universidad: e.target.value })}
                            value={estudiante.universidad}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Carrera'
                            onChange={(e) => setEstudiante({ ...estudiante, carrera: e.target.value })}
                            value={estudiante.carrera}
                        />
                        <input
                            className='form-control mb-2'
                            type="number"
                            min={0}
                            placeholder='Ingrese Edad'
                            onChange={(e) => setEstudiante({ ...estudiante, edad: e.target.value })}
                            value={estudiante.edad}
                        />
                        <select
                            className='form-select mb-2'
                            onChange={(e) => setEstudiante({ ...estudiante, sexo: e.target.value })}
                        >
                            <option value={estudiante.sexo}>{estudiante.sexo}</option>

                            {
                                !estudiante.sexo

                                    ?
                                    <>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </>
                                    :

                                    (estudiante.sexo === 'Masculino' ?

                                        <option value="Femenino">Femenino</option>

                                        :

                                        <option value="Masculino">Masculino</option>


                                    )

                            }
                        </select>
                        <input
                            className='form-control mb-2'
                            type="email"
                            placeholder='Ingrese Correo'
                            onChange={(e) => setEstudiante({ ...estudiante, correo: e.target.value })}
                            value={estudiante.correo}
                        />
                        <input
                            className='form-control mb-2'
                            type="number"
                            min={0}
                            placeholder='Ingrese Teléfono'
                            onChange={(e) => setEstudiante({ ...estudiante, telefono: e.target.value })}
                            value={estudiante.telefono}
                        />

                        {
                            !modoEdicion ? (
                                <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                            )
                                :
                                (<>
                                    <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                                    <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>Cancelar</button>
                                </>
                                )
                        }

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Formulario;
