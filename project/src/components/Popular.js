//API: https://rickandmortyapi.com/api/character
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import teslabot from '../assets/teslabot.jpg';
import { useNavigate } from "react-router-dom";

export default function Popular(){

    const [posts, setPosts] = useState([{name: "", image: ""}]);

    const fetchPosts = async () => {
        try {
            await fetch('https://rickandmortyapi.com/api/character',{
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            setPosts(data.results);
        })
        .catch((e) => {console.log("Something went wrong ", e);})
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    let nPosts = 0;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
            delay: 1.5,
            staggerChildren: 2,
            }
        }
    }

    const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }

    const navigate = useNavigate();

    return (
        <motion.div variants={container} initial="hidden" animate="show" className={"hero-posts"}>
            <motion.div variants={item} className={"left"}>
                <motion.img 
                onClick={() => {
                    navigate("/post/" + 1);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                src={teslabot} />
                <div className={"description"}>
                    <p>October 23, 2022</p>
                    <h2>Dumbass scientist found guilty of developing serum that turns people into politicians</h2>
                    <h3>{posts[0].name}</h3>
                </div>
            </motion.div>
            <motion.div variants={item} className={"right"}>
                {posts.map((post, key) => {
                    if(nPosts < 3){
                        nPosts++;
                        return (<Rightpost id={key} post={post} key={key} />)
                    }
                })}
            </motion.div>
        </motion.div>
    );
}

function Rightpost(props){

    const navigate = useNavigate();

    return(
        <div className={"rightpost"}>
            <motion.img 
                onClick={() => {
                    navigate("/post/" + props.id);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }} src={teslabot} alt="image" />
            <div className={"description"}>
                <p>October 21, 2022</p>
                <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi dignissimos quaerat officiis blanditiis </h3>
            </div>
        </div>
    )
}