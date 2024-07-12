import Footer from "../../Component/Footer/Footer";
import NavbarHomePage from "../../Component/Navbar/NavbarHomePage";
import HeroSection from "./HeroSection";
import HomePageContent from "./HomePageContent";

const HomePage = () =>{
    return(
        <div >
            <NavbarHomePage/>
            <div className="flex gap-4">
                <HomePageContent/>
                <HeroSection/>
            </div>
            <Footer/>

        </div>
    )
}

export default HomePage;