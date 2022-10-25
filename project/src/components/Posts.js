import "../styles/Posts.css";

import { useInView } from "framer-motion"

import { useEffect, useRef } from "react";

import Post from "./Post.js";

import catto from "../assets/catto.jpg";

export default function Posts(){

    const ref = useRef(null)
    const isInView = useInView(ref)

    const style={
        opacity: isInView ? 1 : 0,
        transition: "all 1s"
    }

    return (
    <section ref={ref} id={"posts"} className={"posts-wrapper"}>
        <div className={"posts-header"}>
            <h1>MOST RECENT POSTS</h1>
        </div>
        <div className={"posts-container"}>
            <Post id={10} style={style} image={catto} />
            <Post id={20} style={style} image={catto} />
            <Post id={30} style={style} image={catto} />
        </div>
    </section>
    );
}