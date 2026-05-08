'use client';;
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VRControls from './VRControls';
import { useTranslation } from 'next-i18next';
import PanoramaViewer from '@src/components/ImageViewer360';
import { useRouter } from 'next/router';
import { FRAME_COUNT } from '@src/constants/imageSequence';
const VRShowroom = ({ showControl = false }) => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [view, setView] = useState('exterior')

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const isDragging = useRef(false);
  const startX = useRef(0);
  const autoRotateRef = useRef(null);
  const [currentColor, setCurrentColor] = useState('white');
  const framePositionRef = useRef(0);
  const [colorTextKey, setColorTextKey] = useState(0);
  const { t, i18n } = useTranslation('common');
  const { locale } = useRouter();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Slide in from right on enter, fade out on leave (x stays put while opacity drops)
  const panelX = useTransform(scrollYProgress, [0, 0.15, 0.4, 1], ['110%', '110%', '0%', '0%']);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.68, 0.85], [0, 0, 1, 1, 0]);

  const IMAGES = [
    ['/assets/colors/snow_white.jpeg'],
    ['/assets/colors/yacht_blur.jpeg'],
    ['/assets/colors/arora_black.jpeg'],
    ['/assets/colors/auban_gray_matt.jpeg'],
    ['/assets/colors/urban_gray.jpeg'],
    ['/assets/colors/wolf_gray.jpeg'],
    ['/assets/colors/junglewood.jpeg']]

  const COLORS = [
    { id: 'white', name: t('colors.snowWhitePearl'), hex: '#F0EEE9', chip: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/4952bc85-a2df-46ab-081d-d25f6177ce00/public' },
    { id: 'blue', name: t('colors.yachtBlue'), hex: '#2E4B72', chip: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/a8f7b28b-ff09-42b2-b0ab-3eccbed81500/public' },
    { id: 'black', name: t('colors.auroraBlackPearl'), hex: '#1A1A1A', chip: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/b969f132-bf2b-4e32-1373-f54363d4ed00/public' },
    { id: 'matt', name: t('colors.aubanGrayMatte'), hex: '#7A7D7F', chip: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/15311daf-6c93-409c-f457-e8c1867d7600/public' },
    { id: 'urban', name: t('colors.urbanGray'), hex: '#9298A0', chip: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/08342870-b29c-4b1c-8e32-796b0139d200/public' },
    { id: 'wolf', name: t('colors.wolfGray'), hex: '#4A4D50', chip: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/2ec05ee8-5a4d-4bcd-0aa7-1d0308c8e300/public' },
    { id: 'wood', name: t('colors.jungleWoodGreen'), hex: '#3D4B38', chip: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/ad847c7a-3269-443f-42f4-db56d986c600/public' },
  ];

  const preloadColorImages = async colorId => {
    const urls = colorId === 'snow' ?
      IMAGES[0] : colorId === 'blue' ?
        IMAGES[1] : colorId === 'black' ?
          IMAGES[2] : colorId === 'matt' ?
            IMAGES[3] : colorId === 'urban' ?
              IMAGES[4] : colorId === 'wolf' ?
                IMAGES[5] : colorId === 'wood' ?
                  IMAGES[6] : IMAGES[0]
    const imageElements = urls.map(url => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = 'anonymous';
      return img;
    });

    try {
      await Promise.all(
        imageElements.map(
          img =>
            new Promise((resolve, reject) => {
              if (img.complete) {
                resolve(img.src);
              } else {
                img.onload = () => resolve(img.src);
                img.onerror = () =>
                  reject(new Error(`Failed to load ${img.src}`));
              }
            }),
        ),
      );

      setLoadedImages(prev => ({
        ...prev,
        [colorId]: urls,
      }));

      return true;
    } catch (error) {
      console.error('Error loading images:', error);
      return false;
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoaded(false);

        const initialSuccess = await preloadColorImages('white');
        if (initialSuccess) {
          setIsLoaded(true);

          COLORS.forEach(color => {
            if (color.id !== 'white') {
              preloadColorImages(color.id).catch(console.error);
            }
          });
        }
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };

    loadImages();
  }, []);



  const stopAutoRotate = () => {
    if (autoRotateRef.current) {
      clearTimeout(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  };

  const handleMouseDown = e => {
    isDragging.current = true;
    startX.current = e.pageX;
    stopAutoRotate();
  };

  const handleMouseMove = e => {
    if (!isDragging.current) return;

    const deltaX = e.pageX - startX.current;
    const sensitivity = 2;
    let frameDelta = deltaX / sensitivity;

    framePositionRef.current -= frameDelta;
    if (framePositionRef.current < 0) framePositionRef.current += FRAME_COUNT;
    if (framePositionRef.current >= FRAME_COUNT)
      framePositionRef.current -= FRAME_COUNT;

    setCurrentFrame(Math.floor(framePositionRef.current));
    startX.current = e.pageX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = e => {
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    stopAutoRotate();
  };
  const handleTouchMove = e => {
    if (!isDragging.current) return;
    e.preventDefault();

    const deltaX = e.touches[0].pageX - startX.current;
    const sensitivity = 2;
    let frameDelta = deltaX / sensitivity;

    framePositionRef.current -= frameDelta;
    if (framePositionRef.current < 0) framePositionRef.current += FRAME_COUNT;
    if (framePositionRef.current >= FRAME_COUNT)
      framePositionRef.current -= FRAME_COUNT;

    setCurrentFrame(Math.floor(framePositionRef.current));
    startX.current = e.touches[0].pageX;
  };

  const handleColorChange = async colorId => {
    setCurrentFrame(0)
    if (!loadedImages[colorId]) {
      stopAutoRotate();
      await preloadColorImages(colorId);
    }

    const currentPosition = framePositionRef.current;
    setCurrentColor(colorId);
    setColorTextKey(prev => prev + 1);
    framePositionRef.current = currentPosition;
  };

  const handleImageError = e => {
    console.error('Image failed to load:', e.target.src);
    e.target.src = e.target.src;
  };
  console.log('Loaded ', loadedImages);
  console.log('Loaded ', currentColor);

  return (
    <div
      ref={sectionRef}
      className={`vr-showroom h-[500px] showRoom-container lg:h-screen z-[110]`}
      style={{
        aspectRatio: '16/9',
        maxWidth: '100%',
        position: 'relative',
        background: '#06141F',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      {(!isLoaded || !loadedImages[currentColor]) && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black z-[300]"
        >
          <div style={{ color: 'white' }}>{t('loading')}</div>
        </div>
      )}
      {/* <p id='vrShowroomText' className={`text-white text-base  md:text-[28px] z-[50] drop-shadow-2xl [text-shadow:_2px_2px_2px_rgba(0,0,0,0.4)] !absolute start-0 text-center lg:text-start lg:start-10 top-12 lg:!top-22  w-full leading-1   ${locale == 'ar' ? 'font-["GSSBold"]' : 'font-["InterBold"]'}`}>
        {i18n?.language == 'ar' ? showControl ? `استكشف تفاصيل تاسمان من الداخل والخارج` : `كيا تاسمان تلبي جميع الأذواق` : showControl ? `Discover Kia Tasman's Exterior & Interior in 360°` : 'The Tasman Meets All Tastes'}
      </p> */}
      {/* Scroll-animated color picker panel — slides in from right, fades out on leave */}
      <motion.div
        className="absolute top-1/2 min-h-[380px] max-w-[420px] justify-between -translate-y-1/2 z-[200] pointer-events-auto
                   bg-black/50 backdrop-blur-md rounded-2xl flex flex-col gap-4
                   border border-white/10"
        style={{
          right: '60px',
          padding: '20px',
          x: panelX,
          opacity: panelOpacity,
        }}
      >
        {/* Personalize label */}
        <p className="text-[#A3A8AD]   tracking-widest text-lg font-[InterBold] " >
          {t('colors.personalize')}
        </p>

        {/* Heading */}
        <h3 className="text-white font-[InterBold] text-xl">
          {t('colors.chooseColor')}
        </h3>

        {/* Color swatches */}
        <div className="flex flex-wrap gap-3 justify-start">
          {COLORS.map(color => (
            <button
              key={color.id}
              onClick={() => handleColorChange(color.id)}
              className="rounded-full cursor-pointer transition-transform  bg-cover bg-center"
              style={{
                background: color.hex,
                outline: currentColor === color.id ? '2px solid white' : '2px solid transparent',
                outlineOffset: '2px',
                width: '40px',
                height: '40px',
                flexShrink: 0,
              }}
              aria-label={color.name}
            />
          ))}
        </div>

        {/* Selected color name */}
        <p
          key={colorTextKey}
          className={`text-white font-medium text-center animate-fadeInUp text-xl ${i18n?.language === 'ar' ? "font-['GSSMedium']" : "font-['InterBold']"}`}
        >
          {COLORS.find(c => c.id === currentColor)?.name}
        </p>

        <hr className="border-white" />

        {/* 360 View label */}
        <div className="flex items-center justify-center gap-2 text-white text-base font-[InterBold]">
          <img src="/assets/svg/360-view.svg" alt="360 View" className="w-10 h-10 invert" />
          360 View
        </div>

        {/* Exterior / Interior toggle */}
        <VRControls onViewChange={setView} view={view} />
      </motion.div>


      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseDown={null}
        onMouseMove={null}
        onMouseUp={null}
        onMouseLeave={null}
        onTouchStart={null}
        onTouchMove={null}
        onTouchEnd={null}
      >

        {view == 'exterior' ? <img
          src={loadedImages[currentColor]}
          alt={`360° View Frame ${currentFrame + 1}`}


          onError={handleImageError}

          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'cover',
            minWidth: '100vw',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            pointerEvents: 'none',
            minHeight: '500px',
          }}
          draggable={false}

        /> :
          <PanoramaViewer
            imageUrl="/assets/ktk-int360-v2.png"

          />

        }
      </div>







    </div>
  );
};

export default VRShowroom;
