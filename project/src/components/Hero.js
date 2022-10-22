import { Button } from "@chakra-ui/react";

import bg2 from "../assets/hero-background2.png";

export default function Hero(){

    return(
        <section className={"hero-wrapper"}>
            <img className={"bg2"} src={bg2} />
            <div className={"hero-content"}>
                <h1>Programming Hero Blog</h1>
                <h4>Enjoy our blog</h4>
                <Button className="button">See Posts</Button>
            </div>
        </section>)
}