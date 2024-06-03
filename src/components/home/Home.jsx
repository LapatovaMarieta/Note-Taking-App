export default function Home() {
    return(
        <section id="welcome">
            <div className="welcome-message">
                <h1>Write your notes</h1>
                <h2>Only in Note App</h2>
            </div>
            <img className="home-image" src="images/R.jpg" alt="Note" width={220} height={200}/>
        </section>
    );
};