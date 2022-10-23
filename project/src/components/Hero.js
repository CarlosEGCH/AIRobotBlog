import Popular from "./Popular"

export default function Hero(){

    return(
        <section className={"hero-wrapper"}>
            <div className={"hero-content"}>
                <div className={"hero-header"}>
                    <h1>THE BLOG</h1>
                </div>
                <Popular />
            </div>
        </section>)
}