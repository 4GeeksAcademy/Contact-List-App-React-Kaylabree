import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, useParams, Link } from 'react-router-dom';

export const ContactForm = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (isEdit) {
            const contact = store.contacts.find(c => c.id === parseInt(id));
            if (contact) {
                setFormData(contact);
            } else {
                console.error("Contact not found!");
                navigate("/");  // Navigate back to home if contact not found
            }
        }
    }, [id, isEdit, store.contacts, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             if (isEdit) {
                 await actions.editContact(id, formData);
             } else {
                await actions.addContact(formData);
            }
            await actions.getContacts();
            navigate("/");
        } catch (error) {
            console.error(isEdit ? "Error updating Contact" : "Error adding Contact", error);
        }
    };

    return (
        <div className='container'>
            <h1 className="text-center mt-5">{isEdit ? "Update contact" : "Adding new contact"}</h1>
            <form onSubmit={handleSubmit} className="Contact-form">
                <div className="form-group mt-3">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group mt-2">
                    <label>Email</label>
                    <input className="form-control" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label>Phone</label>
                    <input className="form-control" type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label>Address</label>
                    <input className="form-control" type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary form-control mt-4">{isEdit ? "Update contact" : "Save"}</button>
            </form>
            <Link to="/"> or get back to contacts</Link>
        </div>
    );
};
