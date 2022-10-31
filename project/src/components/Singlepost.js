import "../styles/Singlepost.css";

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
            case "rules":
                return (<Postrules />)
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
                <img src={post.content.image} alt="post image" />
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

function Postrules(){

    return(
        <div className={"postcontent-wrapper"}>
            <h1 className={"rules-abstract"}>
                In order to achieve this objective the group decided to create three manuals. Each manual would represent the behaviour of survivor robots, zombies, and the general world.
            </h1>
            <ol className={"numeric"}>
                <li>
                    <p>Survivor Robot Manual</p>
                    <ol className={"alpha"}>
                        <li>
                            <p>Initial State</p>
                            <ol className={"roman"}>
                                <li>The survivor robot starts at the position [1,1].</li>
                                <li>In the beginning, the survivor robot will not have neither ammunition nor pieces to repair the motorcycle.</li>
                                <li>The survivor robot will have previous training. </li>
                            </ol>
                        </li>
                        <li>
                            <p>Final State or solution condition: </p>
                            <ol className={"roman"}>
                                <li>The robot has to reach the motorcycle with all the pieces necessary to repair it, at the position [6,6].</li>
                            </ol>
                        </li>
                        <li>
                            <p>Objective:</p>
                            <ol className={"roman"}>
                                <li>The survivor robot will find and repair the motorcycle without being caught by the zombies.</li>
                                <li>The survivor robot would have to find and catch all the motorcycle parts.</li>
                            </ol>
                        </li>
                        <li>
                            <p>Rules:</p>
                            <ol className={"roman"}>
                                <li>
                                    R1: The robot can move horizontally and/or vertically. <br/>
                                    [Rx, Ry] → [Rx + k, Ry + j] <br/>
                                    Where -1 &#8804; k, j &#8804; 1 and Rx + k &#8804; 6 and Ry + j &#8804; 6 
                                </li>
                                <li>
                                    R2: The robot can recognize if there's a mechanical piece or ammunition in his own tile and pick them up. <br/>
                                    [Pnum, Anum] → [Pnum + Pdetected, Anum + Adetected]
                                </li>
                                <li>
                                    R3: The robot can detect entities in the adjacent tiles:<br/>
                                    [Bdeg, Znum, Pnum, Lnum, Anum]<br/>
                                    → [Bdeg + 90, Znum + Zf, Pnum + Pf, Lnum + Lf, Anum + Af]<br/>
                                    Where Bdeg &#8804; 270
                                </li>
                                <li>
                                    R4: If the robot finds an item (ammunition or mechanical piece) it will move towards it to pick it up:<br/>
                                    [Bx, By, Ix, Iy, 0] → [Ix, Iy, Ix, Iy, 1]
                                </li>
                                <li>
                                    R5: If the zombie is at melee range of the robot, the robot can perform a physical attack:<br/>
				                    [Bpx, Bpy, Zx, Zy, 0] → [Zx, Zy, Zx, Zy, 1]
                                </li>
                                <li>
                                    R6: The same rule can apply with the ranged attack if the robot possesses enough ammunition<br/>
                                    [Bpx, Bpy, Zx, Zy, A, 0] → [Zx, Zy, Zx, Zy, A - 1, 1]
                                </li>
                            </ol>
                        </li>
                    </ol>
                </li>
                <li>
                    <p>Zombies Manual:</p>
                    <ol className="alpha">
                        <li>
                            <p>General State of the Zombies: [Zx, Zy, P, M, Z2, B] where:</p>
                            <ol className={"roman"}>
                                <li>Zx: vector of the zombie at the position x.</li>
                                <li>Zy: vector of the zombie at the position y.</li>
                                <li>P (pieces): represents a flag which if it's 0 the zombies would not have any pieces, if it's 1 the zombies would have one piece, if it's 2 the zombies would have all the pieces.</li>
                                <li>M (ammunition): represents a flag which if it's 0 the zombies would not have ammunition, if it's 1 the zombies would have the ammunition.</li>
                                <li>B (survivor robot): represents a flag which if it's 0 the zombies will not be at the same position as the survivor robot, if it's 1 the zombie will be at the same position as the survivor robot.</li>
                            </ol>
                        </li>
                        <li>
                            <p>Initial State: [Zx, Zy, 0, 0, 1, 0]</p>
                            <ol className={"roman"}>
                                <li>
                                    The zombies start in the corners of the world, far away from the robot.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <p>Final State or solution condition: [Zx, Zy, 0, 0, 1, 1]</p>
                            <ol className={"roman"}>
                                <li>
                                    The zombies would have to be at the same position as the survivor robot without being stunned.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <p>Objective:</p>
                            <ol className={"roman"}>
                                <li>
                                    The zombies would have to catch and kill the survivor robot
                                </li>
                            </ol>
                        </li>
                        <li>
                            <p>Rules:</p>
                            <ol className={"roman"}>
                                <li>
                                    R1: the zombie would have to be at the same position as the survivor robot to catch it.<br/>
                                    [Zx, Zy, P, M, 1, 0] → [Zx, Zy, P, M, 1, 1]<br/>
                                    0 &#8804; P &#8804; 2 and 0 &#8804; M &#8804; 1
                                </li>
                                <li>
                                    R2: The zombies would move square per turn<br/>
                                    [Zx, Zy, P, M, 1, 0] → [Zx, Zy, P, M, 0, 0]<br/>
                                    0 &#8804; P &#8804; 2 ; 0 &#8804; M &#8804; 1 and 0 &#8804; B &#8804; 1
                                </li>
                                <li>
                                    R3: two zombies can't be at the same square
                                    [Zx, Zy, P, M, 1, 0] → [Zx, Zy, P, M, 0, 0]
                                </li>
                            </ol>
                        </li>
                    </ol>
                </li>
            </ol>
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