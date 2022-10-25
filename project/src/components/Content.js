import "../styles/Content.css";

import ai from "../assets/ai.png";

import { motion } from "framer-motion";

import Post from "./Post";

export default function Content(){

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 1.5,
            staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: {opacity: 0},
        show: {opacity: 1}
    }


    return(
        <section className={"content-wrapper"}>
            <motion.h1 initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 1}}} className={"content-header"}>ALL POSTS</motion.h1>
            <motion.div variants={container} initial="hidden" animate="show" className={"content-posts"}>
                <Post id={1} variant={item} image={ai}></Post>
                <Post id={2} variant={item} image={ai}></Post>
                <Post id={3} variant={item} image={ai}></Post>
                <Post id={4} variant={item} image={ai}></Post>
                <Post id={5} variant={item} image={ai}></Post>
                <Post id={6} variant={item} image={ai}></Post>
                <Post id={7} variant={item} image={ai}></Post>
                <Post id={8} variant={item} image={ai}></Post>
            </motion.div>
        </section>
    )
}