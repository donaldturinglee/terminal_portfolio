import Footer from "./component/footer/Footer";
import {ThemeProvider} from "./context/theme";
import Header from "./component/header/Header";
import {terminal} from "./config/terminal";

const App = () => {
    return (
        <ThemeProvider defaultTheme={terminal.theme}>
            <Header/>
            <Footer/>
        </ThemeProvider>
    )
};

export default App;
