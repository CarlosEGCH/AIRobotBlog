import "../styles/Postspage.css";

import Postsheader from "./Postsheader";
import Content from "./Content";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { motion } from "framer-motion";

export default function Postspage(){

    return(
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}} >
            <Navbar />
            <Postsheader />
            <Content />
            <Footer />
        </motion.div>
    )
}