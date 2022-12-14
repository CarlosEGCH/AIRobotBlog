import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer(){

    const catBoi = () => {

        window.open("https://i.imgflip.com/6919tu.jpg", "_blank");

    }

    const navigate = useNavigate();


    return(
        <section className={"footer-wrapper"}>
            <div className={"left"}>
                <h1>AI Project Group 1</h1>
                <div className={"info"}>
                    <div className={"links"}>
                        <a href="/">Home</a>
                        <a href="/posts">Posts</a>
                    </div>
                    <div className={"copyright"} onClick={catBoi}>
                        © 2022 CarlosEGCH. All rights reserved.
                    </div>
                </div>
            </div>
            <div className={"right"}>
                <div className={"link"} onClick={() => {window.location.replace("https://github.com/CarlosEGCH/AIRobotBlog")}}>
                    <img src={"https://cdn-icons-png.flaticon.com/128/5968/5968866.png"} />
                    <p>Github</p>
                </div>
                <h1>Universidade da Madeira</h1>
            </div>
        </section>
    )
}