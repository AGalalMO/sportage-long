'use client';
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
gsap.registerPlugin(ScrollTrigger);

const ScrollSequence = ({ id, imagesUrl, totalFrames, heroData, isHero = false }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedImagesCount = useRef(0);
  const scrollTriggerRef = useRef(null);
  const timelineRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showTailControls, setShowTailControls] = useState(false);
  const [injectedSlideIndex, setInjectedSlideIndex] = useState(null);
  const injectedSlideIndexRef = useRef(null);
  const tailImagesRef = useRef([]);
  const previousFrameRef = useRef(-1);
  const { t } = useTranslation('common')
  const isHeroSequence = isHero;

  const HERO_SLIDES = [
    {
      image: imagesUrl?.[imagesUrl.length - 1] || '/assets/stills/headlights.jpeg',
      title: t('exterior.starMapLighting.title'),
      description: t("exterior.starMapLighting.description"),
    },
    {
      image: '/assets/stills/headlights.jpeg',
      title: t('exterior.ledHeadlights.title'),
      description: t("exterior.ledHeadlights.description"),
    },
    {
      image: '/assets/stills/EXT Cam 3 Rear lights.jpeg',
      title: t('exterior.ledTaillights.title'),
      description: t("exterior.ledTaillights.description"),
    },
    {
      image: '/assets/stills/headlights.jpeg',
      title: t('exterior.welcomeLight.title'),
      description: t("exterior.welcomeLight.description"),
    },
    {
      image: '/assets/stills/EXT Cam 4 Rim.jpeg',
      title: t('exterior.alloyWheels.title'),
      description: t("exterior.alloyWheels.description"),
    },
   
   
  ];
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  useEffect(() => {
    injectedSlideIndexRef.current = injectedSlideIndex;
  }, [injectedSlideIndex]);

  const drawImageToCanvas = (img) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || !img) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  const showInjectedSlide = (index) => {
    if (!isHeroSequence) return;
    const normalized = (index + HERO_SLIDES.length) % HERO_SLIDES.length;
    setActiveSlide(normalized);
    setInjectedSlideIndex(normalized);

    const image = tailImagesRef.current[normalized];
    if (image) {
      drawImageToCanvas(image);
    }
  };

  const prevTailSlide = () => {
    const current = injectedSlideIndexRef.current ?? activeSlide;
    showInjectedSlide(current - 1);
  };

  const nextTailSlide = () => {
    const current = injectedSlideIndexRef.current ?? activeSlide;
    showInjectedSlide(current + 1);
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    let ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline({
        defaults: { duration: 1 },
        paused: true,
      });

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        fastScrollEnd: true,
        animation: timelineRef.current,
        onUpdate: self => {
          if (!imagesRef.current.length) return;

          const frameIndex = Math.floor(
            gsap.utils.clamp(
              0,
              imagesRef.current.length - 1,
              self.progress * (imagesRef.current.length - 1),
            ),
          );
          setCurrentFrame(frameIndex);

          if (isHeroSequence) {
            const tailStartIndex = Math.max(0, imagesRef.current.length - 8);
            const inTailZone = frameIndex >= tailStartIndex;
            setShowTailControls(inTailZone);

            if (previousFrameRef.current !== -1 && previousFrameRef.current !== frameIndex && injectedSlideIndexRef.current !== null) {
              setInjectedSlideIndex(null);
            }
            previousFrameRef.current = frameIndex;
          }

          if (isHeroSequence && injectedSlideIndexRef.current !== null && tailImagesRef.current[injectedSlideIndexRef.current]) {
            drawImageToCanvas(tailImagesRef.current[injectedSlideIndexRef.current]);
          } else if (imagesRef.current[frameIndex]) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(imagesRef.current[frameIndex], 0, 0);
          }
        },
        onEnter: () => {
          setIsVisible(true);
          gsap.set(container, { zIndex: 10, immediateRender: false });
        },
        onLeave: () => {
          if (isHeroSequence) {
            setShowTailControls(false);
            setInjectedSlideIndex(null);
          }
          const lastImage = imagesRef.current[imagesRef.current.length - 1];
          if (lastImage) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(lastImage, 0, 0);
          }
          gsap.timeline().to(container, {
            zIndex: 1,
            duration: 0.1,
            onComplete: () => setIsVisible(false),
          });
        },
        onEnterBack: () => {
          setIsVisible(true);
          gsap.set(container, { zIndex: 10, immediateRender: false });
        },
        onLeaveBack: () => {
          if (isHeroSequence) {
            setShowTailControls(false);
            setInjectedSlideIndex(null);
          }
          const firstImage = imagesRef.current[0];
          if (firstImage) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(firstImage, 0, 0);
          }
          gsap.timeline().to(container, {
            zIndex: 1,
            duration: 0.1,
            onComplete: () => setIsVisible(false),
          });
        },
      });
    }, container);

    const loadImages = async () => {
      setIsLoading(true);
      imagesRef.current = [];
      loadedImagesCount.current = 0;

      const loadImage = src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            loadedImagesCount.current += 1;
            resolve(img);
          };
          img.onerror = reject;
          img.src = src;
        });
      };

      try {
        const loadedImages = await Promise.all(
          imagesUrl.map(url => loadImage(url)),
        );
        imagesRef.current = loadedImages;

        if (loadedImages[0]) {
          canvas.width = loadedImages[0].width;
          canvas.height = loadedImages[0].height;
          context.drawImage(loadedImages[0], 0, 0);
        }

        if (isHeroSequence) {
          const loadedTailImages = await Promise.all(
            HERO_SLIDES.map((slide) => loadImage(slide.image)),
          );
          tailImagesRef.current = loadedTailImages;
        }

        setIsLoading(false);
      } catch (error) {
        console.error(`Error loading images for sequence ${id}:`, error);
        setIsLoading(false);
      }
    };

    loadImages();

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ctx.revert();
      if (contextRef.current) {
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
      }
      imagesRef.current = [];
      loadedImagesCount.current = 0;
      tailImagesRef.current = [];
      gsap.set(container, { clearProps: 'all' });
    };
  }, [id, imagesUrl, totalFrames, isHeroSequence]);
  const showHero = heroData && currentFrame <= 6;
  const tailCaptionContainerVariants = {
    initial: { opacity: 0, y: 56, rotateX: 14, scale: 0.985 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      y: 14,
      rotateX: -8,
      scale: 0.99,
      transition: {
        duration: 0.09,
        ease: [0.4, 0, 1, 1],
        when: 'beforeChildren',
      },
    },
  };

  const tailCaptionTitleVariants = {
    initial: { opacity: 0, y: 18 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.17, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.08, ease: [0.4, 0, 1, 1] },
    },
  };

  const tailCaptionDescriptionVariants = {
    initial: { opacity: 0, y: 14 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.17, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.08, ease: [0.4, 0, 1, 1] },
    },
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen relative"
      style={{
        position: 'relative',
        zIndex: isVisible ? 10 : 1,
        backgroundColor: '#000',
        willChange: 'transform, z-index',
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        transition: 'opacity 0.3s ease-out',
        opacity: isVisible ? 1 : 0.99,
      }}
    >
      <canvas
        ref={canvasRef}
        id={id}
        className="w-full h-full object-cover"
        style={{
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      />

      {/* Hero overlay: visible on frames 0-6, fades out after */}
      <AnimatePresence>
        {heroData && showHero && (
          <motion.div
            key="hero-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none flex items-start justify-between px-8 md:px-12  pb-8 pt-10 md:pt-22"
            style={{
              background: 'radial-gradient(circle at 80% 50%, rgba(0,0,0,0.4) 0%, transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%)'
            }}
          >
            {/* Left: heading */}
            <div >
              {heroData.heading && (
                <h1 className="text-white text-[3rem]  font-['InterBold'] tracking-tighter  leading-4"

                  style={{
                    textShadow: '0 4px 8px rgba(0,0,0,0.6)'
                  }}
                >
                  {heroData.heading}
                </h1>
              )}
              {heroData.subheading && (
                <p className="text-white text-2xl mt-6 font-[InterBold] tracking-tighter"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {heroData.subheading}
                </p>
              )}
            </div>

            {/* Right: specs */}
            {heroData.specs && heroData.specs.length > 0 && (
              <div className="flex flex-col gap-10 mt-10 items-end text-right">
                {heroData.specs.map((spec, i) => (
                  <div key={i} className="flex flex-col items-end">
                    {spec.icon && (
                      <div className="w-8 h-8 flex-shrink-0">
                        {spec.icon}
                      </div>
                    )}
                    <p className="text-white text-xl font-bold font-sans text-shadow-sm text-end">
                      {spec.title}
                    </p>
                    <p className="text-white text-xs md:text-xs opacity-80 text-end">{spec.subtitle}</p>

                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white">Loading...</div>
        </div>
      )}
      {isHeroSequence && (
        <>
          <AnimatePresence>
            {showTailControls && (
              <motion.div
                initial={{ opacity: 0.25 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.25 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-0 z-[35]"
                style={{
                  background: 'linear-gradient(to top right, rgba(0,0,0,0.8) 0%, transparent 50%)',
                }}
              />
            )}
          </AnimatePresence>

          {showTailControls && (
            <>

              <motion.button
                type="button"
                onClick={prevTailSlide}
                initial={{ opacity: 0, x: -14, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-4 top-1/2 z-[40] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full cursor-pointer  text-white/90 backdrop-blur-sm transition  bg-black/20 hover:bg-black/50 border border-white/20"
                aria-label="Previous slide"
              >
                <span className="text-[34px] leading-none">&#8249;</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={nextTailSlide}
                initial={{ opacity: 0, x: 14, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-4 top-1/2 z-[40] flex h-11 w-11 -translate-y-1/2 items-center cursor-pointer justify-center rounded-full  text-white/90 backdrop-blur-sm transition   bg-black/20 hover:bg-black/50 border border-white/20"
                aria-label="Next slide"
              >
                <span className="text-3xl leading-none">&#8250;</span>
              </motion.button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`tail-caption-${activeSlide}`}
                  variants={tailCaptionContainerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="pointer-events-none absolute bottom-14 left-6 z-[40]  md:left-10 md:bottom-16"
                  style={{ transformOrigin: 'bottom center' }}
                >
                  <motion.h3 variants={tailCaptionTitleVariants} className="text-white text-3xl leading-4   mb-4 text-shadow-md font-[InterBold]" >
                    {HERO_SLIDES[activeSlide].title}
                  </motion.h3>
                  <motion.p variants={tailCaptionDescriptionVariants} className="max-w-[450px] text-white/90 text-xs leading-relaxed text-shadow-sm font-[InterBold]">
                    {HERO_SLIDES[activeSlide].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </>
      )}

    </div>
  );
};

export default ScrollSequence;
