const getState = ({ getStore, getActions, setStore }) => {
    const user = "Kain19";

    const addUser = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/${user}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        })
            .then((data) => {
                console.log(`User, ${user}, added successfully`, data.statusText);
                setStore({ contacts: [] });
            })
            .catch((error) => console.error('Adding agenda slug failed:', error));
    };

    return {
        store: {
            contacts: [],  // Initially empty, will be populated with API data
        },
        actions: {
            getContacts: async () => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
                        addUser();
                    }
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setStore({ contacts: data });
                    } else {
                        console.error("Expected an array but got: ", data);
                        setStore({ contacts: data });
                    }
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                    setStore({ contacts: [] });
                    await addUser();
                }
            },
            addContact: async (newContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newContact),
                    });
                    if (response.ok) {
                        await getActions().getContacts();  // Refresh contacts after adding
                    } else {
                        console.error("Error adding contact");
                    }
                } catch (error) {
                    console.error("Error adding contact", error);
                }
            },
            editContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedContact),
                    });
                    if (response.ok) {
                        getActions().getContacts();  // Refresh contacts after editing
                    } else {
                        console.error("Error updating contact");
                    }
                } catch (error) {
                    console.error("Error updating contact", error);
                }
            },
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        getActions().getContacts();  // Refresh contacts after deleting
                    } else {
                        console.error("Error deleting contact");
                    }
                } catch (error) {
                    console.error("Error deleting contact", error);
                }
            }
        }
    };
};

export default getState;

