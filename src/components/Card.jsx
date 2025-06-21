import { Link, useNavigate } from "react-router-dom"

export const Card = ({ prop }) => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="No ha cargado correctamente"></img>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                            <h5 className="card-title">{prop.name}</h5>
                            <div>
                                <Link to={`/EditContact/${prop.id}`}>
                                <button className="btn btn-primary mx-3">Editar</button>
                                </Link>
                                <button type="button" className="btn btn-secondary"  data-bs-toggle="modal" data-bs-target="#exampleModal">Eliminar</button>
                            </div>
                        </div>

                        <p className="card-text">{prop.address}</p>
                        <p className="card-text">{prop.phoneNumber}</p>
                        <p className="card-text">{prop.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}