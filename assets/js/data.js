/*
  SITE CONTENT: edit this file to update the website.
  Every page reads from here, so you never need to touch the HTML.

  Entries marked `placeholder: true` show a dashed "placeholder" badge on the
  site. Replace their text with your own and delete the `placeholder` line.
*/

window.SITE = {
  person: {
    name: "Parvin Emami",
    role: "PhD researcher · University of Luxembourg",
    email: "parvin.emami@uni.lu",
    statement: "Understanding people. Building systems that adapt.",
    intro:
      "I work at the intersection of machine learning and human–computer interaction, studying how we look, think, and interact, and how intelligent systems can respond.",
    now: "PhD in the COIN team",
    links: [
      { label: "Google Scholar", icon: "scholar", url: "https://scholar.google.com/citations?hl=en&user=SHUgxekAAAAJ" },
      { label: "GitHub", icon: "github", url: "https://github.com/prviin" },
      { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/parvin-emami-207001144/" },
      { label: "X (Twitter)", icon: "x", url: "https://x.com/ParvinEmami" },
    ],
    interests: [
      { label: "Eye tracking", page: "projects.html#workload" },
      { label: "Visual attention", page: "projects.html#scanpaths" },
      { label: "Reinforcement learning", page: "projects.html#continual-rl" },
      { label: "Adaptive interfaces", page: "projects.html#adaptive-ui" },
      { label: "Affective computing", page: "projects.html#green-spaces" },
    ],
  },

  // Newest first. `date` is shown as written ("2026", "Oct 2026", ...).
  news: [
    { date: "2026", tag: "Workshop", text: "<em>Is Forgetting Always Bad? Revisiting Replay in Continual Offline RL</em> will appear at WiML @ NeurIPS 2026.", weight: 2 },
    { date: "2026", tag: "Journal", text: "<em>PERCEIV</em>, a multimodal physiological dataset of visual encodings for adaptive InfoVis interfaces, published in IEEE TVCG.", link: "https://doi.org/10.1109/TVCG.2026.3721212", weight: 3 },
    { date: "2026", tag: "Paper", text: "<em>Evaluating Real-Time Adaptive Interfaces through EEG-derived and Self-reported Mental Workload Indicators</em> at EICS 2026.", link: "https://doi.org/10.1145/3807968.3810932", weight: 2 },
    { date: "2026", tag: "Journal", text: "<em>Evaluating the Sensitivity of Dry and Gel-Based Wearable EEG for Cognitive Load Estimation</em> published in Biomedical Physics &amp; Engineering Express.", link: "https://doi.org/10.1088/2057-1976/ae6d00", weight: 2 },
    { date: "2026", tag: "Paper", text: "<em>Pixels, Plants, and People</em>, an affective evaluation of urban green spaces, published at CHI 2026.", link: "https://dl.acm.org/doi/full/10.1145/3772318.3791826", weight: 3 },
    { date: "2026", tag: "Teaching", text: "Teaching assistant for Human–Computer Interaction at the University of Luxembourg.", weight: 1 },
    { date: "2025", tag: "Paper", text: "<em>Context-Aware Adaptive Visualizations for Critical Decision Making</em> at ECAI 2025.", link: "https://doi.org/10.3233/FAIA251433", weight: 2 },
    { date: "2025", tag: "Visit", text: "Visiting researcher in Prof. Andreas Bulling's <a href=\"https://www.collaborative-ai.org\">Collaborative AI team</a>, University of Stuttgart.", weight: 2 },
    { date: "2025", tag: "Paper", text: "<em>A Comparative Study of Scanpath Models in Graph-Based Visualization</em> at ETRA 2025.", link: "https://dl.acm.org/doi/full/10.1145/3715669.3725882", weight: 2 },
    { date: "2024", tag: "Visit", text: "Visiting researcher in Prof. Antti Oulasvirta's <a href=\"https://cbl.aalto.fi\">Computational Behavior Lab</a>, Aalto University.", weight: 2 },
    { date: "2024", tag: "Paper", text: "<em>Impact of Design Decisions in Scanpath Modeling</em> published at ETRA 2024.", link: "https://dl.acm.org/doi/abs/10.1145/3655602", weight: 3 },
    { date: "2023", tag: "Milestone", text: "Started my PhD in the COIN team at the University of Luxembourg, as part of the <a href=\"https://symbiotik-infovis.eu\">SYMBIOTIK project</a>.", weight: 3 },
    { date: "2022", tag: "Milestone", text: "Graduated M.Sc. in Control Engineering, ranked first in my cohort.", weight: 2 },
  ],

  // `topics` drive the filter chips on the Publications page and link papers to projects.
  publications: [
    {
      year: 2026, venue: "IEEE TVCG",
      title: "PERCEIV: A Multimodal Physiological Dataset of Visual Encodings for Adaptive InfoVis Interfaces",
      authors: ["Sebastian Idesis", "Mireia Masias Bruns", "Angela Lopez-Cardona", "Parvin Emami", "Saravanakumar Duraisamy", "Luis A. Leiva", "Ioannis Arapakis"],
      url: "https://doi.org/10.1109/TVCG.2026.3721212",
      topics: ["Cognitive workload", "Visualization"], project: "workload", selected: true,
    },
    {
      year: 2026, venue: "PACM HCI (EICS)",
      title: "Evaluating Real-Time Adaptive Interfaces through EEG-derived and Self-reported Mental Workload Indicators",
      authors: ["Nuwan T. Attygalle", "Saravanakumar Duraisamy", "Parvin Emami", "Jean Vanderdonckt", "Luis A. Leiva"],
      topics: ["Cognitive workload", "Adaptive interfaces"], project: "adaptive-ui",
    },
    {
      year: 2026, venue: "EICS 2026 Companion",
      title: "Evaluating Real-Time Adaptive Interfaces through EEG-derived and Self-reported Mental Workload Indicators",
      authors: ["Saravanakumar Duraisamy", "Nuwan T. Attygalle", "Parvin Emami", "Jean Vanderdonckt", "Luis A. Leiva"],
      url: "https://doi.org/10.1145/3807968.3810932",
      topics: ["Cognitive workload", "Adaptive interfaces"], project: "adaptive-ui",
    },
    {
      year: 2026, venue: "Biomed. Phys. Eng. Express",
      title: "Evaluating the Sensitivity of Dry and Gel-Based Wearable EEG for Cognitive Load Estimation",
      authors: ["Sebastian Idesis", "Mireia Masias Bruns", "Parvin Emami", "Saravanakumar Duraisamy", "Luis A. Leiva", "Ioannis Arapakis"],
      url: "https://doi.org/10.1088/2057-1976/ae6d00",
      topics: ["Cognitive workload"], project: "workload",
    },
    {
      year: 2026, venue: "CHI 2026",
      title: "Pixels, Plants, and People: Affective Evaluation of Urban Green Spaces",
      authors: ["Kayhan Latifzadeh", "Parvin Emami", "Fariba Emami", "Saravanakumar Duraisamy", "Luis A. Leiva"],
      url: "https://dl.acm.org/doi/full/10.1145/3772318.3791826",
      topics: ["Affective computing"], project: "green-spaces", selected: true,
    },
    {
      year: 2025, venue: "ECAI 2025",
      title: "Context-Aware Adaptive Visualizations for Critical Decision Making",
      authors: ["Angela Lopez-Cardona", "Mireia Masias Bruns", "Nuwan T. Attygalle", "Sebastian Idesis", "Matteo Salvatori", "Konstantinos Raftopoulos", "Konstantinos Oikonomou", "Saravanakumar Duraisamy", "Parvin Emami", "Nacera Latreche", "Alaa Eddine Anis Sahraoui", "Michalis Vakalellis", "Jean Vanderdonckt", "Ioannis Arapakis", "Luis A. Leiva"],
      url: "https://doi.org/10.3233/FAIA251433",
      topics: ["Adaptive interfaces", "Visualization"], project: "adaptive-ui",
    },
    {
      year: 2025, venue: "ETRA 2025",
      title: "A Comparative Study of Scanpath Models in Graph-Based Visualization",
      authors: ["Angela Lopez-Cardona", "Parvin Emami", "Sebastian Idesis", "Saravanakumar Duraisamy", "Luis A. Leiva", "Ioannis Arapakis"],
      url: "https://dl.acm.org/doi/full/10.1145/3715669.3725882",
      topics: ["Visual attention", "Visualization"], project: "scanpaths", selected: true,
    },
    {
      year: 2024, venue: "PACM HCI (ETRA)",
      title: "Impact of Design Decisions in Scanpath Modeling",
      authors: ["Parvin Emami", "Yue Jiang", "Zixin Guo", "Luis A. Leiva"],
      url: "https://dl.acm.org/doi/abs/10.1145/3655602",
      topics: ["Visual attention"], project: "scanpaths", selected: true,
    },
    {
      year: 2022, venue: "Wind Engineering",
      title: "Predicting Wind Power Generation Using Machine Learning and CNN-LSTM Approaches",
      authors: ["Seyed Matin Malakouti", "Amir Rikhtehgar Ghiasi", "Amir Aminzadeh Ghavifekr", "Parvin Emami"],
      url: "https://doi.org/10.1177/0309524X221113013",
      topics: ["Machine learning"],
    },
    {
      year: 2022, venue: "IEEE ICCIA 2022",
      title: "Survey of Multi-Agent Reinforcement Learning to Solve Inverse Kinematic Problems of Redundant Robotic Manipulators",
      authors: ["Parvin Emami", "Amir Rikhtehgar Ghiasi", "Amir Aminzadeh Ghavifekr"],
      url: "https://ieeexplore.ieee.org/abstract/document/9737188",
      topics: ["Reinforcement learning", "Robotics"],
    },
  ],

  manuscripts: [
    { status: "Under review", title: "When to Adapt and What to Adapt in Real-time Adaptive User Interfaces?", topics: ["Adaptive interfaces"] },
    { status: "WiML @ NeurIPS 2026", title: "Is Forgetting Always Bad? Revisiting Replay in Continual Offline RL", topics: ["Reinforcement learning"] },
  ],

  projects: [
    {
      id: "workload", tag: "Eye tracking + EEG", color: "plum",
      question: "What can our signals tell us?",
      title: "Multimodal cognitive workload modeling",
      summary: "Modeling cognitive workload from eye movements and EEG. Comparing handcrafted features with pretrained representations across different observation windows.",
      methods: ["Eye tracking", "EEG", "Pretrained encoders", "Time-series"],
      status: "Ongoing",
    },
    {
      id: "scanpaths", tag: "Visual attention", color: "sky",
      question: "Where do we look next?",
      title: "Scanpath prediction & evaluation",
      summary: "Predicting scanpaths and examining how similarity metrics capture human-like visual behavior across interfaces, natural images, and tasks.",
      methods: ["Deep learning", "Scanpath metrics", "Saliency", "GUIs & visualizations"],
      status: "Ongoing",
    },
    {
      id: "continual-rl", tag: "Reinforcement learning", color: "sage",
      question: "When should a system remember, or adapt?",
      title: "Continual offline reinforcement learning",
      summary: "Investigating replay in continual offline reinforcement learning, and how learning changes as the quality of available data improves or degrades.",
      methods: ["Offline RL", "Continual learning", "Replay"],
      status: "Ongoing",
    },
    {
      id: "adaptive-ui", tag: "Adaptive interfaces", color: "sand",
      question: "When, and what, should an interface adapt?",
      title: "Real-time adaptive user interfaces",
      summary: "Studying the timing and content of adaptations in user interfaces that respond to their users in real time.",
      methods: ["HCI", "User modeling", "Decision making"],
      status: "Under review",
    },
    {
      id: "green-spaces", tag: "Affective computing", color: "sage",
      question: "How do places make us feel?",
      title: "Affective evaluation of urban green spaces",
      summary: "A CHI 2026 collaboration on evaluating people's affective responses to urban green spaces from images.",
      methods: ["Affective computing", "User studies"],
      status: "Published · CHI 2026",
    },
  ],

  teaching: {
    courses: [
      { title: "Human–Computer Interaction", role: "Teaching assistant", place: "University of Luxembourg", years: "2024 · 2026" },
      { title: "Deep Learning", role: "Teaching assistant", place: "University of Luxembourg", years: "2024 · 2025" },
    ],
    supervisionIntro:
      "I supervise Bachelor's and Master's projects, supporting students with experimental design, implementation, and quantitative evaluation.",
    topics: ["Reinforcement learning", "Computer vision", "Scanpath prediction", "Robotics", "LLM-based workload estimation"],
    students: [
      { name: "Student name", level: "M.Sc.", year: "2025", project: "Project title, replace me", placeholder: true },
      { name: "Student name", level: "B.Sc.", year: "2024", project: "Project title, replace me", placeholder: true },
    ],
  },

  // Books on the shelf. `status`: "reading" | "read" | "favorite".
  books: [
    { title: "A book I'm reading now", author: "Author name", status: "reading", note: "One line on why it matters to you.", placeholder: true },
    { title: "A research book I recommend", author: "Author name", status: "favorite", note: "Who should read it and why.", placeholder: true },
    { title: "A novel I loved", author: "Author name", status: "favorite", note: "", placeholder: true },
    { title: "A Persian classic", author: "Author name", status: "read", note: "", placeholder: true },
    { title: "Something on cognition", author: "Author name", status: "read", note: "", placeholder: true },
    { title: "Something on ML", author: "Author name", status: "read", note: "", placeholder: true },
  ],

  activities: {
    visits: [
      { years: "2025", title: "Visiting Researcher", place: "University of Stuttgart · Germany", detail: "Prof. Andreas Bulling · Collaborative AI team" },
      { years: "2024", title: "Visiting Researcher", place: "Aalto University · Finland", detail: "Prof. Antti Oulasvirta · Computational Behavior Lab" },
    ],
    talks: [
      { date: "Year", title: "Talk or poster title", venue: "Venue / event", placeholder: true },
    ],
    service: [
      { role: "Reviewer", venue: "Conference or journal name", placeholder: true },
    ],
    recognition: [
      "Ranked first among graduating Control Engineering students, University of Tabriz.",
      "Member of Iran's National Elites Foundation.",
    ],
    languages: [
      { name: "Persian", level: "Native", value: 5 },
      { name: "Azerbaijani Turkish", level: "Bilingual", value: 5 },
      { name: "English", level: "Professional", value: 4 },
      { name: "French", level: "A1", value: 1 },
    ],
    hobbies: [
      { label: "Hobby or interest", note: "A sentence about it.", placeholder: true },
      { label: "Another one", note: "Photos, links, anything you like.", placeholder: true },
    ],
  },

  cv: {
    // Add your PDF at this path to enable the download button.
    pdf: "assets/parvin-emami-cv.pdf",
    appointments: [
      { years: "2023–Present", title: "PhD Researcher", place: "University of Luxembourg · Luxembourg", detail: "Prof. Luis Leiva · COIN / SYMBIOTIK" },
      { years: "2025", title: "Visiting Researcher", place: "University of Stuttgart · Germany", detail: "Prof. Andreas Bulling · CAI team" },
      { years: "2024", title: "Visiting Researcher", place: "Aalto University · Finland", detail: "Prof. Antti Oulasvirta · CBL team" },
      { years: "2021–2023", title: "Research Assistant", place: "University of Tabriz · Iran", detail: "Dr. Amir Rikhtehgar Ghiasi · Robotics Lab" },
    ],
    education: [
      { years: "2023–Present", title: "PhD · University of Luxembourg", place: "Machine learning and reinforcement learning for adaptive interactive systems, eye tracking, and EEG." },
      { years: "2020–2022", title: "M.Sc. Control Engineering", place: "University of Tabriz · GPA 19.11/20", detail: "Multi-agent deep reinforcement learning for redundant robot control in task-space." },
      { years: "2016–2020", title: "B.Sc. Electrical Engineering", place: "University of Tabriz · GPA 17.02/20", detail: "Final project: vehicle number plate detection using Python." },
    ],
  },
};
