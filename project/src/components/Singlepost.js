import "../styles/Singlepost.css";

import catto from "../assets/catto.jpg";

import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Singlepost(){

    return(
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}} >
            <Navbar />
            <Postbanner />
            <Postcontent />
            <Footer />
        </motion.div>
    )
}

function Postcontent(){

    return(
        <div className={"postcontent-wrapper"}>
            <div className={"first"}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo magnam modi fugiat, cupiditate, fugit, reprehenderit unde perferendis voluptate aliquam consectetur odio ea. Voluptatum, quis ducimus quaerat delectus minima expedita recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nulla, vero ut quis, odit blanditiis eveniet quia ipsam nobis perspiciatis fuga. Maiores cumque veritatis vitae nam saepe itaque reiciendis voluptates.</p>
            </div>
            <div className={"second"}>
                <img src={catto} alt="post image" />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae id ipsa nobis assumenda labore provident fuga inventore incidunt ex, laborum, explicabo animi qui nisi distinctio voluptate obcaecati suscipit cumque aut. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt velit reprehenderit est recusandae assumenda id, maiores illo? Ipsam placeat tempora, illum voluptas perferendis, quia natus libero doloremque laudantium qui inventore!</p>
            </div>
            <div className={"third"}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio in hic earum autem non dolores, quas quo eum, culpa voluptatem et amet esse ex aspernatur ut nisi, quis dolorum doloremque? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque expedita iste reiciendis molestias quis delectus, necessitatibus rerum ullam perspiciatis. Totam minus distinctio earum est inventore fugiat dolorem eveniet exercitationem eligendi.</p>
            </div>
        </div>
    )

}

function Postbanner(){

    const image = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 1
            }
        },
        show: {
            opacity: 1,
            transition: {
                delay: 1
            }
        }
    }

    const title = {
        hidden: {
            opacity: 0,
            x: 100
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 1.2,
                duration: 1
            }
        }
    }

    const subtitle = {
        hidden: {
            opacity: 0,
            x: 100
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 1.5,
                duration: 1
            }
        }
    }

    return (
        <div className={"postbanner-wrapper"}>
            <img src={catto} className={"postbanner-background"}/>
            <div className={"postbanner-header"}>
                <motion.div variants={image} initial="hidden" animate="show" className={"image-container"}>
                    <img src={catto} />
                </motion.div>
                <div className={"title-container"}>
                    <motion.h1 variants={title} initial="hidden" animate="show" >This is the post title</motion.h1>
                    <motion.h3 variants={subtitle} initial="hidden" animate="show">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam maiores aperiam reprehenderit maxime voluptatem ex ut sint at repellendus repellat sed totam quibusdam mollitia itaque, corporis eveniet? Quam, accusamus ipsam.</motion.h3>
                </div>
            </div>
        </div>
    )
}