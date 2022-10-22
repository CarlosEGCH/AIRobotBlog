import "../styles/Navbar.css";

import octopus from "../assets/logo.png";

export default function Navbar(){

    return (
        <section className={"navbar-wrapper"}>
            <div className={"navbar-logo-container"}>
                <img src={octopus} />
                <p>Project Group 1</p>
            </div>
            <div className={"navbar-links-container"}>
                <a href="/">Home</a>
                <a href="/posts">Posts</a>
            </div>
        </section>
    );
}