import React from "react"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import Quote from "../components/core/AboutPage/Quote"
import HighlightText from "../components/core/HomePage/HighlightText"
import { motion } from 'framer-motion';
import { fadeIn } from "../components/common/motionFrameVarients"
const About = () => {
  return (
    <div>
      <section className="bg-[#1ABC9C]">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <motion.header
            className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]"
          >
            <motion.p
              variants={fadeIn('down', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
            > Driving Innovation in Online Education for a
              <HighlightText text={"Brighter Future"} />
            </motion.p>

            <motion.p
              variants={fadeIn('up', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="mx-auto mt-3 text-center text-base font-medium text-white lg:w-[95%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </motion.p>
          </motion.header>

          <div className="sm:h-[70px] lg:h-[150px]"></div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-[#2C2C2C]">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>


      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white border border-black bg-[#d0f8f0] rounded-xl p-7 lg:p-14">
        <ContactFormSection />
      </section>
    </div>
  )
}

export default About