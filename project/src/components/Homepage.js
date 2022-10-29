import "../styles/Homepage.css";

import { Button } from '@chakra-ui/react'
import Navbar from "./Navbar";
import Hero from "./Hero";
import Posts from "./Posts";
import Content from "./Content";
import Footer from "./Footer";

import { motion } from "framer-motion";

export default function Homepage(){

    return(
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}} >
            <Navbar />
            <Hero />
            {/*<Posts />*/}
            <Content />
            <Footer />
        </motion.div>)

} 