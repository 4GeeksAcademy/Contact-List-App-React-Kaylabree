const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],  // Initially empty, will be populated with API data
        },
        actions: {
            getContacts: async () => {
                const response = await fetch('https://playground.4geeks.com/contact/docs/');
                const data = await response.json();
                setStore({ contacts: data });
            },
            editContact: async (id, updatedContact) => {
                const response = await fetch(` https://playground.4geeks.com/contact/docs/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedContact)
                });
                if (response.ok) {
                    getActions().getContacts();  // Refresh contacts after editing
                }
            },
            deleteContact: async (id) => {
                const response = await fetch(`https://playground.4geeks.com/contact/docs/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    getActions().getContacts();  // Refresh contacts after deleting
                }
            },
            // Bonus: Add slug functionality here
        }
    };
};

export default getState;
