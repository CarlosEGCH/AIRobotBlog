import './styles/App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Postspage from './components/Postspage';
import Singlepost from './components/Singlepost';

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
          <Route path="/posts" element={<Postspage />} />
          <Route path="/post/:id" element={<Singlepost />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
