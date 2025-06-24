import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState, useEffect } from "react";
import { Card } from "../components/Card"


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const getContacts = async () => {
		try {
			const result = await fetch("https://playground.4geeks.com/contact/agendas/JMRG/contacts")
			const data = await result.json();
			console.log(data.contacts)
			dispatch({
                  type: "add_contact", 
                  payload: {contacts : data.contacts}
                })
		} catch (error) {
			console.log("error 257", error)
		}
	}
	const deleteContacts = async (id) => {
		await fetch(`https://playground.4geeks.com/contact/agendas/JMRG/contacts/${id}`, {
			method: "DELETE",
		}
		 
	)
await getContacts()
		 
	}


	useEffect(() => { getContacts() }, []);

	return (
		<div>
			{store.contactos.map((item) => {
				return (
					<div key={item.id}>
						<Card prop={item} />
						<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="exampleModalLabel">Consiente eliminar a este contacto</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										Si esta seguro pulse en guardar cambios.
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { deleteContacts(item.id); }}>Guardar Cambios</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			})}

		</div>
	);
}; 