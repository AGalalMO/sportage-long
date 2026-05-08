import { useTranslation } from 'next-i18next';

const HOTSPOTS = [
    {
        id: 'length',
        left: '16%',
        top: '59%',
        label: { en: 'Length', ar: 'الطول' },
        value: { en: '4,660 mm', ar: '4,660 مم' },
    },
    {
        id: 'height',
        left: '57%',
        top: '16%',
        label: { en: 'Height', ar: 'الارتفاع' },
        value: { en: '1,645 mm', ar: '1,645 مم' },
    },
    {
        id: 'width',
        left: '36%',
        top: '39%',
        label: { en: 'Width', ar: 'العرض' },
        value: { en: '1,865 mm', ar: '1,865 مم' },
    },
    {
        id: 'wheelbase',
        left: '54%',
        top: '75%',
        label: { en: 'Wheelbase', ar: 'قاعدة العجلات' },
        value: { en: '2,755 mm', ar: '2,755 مم' },
    },
];

export default function DimensionsHotspots () {
    const { i18n ,t} = useTranslation('common');
    const isAr = i18n.language === 'ar';


    return (
        <section
            className="relative h-screen w-screen overflow-hidden bg-[#06141F] px-4 py-12 md:py-16"
            dir={isAr ? 'rtl' : 'ltr'}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-65"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at center, rgba(140, 172, 204, 0.24) 1px, transparent 1.5px)',
                    backgroundSize: '50px 50px',
                    backgroundPosition: 'center',
                }}
            />

            <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col items-center justify-center">
                <p
                    className="text-xs tracking-[0.3em] uppercase text-white/70 font-[InterBold] "
                    style={{ fontFamily: isAr ? 'GSSMedium' : 'InterBold' }}
                >
                    {t('vehicleDimensions')}
                </p>

                <h2
                    className="text-4xl md:text-3xl font-[InterBold]  text-white mt-4"
                    style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                >
                    {t('dimTitle')}
                </h2>

                <div className="relative h-[350px] w-[850px] select-none overflow-hidden mt-10">
                    <img
                        src="/assets/images/swp_01.avif"
                        alt={isAr ? 'صورة سبورتاج جانبية' : 'Sportage side profile'}
                        className="h-[350px] w-[850px] object-cover"
                        loading="lazy"
                        decoding="async"
                    />

                    {HOTSPOTS.map((point) => (
                        <button
                            key={point.id}
                            type="button"
                            aria-label={isAr ? point.label.ar : point.label.en}
                            className="group absolute z-20"
                            style={{ left: point.left, top: point.top, transform: 'translate(-50%, -50%)' }}
                        >
                            <span className="hotspot-ping absolute left-[150%] top-[150%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4a43]/20" />
                            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#ff4a43] shadow-[0_0_20px_rgba(255,74,67,0.75)]">
                                <span className="h-2 w-2 rounded-full bg-white" />
                            </span>

                            <span
                                className="pointer-events-none absolute -left-1 top-8 w-max min-w-[165px] max-w-[210px] rounded-2xl border border-white/15 bg-[rgba(8,20,31,0.9)] px-3 py-2 text-left opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                                style={{ direction: isAr ? 'rtl' : 'ltr' }}
                            >
                                <span
                                    className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-white/65"
                                    style={{ fontFamily: isAr ? 'GSSLight' : 'InterLight' }}
                                >
                                    {isAr ? point.label.ar : point.label.en}
                                </span>
                                <span
                                    className="block text-lg text-white"
                                    style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                                >
                                    {isAr ? point.value.ar : point.value.en}
                                </span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .hotspot-ping {
          animation: hotspotBounce 1.6s ease-in-out infinite;
        }

        @keyframes hotspotBounce {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.92);
            opacity: 0.45;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.18);
            opacity: 0.15;
          }
        }
      `}</style>
        </section>
    );
}