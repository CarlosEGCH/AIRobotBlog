import "../styles/Content.css";

import ai from "../assets/ai.png";

import { motion } from "framer-motion";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import Post from "./Post";
import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

export default function Content(){

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        
        let newPosts = []; 

        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
        
        let newPost = {id: doc.id, image: doc.data().image, title: doc.data().title, subtitle: doc.data().subtitle, date: doc.data().date};

        newPosts.push(newPost);

    });
        
        setPosts(newPosts);
        setLoading(false);
    }

    useEffect(() => {
        if(posts.length == 0){
            getPosts();
        }else{
            return;
        }
    })

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

    function Loader(){
    return(
        <Spinner 
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.900'
            color='white'
            size='xl'
            style={{margin: "40px auto"}} />
    )
}

    return(
        <section className={"content-wrapper"}>
            <motion.h1 initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 1}}} className={"content-header"}>ALL POSTS</motion.h1>
            {loading ? <Loader /> : 
            <motion.div variants={container} initial="hidden" animate="show" className={"content-posts"}>
                {posts.map((post, key) => {
                    return <Post post={post} key={key} variant={item} />
                })}
            </motion.div>
            }
        </section>
    )
}