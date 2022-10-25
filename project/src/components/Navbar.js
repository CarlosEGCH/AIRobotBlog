import { useRef } from "react";
import "../styles/Navbar.css";
import { motion } from "framer-motion";

import menu from "../assets/menuicon.svg";

import {
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react';

import octopus from "../assets/logo.png";

import { useViewport } from "../hooks/responsive";

export default function Navbar(){

    let viewport = useViewport().width;

    return (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{opacity: 1}}
            transition={{delay: 0.5}}
            className={"navbar-wrapper"}>
                <div className={"navbar-logo-container"}>
                    <img src={octopus} />
                    <p>AI Project - Group 1</p>
                </div>
                {viewport > 700 ? <Desktop /> : <Mobile />}
            </motion.section>
    );
}

function Desktop(){

    return(<div className={"navbar-links-container"}>
                <motion.a 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.1 }}
                href="/">Home</motion.a>
                <motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.1 }}
                href="/posts">Posts</motion.a>
            </div>)
}

function Mobile() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button className="mobile-button" ref={btnRef} colorScheme='teal' onClick={onOpen}>
        <img src={menu} alt="menu" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent color="black">
          <DrawerCloseButton />
          <DrawerHeader className="mobile-header">
            <h1>Where do you want to go?</h1>
          </DrawerHeader>

          <DrawerBody display="flex" flexDirection="column" gap="20px" fontSize="22px" textAlign="center">
            <a href="/" onClick={onClose}>Home</a>
            <a href="/posts" onClick={onClose}>Posts</a>
          </DrawerBody>

          <DrawerFooter>
            <Button bg="black" color="white" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}