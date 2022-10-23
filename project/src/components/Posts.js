import "../styles/Posts.css";

import Post from "./Post.js";

import catto from "../assets/catto.jpg";

export default function Posts(){

    return (
    <section id={"posts"} className={"posts-wrapper"}>
        <div className={"posts-header"}>
            <h1>MOST RECENT POSTS</h1>
        </div>
        <div className={"posts-container"}>
            <Post image={catto} />
            <Post image={catto} />
            <Post image={catto} />
        </div>
    </section>
    );
}