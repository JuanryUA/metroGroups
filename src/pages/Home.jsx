import Header from "../components/Header";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import Carousel from "../components/Carousel";
import	About from "../pages/About";


export default function Home () {
    return (

    <>
      <NavBar />
      <Carousel />
      <About />
      <Footer />
    </>

    )
    
}