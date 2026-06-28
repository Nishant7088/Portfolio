import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollProgressBar from "./components/Common/ScrollProgressBar.jsx";
import AnimatedCursor from "./components/Common/AnimatedCursor.jsx";
import BackToTop from "./components/Common/BackToTop.jsx";
import PageLoader from "./components/Common/PageLoader.jsx";
import { useIsMobile } from "./hooks/useMediaQuery.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails.jsx"));

function App() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <ScrollProgressBar />
      {!isMobile && <AnimatedCursor />}
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </Suspense>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
