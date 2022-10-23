import "../styles/Content.css";

import ai from "../assets/ai.png";

import Post from "./Post";

export default function Content(){

    return(
        <section className={"content-wrapper"}>
            <h1 className={"content-header"}>ALL POSTS</h1>
            <div className={"content-posts"}>
                <Post image={ai}></Post>
                <Post image={ai}></Post>
                <Post image={ai}></Post>
                <Post image={ai}></Post>
                <Post image={ai}></Post>
                <Post image={ai}></Post>
                <Post image={ai}></Post>
                <Post image={ai}></Post>
            </div>
        </section>
    )
}