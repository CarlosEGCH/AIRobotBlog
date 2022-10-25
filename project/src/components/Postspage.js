import "../styles/Postspage.css";

import Postsheader from "./Postsheader";
import Content from "./Content";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Postspage(){

    return(
        <div>
            <Navbar />
            <Postsheader />
            <Content />
            <Footer />
        </div>
    )
}