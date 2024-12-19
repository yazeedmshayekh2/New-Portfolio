"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "Continuous ASL Translation",
    title: "project 1",
    description:
      "In a world where communication is integral to opportunities and relationships, the hearing-impaired face significant challenges due to communication barriers. This project tackles the lack of popularity of sign language, creating a solution that automatically translates Sign Language gestures into spoken language. Leveraging Artificial Intelligence (AI) fields like Machine Learning, Deep Learning, Computer Vision, Object Detection, Object Recognition, and Natural Language Processing, the system aims to empower mute and deaf individuals. The initiative aligns with a wealth of related studies emphasizing the importance of sign language recognition and translation. Addressing the global prevalence of hearing loss, the project employs innovative approaches, including the Transformer and Conformer architectures. The models aim to enhance robustness and versatility through extensive preprocessing and data augmentation. The article structure covers background, methodology, challenges, acquired results, and unexplored techniques. This endeavour strives to break down communication barriers, fostering inclusivity for the hearing-impaired in our communication-dependent world.",
    stack: [{ name: "Python" },{ name: "Conformer" },{ name: "Transformers" },{ name: "Deep Learning" }],
    image: "/assets/work/ASL.png",
    live: "",
    github: "https://github.com/yazeedmshayekh2/Continuous-American-Sign-Language-Translation/tree/main",
  },
  {
    num: "02",
    category: "Automated Attendance System",
    title: "project 2",
    description:
      "Traditional methods of recording attendance suffer from various limitations, prompting the need for innovative solutions to streamline this crucial process. In this study, we explore the significance of accurate attendance records and introduce an automated attendance system leveraging facial recognition technology. We address challenges encountered in previous research within the domain and propose a novel solution to overcome them. Through a comprehensive methodology, including preprocessing steps and the implementation of state-of-the-art models, we demonstrate the effectiveness of our approach. Leveraging VGGFace2 (recognition) and Wider Face (detection) datasets, we present promising results that underscore the potential of our system to revolutionize attendance management. Additionally, we discuss related works in the field and highlight their contributions to advancing attendance monitoring technologies. By building upon existing research and leveraging cutting-edge methodologies, our project aims to empower the attendance recording process, offering enhanced accuracy and efficiency. In conclusion, our automated attendance system represents a significant step forward in attendance management, with the potential to transcend traditional methods and find application across various domains.",
    stack: [{ name: "Python"},{ name: "Face_Recognition"},{ name: "Face_Detection"},{ name: "Feature Extraction"},],
    image: "/assets/work/Attendify.png",
    live: "",
    github: "https://github.com/yazeedmshayekh2/Attendify/tree/main",
  },
  {
    num: "03",
    category: "Visualization Project",
    title: "project 3",
    description:
      "This dashboard displays average GPAs across various categories. It includes breakdowns by code module, age band, gender, region, and highest education level. Visualizations highlight GPA averages by region, gender distribution, and education qualifications. Additionally, it shows GPA comparisons for different final results (e.g., distinction, pass, fail) and allows filtering by these attributes to analyze trends in student performance.",
    stack: [{ name: "Tableau" }],
    image: "/assets/work/DB1.png",
    live: "https://public.tableau.com/app/profile/yazeed.mshayekh/viz/StudentPopulationAndGPAsDashboard/GPAsAverage",
    github: "",
  },
  {
    num: "04",
    category: "Visualization Project",
    title: "project 4",
    description:
      "This dashboard presents an overview of Simply Music's sales performance, showing key metrics like revenue, profit, and units sold over time. It highlights trends in revenue and profit, with notable spikes in mid-2018 and late 2019. The sales data is broken down by channel, with the Website and West Palm Beach contributing the most to total sales.",
    stack: [{ name: "Tableau" }],
    image: "/assets/work/DB2.png",
    live: "https://public.tableau.com/app/profile/yazeed.mshayekh/viz/SimplyMusicDashboard_17335744438420/BirdsEyeView",
    github: "",
  },
  {
    num: "05",
    category: "Visualization Project",
    title: "project 5",
    description:
      "This dashboard provides insights into the student population, with visualizations focused on various demographics. It shows the distribution of students by code module, highest education level, region, age band, final result, and gender. The data highlights the largest student groups in the \"CCC\" code module, the \"A Level or Equivalent\" category for previous education, and the \"0-35\" age band. The majority of students come from Scotland and the London region, with most students passing their courses. Filters allow for further customization based on gender, final result, code module, and region.",
    stack: [{ name: "Tableau" }],
    image: "/assets/work/DB3.png",
    live: "https://public.tableau.com/app/profile/yazeed.mshayekh/viz/StudentPopulationAndGPAsDashboard/GPAsAverage",
    github: "",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    // get current slide index
    const currentIndex = swiper.activeIndex;
    // update project state based on current slide index
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* project category */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} 
              </h2>
              {/* project description */}
              <p className="text-white/60">{project.description}</p>
              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {/* remove the last comma */}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                {project.live && (
                    <Link href={project.live}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                            <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Live project</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Link>
                  )}
                {/* github project button */}
                {project.github && (
                      <Link href={project.github}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                              <BsGithub className="text-white text-3xl group-hover:text-accent" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Github repository</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Link>
                    )}
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
