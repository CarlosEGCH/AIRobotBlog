import "../styles/Posts.css";

export default function Posts(){

    return (
    <section className={"posts-wrapper"}>
        <div className={"posts-header"}>
            <h1>These are our posts</h1>
            <h4>These down there</h4>
        </div>
        <div className={"posts-container"}>
            <div className={"post"}>Post1</div>
            <div className={"post"}>Post2</div>
            <div className={"post"}>Post3</div>
            <div className={"post"}>Post4</div>
            <div className={"post"}>Post5</div>
            <div className={"post"}>Post6</div>
        </div>
    </section>
    );

}