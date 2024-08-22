import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Initialize context
export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: { ...state.store, ...updatedStore }, // Immutable update
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            state.actions.getContacts();
        }, [state.actions]); // Adding state.actions as a dependency

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
