import { useEffect, useState, useRef } from 'react';
import { ParallaxProvider } from "react-scroll-parallax";
import { useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import PerformanceVideoSection from '@src/features/performanceVideo';
import DriveWiseSection from '@src/features/driveWise';
import DimensionsHotspots from '@src/features/dimensionsHotspots';

const ParallaxSectionThird = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const textRef = useRef(null);
    const sectionRef = useRef(null);
    const { i18n } = useTranslation()
    const { locale } = useRouter()      

    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start end", "end start"]
    });


    const handleScroll = () => {
        const currentScroll = window.scrollY;
        setScrollPosition(currentScroll);

        // Check if this section is in view
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            setIsInView(isVisible);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <ParallaxProvider>
            <style>
                {`
              .parallax-container6 {
  position: relative;
  height: 300vh; /* Make the container tall enough to allow scrolling */
  overflow: hidden;
    @media (max-width: 1024px) {
  height:100vh;
}
  }

.parallax-video2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background:#06141F;
 
  object-fit: cover;
  z-index: ${isInView ? '-1' : '-10'};
  opacity:${isInView?'1':'0'}
  transition: z-index 0.3s ease;
}

.image-element2 {
  width: 70%;
  height: 70%;
}

.content321 {
  position: relative;
  height: 100vh;
  z-index: 2;
  color: white;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
     @media (max-width: 1024px) {
  height:50vh;
}

}

.content335 {
  position: relative;
  height: 100vh;
  z-index: 2;
  color: white;
  text-align: center;
  padding: 50px;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
                
                `}
                {/* */}

            </style>

            <div className="parallax-container6"  ref={sectionRef}  >
                <div   id="bg-section">
                    <PerformanceVideoSection />
                </div>
                <div className={`parallax-video2 ${isInView ? '' : 'opacity-0'} flex items-center justify-end`} >
                    <img src='/assets/radar.svg' className="image-element2 !object-contain " loading="lazy" decoding="async">

                    </img>
                </div>

                <DriveWiseSection/>
            
                <DimensionsHotspots />

            </div>
        </ParallaxProvider>
    );
};

export default ParallaxSectionThird;
