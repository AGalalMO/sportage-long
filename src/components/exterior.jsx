import { useEffect, useRef, useState } from "react";
import { FloatingText } from "./floatingText"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export const Exterior = () => {
    const sectionRef = useRef(null);
    const { t, i18n } = useTranslation('common');
    const { locale } = useRouter()
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Transform scroll progress to scale and position values
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.6, 1, 0.4]);
    const y = useTransform(scrollYProgress, [0, 0.5], [-300, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [-1, 1]);
    return (
        <div ref={sectionRef} className="w-screen bg-[#06141F] flex flex-col justify-center h-[50vh] lg:h-[70vh]">
            <motion.p
                className={`text-3xl md:text-[52px] text-white text-center ${locale == 'ar' ? "font-['GSSMedium']" : "font-[InterBold]"} text-white uppercase font-[900]`}
                style={{ scale, y, opacity }}
            >
                {i18n?.language == 'ar' ? `التصميم الخارجي` : `Exterior`}
            </motion.p>
            <FloatingText desc={i18n?.language == 'ar' ? `تقدم كيا سبورتاج لغة تصميم حديثة مستندة إلى الوظائف، منسجمة مع هوية عائلة كيا.
تتميز الشبكة الأمامية المستوحاة من "وجه النمر" بأضواء رأسية جريئة وصدام أمامي قوي وغطاء محرك عريض ومرتفع، يُشير إلى قوة الأداء الكامنة.
ويبرز المظهر الجانبي الواثق مع لمسات رفارف هندسية فريدة وعملية، ليمنح المركبة حضورًا طاغيًا على الطريق.`: `The Kia sportage applies the latest function-based pickup design language to the Kia family look. The tiger-face radiator grille is framed by bold, vertical lights, a strong front bumper, and a broad, high hood that hints at powerful machinery within. A confident side profile, with unique and practical geometric fender highlights, gives the vehicle a commanding stance.`} />
        </div>
    )
}