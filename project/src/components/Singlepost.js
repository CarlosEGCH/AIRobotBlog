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
            case "video":
                return (<Postvideo post={post} />)
            case "rules":
                return (<Postrules />)
            case "zombieRules":
                return (<ZombieRules />)
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

function ZombieRules(){


    return(
        <div className="postcontent-wrapper">
            <h1>Zombie Rules</h1>
            <div className="zombierules-content">
                <h3>Initial State:</h3>
                <p className="i-1 s-1">Zombies will start at the corners of the board.</p>

                <h3>End State:</h3>
                <p className="i-1 s-1">Capture the robot SB.</p>

                <h3>Objective:</h3>
                <p className="i-1 s-1">Catch and kill the robot SB.</p>

                <h3>Rules:</h3>
                <div className="zombierules-state">
                    <p>1) State: [ Zx, Zy, Mx, My, I, Ca, NT, E, RsM] where:</p>
                    <ul className="i-2">
                        <li>Zx is the position of the Zombie on the X axis.</li>
                        <li>Zy is the position of the Zombie on the Y axis.</li>
                        <li>Mx is the position on the X axis of the action that the Zombie will perform.</li>
                        <li>My is the position on the Y axis of the action that the Zombie will do.</li>
                        <li>I is the Item that the Zombie currently has in its possession.</li>
                        <li>Ca is the Id of the item that is in the current box.</li>
                        <li>NT is the number of attempts the zombie tries to make a move, but it is not possible.</li>
                        <li>E is the state of the Zombie.</li>
                        <li>RsM are the rounds the Zombie must be without movement because of the SB stun.</li>
                    </ul>
                    <p className="s-1">Only the Ids can be in the Item: “0” which represents no object, “1” for the motorcycle parts and “5” which is when the robot is caught by the Zombie. It is also necessary to specify that the Zombie can only have one object in its pose.</p>
                    <p className="s-1">In Ca the possible Ids are: “0” which represents no object, “1” for the motorcycle parts, “2” for the ammo, “3” for the motorcycle, “4” for the other Zombie that is on the board and “5” which is when the robot is in the same box as the Zombie.</p>
                    <p className="s-1">In E, which is the state of the Zombie, the possible options are: "N" which is the state where the Zombie can act as it normally does, "A" which is the state where the Zombie is stunned, "D" is the state of destruction which is activated while the SB alarm is active, “M” which is when the Zombie is dead and “V” which is the victory state on the part of the Zombie.</p>
                </div>
                <p className="i-1 s-1">2) Initial State: [1, 6, X, X, 0, 0, 0, N, 0]     or     [6, 1, X, X, 0, 0, 0, N, 0]</p>
                <p className="i-1 s-1">3) Final State: [Rx, Ry, X, X, 5, 0, 0, V, 0]</p>
                <p className="s-1">Rx and Ry is the position where the robot is and the Item is “5” since the robot has already been caught (As the robot is no longer on the board, it does not appear in the Ca variable).</p>
                <div className="defined-rules">
                    <p className="i-1">4) Rules: </p>
                    <ul className="i-2">
                        <li className="s-1">
                            <p>R1: To get the SB the Zombie must be in the same box.</p>
                            <p>[Zx, Zy, X, X, 0, 5, 0, N, 0] -> [Zx, Zy, X, X, 5, 0, 0, V, 0]</p>
                        </li>
                        <li className="s-1">
                            <p>R2: Before performing any movement, the zombie will have to update its objective in the State so that after being verified it can perform the respective movement. He moves from one box at a time.</p>
                            <p>[Zx, Zy, X, X, X, X, 0, N, 0] -> [Zx, Zy, Zx + k, Zy + i, X, X, 0, N, 0]</p>
                            <p>Where k and I are between 0 and 1.</p>
                        </li>
                        <li className="s-1">
                            <p>R3: The zombie moves randomly one space at a time.</p>
                            <p>[Zx, Zy, Ox, Oy, X, X, 0, N, 0] -> [Ox, Oy, X, X, X, X, 0, N, 0]</p>
                            <p>Where Ox = Zx + k and Oy = Zy + i. (k,i belong to [0, 1])</p>
                            <ul className="i-1">
                                <li>
                                    <p>R3.1: The zombie randomly decides to move to the right.</p>
                                    <p>[Zx, Zy, Zx + 1, Zy, X, X, 0, N, 0] -> [Zx + 1, Zy, X, X, X, X, 0, N, 0]</p>
                                    <p>This is possible if there is no other Zombie in [Zx + 1, Zy] and the desired move is inside the board. If there is any impediment, R4 is applied.</p>
                                </li>
                                <li>
                                    <p>R3.2: The zombie randomly decides to move to the left.</p>
                                    <p>[Zx, Zy, Zx - 1, Zy, X, X, 0, N, 0] -> [Zx - 1, Zy, X, X, X, X, 0, N, 0]</p>
                                    <p>This is possible if there is no other Zombie in [Zx - 1, Zy] and the desired move is inside the board. If there is any impediment, R4 is applied.</p>
                                </li>
                                <li>
                                    <p>R3.3: The zombie randomly decides to move up.</p>
                                    <p>[Zx, Zy, Zx, Zy - 1, X, X, 0, N, 0] -> [Zx, Zy - 1, X, X, X, X, 0, N, 0]</p>
                                    <p>This is possible if there is no other Zombie in [Zx, Zy - 1] and the desired move is inside the board. If there is any impediment, R4 is applied.</p>
                                </li>
                                <li>
                                    <p>R3.4: The zombie randomly decides to move down.</p>
                                    <p>[Zx, Zy, Zx, Zy + 1, X, X, 0, N, 0] -> [Zx, Zy + 1, X, X, X, X, 0, N, 0]</p>
                                    <p>This is possible if there is no other Zombie in [Zx, Zy + 1] and the desired move is inside the board. If there is any impediment, R4 is applied.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="s-1">
                            <p>R4: It is not possible to have 2 Zombies in the same box. This rule is also applied in case the zombie aims to move off the board. If the Zombie tries to move to a position that is not allowed, the movement is completed clockwise (a new objective is placed in the Zombie's state).</p>
                            <p>[Zx, Zy, Ox, Oy, X, X, NT, N, 0] -> [Zx, Zy, NOx, NOy, X, X, NT, N, 0]</p>
                            <p>Where NO is the new objective depends on the case, as shown in the following rules and NT is the number of attempts which cannot be greater than or equal to 4, in which case the Zombie remains quiet during his turn.</p>
                            <h6>Initial conditions:</h6>
                            <ol className="i-1">
                                <li>If there is another Zombie in the board position [Ox, Oy].</li>
                                <li>Ox or Oy exceed the limits of the board, that is, if Ox >Lx (Limit of the X board) and Oy >Ly (Limit of the Y board)</li>
                            </ol>
                            <ul className="i-1">
                                <li>
                                    <p>R4.1: If the Zombie tries to move forward and fails, it is moved to the right.</p>
                                    <p>[Zx, Zy, Zx , Zy + 1, X, X, NT, N, 0] -> [Zx, Zy, Zx + 1, Zy, X, X, NT + 1, N, 0]</p>
                                </li>
                                <li>
                                    <p>R4.2: If the Zombie tries to move to the right and fails, it is moved down.</p>
                                    <p>[Zx, Zy, Zx + 1, Zy , X, X, NT, N, 0] -> [Zx, Zy, Zx, Zy - 1, X, X, NT + 1, N, 0]</p>
                                </li>
                                <li>
                                    <p>R4.3: If the Zombie tries to move down and fails, it is moved to the left.</p>
                                    <p>[Zx, Zy, Zx, Zy - 1, X, X, NT, N, 0] -> [Zx, Zy, Zx - 1, Zy, X, X, NT + 1, N, 0]</p>
                                </li>
                                <li>
                                    <p>R4.4: If the Zombie tries to move to the left and fails, it is moved up.</p>
                                    <p>[Zx, Zy, Zx - 1, Zy , X, X, NT, N, 0] -> [Zx, Zy, Zx, Zy + 1, X, X, NT + 1, N, 0]</p>
                                </li>
                            </ul>
                        </li>
                        <li className="s-1">
                            <p>R5: If the NT is greater than or equal to “4”, the Zombie is quiet during its turn and the NT is reset to “0”.</p>
                            <p>[Zx, Zy, Ox, Oy, X, X, 4, N, 0] -> [Zx, Zy, X, X, X, X, 0, N, 0]</p>
                        </li>
                        <li className="s-1">
                            <p>R6: The Zombie must carry out a reconnaissance before and after taking his turn in order to know what is in the box he is in.</p>
                            <p>[Zx, Zy, X, X, X, X, 0, N, 0] -> [Zx, Zy, X, X, X, Ca, 0, N, 0]</p>
                            <p>Where Ca can be the aforementioned values depending on what is found in the box he is in.</p>
                        </li>
                        <li className="s-1">
                            <p>R7: If the Zombie meets one of the parts needed to repair the motorcycle, it remains in its possession.</p>
                            <p>[Zx, Zy, X, X, 0, 1, 0, N, 0] -> [Zx, Zy, X, X, 1, 0, 0, N, 0]</p>
                        </li>
                        <li className="s-1">
                            <p>R8: The zombie is stunned when the SB makes a machete attack.</p>
                            <ul className="i-1">
                                <li>
                                    <p>R8.1: If the Zombie do not have any parts in his possession.</p>
                                    <p>[Zx, Zy, X, X, 0, 0, 0, N or D, 0] -> [Zx, Zy, X, X, 0, 0, 0, A, 2]</p>
                                </li>
                                <li>
                                    <p>R8.2: If the Zombie have a part in his possession.</p>
                                    <p>[Zx, Zy, X, X, 1, 0, 0, N or D, 0] -> [Zx, Zy, X, X, 0, 1, 0, A, 2]</p>
                                </li>
                            </ul>
                        </li>
                        <li className="s-1">
                            <p>R9: When the zombie tries to carry out a movement while in the “Stunned” state, the RsM variable is reduced by one.</p>
                            <p>[Zx, Zy, X, X, 0, X, 0, A, RsM] -> [Zx, Zy, X, X, 0, X, 0, A, RsM - 1]</p>
                            <p>Where RsM must be in the range [1,2] and RsM is greater than or equal to 0.</p>
                        </li>
                        <li className="s-1">
                            <p>R10: When the Zombie state is “Stunned” and RsM is 0, the Zombie goes to the “Normal” state.</p>
                            <p>[Zx, Zy, X, X, 0, X, 0, A, 0] -> [Zx, Zy, X, X, 0, X, 0, N, 0]</p>
                        </li>
                        <li className="s-1">
                            <p>R11: While the alarm is active the Zombie is attracted to the current position of the SB</p>
                            <p>[Zx, Zy, X, X, X, X, 0, N, 0] -> [Zx, Zy, Ox, Oy, X, X, 0, D, 0]</p>
                            <p>Where Ox = SBx (equals the position on the SB's X's axes) and Oy = SBy (equals the position on the SB's X's axes).</p>
                        </li>
                        <li className="s-1">
                            <p>R12: When the Zombie's Objective is farther than one square away, the Zombie's position is updated little by little until it reaches it. While the alarm is active and the Zombie has more than one option for this new move, it is performed according to the following priority: ←, ↑, →, ↓.</p>
                            <p>[Zx, Zy, SBx, SBy, X, X, 0, D, 0] -> [Zx + k, Zy + i, SBx, SBy, X, X, 0, D, 0]</p>
                        </li>
                        <li className="s-1">
                            <p>R13: When the alarm is no longer active, the Zombie changes from being in “Destruction” mode to “Normal” mode.</p>
                            <p>[Zx, Zy, SBx, SBy, X, X, 0, D, 0] -> [Zx, Zy, X, X, X, X, 0, N, 0]</p>
                        </li>
                        <li className="s-1">
                            <p>R14:  When the Zombie is attacked by the Zombie's pistol, it goes into the “Dead” state and its game over for him.</p>
                            <p>[Zx, Zy, X, X, X, X, 0, N, 0] -> [Zx, Zy, X, X, X, X, 0, M, 0]</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
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