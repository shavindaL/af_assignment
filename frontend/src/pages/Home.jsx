import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <h1 className="text-2xl text-center">
                Index Page
            </h1>
        </>
    )
}