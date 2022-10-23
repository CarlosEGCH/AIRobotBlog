import Popular from "./Popular"
import { motion } from "framer-motion"

export default function Hero(){

    const heroText = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delay: 1,
                delayChildren: 1.5,
                staggerChildren: 0.3
            }
        }
    }

    const letter = {
        hidden: {opacity: 0},
        show: {opacity: 1},
    }

    return(
        <section className={"hero-wrapper"}>
            <div className={"hero-content"}>
                <div className={"hero-header"}>
                        <motion.h1
                        variants={heroText}
                        initial={"hidden"}
                        animate={"show"}
                        >
                            <motion.span className={"letter"} variants={letter}>T</motion.span>
                            <motion.span className={"letter"} variants={letter}>H</motion.span>
                            <motion.span className={"letter"} variants={letter}>E</motion.span>
                            <span> </span>
                            <motion.span className={"letter"} variants={letter}>B</motion.span>
                            <motion.span className={"letter"} variants={letter}>L</motion.span>
                            <motion.span className={"letter"} variants={letter}>O</motion.span>
                            <motion.span className={"letter"} variants={letter}>G</motion.span>
                        </motion.h1>
                </div>
                <Popular />
            </div>
        </section>)
}