import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import KickOffFormEmbed from "./components/KickOffFormEmbed";
{/*import Pricing from "./components/Pricing";
import Collaboration from "./components/Collaboration";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";*/}

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Pricing />
        {/*<Collaboration />
        <Services />
        
        <Roadmap />*/}
        <KickOffFormEmbed />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
