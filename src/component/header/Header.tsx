import {Routes, Route, BrowserRouter} from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Project from "../../page/project";
import Profile from "../../page/profile";
import Terminal from "../terminal/Terminal";
import Service from "../../page/service";
import NotFound from "../../page/404";

const Header = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col"
                 style={{backgroundColor: 'var(--theme-background)', color: 'var(--theme-text)'}}>
                <Navigation/>
                <div className="flex-1 pt-16">
                    <Routes>
                        <Route path="/" element={<Terminal/>}/>
                        <Route path="/projects" element={<Project/>}/>
                        <Route path="/services" element={<Service/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default Header;