import './styles/App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Homepage from './components/Homepage';
import Postspage from './components/Postspage';
import Singlepost from './components/Singlepost';
import Team from './components/Team';

import { AnimatePresence } from 'framer-motion';

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

const location = useLocation();

  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index path="/" element={<Homepage />} />
          <Route path="/posts" element={<Postspage />} />
          <Route path="/post/:id" element={<Singlepost />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;
