import { motion } from "framer-motion";

export default function Post(props){

    return(
        <motion.div style={props.style} className={"posts-post"}>
            <motion.img
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            src={props.image} alt="image" />
            <h2>October 23, 2022</h2>
            <h1>Post title</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet perspiciatis perferendis vel magni suscipit </p>
        </motion.div>
    )

}