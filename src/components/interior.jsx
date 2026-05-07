import { useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { FloatingText2 } from "./floatingText2";

export const Interior = () => {
    const sectionRef = useRef(null);
    const { t, i18n } = useTranslation('common');
    const {locale}=useRouter()
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Transform scroll progress to scale and position values
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.6, 1, 0.4]);
    const y = useTransform(scrollYProgress, [0, 0.5], [-150, 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    return (
        <div ref={sectionRef}  className="w-screen bg-[#06141F] flex flex-col  items-center justify-center h-[60vh] lg:h-[100vh]">
            <motion.p
                className={`text-[40px] lg:text-[62px] text-white text-center ${locale == 'ar' ? "font-['GSSMedium'] lg:-ms-[55px]" : "font-[InterBold]"} text-white uppercase font-[900] w-fit`}
                style={{ scale, y, opacity }}
            >
                {"   "}{i18n?.language == 'ar' ? `التصميم الداخلي` : `Interior`}
            </motion.p>
            <FloatingText2
                head1={i18n?.language == 'ar' ? `قوة صلبة` : `RUGGED`}
                head2={i18n?.language == 'ar' ? `وأناقة` : `YET`}
                head3={i18n?.language == 'ar' ? `متقنة` : `REFINED`}
                desc={i18n?.language == 'ar' ? `مثل قوتها الخارجية، تتميز سبورتاج بجودة المقصورة الداخلية التي تجمع المتانة مع الرفاهية العملية. يعتمد التصميم الداخلي على البساطة والتماثل، مع تفاصيل تقنية متقدمة توازن بين رحابة المساحة وفخامة الأداء.` : `Just as bold on the inside, the Kia sportage’s interior offers enduring pickup truck quality. The outwardly simple design uses symmetry, pure forms, and a wealth of technology to strike a winning balance of spacious luxury and practicality.`} />
     </div>
    )
}