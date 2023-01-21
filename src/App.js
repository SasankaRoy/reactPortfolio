import "./App.scss";
import { About } from "./components/About/About";
import { Contact } from "./components/contact/Contact";
import { Header } from "./components/header/Header";
import { Hero } from "./components/Hero/Hero";
import { Projects } from "./components/projects/Projects";
import { Skills } from "./components/skills/Skills";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <head>
        <title>Sasanka</title>
        <meta
          name="description"
          content="I am sasanka roy, I am a full stack web developer based in west Bengal, India. And its my portfolio, here you can learn more about and veiw and vist some of my projects and if you are interested in me then you can contact me."
        />
      </head>
      <div className="bg-[rgba(36,36,36)] h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth z-0 overflow-x-hidden">
        {/* header */}
        <Header />
        {/* hero sec */}
        <section id="hero" className="snap-center">
          <Hero />
        </section>
        {/* about me */}
        <section id="about" className="snap-center">
          <About />
        </section>

        {/* project and experience */}
        <section id="project" className="snap-center">
          <Projects />
        </section>

        {/* skills */}
        <section id="skills" className="snap-center">
          <Skills />
        </section>

        {/* contact me */}
        <section id="contact" className="snap-center">
          <Contact />
        </section>
      </div>
      <Toaster />
    </>
  );
}

export default App;
