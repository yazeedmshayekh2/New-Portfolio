"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGithub,
  FaMicrosoft,
  FaFileExcel,
  FaFlask,
} from "react-icons/fa";

import { SiTailwindcss, SiNextdotjs, SiTensorflow, SiGit, SiMongodb, SiGooglecolab, SiTableau, SiStreamlit, SiR, SiPycharm, SiOpencv, SiHuggingface } from "react-icons/si";

// about data
const about = {
  title: "About me",
  description:
    "Fresh graduate in Data Science with a strong scientific foundation and technical expertise in machine learning, dedicated to transforming complex datasets into impactful AI-driven solutions. Equipped with skills in Python, TensorFlow, and deep learning frameworks, with a ability to apply data science techniques to drive measurable impacts.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Yazeed Mshayekh",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+962) 799 736 382",
    },
    {
      fieldName: "Experience",
      fieldValue: "2+ Years",
    },
    {
      fieldName: "Freelance | Full Time | Part Time",
      fieldValue: "Available",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Jordanian",
    },
    {
      fieldName: "Email",
      fieldValue: "yazeedmshayekh.work@gmail.com",
    },
    {
      fieldName: "Languages",
      fieldValue: "Arabic, English",
    },
  ],
};

// experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description:
    "My work, trainings, and internships experience",
  items: [
    {
      company: "Outlier AI",
      position: "Coding Specialist For LLM Training",
      duration: "November 2024 - Present",
    },
    {
      company: "Correlation One",
      position: "Data Analytics Training Program",
      duration: "October 2024 - Present",
    },
    {
      company: "Tahaluf Al Emarat LLC",
      position: "Data Science Training Program",
      duration: "September 2024 - Present",
    },
    {
      company: "SMSM for AI",
      position: "Natural Language Processing Internship",
      duration: "March 2024 - Jun 2024",
    },
    {
      company: "SHAI for AI",
      position: "Machine Learning Training",
      duration: "January 2023 - May 2023",
    },
  ],
};

// education data
const education = {
  icon: "/assets/resume/cap.svg",
  title: "My education",
  description:
    "My academic, courses, and certifications",
  items: [
    {
      institution: "University of Jordan",
      degree: "Bachelor’s Degree in Data Science",
      duration: "Oct 2020 - Jun 2024",
    },
    {
      institution: "DeepLearning.AI",
      degree: "Mathematics For Machine Learning Specialization",
      duration: "Nov 2024",
    },
    {
      institution: "DeepLearning.AI",
      degree: "TensorFlow Professional Certification",
      duration: "Sep 2024",
    },
    {
      institution: "DeepLearning.AI and Stanford University",
      degree: "Deep Learning Specialization",
      duration: "Feb 2024",
    },
    {
      institution: "DeepLearning.AI",
      degree: "Machine Learning Specialization",
      duration: "Jan 2024",
    },
    {
      institution: "DeepLearning.AI",
      degree: "LangChain: Chat with Your Data Short Course",
      duration: "Mar 2024",
    },
    {
      institution: "DeepLearning.AI",
      degree: "LangChain for LLM Application Development Short Course",
      duration: "Apr 2024",
    },
  ],
};

// skills data
const skills = {
  title: "My skills",
  description:
    "",
  skillList: [
    {
      icon: <FaPython />,
      name: "python",
    },
    {
      icon: <FaDocker />,
      name: "Docker",
    },
    {
      icon: <SiTensorflow />,
      name: "Tensorflow",
    },
    {
      icon: <SiGit />,
      name: "Git",
    },
    {
      icon: <FaGithub />,
      name: "Github",
    },
    {
      icon: <SiMongodb />,
      name: "Mongodb",
    },
    {
      icon: <SiGooglecolab />,
      name: "Googlecolab",
    },
    {
      icon: <PiMicrosoftExcelLogo />,
      name: "MicrosoftExcel",
    },{
      icon: <SiTableau />,
      name: "Tableau",
    },
    {
      icon: <FaFlask />,
      name: "Flask",
    },
    {
      icon: <SiStreamlit />,
      name: "Streamlit",
    },
    {
      icon: <SiR />,
      name: "R",
    },
    {
      icon: <SiPycharm />,
      name: "Pycharm",
    },
    { 
      icon: <SiOpencv />,
      name: "Opencv",
    },
    {
      icon: <SiHuggingface />,
      name: "Huggingface transformers",
    },
    {
      icon: <PiNotionLogo />,
      name: "Notion",
    }
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { PiMicrosoftExcelLogo, PiNotionLogo } from "react-icons/pi";

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[225px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[225px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {skills.skillList.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>

            {/* about */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-center xl:justify-start gap-4"
                      >
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
