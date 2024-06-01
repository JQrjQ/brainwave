import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WaitlistForm from "./components/WaitlistForm";
import WaitlistCounter from "./components/WaitlistCounter";
{/*import Collaboration from "./components/Collaboration";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";*/}

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <WaitlistForm />
        <Hero />
        <Benefits />
        <WaitlistCounter />
        <Pricing />
        {/*<Collaboration />
        <Services />
        
        <Roadmap />
        <KickOffFormEmbed />*/}
        
        <WaitlistCounter />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
