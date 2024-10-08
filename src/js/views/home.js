import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import ContactCard from '../component/ContactCard';

export const Home = () => {
	const { store } = useContext(Context);

	return (
        <div className= "container">
            <Link className="d-flex justify-content-end" to="/add">
                <button className="btn btn-success my-3">Add new contact</button>
            </Link>
             <div className="panel-collapse collapse show mb-5" aria-expanded="true">
                <ul className= "list-group pull-down">
                {store.contacts.map((contact, index) => (
                    <ContactCard key={index} contact={contact} />
                ))}
                </ul>
            </div> 
        </div>
    );
};
