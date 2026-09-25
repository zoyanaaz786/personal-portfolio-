// ============================================================================
// CENTRAL CONFIG FILE
// Edit everything about the portfolio's content from this single file.
// Replace every [PLACEHOLDER] value below with your real information.
// ============================================================================

export const personalData = {
  name: 'Zoyanaaz Maldar',
  title: 'Computer Science Engineering Student | Software Developer',
  rotatingRoles: [
    'Software Development',
    'Web Development',
    'Python Development',
    'Backend Development',
    'AI/ML'
  ],
  tagline:
    'Computer Science Engineering student passionate about building practical software solutions using modern web technologies, Python, backend technologies, and AI/ML.',
  availability: 'Open to Internship & Entry-Level Opportunities',
  location: 'Bengaluru, Karnataka, India',
  about: {
    intro:
      "I'm a Computer Science Engineering student interested in building practical software solutions that solve real problems. I enjoy working across the stack — from designing interfaces to building APIs and experimenting with AI/ML — and I learn best by shipping projects end to end.",
    focusAreas: [
      'Software Engineering',
      'Web Development',
      'Python',
      'Backend Development',
      'SQL',
      'Artificial Intelligence',
      'Machine Learning',
      'RAG',
      'LLM Applications'
    ],
    cards: [
      { label: 'Education', value: 'B.E. Computer Science Engineering' },
      { label: 'Focus', value: 'Software Development' },
      { label: 'Interests', value: 'Web Development • Python • AI/ML' },
      { label: 'Status', value: 'Open to Opportunities' }
    ]
  }
}

export const contactInfo = {
  email: 'zoyanaazm2407@gmail.com',
  phone: '9449392763',
  github: 'https://github.com/zoyanaaz786',
  linkedin: 'https://linkedin.com/in/zoyanaaz14'
}

export const resumePath = '/resume.pdf' // Replace /public/resume.pdf with your real resume

export const skillCategories = [
  {
    category: 'Programming',
    skills: ['Python', 'JavaScript', 'SQL']
  },
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Web Design']
  },
  {
    category: 'Backend',
    skills: ['FastAPI', 'REST APIs']
  },
  {
    category: 'AI / ML',
    skills: ['Machine Learning', 'RAG', 'LLM Applications', 'Data Processing']
  },
  {
    category: 'Database',
    skills: ['SQL', 'MySQL']
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code']
  },
  {
    category: 'Other',
    skills: ['CS Core Subjects']
  }
]

export const currentlyLearning = [
  'Advanced React',
  'Python Development',
  'Machine Learning',
  'RAG',
  'LLM Applications',
  'FastAPI',
  'SQL',
  'Data Structures & Algorithms',
  'Backend Development'
]

export const whatICanBuild = [
  {
    title: 'Software Development',
    description:
      'Practical applications using programming, APIs, databases, and problem-solving.'
  },
  {
    title: 'Web Applications',
    description:
      'Responsive and interactive web applications using modern frontend technologies.'
  },
  {
    title: 'Python Applications',
    description:
      'Python-based applications, automation, APIs, and data processing.'
  },
  {
    title: 'AI/ML Applications',
    description:
      'Machine learning, RAG, LLM-based applications, and intelligent recommendation systems.'
  }
]

