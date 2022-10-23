//API: https://rickandmortyapi.com/api/character
import { useEffect, useState } from "react";

import teslabot from '../assets/teslabot.jpg';

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

    return (
        <div className={"hero-posts"}>
            <div className={"left"}>
                <img src={teslabot} />
                <div className={"description"}>
                    <p>October 23, 2022</p>
                    <h2>Dumbass scientist found guilty of developing serum that turns people into politicians</h2>
                    <h3>{posts[0].name}</h3>
                </div>
            </div>
            <div className={"right"}>
                {posts.map((post, key) => {
                    if(nPosts < 3){
                        nPosts++;
                        return (<Rightpost post={post} key={key} />)
                    }
                })}
            </div>
        </div>
    );
}

function Rightpost(props){

    return(
        <div className={"rightpost"}>
            <img src={teslabot} alt="image" />
            <div className={"description"}>
                <p>October 21, 2022</p>
                <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi dignissimos quaerat officiis blanditiis </h3>
            </div>
        </div>
    )
}