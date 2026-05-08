import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'next-i18next';



export default function InteriorFeatureSlider () {
    const { t,i18n } = useTranslation('common');
    const isArabic = i18n?.language === 'ar';
    const [index, setIndex] = useState(0);

    const slides = [
        {
            image: '/assets/stills/IN Cam 3 curved display.jpeg',
            title: t('interior.panoramicDisplay.title'),
            description: t('interior.panoramicDisplay.description'),
        },
        {
            image: '/assets/stills/IN Cam 4 steering wheel.jpeg',
            title: t('interior.steeringWheel.title'),
            description: t('interior.steeringWheel.description'),
        },
        {
            image: '/assets/stills/IN Cam 2 ambient light.jpeg',
            title: t('interior.ambientLighting.title'),
            description: t('interior.ambientLighting.description'),
        },
        {
            image: '/assets/stills/INT-Speaker.jpg',
            title: t('interior.harmanKardon.title'),
            description: t('interior.harmanKardon.description'),
        },
        {
            image: '/assets/stills/IN Cam 5 sunroof E.jpg',
            title: t('interior.panoramicSunroof.title'),
            description: t('interior.panoramicSunroof.description'),
        },

    ]

    const goNext = () => setIndex((prev) => (prev + 1) % total);
    const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
    const current = slides[index];
    const total = slides.length;
    

    return (
        <section id="interior-slider" className="relative w-screen h-screen overflow-hidden flex items-center justify-center  py-16 lg:py-24">
         

            <div className="relative mx-auto flex w-full max-w-[1220px]  flex-col items-center px-4 lg:px-8">
                <p
                    className={`text-xs tracking-[0.3em] uppercase text-white/70 font-semibold font-sans"
                        }`}
                >
                    {isArabic ? 'التصميم الداخلي' : 'INTERIOR'}
                </p>

                <h2
                    className={`text-4xl md:text-5xl font-bold text-white mt-4  font-sans mb-16 '
                        }`}
                >
                    {t('interior.taglineHead')}
                </h2>

                <div className="relative flex w-full items-center justify-center">
                    <div className="pointer-events-none absolute left-0 top-1/2 hidden h-[130px] w-[130px] -translate-y-1/2 overflow-hidden rounded-xl opacity-30 lg:block">
                        <img
                            src={slides[(index - 1 + total) % total].image}
                            alt="Previous feature preview"
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[130px] w-[130px] -translate-y-1/2 overflow-hidden rounded-xl opacity-30 lg:block">
                        <img
                            src={slides[(index + 1) % total].image}
                            alt="Next feature preview"
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div className="relative z-10 flex w-full max-w-[980px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255, 255, 255, 0.03)] lg:min-h-[450px] lg:flex-row"
                        style={{
                            backdropFilter:'blur(10px)'
                    }}
                    >
                        <div className="h-[260px] w-full lg:h-auto lg:w-[60%]">
                            <img src={current.image} alt={current.title} className="h-full w-full object-cover " loading="lazy" />
                        </div>

                        <div className="flex w-full flex-col ps-5 pb-5 pt-4 text-white lg:w-[39%] lg:ps-6 lg:pb-6 lg:pt-5 ">
                            <div className="mb-4 flex items-center justify-between  pb-3">
                                <p className={`text-5xl text-white/30 ${isArabic ? "font-['GSSMedium']" : 'font-[InterBold]'}`}>
                                    {String(index + 1).padStart(2, '0')}
                                </p>
                                <hr className='border   ms-4 w-full border-white/30'/>
                            </div>

                            <h3 className={`text-3xl font-bold text-white leading-tight font-sans pe-5`}>
                                {current.title}
                            </h3>

                            <p
                                className={`text-white/80   text-sm font-sans leading-5 mt-2 pb-3`}
                               
                                dir={isArabic ? 'rtl' : 'ltr'}
                            >
                                {current.description}
                            </p>

                            <div className=" justify-between me-6 flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={goPrev}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white cursor-pointer"
                                        aria-label={isArabic ? 'الشريحة السابقة' : 'Previous slide'}
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goNext}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white cursor-pointer"
                                        aria-label={isArabic ? 'الشريحة التالية' : 'Next slide'}
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    {slides.map((_, dotIdx) => (
                                        <button
                                            key={`dot-${dotIdx}`}
                                            type="button"
                                            onClick={() => setIndex(dotIdx)}
                                            className={`h-[4px] rounded-full transition-all ${dotIdx === index ? 'w-8 bg-white' : 'w-4 bg-white/20'}   hover:bg-white/50 cursor-pointer`}
                                            aria-label={`${isArabic ? 'الانتقال إلى الشريحة' : 'Go to slide'} ${dotIdx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}