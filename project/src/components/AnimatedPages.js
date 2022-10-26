import Homepage from './Homepage';
import Postspage from './Postspage';
import Singlepost from './Singlepost';

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

export default function AnimatedRoutes(){

    return (
        <>
            <Routes>
                <Route index path="/" element={<Homepage />} />
                <Route path="/posts" element={<Postspage />} />
                <Route path="/post/:id" element={<Singlepost />} />
            </Routes>
        </>
    )
}