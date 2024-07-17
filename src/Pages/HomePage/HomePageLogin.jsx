import Banner from "../../Component/Banner";
import Footer from "../../Component/Footer/Footer";
import NavbarLogin from "../../Component/Navbar/NavbarLogin";
import HeroSection from "./HeroSection";
import HomePageContent from "./HomePageContent";

const HomePageLogin = () =>{
    return(
        <div >
            <NavbarLogin/>
            <div className="flex gap-4">
                <HomePageContent/>
                <HeroSection/>
               
            </div>
            <Banner/>
            <Footer/>

        </div>
    )
}

export default HomePageLogin;