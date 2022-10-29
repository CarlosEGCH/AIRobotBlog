import "../styles/Singlepost.css";

import catto from "../assets/catto.jpg";
import robot from "../assets/movement.mp4"

import { motion } from "framer-motion";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export default function Singlepost(){

    const { id } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);



    const getPost = async () => {
        const postsRef = collection(db, "posts");

        const q = query(postsRef, where("__name__", "==", id));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setPost(doc.data());
            setLoading(false);
        });
    }



    const renderPost = (post) => {
        switch (post.type) {
            case "basic":
                return (<Postcontent post={post} />)
                break;
            case "video":
                return (<Postvideo post={post} />)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.scrollTo(0,0);
        getPost();
    }, [])

    return(
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}} >
            <Navbar />
            {<Postbanner post={post} />}
            {renderPost(post)}
            <Footer />
        </motion.div>
    )
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

function Postcontent({post}){

    return(
        <div className={"postcontent-wrapper"}>
            <div className={"first"}>
                <p>{post.content.fparagraph}</p>
            </div>
            <div className={"second"}>
                <img src={post.image} alt="post image" />
                <p>{post.content.sparagraph}</p>
            </div>
            <div className={"third"}>
                <p>{post.content.tparagraph}</p>
            </div>
        </div>
    )

}

function Postvideo({post}){

    return(
        <div className={"postcontent-wrapper"}>
            <div className={"first"}>
                <p>{post.content.fparagraph}</p>
            </div>
            <div className={"video-container"}>
                <video controls muted style={{margin: "0 auto"}}>
                <source src={post.content.video} type="video/mp4" />
                <source src={post.content.video} type="video/ogg"/>
                Your browser does not support the video tag.
                </video>
            </div>
            <div className={"third"}>
                <p>{post.content.sparagraph}</p>
            </div>
        </div>
    )
}

function Postbanner({post}){

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
            <img src={post.image} className={"postbanner-background"}/>
            <div className={"postbanner-header"}>
                <motion.div variants={image} initial="hidden" animate="show" className={"image-container"}>
                    <img src={post.image} />
                </motion.div>
                <div className={"title-container"}>
                    <motion.h1 variants={title} initial="hidden" animate="show" >{post.title}</motion.h1>
                    <motion.h3 variants={subtitle} initial="hidden" animate="show">{post.subtitle}</motion.h3>
                </div>
            </div>
        </div>
    )
}