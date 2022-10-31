import "../styles/Team.css"

import burgir from "../assets/burgir.jpg";
import strong from "../assets/gatostrong.png";
import meca from "../assets/gatomeca.png";
import fubo from "../assets/fubo.png";
import cute from "../assets/cute.png";

import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Team(){

    return(
        <motion.div layout initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}} >
            <Navbar />
            <div className={"team-wrapper"}>
                <motion.div className={"team-container"}>
                    <Member image={burgir} name={"Carlos Enmanuel Gomes"} number={2075320}/>
                    <Member image={strong} name={"Luis Alberto Nunes"} number={2080920}/>
                    <Member image={meca} name={"Toni Garcês"} number={2081620}/>
                    <Member image={cute} name={"Génesis de Nóbrega"} number={2033819}/>
                    <Member image={fubo} name={"Cesar de Deus"} number={2047719}/>
                </motion.div>
            </div>
            <Footer />
        </motion.div>
    )
}

function Member({name, number, image}){

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const closed = {
        borderRadius: "20px"
    }

    const open = {
        borderRadius: "20px"
    }

    return(
        <motion.div transition={{layout: {duration: 1, type: "spring"}}} layout onClick={toggle} className={"team-member"} style={isOpen ? open : closed} >
            <motion.img layout="position" src={image} />
            { isOpen &&
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}} className={"description"}>
                <p>{name}</p>
                <p>Nº {number}</p>
            </motion.div>
            }
        </motion.div>
    )
}