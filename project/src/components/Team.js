import "../styles/Team.css"

import burgir from "../assets/burgir.jpg";

import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

import { motion } from "framer-motion";

export default function Team(){

    return(
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}} >
            <Navbar />
            <div className={"team-wrapper"}>
                <div className={"team-container"}>
                    <div className={"team-member"}>
                        <img src={burgir} />
                    </div>
                    <div className={"team-member"}>
                        <img src={burgir} />
                    </div>
                    <div className={"team-member"}>
                        <img src={burgir} />
                    </div>
                    <div className={"team-member"}>
                        <img src={burgir} />
                    </div>
                    <div className={"team-member"}>
                        <img src={burgir} />
                    </div>
                </div>
            </div>
            <Footer />
        </motion.div>
    )
}