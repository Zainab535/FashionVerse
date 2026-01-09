import heroImg from "../assets/images/store-hero.jpg";

const StoreHero = () => {
  return (
    <section className="store-hero">
      <div className="hero-text">
        <span className="season">FALL / WINTER 2026</span>
        <h1>Future Wear</h1>
        <p>
          Experience fashion where minimal design  
          meets immersive digital innovation.
        </p><br></br>
        <button>Shop Now</button>
      </div>

      <div className="hero-image">
        <img src={heroImg} alt="Fashion Model" />
      </div>
    </section>
  );
};

export default StoreHero;
