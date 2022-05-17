import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <Hero/>
        </div>
    );
}


const Hero = () => (
    <section className="hero">
        <div className="hero__content">
            <h1 className="hero__title">Volcanoes of the World</h1>
            <p className="hero__subtitle">Explore the volcanoes around the world!</p>
            <Link to="/volcanoes">View list of Volcanoes</Link>
        </div>
    </section>
);



export default Home;