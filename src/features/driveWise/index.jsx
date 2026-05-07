import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

const FEATURES = {
    en: [
        {
            title: 'Forward Collision-Avoidance Assist (FCA)',
            description:
                'Warns if the preceding vehicle suddenly slows down or if the risk of collision with a vehicle, a pedestrian, or a cyclist is detected. Automatically assists with braking if the risk of a collision increases after warning.',
        },
        {
            title: 'Lane Keeping Assist (LKA)',
            description:
                'Detects lane markings and helps keep the vehicle within its lane by providing steering torque when unintended lane departure is detected.',
        },
        {
            title: 'Blind-Spot Collision Warning (BCW)',
            description:
                'Monitors the blind spots on both sides of the vehicle and alerts the driver with a visual warning when another vehicle is detected in the blind-spot zone.',
        },
        {
            title: 'Driver Attention Warning (DAW)',
            description:
                'Monitors driving patterns and alerts the driver when signs of drowsiness or inattention are detected, helping prevent fatigue-related incidents.',
        },
    ],
    ar: [
        {
            title: 'مساعد تجنب الاصطدام الأمامي (FCA)',
            description:
                'يحذر عند انخفاض سرعة السيارة الأمامية فجأة أو عند اكتشاف خطر الاصطدام بسيارة أو راجل أو دراجة. يتدخل تلقائياً بالفرملة عند ازدياد خطر الاصطدام.',
        },
        {
            title: 'مساعد الحفاظ على المسار (LKA)',
            description:
                'يرصد علامات المسار ويساعد على إبقاء المركبة ضمن مسارها من خلال تطبيق عزم توجيه عند اكتشاف انحراف غير مقصود.',
        },
        {
            title: 'تحذير اصطدام النقطة العمياء (BCW)',
            description:
                'يراقب النقاط العمياء على جانبي المركبة وينبّه السائق بصرياً عند اكتشاف مركبة أخرى في المنطقة غير المرئية.',
        },
        {
            title: 'تحذير انتباه السائق (DAW)',
            description:
                'يرصد أنماط القيادة وينبّه السائق عند ظهور علامات النعاس أو الشرود، مما يساعد في منع الحوادث الناجمة عن الإرهاق.',
        },
    ],
};

const SLIDER_ITEMS = {
    en: [
        {
            image: '/assets/stills/headlights.jpeg',
            title: 'LED Adaptive Headlights',
            description: 'High-performance adaptive lighting system that illuminates curves and corners for enhanced visibility.',
        },
        {
            image: '/assets/stills/EXT Cam 3 Rear lights.jpeg',
            title: 'Sequential Rear Lights',
            description: 'Bold sequential LED rear lighting signature that sets the Sportage apart after dark.',
        },
        {
            image: '/assets/stills/EXT Cam 4 Rim.jpeg',
            title: '19" Alloy Wheels',
            description: 'Aerodynamically optimised alloy wheels that reduce drag while adding a premium stance.',
        },
        {
            image: '/assets/stills/IN Cam 3 curved display.jpeg',
            title: 'Curved Panoramic Display',
            description: 'A seamlessly integrated digital display panel keeping information within your field of view.',
        },
    ],
    ar: [
        {
            image: '/assets/stills/headlights.jpeg',
            title: 'مصابيح LED أمامية تكيفية',
            description: 'نظام إضاءة تكيفي عالي الأداء يضيء المنعطفات لرؤية أوضح.',
        },
        {
            image: '/assets/stills/EXT Cam 3 Rear lights.jpeg',
            title: 'المصابيح الخلفية المتسلسلة',
            description: 'توقيع LED خلفي متسلسل جريء يميز سبورتاج في الليل.',
        },
        {
            image: '/assets/stills/EXT Cam 4 Rim.jpeg',
            title: 'جنوط سبائك 19 بوصة',
            description: 'جنوط سبائك محسّنة ديناميكياً تقلل من السحب وتمنح المركبة طابعاً فارهاً.',
        },
        {
            image: '/assets/stills/IN Cam 3 curved display.jpeg',
            title: 'شاشة بانورامية منحنية',
            description: 'شاشة رقمية متكاملة تبقي المعلومات ضمن مجال رؤية السائق.',
        },
    ],
};

export default function DriveWiseSection () {
    const { i18n } = useTranslation('common');
    const isAr = i18n.language === 'ar';
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { amount: 0.8 });

    const [featureIndex, setFeatureIndex] = useState(0);
    const [sliderIndex, setSliderIndex] = useState(0);

    const features = isAr ? FEATURES.ar : FEATURES.en;
    const slides = isAr ? SLIDER_ITEMS.ar : SLIDER_ITEMS.en;
    const currentFeature = features[featureIndex];

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
                            {isAr ? 'قيادة ذكية' : 'Drive Wise'}
                        </p>
                        <h2
                            className="mb-4 text-3xl text-white lg:text-4xl"
                            style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                        >
                            {isAr ? 'طريقة أذكى للقيادة' : 'A smarter way to drive'}
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
                        className="mb-3 text-2xl text-white lg:text-[34px]"
                        style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                    >
                        {currentFeature.title}
                    </h3>
                    <p
                        className="text-sm leading-7 text-white/65 lg:text-base"
                        style={{ fontFamily: isAr ? 'GSSLight' : 'InterRegular' }}
                    >
                        {currentFeature.description}
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
