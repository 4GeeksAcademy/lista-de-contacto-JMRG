import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import React, { useState, useEffect } from "react";

export const AdContact = () => {
    // Access the global state and dispatch function using the useGlobalReducer hook.

    let navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer()
    const [contacto, setContacto] = useState({
        name: "",
        email: "",
        address: "",
        phoneNumber: ""
    });
    const [error, setError] = useState("")
    console.log(contacto)

    //const validacion = () => {
        //let errores = {}
        //if (!contacto.name.trim()) {
        //    errores.name = "El nombre ta vasio"
        //}
        //if (!contacto.email.trim()) {
        //    errores.email = "El email ta vasio"
        //}
        //if (!contacto.address.trim()) {
        //    errores.address = "El address ta vasio"
        //}
        //if (!contacto.phoneNumber.trim()) {
        //    errores.phoneNumber = "El phoneNumber ta vasio"
       // }
        //setError(errores)
        //return Object.keys(errores).length === 0;
    //}

    const getContacts = async () => {
        try {
            const result = await fetch("https://playground.4geeks.com/contact/agendas/JMRG/contacts")
            const data = await result.json();
            console.log(data);
            dispatch({
                type: "add_contact",
                payload: { contacts: data.contacts }
            })
        } catch (error) {
            console.log("error 257", error)
        }
    }
    const postContacto = async () => {
        if (!contacto.name.trim()) {
            setError("Todos los camppos son obligatorios")
            return
        }
        if (!contacto.email.trim()) {
            setError("Todos los camppos son obligatorios")
            return
        }
        if (!contacto.address.trim()) {
            setError("Todos los camppos son obligatorios")
            return
        }
        if (!contacto.phoneNumber.trim()) {
            setError("Todos los camppos son obligatorios")
            return
       }
        try {
            setError("")
            await fetch('https://playground.4geeks.com/contact/agendas/JMRG/contacts', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "name": contacto.name,
                    "phone": contacto.phoneNumber,
                    "email": contacto.email,
                    "address": contacto.address
                })
            })
            await getContacts();
            navigate("/")
        } catch (error) {
            console.log('error 404:', error)
        }

    }

    useEffect(() => {
        getContacts()
    }, [])



    return (
        <div className="container">
            <form className="mb-3" onSubmit={(e) => { e.preventDefault(); postContacto() }}>
                <div className="mb-3">
                    <label htmlFor="formNameInput" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formNameInput"
                        placeholder="Escriba aqui su nombre"
                        value={contacto.name}
                        onChange={(e) => setContacto({ ...contacto, name: e.target.value })}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="formPhoneNumberInput" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formPhoneNumberInput"
                        placeholder="Escriba aqui su número de telefono"
                        value={contacto.phoneNumber}
                        onChange={(e) => setContacto({ ...contacto, phoneNumber: e.target.value })}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="formAddressInput" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formAddressInput"
                        placeholder="Escriba aqui su Dirección"
                        value={contacto.address}
                        onChange={(e) => setContacto({ ...contacto, address: e.target.value })}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="formEmailInput" className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formEmailInput"
                        placeholder="Escriba aqui su email"
                        value={contacto.email}
                        onChange={(e) => setContacto({ ...contacto, email: e.target.value })}
                    ></input>
                </div>
                <span>
                    {error}
                </span>
                <div className="col-auto">
                    <button
                        type="submit"
                        className="btn btn-primary mb-3"
                    >Confirmar contacto</button>
                </div>
            </form>
            <br />

            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );

};
