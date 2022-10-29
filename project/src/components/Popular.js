//API: https://rickandmortyapi.com/api/character
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spinner } from "@chakra-ui/react";

import teslabot from '../assets/teslabot.jpg';
import { useNavigate } from "react-router-dom";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Popular(){

    const storage = getStorage();
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

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

    if(loading){
        return (<Spinner 
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.900'
            color='white'
            size='xl'
            style={{margin: "40px auto"}} />)
    }else{
        return (
        <motion.div variants={container} initial="hidden" animate="show" className={"hero-posts"}>
            <motion.div variants={item} className={"left"}>
                <motion.img 
                onClick={() => {
                    navigate("/post/" + posts[0].id);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                src={posts[0].image} />
                <div className={"description"}>
                    <p>{posts[0].date}</p>
                    <h2>{posts[0].title}</h2>
                    <h3>{posts[0].subtitle}</h3>
                </div>
            </motion.div>
            <motion.div variants={item} className={"right"}>
                {posts.slice(1).map((post, key) => {
                    if(nPosts < 3){
                        nPosts++;
                        return (<Rightpost id={post.id} post={post} key={key} />)
                    }
                })}
            </motion.div>
        </motion.div>
    );
    }
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
                whileTap={{ scale: 0.97 }} src={props.post.image} alt="image" />
            <div className={"description"}>
                <p>{props.post.title}</p>
                <h3>{props.post.subtitle}</h3>
            </div>
        </div>
    )
}