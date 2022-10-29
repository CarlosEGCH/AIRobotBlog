import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

export default function Post(props){

    const navigate = useNavigate();

    return(
        <motion.div style={props.style} variants={props.variant} className={"posts-post"}>
            <motion.img
            onClick={() => {
                navigate("/post/"+props.post.id);
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            src={props.post.image} alt="image" />
            <h2>{props.post.date}</h2>
            <h1>{props.post.title}</h1>
            <p>{props.post.subtitle}</p>
        </motion.div>
    )

}