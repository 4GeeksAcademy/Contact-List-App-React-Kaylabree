import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./views/home";
import injectContext from "./store/appContext";
import { ContactForm } from "./component/ContactForm";

// Uncomment if Navbar and Footer are needed
// import { Navbar } from "./component/navbar";
// import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {/* Uncomment these lines if you have a Navbar and Footer */}
                    {/* <Navbar /> */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add" element={<ContactForm />} />
                        <Route path="/edit/:id" element={<ContactForm />} />
                        {/* Add a Not Found route */}
                        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

