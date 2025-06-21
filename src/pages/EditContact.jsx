import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import React, { useState, useEffect } from "react";

export const EditContact = (props) => {
    const { store, dispatch } = useGlobalReducer()
    const { Id } = useParams()
    const unContacto = store.contactos.find(Contact => Contact.id === parseInt(Id));
    
    let navigate = useNavigate();
    const [contactoEdit, setContactoEdit] = useState({
        name:"",
        email:"",
        address:"",
        phoneNumber:""
        
        
        //name: unContacto.name,
        //email: unContacto.email,
        //address: unContacto.address,
        //phoneNumber: unContacto.phoneNumber
    });

useEffect(()=>{
    if(unContacto){
    setContactoEdit(unContacto)}
},[unContacto])

    const getContacts = async () => {
        try {
            const result = await fetch("https://playground.4geeks.com/contact/agendas/JMRG/contacts")
            const data = await result.json();
            dispatch({
                  type: "add_contact", 
                  payload: {contacts : data.contacts}
                })
        } catch (error) {
            console.log("error 257", error)
        }
    }
    const putContacto = async () => {
        try {
            await fetch(`https://playground.4geeks.com/contact/agendas/JMRG/contacts/${Id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "name": contactoEdit.name,
                    "phone": contactoEdit.phoneNumber,
                    "email": contactoEdit.email,
                    "address": contactoEdit.address
                })
            })
            setContactoEdit({});
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
            <form className="mb-3" onSubmit={(e) => { e.preventDefault(); putContacto() }}>
                <div className="mb-3">
                    <label htmlFor="formNameInput" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formNameInput"
                        placeholder="Escriba aqui su nombre"
                        value={contactoEdit.name}
                        onChange={(e) => setContactoEdit({ ...contactoEdit, name: e.target.value })}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="formPhoneNumberInput" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formPhoneNumberInput"
                        placeholder="Escriba aqui su número de telefono"
                        value={contactoEdit.phoneNumber}
                        onChange={(e) => setContactoEdit({ ...contactoEdit, phoneNumber: e.target.value })}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="formAddressInput" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formAddressInput"
                        placeholder="Escriba aqui su Dirección"
                        value={contactoEdit.address}
                        onChange={(e) => setContactoEdit({ ...contactoEdit, address: e.target.value })}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="formEmailInput" className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formEmailInput"
                        placeholder="Escriba aqui su email"
                        value={contactoEdit.email}
                        onChange={(e) => setContactoEdit({ ...contactoEdit, email: e.target.value })}
                    ></input>
                </div>

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
}