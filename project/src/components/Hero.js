import Popular from "./Popular"
import { motion } from "framer-motion"

export default function Hero(){

    const heroText = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delay: 1
            }
        }
    }

    return(
        <section className={"hero-wrapper"}>
            <div className={"hero-content"}>
                <div className={"hero-header"}>
                        <motion.h1
                        variants={heroText}
                        initial={"hidden"}
                        animate={"show"}
                        >THE BLOG</motion.h1>
                </div>
                <Popular />
            </div>
        </section>)
}