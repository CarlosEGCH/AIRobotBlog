import "../styles/Homepage.css";

import { Button } from '@chakra-ui/react'
import Navbar from "./Navbar";
import Hero from "./Hero";
import Posts from "./Posts";
import Content from "./Content";
import Footer from "./Footer";

export default function Homepage(){

    return(
        <>
            <Navbar />
            <Hero />
            <Posts />
            <Content />
            <Footer />
        </>)

} 