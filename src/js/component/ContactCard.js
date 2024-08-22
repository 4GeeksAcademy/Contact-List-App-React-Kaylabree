import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            actions.deleteContact(contact.id);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-contact/${contact.id}`);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text"><strong>Email:</strong> {contact.email}</p>
                <p className="card-text"><strong>Phone:</strong> {contact.phone}</p>
                <p className="card-text"><strong>Address:</strong> {contact.address}</p>
                <div>
                    <button onClick={handleEdit} className="btn btn-primary me-2">Edit</button>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;

