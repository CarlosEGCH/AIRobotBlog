import "../styles/Homepage.css";

import { Button } from '@chakra-ui/react'
import Hero from "./Hero";
import Posts from "./Posts";
import Content from "./Content";

export default function Homepage(){

    return(
        <>
            <Hero />
            <Posts />
            <Content />
        </>)

} 