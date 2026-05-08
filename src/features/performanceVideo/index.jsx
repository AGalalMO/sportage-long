import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const EngineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="h-10 w-10 lg:h-[64px] lg:w-[64px]" aria-hidden="true" fill="white">
        <path d="M44.52,26.42l2-2a2.24,2.24,0,0,0-3.17-3.17l-2,2a15.63,15.63,0,1,0,3.17,3.17ZM44,22a1.27,1.27,0,0,1,.88-.37,1.25,1.25,0,0,1,.88,2.12L41,28.56a1.29,1.29,0,0,1-1.76,0,1.26,1.26,0,0,1,0-1.76ZM42.35,46.12A14.64,14.64,0,1,1,40.64,24L38.5,26.09a2.26,2.26,0,0,0-.65,1.59,2.24,2.24,0,0,0,2.24,2.24,2.18,2.18,0,0,0,1.58-.66l2.13-2.13A14.61,14.61,0,0,1,42.35,46.12Z" />
        <path d="M42.44 34.13a.5.5 0 10-1 .15 9.58 9.58 0 11-8-8 .5.5 0 00.58-.42.51.51 0 00-.42-.57 10.57 10.57 0 108.8 8.81zM32 12.84a2.79 2.79 0 10-2.79-2.79A2.79 2.79 0 0032 12.84zm0-4.57a1.79 1.79 0 11-1.79 1.78A1.79 1.79 0 0132 8.27zM48.21 15.61a2.8 2.8 0 000 3.94 2.77 2.77 0 002 .82 2.74 2.74 0 002-.82 2.79 2.79 0 10-3.94-3.94zm3.24 3.24a1.8 1.8 0 01-2.53 0 1.79 1.79 0 012.53-2.53A1.8 1.8 0 0151.45 18.85zM57.71 33a2.79 2.79 0 102.79 2.79A2.79 2.79 0 0057.71 33zm0 4.57a1.79 1.79 0 111.79-1.78A1.78 1.78 0 0157.71 37.55zM48.21 52a2.78 2.78 0 002 4.75 2.78 2.78 0 10-2-4.75zm3.24 3.23a1.79 1.79 0 110-2.52A1.79 1.79 0 0151.45 55.21zM11.85 52a2.79 2.79 0 103.94 0A2.78 2.78 0 0011.85 52zm3.23 3.23a1.79 1.79 0 110-2.52A1.79 1.79 0 0115.08 55.21zM6.29 33a2.79 2.79 0 102.78 2.79A2.79 2.79 0 006.29 33zm0 4.57a1.79 1.79 0 111.78-1.78A1.79 1.79 0 016.29 37.55zM13.82 20.37a2.77 2.77 0 002-.82 2.79 2.79 0 10-3.94 0A2.74 2.74 0 0013.82 20.37zm-1.27-4.05a1.79 1.79 0 112.53 2.53 1.79 1.79 0 01-2.53-2.53z" />
    </svg>
);

const DrivetrainIcon = () => (
    <img src="/assets/svg/four-wheel-drive.svg" alt="Four Wheel Drive" className="h-10 w-10 lg:h-[64px] lg:w-[64px]" aria-hidden="true" />
);

const TerrainModeIcon = () => (
    <img src="/assets/svg/car.svg" alt="Four Wheel Drive" className="h-10 w-10 lg:h-[64px] lg:w-[64px]" aria-hidden="true" />

);

export default function PerformanceVideoSection () {
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { amount: 0.8 });
    const { i18n, t } = useTranslation('common');
    const isAr= i18n.language === 'ar';
    const specs = [
        {
            icon: <TerrainModeIcon />,
            title: t('interior.turbocharged.title'),
            description: t('interior.turbocharged.description'),
        },
        {
            icon: <DrivetrainIcon />,
            title: t('interior.allWheelDrive.title'),
            description: t('interior.allWheelDrive.description'),
        },
        {
            icon: <EngineIcon />,
            title: t('interior.multiTerrainMode.title'),
            description: t('interior.multiTerrainMode.description'),
        },
    ];

    return (
        <section ref={sectionRef} className="relative h-[100vh] w-screen overflow-hidden bg-[#06141F]">
            <div
                className="pointer-events-none absolute inset-0 z-[15] h-[100vh] w-screen"
                style={{ background: 'linear-gradient(200deg, #06141F00 0%, #06141F 100%)' }}
            />
            <video
                src="/assets/videos/vid1.mp4"
                className="absolute inset-0 h-[100vh] w-full object-cover z-10"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className='absolute inset-0 h-[100vh] w-screen z-[20] flex flex-col justify-between'>

                <div className='bg-[linear-gradient(180deg,rgba(6,20,31,0.7)_0%,rgba(118,153,178,0.3)_52%,rgba(6,20,31,0)_100%)] pt-[6vh] px-20 w-screen h-[25vh] flex flex-col justify-center'>
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                    >
                        <p className="mb-1 text-[18px] text-white/90 lg:text-lg font-[InterBold]">{isAr ? 'الأداء' : 'Performance'}</p>
                        <h2 className="text-[40px] leading-tight text-white lg:text-[36px] font-[InterRegular] mb-5">{t('interior.tagline')}</h2>
                    </motion.div>
                    <hr className='border-white w-[200px] ' />

                </div>
             <div className='h-[50vh] flex flex-col justify-start'>
                    <div className="grid grid-cols-1 gap-8 px-20 lg:grid-cols-3 lg:gap-12 justify-center">
                        {specs.map((spec) => (
                            <div
                                key={spec.title}
                            >
                                <div className="mb-4 text-white/95 w-[64px] h-[64px]">{spec.icon}</div>
                                <h3 className="mb-2 text-[32px] leading-[50px] text-white lg:text-[32px] font-[InterRegular]">{spec.title}</h3>
                                <p className="text-[22px] leading-[1.2] text-white/65 lg:text-lg font-[InterRegular]">{spec.description}</p>
                            </div>
                        ))}
                    </div>
             </div>
             
            </div>



        </section>
    );
}