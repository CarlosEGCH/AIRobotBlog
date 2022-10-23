export default function Post(props){

    return(
        <div className={"posts-post"}>
            <img src={props.image} alt="image" />
            <h2>October 23, 2022</h2>
            <h1>Post title</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet perspiciatis perferendis vel magni suscipit </p>
        </div>
    )

}