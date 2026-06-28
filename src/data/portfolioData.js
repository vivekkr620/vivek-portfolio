import resqAI from "../assets/project-images/resq-ai.png";
import stackMind from "../assets/project-images/stack-mind.png";
import wanderlust from "../assets/project-images/wanderlust.png";
import certificate from "../assets/pdf/CCT-internship.pdf";


export const homeData = {
  welcomeTag: "Hi there, i am ",
  name: "Vivek Kumar", 
  title: "I craft seamless web experiences.",
  subtitle:
    "I am a focused frontend developer specializing in building modern web applications. Currently, I love building responsive products using React 19 and clean utility-first styling.",
  ctaWork: "View My Work",
  ctaConnect: "Let's Connect",
};

export const aboutData = {
  subHeading:
    "Building web experiencecs with focus on design and optimization.",
  description:
    "I am a proactive Full-Stack developer who loves turning design challenges into clean, accessible, and high-performance user interfaces. I believe in writing well-structured code and utilizing utility-first configurations.",
  stats: [
    { label: "Experience", value: "3 Month Internship" },
    { label: "Projects Completed", value: "3" },
    { label: "Open Source Contributions" },
  ],
};

export const experiences = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "CloudCredits Technologies Pvt. Ltd.",
    location: "Jaipur, Rajasthan, India (Remote)",
    duration: "Jun 2025 - Sep 2025",

    points: [
      "Developed and optimized responsive web interfaces using HTML5, CSS3, and JavaScript, enhancing user experience across mobile and desktop platforms for 10,000+ users.",
      "Integrated RESTful APIs to facilitate seamless frontend-backend communication, improving data retrieval efficiency by 25%.",
      "Independently delivered assigned development tasks within strict 3-month remote internship deadlines.",
      "Maintained code quality and version control using Git and GitHub.",
      "Contributed to UI/UX design discussions."
    ],
    certificateUrl: certificate,
  },

  {
    id: 2,
    role: "2x SIH Internal Round Winner & Lead",
    company: "Smart India Hackathon (Jagannath University)",
    location: "Jaipur, India",
    duration: "2024 - 2025",

    points: [
      "Led cross-functional teams.",
      "Demonstrated frontend expertise."
    ],

    certificateUrl: null,
  },

  {
    id: 3,
    role: "Def-Space Intern",
    company: "Bharat Space Education Research Center",
    location: "New Delhi, India",
    duration: "June 2026 - July 2026",

    points: [
      "Selected for Def-Space Summer Internship 2026.",
      "Exploring Generative AI.",
      "Autonomous UAV Systems.",
      "Cyber Security.",
      "Military Intelligence."
    ],

    certificateUrl: null,
  }
];

export const projects = [
  {
    id: 1,
    title: "ResQ-AI",
    points: [
      "Engineered an autonomous multi-modal disaster management and intelligence platform tailored for tactical emergency mitigation in crisis zones.",
    ],
    tech: [
      "Next.js",
      "Node.js",
      "FastAPI",
      "PostgreSQL",
      "YOLOv8 / TensorFlow.js",
    ],
    github: "https://github.com/vivekkr620/ResQ-AI",
    live: "#",
    image: resqAI,
  },

  {
    id: 2,
    title: "StackMind",
    points: [
      "Designed and engineered a high-performance developer knowledge repository and collaborative technical ecosystem.",
    ],
    tech: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    github: "https://github.com/vivekkr620/StackMind",
    live: "#",
    image: stackMind,
  },

  {
    id: 3,
    title: "WanderLust",
    points: [
      "Architected a complete full-stack hotel listing discovery framework and property rental platform modeled on modern travel booking platforms.",
    ],
    tech: [
      "Express.js",
      "Node.js",
      "MongoDB",
      "Cloudinary",
      "EJS Layouts",
    ],
    github: "https://github.com/vivekkr620/WanderLust",
    live: "#",
    image: wanderlust,
  },
];

export const skillCategories = [
  {
    title: "Languages",
    skills: ["C++", "Java", "JavaScript (ES6+)", "Python" ]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React.js", "Node.js", "Express.js", "Tailwind CSS"]
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL", "MySQL"]  
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "REST APIs"]
  },
  {
    title: "AI / ML & Cloud",
    skills: ["Python for Data Science", "Azure Synapse SQL Pool"]
  }
]

export const educationData = {
  institution: "Jagannath University, Jaipur",
  degree: "Bachelor of Technology", 
  field: "Computer Science and Engineering", 
  timeline: "2023 - 2027", 
  location: "Jaipur, Rajasthan, India", 
  metrics: "SGPA: 7.23 / 10.00 (5th Semester)", 
  highlights: [
    "Focusing on Core Data Structures, Algorithms, Full-Stack Web Architecture, and Applied AI paradigms.",
    "Actively involved in technical hackathons and institutional R&D ecosystem implementations."
  ]
};

export const faqData = [
  {
    question: "What is your primary technical stack?",
    answer: "I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) along with Next.js, TypeScript, and Tailwind CSS. I am also highly comfortable with languages like Java (DSA), C++, and Python for data-driven backends."
  },
  {
    question: "Are you available for internships or freelance roles?",
    answer: "Yes, absolutely! I am looking for software engineering internships, open-source research collaborations, or frontend freelance contracts where I can optimize web systems and interface architectures."
  },
  {
    question: "How do you ensure clean, maintainable code structures?",
    answer: "I adhere to strict component modularization, single-responsibility principles, and utility-first formatting using tools like ESLint and Prettier. I prefer centralizing static content to decouple logic from design layouts."
  },
  {
    question: "Do you have experience working with cloud or intelligent systems?",
    answer: "Yes, I hold an Azure Synapse Serverless SQL Pool certification for cloud data analytics and have worked on specialized multi-modal disaster management concepts integrating image classification parameters."
  }
];

export const contactData = {
  title: "Get In Touch",
  subtitle: "I'm always open to discussing new ideas, internship or full-time opportunities, and exciting collaborations. Let's connect!",
  email: "vk431152@gmail.com", 
  phone: "+91-6205606989",       
  location: "Jaipur, Rajasthan, India",
  github: "https://github.com/vivekkr620",
  linkedin: "https://www.linkedin.com/in/vivek-kumar011/", 
  medium: "https://medium.com/@vk431152"
};