export const projects = [
  {
    id: 'rank2career',
    name: 'Rank2Career',
    category: 'AI/ML',
    tags: ['AI/ML', 'Python', 'Backend'],
    featured: true,
    status: 'Completed',
    screenshots: [],
    tagline: 'AI-Powered College, Course & Counselling Decision Platform',
    description:
      'An AI-powered education decision platform that analyzes KCET/NEET rank, category, eligibility, historical cutoff data, and student preferences to recommend suitable colleges and courses.',
    problem:
      'Students navigating KCET/NEET counselling face a confusing mix of cutoff data, eligibility rules, and preferences spread across many sources, making it hard to shortlist realistic college and course options.',
    solution:
      'Rank2Career centralizes rank, category, and preference data with historical cutoff analysis and an AI counselling assistant to generate a personalized, classified choice list.',
    myWork:
      'Designed the recommendation logic, built the backend with FastAPI and Python, integrated RAG-based retrieval for counselling queries, and implemented the classification and cutoff-trend analysis.',
    features: [
      'Rank-based college recommendation',
      'Course and college matching',
      'Category filtering',
      'Budget preferences',
      'Location preferences',
      'SAFE / TARGET / DREAM classification',
      'Historical cutoff analysis',
      'Multi-year cutoff trends',
      'Cutoff volatility analysis',
      'Admission prediction',
      'AI counselling assistant',
      'Personalized counselling choice-list generation',
      'College comparison',
      'RAG-based information retrieval'
    ],
    technologies: ['Python', 'FastAPI', 'Machine Learning', 'RAG', 'LLM', 'HTML', 'CSS', 'JavaScript'],
    github: '[YOUR GITHUB URL]',
    liveDemo: '[YOUR LIVE DEMO URL]'
  },
  {
    id: 'cognibridge',
    name: 'CogniBridge',
    category: 'Web',
    tags: ['Web', 'Backend'],
    featured: false,
    status: 'Completed',
    screenshots: [],
    tagline: 'Mentor-Mentee Matching Platform',
    description:
      'A platform designed to connect students with suitable mentors based on academic interests, career goals, skills, and preferences.',
    problem:
      'Students often struggle to find mentors whose experience and interests genuinely align with their own academic and career goals.',
    solution:
      'CogniBridge matches students to mentors using shared academic interests, career goals, skills, and stated preferences.',
    myWork:
      'Built the matching logic and the core web interface for browsing and connecting with mentors.',
    features: [
      'Interest and goal-based matching',
      'Mentor and mentee profiles',
      'Preference-based filtering',
      'Personalized Learning & Progress Tracking',
      'Resume Analysis & Skill Extraction',
      'Job Recommendations & Referrals',
      'AI Career Chatbot',
      'RAG-Based Personalized Career Guidance'
    ],
    technologies: ['Python', 'JavaScript', 'SQL'],
    github: '[YOUR GITHUB URL]',
    liveDemo: '[YOUR LIVE DEMO URL]'
  },
  {
    id: 'personal-portfolio',
    name: 'Personal Developer Portfolio Website',
    category: 'Web',
    tags: ['Web'],
    featured: false,
    status: 'Completed',
    screenshots: [],
    tagline: 'This website',
    description:
      'A responsive personal portfolio website designed to showcase technical skills, projects, certifications, education, and professional information.',
    problem:
      'Recruiters needed a single, fast, well-organized place to evaluate my technical skills and project work.',
    solution:
      'A React-based portfolio with clean architecture, dark/light mode, and a centralized data layer for easy updates.',
    myWork:
      'Designed and built the entire site: component architecture, theming, animations, and content structure.',
    features: [
      'Dark / light mode',
      'Project filtering',
      'Responsive design',
      'Centralized content management'
    ],
    technologies: ['HTML', 'CSS', 'React'],
    github: '[YOUR GITHUB URL]',
    liveDemo: '[YOUR LIVE DEMO URL]'
  },
  {
    id: 'blockchain-transactions',
    name: 'Blockchain-Based Secure Transaction System',
    category: 'Other',
    tags: ['Other'],
    featured: false,
    status: 'Completed',
    screenshots: [],
    tagline: 'Secure, tamper-resistant digital transactions',
    description:
      'A project demonstrating blockchain concepts for secure and tamper-resistant digital transactions.',
    problem:
      'Digital transaction records can be vulnerable to tampering without a verifiable, distributed structure.',
    solution:
      'Implements core blockchain concepts — hashing, chained blocks, and validation — to demonstrate tamper-resistant transaction records.',
    myWork:
      'Implemented the core blockchain data structure and transaction validation logic.',
    features: ['Block chaining', 'Transaction validation', 'Tamper-resistance demonstration'],
    technologies: ['Python'],
    github: '[YOUR GITHUB URL]',
    liveDemo: '[YOUR LIVE DEMO URL]'
  }
]

export const certifications = [
  {
    name: 'Python',
    issuer: 'Infosys Springboard',
    date: '',
    url: 'https://personal-portfolio-two-indol-48.vercel.app/certificates/python.pdf'
  },
  {
    name: 'Generative AI',
    issuer: 'Simplilearn',
    date: '',
    url: 'https://github.com/zoyanaaz786/personal-portfolio-/blob/main/public/certificates/Generative-AI.pdf'
  },
  {
    name: 'Machine Learning & Data Analytics',
    issuer: 'Infosys Springboard',
    date: '',
    url: 'https://github.com/zoyanaaz786/personal-portfolio-/blob/main/public/certificates/ML%20%26%20Data%20Analytics.pdf'
  }
]

export const education = {
  timeline: [
    {
      level: 'B.E. Computer Science Engineering',
      institution: 'Brindavan College of Engineering',
      duration: '2023–2027',
      location: 'Bengaluru, Karnataka, India',
      scoreLabel: 'CGPA',
      score: '8.76'
    },
    {
      level: '12th / Pre-University',
      institution: 'Poorna Prajna College',
      duration: '2022-2023',
      location: 'Rabkavi Banahatti',
      scoreLabel: 'Percentage',
      score: '89.66'
    },
    {
      level: '10th / SSLC',
      institution: 'SRA High School',
      duration: '2021',
      location: 'Banahatti',
      scoreLabel: 'Percentage',
      score: '90.72'
    }
  ]
}

export const socialLinks = {
  github: contactInfo.github,
  linkedin: contactInfo.linkedin,
  email: contactInfo.email
}
