import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';


export default function DriveWiseSection () {
    const { i18n,t } = useTranslation('common');
    const isAr = i18n.language === 'ar';
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { amount: 0.8 });
    const [sliderIndex, setSliderIndex] = useState(0);

    const slides = [
        {
            image: '/assets/safety/aeb.png',
            title: t('driveWise.smartCruiseControl.title'),
            description: t('driveWise.smartCruiseControl.description'),
        },
        {
            image: '/assets/safety/kia-digital-key.png',
            title: t('driveWise.digitalKey.title'),
            description: t('driveWise.digitalKey.description'),
        },
        {
            image: '/assets/safety/kia-ota.png',
            title: t('driveWise.connectedServices.title'),
            description: t('driveWise.connectedServices.description'),
        },
        {
            image: '/assets/safety/lfa.jpg',
            title: t('driveWise.laneFollowing.title'),
            description: t('driveWise.laneFollowing.description'),
        },
        {
            image: '/assets/safety/parking-sensor.png',
            title: t('driveWise.parkingCollision.title'),
            description: t('driveWise.parkingCollision.description'),
        },
    ]


    return (
        <section
            ref={sectionRef}
            className="relative  min-h-screen w-screen flex flex-col justify-center gap-8 overflow-hidden bg-transparent"
            dir={isAr ? 'rtl' : 'ltr'}
        >
            {/* Header */}


            {/* Main layout */}
            <div className="flex flex-row  gap-10 items-start lg:justify-center" style={{ gap: '40px' }}>
                {/* Left — video + feature text */}
                <div className="flex flex-col gap-2 max-w-[600px]">
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        className="h-[17vh]"
                    >
                        <p
                            className="mb-1 text-lg text-white"
                            style={{ fontFamily: isAr ? 'GSSLight' : 'InterLight' }}
                        >
                            {t('driveWise.title')}
                        </p>
                        <h2
                            className="mb-4 text-3xl text-white lg:text-4xl"
                            style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                        >
                            {t('driveWise.tagline')}
                        </h2>
                        <div className="h-px w-32 bg-white/25" />
                    </motion.div>
                    {/* Video */}
                    <div className="relative overflow-hidden flex flex-col gap-5 rounded-2xl" style={{ width: '600px', height: '350px' }}>
                        <video
                            src="/assets/videos/vid2.mp4"
                            className="h-full w-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>

                    <h3
                        className="mb-3 text-2xl text-white lg:text-[30px]"
                        style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                    >
                        {t(`driveWise.forwardCollision.title`)}
                    </h3>
                    <p
                        className="text-sm leading-7 text-white/65 lg:text-base"
                        style={{ fontFamily: isAr ? 'GSSLight' : 'InterRegular' }}
                    >
                        {t(`driveWise.forwardCollision.description`)}
                    </p>
                </div>

                {/* Right — image slider */}
                <div className="flex flex-col items-center gap-4 max-w-[400px]  mt-[20vh]">
                    <div className="relative overflow-hidden rounded-2xl" style={{ width: '400px', height: '250px' }}>
                        <img
                            src={slides[sliderIndex].image}
                            alt={slides[sliderIndex].title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                        {/* Prev / Next buttons */}
                        <button
                            type="button"
                            onClick={() => setSliderIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition"
                            aria-label="Previous"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={() => setSliderIndex((prev) => (prev + 1) % slides.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition"
                            aria-label="Next"
                        >
                            ›
                        </button>
                    </div>

                    {/* Slide title + description */}
                    <div className="w-full text-center">
                        <h4
                            className="mb-2 text-xl text-white"
                            style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                        >
                            {slides[sliderIndex].title}
                        </h4>
                        <p
                            className=" leading-6 text-[#A3A8AD] text-base"
                            style={{ fontFamily: isAr ? 'GSSLight' : 'InterRegular' }}
                        >
                            {slides[sliderIndex].description}
                        </p>
                    </div>

                    {/* Slider dots */}
                    <div className="flex items-center gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSliderIndex(i)}
                                className={`rounded-full transition-all duration-300 ${i === sliderIndex ? 'h-2.5 w-2.5 bg-white' : 'h-2 w-2 bg-white/30'}`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
