import './styles/App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Posts from './components/Posts';

function App() {

  const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
        color: ""
      }
    })
  }
});

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
