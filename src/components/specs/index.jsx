import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSpecs } from './useSpecs';

const Specs = () => {
    const { t ,i18n} = useTranslation('common');
    const isArabic=i18n?.language=='ar'
    const [openCategories, setOpenCategories] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState('next'); // 'next' or 'prev'
    const [cardsToShow, setCardsToShow] = useState(3); // Default to 3 cards
    const {
        featureCategories,
        featureCategories1,
        featureCategories2,
        featureCategories3,
        featureCategories4,
        featureCategories5,
    } = useSpecs()

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let newCardsToShow;
            if (width < 600) {
                newCardsToShow = 1; // Mobile: 1 card
            } else if (width < 1024) {
                newCardsToShow = 2; // Tablet: 2 cards
            } else {
                newCardsToShow = 3; // Desktop: 3 cards
            }

            // Reset currentSlide if the new cardsToShow would cause issues
            if (newCardsToShow !== cardsToShow) {
                setCardsToShow(newCardsToShow);
                // Reset to a valid slide position
                setCurrentSlide(0);
            }
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [cardsToShow]);


    const trimLevels = [
        { id: 'LX', name: 'LX', features: featureCategories },
        { id: 'EX', name: 'EX', features: featureCategories1 },
        { id: 'EX-Top', name: 'EX-Top', features: featureCategories2 },
        { id: 'X-Line', name: 'X-Line', features: featureCategories3 },
        { id: 'X-Pro', name: 'X-Pro', features: featureCategories4 },
        { id: 'X-Pro+', name: 'X-Pro+', features: featureCategories5 }
    ];
    const toggleCategory = (categoryKey) => {
        setOpenCategories(prev => ({
            ...prev,
            [categoryKey]: !prev[categoryKey]
        }));
    };

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSlideDirection('next');
        setCurrentSlide((prev) => {
            const next = prev + 1;
            // Loop back to the beginning when reaching the end
            return next >= trimLevels.length - cardsToShow + 1 ? 0 : next;
        });
        setTimeout(() => setIsAnimating(false), 300);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSlideDirection('prev');
        setCurrentSlide((prev) => {
            const next = prev - 1;
            // Loop to the end when going before the beginning
            return next < 0 ? trimLevels.length - cardsToShow : next;
        });
        setTimeout(() => setIsAnimating(false), 300);
    };

    const goToSlide = (index) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSlideDirection(index > currentSlide ? 'next' : 'prev');
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 300);
    };

    // Get the visible trim cards based on screen size
    const getVisibleTrims = () => {
        const visibleTrims = [];
        for (let i = 0; i < cardsToShow; i++) {
            const index = currentSlide + i;
            if (index < trimLevels.length) {
                visibleTrims.push(trimLevels[index] );
            }
        }
        return visibleTrims;
    };

    const visibleTrims = getVisibleTrims();

    const TrimCard = ({ trim, index, isEntering }) => (
        <div
            className={`bg-[#E7EBF0] rounded-[10px] p-4 md:p-4 h-full transition-all duration-300 transform`}

        >
            {/* Trim Name */}
            <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl text-center font-bold text-[#06141F] mb-4">{trim.name}</h2>

            {/* Technical Specifications Section */}
            <div className="mb-4 md:mb-6" dir={isArabic ? 'rtl' : 'ltr'}>
                <h3 className={`text-base md:text-lg font-medium text-start text-black mb-3 ${isArabic ? 'font-[GSSMedium]' : 'font-[InterBold]'}`} dir={isArabic ? 'rtl' : 'ltr'}>{isArabic ? "مواصفات المركبة" : "Vehicle Features"}</h3>
                <div className="space-y-0">
                    {trim?.features?.map((category, catIndex) => (
                        <div key={category.title} className="w-full">
                            <button
                                onClick={() => toggleCategory(`${trim.id}${category?.title}`)}
                                className={`w-full flex justify-between items-center p-2 md:p-3 text-xs md:text-sm font-medium  cursor-pointer transition-all duration-300 ${isArabic ? 'font-[GSSMedium]' : 'font-[InterBold]'} ${openCategories[`${trim.id}${category?.title}`]
                                    ? 'bg-[#06141F] text-white'
                                    : 'bg-[#7b848c] text-white '
                                    }`}
                            >
                                {category.title}
                                <span className="text-lg">
                                    {openCategories[`${trim.id}${category?.title}`] ? '−' : '+'}
                                </span>
                            </button>
                            {openCategories[`${trim.id}${category?.title}`] && (
                                <div className="mt-2 ml-3 space-y-1" dir={isArabic?'rtl':'ltr'}>
                                    {category.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className={`text-xs md:text-sm flex-wrap text-gray-600 flex items-start ${isArabic ? 'font-[GSSMedium]' : 'font-[InterBold]'}`}>
                                            <span className="text-[#06141F] me-2 mt-1">•</span>
                                            {feature?.toString()?.includes('LED MFR') ?
                                                <>
                                                    {feature?.split('LED MFR')?.[0]}
                                                    <span className='font-[InterBold] mx-[2px]'>LED MFR</span>
                                                    {feature?.split('LED MFR')?.[1]}
                                                </> : feature?.toString()?.includes('28') ?
                                                    <>
                                                        {feature?.split('28')?.[0]}
                                                        <span className='font-[InterBold] mx-[2px]'>28</span>
                                                        {feature?.split('28')?.[1]}
                                                    </>
                                                :
                                                feature?.includes('17') ?
                                                    <>
                                                        <span className='overflow-hidden text-nowrap text-ellipsis'>{feature?.split('17')?.[0]}</span>
                                                            <span className='font-[InterBold] mx-0.5'>17</span>
                                                            <span className='overflow-hidden text-nowrap text-ellipsis'>{feature?.split('17')?.[1]}</span>

                                                        {feature?.split('ABS')?.[1]}
                                                        </> :
                                                        feature?.includes('ABS') ?
                                                            <>
                                                                <span className='overflow-hidden text-nowrap text-ellipsis'>{feature?.split('ABS')?.[0]}</span>
                                                                <span className='font-[InterBold] mx-0.5'>ABS</span>
                                                                {feature?.split('ABS')?.[1]}
                                                            </> : feature?.includes('18') ?
                                                        <>
                                                            {feature?.split('18')?.[0]}
                                                            <span className='font-[InterBold] mx-0.5'>18</span>
                                                            {feature?.split('18')?.[1]}
                                                        </>
                                                                : feature?.includes('ESC') ?
                                                                    <>
                                                                        {feature?.split('ESC')?.[0]}
                                                                        <span className='font-[InterBold] mx-0.5'>ESC</span>
                                                                        {feature?.split('ESC')?.[1]}
                                                                    </>
                                                                    : feature?.includes('DBC') ?
                                                                        <>
                                                                            {feature?.split('DBC')?.[0]}
                                                                            <span className='font-[InterBold] mx-0.5'>DBC</span>
                                                                            {feature?.split('DBC')?.[1]}
                                                                        </>
                                                                        : feature?.includes('HAC') ?
                                                                            <>
                                                                                {feature?.split('HAC')?.[0]}
                                                                                <span className='font-[InterBold] mx-0.5'>HAC</span>
                                                                                {feature?.split('HAC')?.[1]}
                                                                            </>
                                                                            : feature?.includes('TSA') ?
                                                                                <>
                                                                                    {feature?.split('TSA')?.[0]}
                                                                                    <span className='font-[InterBold] mx-0.5'>TSA</span>
                                                                                    {feature?.split('TSA')?.[1]}
                                                                                </>
                                                                                :
                                                        feature?.includes('X-TREK') ?
                                                            <>
                                                                {feature?.split('X-TREK')?.[0]}
                                                                <span className='font-[InterBold] mx-0.5'>X-TREK</span>
                                                                {feature?.split('X-TREK')?.[1]}
                                                            </>:
                                                        feature?.includes('2.0') ?
                                                            <>
                                                                {feature?.split('2.0')?.[0]}
                                                                <span className='font-[InterBold] mx-0.5'>2.0</span>
                                                                {feature?.split('2.0')?.[1]}
                                                            </> : feature?.includes('ITBC') ?
                                                                <>
                                                                    {feature?.split('ITBC')?.[0]}
                                                                    <span className='font-[InterBold] mx-0.5'>ITBC</span>
                                                                    {feature?.split('ITBC')?.[1]?.includes('ctr') ? <>
                                                                        {feature?.split('ITBC')?.[1]?.split('ctr')?.[0]}
                                                                        <span className='font-[InterBold]'>ctr</span>
                                                                        {feature?.split('ITBC')?.[1]?.split('ctr')?.[1]}
                                                                    </> : feature?.split('ITBC')?.[1]}
                                                                </> :
                                                        feature?.includes('LED') ?
                                                        <>
                                                            {feature?.split('LED')?.[0]}
                                                            <span className='font-[InterBold] mx-[2px]'>LED</span>
                                                                                                    {feature?.split('LED')?.[1]?.includes('MFR') ?
                                                                                                        <>
                                                                                                            {feature?.split('LED')?.[1]?.split('MFR')?.[0]}
                                                                                                            <span className='font-[InterBold]'>MFR</span>
                                                                                                            {feature?.split('LED')?.[1]?.split('MFR')?.[1]}
                                                                                                        
                                                                                                        </>
                                                                                                    
                                                                                                    : feature?.split('LED')?.[1]}
                                                        </>
                                                            :
                                                            feature?.includes('Harman / Kardon') ?
                                                                <>
                                                                    {feature?.split('Harman / Kardon')?.[0]}
                                                                    <span className='font-[InterBold] mx-[2px]'>Harman / Kardon</span>
                                                                    {feature?.split('Harman / Kardon')?.[1]}
                                                                </>
                                                                :
                                                        
                                                        feature?.includes('12') ?
                                                            <>
                                                                {feature?.split('12')?.[0]}
                                                                <span className='font-[InterBold] mx-0.5'>12</span>
                                                                {feature?.split('12')?.[1]}
                                                            </>
                                                            : feature?.includes('1.5') ?
                                                                <>
                                                                    {feature?.split('1.5')?.[0]}
                                                                    <span className='font-[InterBold] mx-0.5'>1.5</span>
                                                                    {feature?.split('1.5')?.[1]}
                                                                </>
                                                                : feature?.includes('onee') ?
                                                                    <>
                                                                        {feature?.split('onee')?.[0]}
                                                                        <span className='font-[InterBold] mx-0.5'>1</span>
                                                                        {feature?.split('onee')?.[1]}
                                                                    </>:
                                                            
                                            
                                                                                            feature?.includes(`fours`) ?
                                                                <>
                                                                                                    {feature?.split(`fours`)?.[0]}
                                                                                                    <span className='font-[InterBold] mx-0.5'>4</span>
                                                                                                    {feature?.split(`fours`)?.[1]}
                                                                </>
                                            :
                                            feature?.includes('twlevee') ?
                                            <>
                                                {feature?.split('twlevee')?.[0]}
                                                <span className='font-[InterBold] mx-0.5'>12.3</span>
                                                                        {feature?.split('twlevee')?.[1]?.includes('DAB') ?
                                                                            <>
                                                                                {feature?.split('twlevee')?.[1]?.split('DAB')[0]}
                                                                                <span className='font-[InterBold] '>DAB</span>
                                                                                {feature?.split('twlevee')?.[1]?.split('DAB')[1]}
                                                                            </>
                                                                        : feature?.split('twlevee')?.[1]}
                                            </>
                                                                    : feature?.includes('USB') ?
                                                                        <>
                                                                            {feature?.split('USB')?.[0]}
                                                                            <span className='font-[InterBold] mx-0.5'>USB</span>
                                                                            {feature?.split('USB')?.[1]}
                                                                        </>
                                                                        :
                                                                feature?.includes('6') ?
                                                                    <>
                                                                        {feature?.split('6')?.[0]}
                                                                        <span className='font-[InterBold] mx-0.5'>6</span>
                                                                        {feature?.split('6')?.[1]}
                                                                    </>
                                                                    :
                                                                    feature?.includes('twoo') ?
                                                                        <>
                                                                            {feature?.split('twoo')?.[0]}
                                                                            <span className='font-[InterBold]'>2</span>
                                                                            {feature?.split('twoo')?.[1]}
                                                                        </>
                                                                        :
                                                                        feature?.includes('xl1') ?
                                                                            <>
                                                                                {feature?.split('xl1')?.[0]}
                                                                                <span className='font-[InterBold]'>1</span>
                                                                                {feature?.split('xl1')?.[1]}
                                                                            </>
                                                                            :
                                                                    feature?.includes('AT') ?
                                                                        <>
                                                                            {feature?.split('AT')?.[0]}
                                                                            <span className='font-[InterBold] mx-[2px]'>AT</span>
                                                                            {feature?.split('AT')?.[1]}
                                                                        </>
                                                                        : feature?.includes("ABS + ESC + DBC + HAC + TSA") ?
                                                                            <>
                                                                                {feature?.split("ABS + ESC + DBC + HAC + TSA")?.[0]}
                                                                                <span className='font-[InterBold] mx-0.5'>ABS + ESC + DBC + HAC + TSA</span>
                                                                                {feature?.split("ABS + ESC + DBC + HAC + TSA")?.[1]}
                                                                            </>
                                                                            :
                                                                            feature?.includes("xx") ?
                                                                                <>
                                                                                    {feature?.split("xx")?.[0]}
                                                                                    <span className='font-[InterBold] mx-0.5'>60:40</span>
                                                                                    {feature?.split("xx")?.[1]}
                                                                                </>
                                                                                : feature?.includes("220") ?
                                                                                    <>
                                                                                        {feature?.split("220")?.[0]}
                                                                                        <span className='font-[InterBold] mx-0.25'>220</span>
                                                                                        {feature?.split("220")?.[1]}
                                                                                    </>
                                                                                    :
                                                        
                                                        
                                                        feature}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

         
        </div>
    );

    return (
        <section className="min-h-screen bg-white w-full relative overflow-hidden">
            <div className='max-w-[1420px] mx-auto px-0 lg:px-2 md:px-4 py-4 md:py-8'>
                {/* Header Section */}
                <div className="text-start mb-8 px-4 md:px-0">
                    <h1 className={`text-2xl md:text-3xl lg:text-[40px] ${isArabic ? 'font-[GSSMedium]' : 'font-[InterBold]'} text-[#06141F] mb-5`}>
                        {isArabic ?`أختر الفئة التي تناسبك`:`  Find the perfect trim for you`}
                    </h1>
                    <p className={`text-base md:text-lg text-[#06141F] text-start ${isArabic ? 'font-[GSSMedium]' : 'font-[InterRegular]'}`}>
                        {isArabic ? `من الأداء القوي إلى التفاصيل الفاخرة، توفر لك سبورتاج الخيار الذي يعكس شخصيتك ويُعبّر عن أسلوب قيادتك` : `  From rugged to refined, choose the sportage trim that matches your drive and your style.`}
                    </p>
                </div>

                {/* Trim Cards Slider - Responsive cards display */}
                <div className="relative   2xl:px-2">
                    {/* Previous Button */}
                    <button
                        onClick={prevSlide}
                        disabled={isAnimating}
                        className={`absolute left-12 cursor-pointer 2xl:left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full text-[#06141F] flex items-center justify-center transition-colors z-10 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                            }`}
                    >
                        <ChevronLeft className="w-10 h-10 text-[#06141F]" />
                    </button>

                    {/* Responsive Trim Cards Container */}
                    <div className={`flex justify-center gap-4  ${cardsToShow === 1 ? 'mx-6 px-4' : ''}`} dir='ltr'>
                        {visibleTrims.map((trim, index) => (
                            <div key={trim.id} className={`${cardsToShow === 1 ? 'w-full max-w-md mx-auto' : cardsToShow === 2 ? 'w-full md:w-1/2 max-w-lg' : 'w-full md:w-1/3'}`}>
                                <TrimCard
                                    trim={trim}
                                    index={index}
                                    isEntering={
                                        (slideDirection === 'next' && index === cardsToShow - 1 && isAnimating) || // Next: animate rightmost card
                                        (slideDirection === 'prev' && index === 0 && isAnimating)    // Prev: animate leftmost card
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        disabled={isAnimating}
                        className={`absolute cursor-pointer right-12 2xl:right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full text-[#06141F] flex items-center justify-center transition-colors z-10 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                            }`}
                    >
                        <ChevronRight className="w-10 h-10 text-[#06141F]" />
                    </button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-8" dir={'ltr'}>
                    {Array.from({ length: Math.max(1, trimLevels.length - cardsToShow + 1) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            disabled={isAnimating}
                            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-[#06141F]' : 'bg-gray-300'
                                } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Custom CSS for bounce animation */}
            <style jsx>{`
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% {
                        transform: translate3d(0,0,0);
                    }
                    40%, 43% {
                        transform: translate3d(0,-8px,0);
                    }
                    70% {
                        transform: translate3d(0,-4px,0);
                    }
                    90% {
                        transform: translate3d(0,-2px,0);
                    }
                }
            `}</style>
        </section>
    );
};

export default Specs;
