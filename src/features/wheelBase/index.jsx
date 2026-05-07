import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from "react";

export default function WheelBase () {
  const hero2Ref = useRef(null);

  const { scrollYProgress: hero2Progress } = useScroll({
    target: hero2Ref,
    offset: ['start end', 'end start'],
  });

  const smoothHero2Progress = useSpring(hero2Progress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const heroVerticalTextY = useTransform(smoothHero2Progress, [0, 1], ['40vh', '-40vh']);
  const heroLeftTextX = useTransform(smoothHero2Progress, [0, 0.5, 1], ['-55vw', '0vw', '55vw']);
  const heroLeftTextOpacity = useTransform(smoothHero2Progress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <div  ref={hero2Ref} className='bg-[#06141F] h-screen w-screen flex items-center justify-center relative overflow-hidden' >
      <img src='/assets/images/swp_01.avif' className='w-full h-full object-contain z-[2]' />

      <motion.p
        style={{ y: heroVerticalTextY}}
        className='absolute z-[1] right-6 md:right-12 top-1/2 -translate-y-1/2 text-[#a3a8ad] text-[140px] font-[InterBold]  uppercase text-center w-full pointer-events-none'
      >
        LONG WHEEL BASE
      </motion.p>

      <motion.p
        style={{ x: heroLeftTextX, opacity: heroLeftTextOpacity }}
        className='absolute z-[10] left-1/2 bottom-10 md:bottom-[150px] -translate-x-1/2 text-white text-[100px] font-[900]  pointer-events-none whitespace-nowrap'
      >
        5,456 mm
      </motion.p>
    </div>
  )
}