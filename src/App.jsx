import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./sections/Home.jsx";
import About from './sections/About.jsx'
import Experience from "./sections/Experience.jsx";
import Projects from "./sections/Project.jsx";
import Skills from "./sections/Skills.jsx";
import Education from "./sections/Education.jsx";
import FAQ from "./sections/Faq.jsx";
import Contact from "./sections/Contact.jsx";


function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Home />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <FAQ />
      <Contact />
    </div>
  );
}
export default App;
