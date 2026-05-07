import VRShowroom from '@src/modules/VRShowroom';
import React, { useEffect, useState, useRef } from 'react';
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion, useScroll, useTransform } from 'framer-motion';
import { SwiperSection } from './SwiperSection';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Footer from '@src/common/layout/components/footer';

const ParallaxSectionSecond = () => {
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

    const xTransform = useTransform(scrollYProgress, [0, 1], [-window.innerWidth, window.innerWidth]);

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
              .parallax-container1 {
  position: relative;
  height: 100vh; /* Make the container tall enough to allow scrolling */
  overflow: hidden;
    @media (max-width: 1024px) {
  height:100vh;
}
  }

.parallax-video1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
 
  object-fit: cover;
  z-index: ${isInView ? '-1' : '-10'};
  opacity:${isInView?'1':'0'}
  transition: z-index 0.3s ease;
}

.image-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content22 {
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

.content33 {
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

            <div className="parallax-container1" ref={sectionRef}  >
                <div className={`parallax-video1 ${isInView ? '' : 'opacity-0'}`} >
                    <img src='/assets/stills/footer.jpeg' className="image-element " loading="lazy" decoding="async">

                    </img>
                </div>

             
                <div class="h-[100vh] w-screen  flex flex-col justify-between" style={{
                    background: 'linear-gradient(180deg, #000000 0%, rgba(6,20,31,0.2) 100%)',
                
                }} id="bg-section">
                    <div
                        style={{
                            height: '20vh',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '10%',
                            paddingRight: '10%',
                            background: 'linear-gradient(180deg, #06141F 0%, rgba(6,20,31,0) 100%)',

                        }}
                    >
                        <p style={{ color: 'white', fontSize: '1rem', lineHeight: '1.7', maxWidth: '420px', fontFamily: locale === 'ar' ? 'GSSLight' : 'InterRegular' }}>
                            {locale === 'ar'
                                ? 'لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسينج إيليت. أوت إيليت تيلوس، لوكتوس نيك أولامكوربير ماتيس، بولفينار دابيبوس ليو.'
                                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'}
                        </p>
                    </div>



                    <Footer removeMedia={false} /> 


                </div>
               
            </div>
        </ParallaxProvider>
    );
};

export default ParallaxSectionSecond;
