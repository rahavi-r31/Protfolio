import React, { useState, useEffect, useRef } from 'react';

// Falling Autumn Leaves Component
const FallingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  
  useEffect(() => {
    const leafTypes = ['🍂', '🍁', '🍃', '🍂', '🍁'];
    const newLeaves = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      emoji: leafTypes[Math.floor(Math.random() * leafTypes.length)],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 18,
      size: 16 + Math.random() * 24,
      swayDuration: 3 + Math.random() * 4,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          style={{
            position: 'absolute',
            left: `${leaf.left}%`,
            top: '-50px',
            fontSize: leaf.size,
            animation: `fall ${leaf.duration}s linear infinite, sway ${leaf.swayDuration}s ease-in-out infinite`,
            animationDelay: `${leaf.delay}s`,
            opacity: 0.7,
          }}
        >
          {leaf.emoji}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
        @keyframes sway {
          0%, 100% { margin-left: 0px; }
          50% { margin-left: 50px; }
        }
      `}</style>
    </div>
  );
};

// Animated Branch Decoration
const BranchDecoration = ({ side }) => (
  <svg 
    width="200" 
    height="400" 
    viewBox="0 0 200 400" 
    style={{ 
      position: 'absolute',
      [side]: 0,
      top: '10%',
      opacity: 0.15,
      transform: side === 'right' ? 'scaleX(-1)' : 'none',
    }}
  >
    <path 
      d="M0 0 Q50 100 30 200 Q10 300 40 400" 
      fill="none" 
      stroke="#4b5b34" 
      strokeWidth="8"
    />
    <circle cx="45" cy="80" r="15" fill="#af5031"/>
    <circle cx="25" cy="150" r="12" fill="#Ea8913"/>
    <circle cx="50" cy="220" r="18" fill="#980204"/>
    <circle cx="30" cy="300" r="14" fill="#af5031"/>
    <circle cx="55" cy="360" r="10" fill="#Ea8913"/>
  </svg>
);

// Horizontal Scroll Section for Skills
const SkillsMarquee = ({ skills }) => {
  return (
    <div style={{
      overflow: 'hidden',
      background: '#092f33',
      padding: '25px 0',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        animation: 'marquee 30s linear infinite',
        width: 'max-content',
      }}>
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <span key={i} style={{
            padding: '0 50px',
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.1rem',
            color: '#e4cba9',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '50px',
          }}>
            {skill}
            <span style={{ color: '#af5031' }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

// Bento Grid Card Component
const BentoCard = ({ children, span = 1, rowSpan = 1, color = '#fff', hoverColor = '#092f33', style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDarkBg = style.background === '#4b5b34' || style.background === '#092f33';
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        gridColumn: `span ${span}`,
        gridRow: `span ${rowSpan}`,
        background: isHovered ? hoverColor : (style.background || color),
        borderRadius: '24px',
        padding: '30px',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        cursor: 'default',
        overflow: 'hidden',
        position: 'relative',
        ...style,
        background: isHovered ? hoverColor : (style.background || color),
      }}
    >
      <div style={{
        transition: 'all 0.5s ease',
        filter: (isDarkBg || style.background === '#980204' || style.background === '#af5031') ? 'none' : (isHovered ? 'invert(1)' : 'invert(0)'),
        color: isHovered && isDarkBg ? '#fff' : undefined,
      }}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && isHovered && isDarkBg) {
            return React.cloneElement(child, {
              style: { ...child.props.style, color: '#fff' }
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

// Timeline Dot
const TimelineDot = ({ active }) => (
  <div style={{
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: active ? '#980204' : '#e4cba9',
    border: '3px solid #092f33',
    transition: 'all 0.3s ease',
    flexShrink: 0,
  }} />
);

// Project Showcase Card
const ProjectShowcase = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;
  
  const TitleComponent = project.link ? 'a' : 'h3';
  const titleProps = project.link ? {
    href: project.link,
    target: '_blank',
    rel: 'noopener noreferrer',
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '2rem',
      fontWeight: '700',
      color: isEven ? '#e4cba9' : '#092f33',
      marginBottom: '20px',
      lineHeight: '1.2',
      textDecoration: 'none',
      display: 'block',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
    },
    onMouseEnter: (e) => { e.target.style.color = isEven ? '#7fc7cc' : '#980204'; },
    onMouseLeave: (e) => { e.target.style.color = isEven ? '#e4cba9' : '#092f33'; },
  } : {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '2rem',
      fontWeight: '700',
      color: isEven ? '#e4cba9' : '#092f33',
      marginBottom: '20px',
      lineHeight: '1.2',
    }
  };
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
        gap: '0',
        marginBottom: '100px',
        background: '#fff',
        borderRadius: '30px',
        overflow: 'hidden',
        boxShadow: isHovered ? '0 30px 60px rgba(9, 47, 51, 0.3)' : '0 10px 40px rgba(9, 47, 51, 0.1)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
      }}
    >
      <div style={{
        order: isEven ? 1 : 2,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px',
      }}>
        <img 
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        {project.status && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: '#980204',
            color: '#fff',
            padding: '8px 20px',
            borderRadius: '20px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            {project.status}
          </div>
        )}
      </div>
      
      <div style={{
        order: isEven ? 2 : 1,
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: isEven ? '#092f33' : '#e4cba9',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.8rem',
          color: isEven ? '#7fc7cc' : '#af5031',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '15px',
        }}>
          Project 0{index + 1}
        </span>
        <TitleComponent {...titleProps}>
          {project.title}
          {project.link && <span style={{ marginLeft: '10px', fontSize: '1rem' }}>↗</span>}
        </TitleComponent>
        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: '1.1rem',
          color: isEven ? '#7fc7cc' : '#4b5b34',
          lineHeight: '1.8',
          marginBottom: '20px',
        }}>
          {project.description}
        </p>
        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: '1rem',
          color: isEven ? '#fdaba5' : '#980204',
          fontStyle: 'italic',
          marginBottom: '25px',
        }}>
          {project.relevance}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {project.tags.map((tag, i) => (
            <span key={i} style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              background: isEven ? 'rgba(228, 203, 169, 0.2)' : 'rgba(9, 47, 51, 0.1)',
              color: isEven ? '#e4cba9' : '#092f33',
              border: `1px solid ${isEven ? 'rgba(228, 203, 169, 0.3)' : 'rgba(9, 47, 51, 0.2)'}`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Component
export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['home', 'about', 'experience', 'projects', 'education', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveNav(section);
            break;
          }
        }
      }
    };
    
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const skills = [
    'Python', 'SQL', 'React', 'Machine Learning', 'Deep Learning', 
    'Tableau', 'ARIMA', 'CatBoost', 'LSTM', 'pandas', 'Data Analysis',
    'Demand Forecasting', 'Customer Segmentation', 'Flask'
  ];

  const projects = [
    {
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      title: 'Agricultural Price Prediction System',
      description: 'Developed a hybrid DIA-LSTM + GRU deep learning model achieving 93% accuracy for weather-influenced commodity price prediction. Enabled data-driven inventory planning and risk analysis.',
      relevance: 'Directly applicable to supply chain demand forecasting and inventory optimization.',
      tags: ['Python', 'TensorFlow', 'LSTM', 'Deep Learning'],
      link: 'https://github.com/rahavi-r31/Price-prediction-for-agri-commodities-',
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      title: 'Service Analytics for Maruti Suzuki',
      description: 'Analyzed 1 year of service center data (20,000+ records) tracking vehicle operations. Identified turnaround time bottlenecks and improved efficiency by 3%.',
      relevance: 'Operational efficiency analysis — applicable to manufacturing floor optimization.',
      tags: ['Data Analysis', 'Tableau', 'Python', 'Operations'],
      link: null,
    },
    {
      image: 'https://i.pinimg.com/1200x/a1/31/3f/a1313f0b881ed05d2aee4ec1e75d3832.jpg',
      title: 'Mutual Fund Portfolio Analyzer',
      description: 'Building a full-stack app that simplifies mutual fund tracking — consolidating scattered data into one clear report. Uses Gemini AI for personalized recommendations.',
      relevance: 'Translating complex data into actionable insights for non-technical stakeholders.',
      tags: ['React', 'Python', 'Gemini API', 'Full Stack'],
      status: 'In Progress',
      link: 'https://mf-protfolio-analyser.vercel.app/',
    },
  ];

  const experiences = [
    {
      date: 'May 2025 - Present',
      title: 'Data Analytics Intern',
      company: 'Exporter.AI, Chennai',
      points: [
        'Analyzed 5+ years of export-import transaction data',
        'Developed Margin-Market Matrix for customer segmentation',
        'Built predictive models (ARIMA, CatBoost) for forecasting',
        'Created interactive Tableau & Python dashboards',
      ],
    },
    {
      date: 'June 2025 - Present',
      title: 'Web Development Projects',
      company: 'IIT Madras Diploma in Programming',
      points: [
        'Built full-stack web applications using Python Flask framework',
        'Developed interactive frontends with JavaScript and modern ES6+ features',
        'Created RESTful APIs and integrated with SQL databases',
        'Implemented user authentication, session management, and CRUD operations',
      ],
    },
  ];

  const education = [
    { date: 'June 2025 - Present', title: 'Diploma in Programming', org: 'IIT Madras', detail: 'CGPA: 7.23', relevance: 'Python, data structures, algorithmic thinking' },
    { date: 'Dec 2025 - Present', title: 'Executive Cert. in SCM Data + AI', org: 'CII & CODE IIT Madras', detail: '', relevance: 'Supply chain AI/ML applications' },
    { date: 'Aug 2021 - July 2025', title: 'B.Tech in CSBS', org: 'Rajalakshmi Institute of Technology', detail: 'CGPA: 8.07', relevance: 'Technical + business skills blend' },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e4cba9',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      
      {/* Falling Leaves */}
      <FallingLeaves />
      
      {/* Branch Decorations */}
      <BranchDecoration side="left" />
      <BranchDecoration side="right" />

      {/* Cursor Glow Effect */}
      <div style={{
        position: 'fixed',
        left: mousePos.x - 150,
        top: mousePos.y - 150,
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(234, 137, 19, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'left 0.1s ease, top 0.1s ease',
      }} />

      {/* Side Navigation */}
      <nav style={{
        position: 'fixed',
        right: '30px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        {navItems.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              width: activeNav === item.id ? '40px' : '12px',
              height: '12px',
              borderRadius: '6px',
              background: activeNav === item.id ? '#980204' : '#092f33',
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
            title={item.label}
          />
        ))}
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        padding: '0 20px',
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
        }}>
          {/* Profile Image */}
          <div style={{
            position: 'relative',
            width: '250px',
            height: '250px',
            margin: '0 auto 50px',
          }}>
            <div style={{
              position: 'absolute',
              inset: '-20px',
              background: 'linear-gradient(135deg, #092f33 0%, #4b5b34 50%, #af5031 100%)',
              borderRadius: '50%',
              opacity: 0.3,
              animation: 'pulse 3s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute',
              inset: '-5px',
              background: 'rgba(9, 47, 51, 0.9)',
              borderRadius: '50%',
            }} />
            <img
              src="profile picture.jpg"
              alt="Rahavi S"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                position: 'relative',
                border: '4px solid #Ea8913',
              }}
            />
          </div>
          
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.9rem',
            color: '#af5031',
            textTransform: 'uppercase',
            letterSpacing: '6px',
            marginBottom: '20px',
            animation: 'fadeIn 1s ease 0.3s both',
          }}>
            Data Analyst & AI Engineer
          </p>
          
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#092f33',
            lineHeight: '1.1',
            marginBottom: '30px',
            animation: 'fadeIn 1s ease 0.5s both',
          }}>
            Rahavi S
          </h1>
          
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: '1.4rem',
            color: '#4b5b34',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.8',
            animation: 'fadeIn 1s ease 0.7s both',
          }}>
            Transforming complex data into stories that drive decisions. 
            Passionate about the intersection of <span style={{ color: '#980204', fontStyle: 'italic' }}>machine learning</span>, <span style={{ color: '#980204', fontStyle: 'italic' }}>web development</span>, and <span style={{ color: '#980204', fontStyle: 'italic' }}>business strategy</span>.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            animation: 'fadeIn 1s ease 0.9s both',
          }}>
            <a href="#projects" style={{
              padding: '18px 40px',
              background: '#092f33',
              color: '#e4cba9',
              borderRadius: '50px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '2px solid #092f33',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#092f33';
            }}
            onMouseLeave={e => {
              e.target.style.background = '#092f33';
              e.target.style.color = '#e4cba9';
            }}>
              View Work
            </a>
            <a href="#contact" style={{
              padding: '18px 40px',
              background: 'transparent',
              color: '#092f33',
              borderRadius: '50px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '2px solid #092f33',
            }}
            onMouseEnter={e => {
              e.target.style.background = '#980204';
              e.target.style.borderColor = '#980204';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = '#092f33';
              e.target.style.color = '#092f33';
            }}>
              Get in Touch
            </a>
          </div>
        </div>
        
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.05); opacity: 0.5; }
          }
        `}</style>
      </section>

      {/* About Section - Bento Grid */}
      <section id="about" style={{
        padding: '120px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '3.5rem',
          fontWeight: '700',
          color: '#092f33',
          marginBottom: '60px',
        }}>
          About<span style={{ color: '#980204' }}>.</span>
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, auto)',
          gap: '20px',
        }}>
          <BentoCard span={2} rowSpan={2}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.8rem',
              color: '#092f33',
              marginBottom: '20px',
            }}>
              Who I Am
            </h3>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: '1.15rem',
              color: '#4b5b34',
              lineHeight: '1.9',
            }}>
              A B.Tech graduate in Computer Science and Business Systems, I bridge the gap between 
              <strong style={{ color: '#980204' }}> technical depth</strong> and 
              <strong style={{ color: '#980204' }}> business strategy</strong>. 
              <br /><br />
              Currently crafting data stories at Exporter.AI, where I build forecasting models, 
              develop customer segmentation strategies, and create dashboards that translate 
              complex trade data into actionable insights.
            </p>
          </BentoCard>
          
          <BentoCard span={2} style={{ background: '#980204' }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              color: '#fdaba5',
              marginBottom: '15px',
            }}>
              Current Focus
            </h3>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: '1.1rem',
              color: '#fff',
              lineHeight: '1.7',
            }}>
              Supply Chain Analytics, Demand Forecasting, and building AI-powered tools 
              that simplify complex decision-making.
            </p>
          </BentoCard>
          
          <BentoCard span={2} style={{ background: '#af5031' }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.3rem',
              color: '#e4cba9',
              marginBottom: '15px',
            }}>
              Business Thinking
            </h3>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: '1rem',
              color: '#fff',
              lineHeight: '1.7',
            }}>
              Applied <strong>Margin-Market Matrix</strong> to segment customers by profitability 
              and market type — enabling targeted growth and retention strategies.
            </p>
          </BentoCard>
          
          <BentoCard span={2} style={{ background: '#4b5b34' }} hoverColor="#2a3520">
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.3rem',
              color: '#e4cba9',
              marginBottom: '10px',
            }}>
              5+ Years
            </h3>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: '1rem',
              color: '#7fc7cc',
            }}>
              of trade transaction data analyzed and transformed into insights
            </p>
          </BentoCard>
          
          <BentoCard span={2} style={{ background: '#092f33' }} hoverColor="#061a1c">
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.3rem',
              color: '#7fc7cc',
              marginBottom: '10px',
            }}>
              Technical Skills
            </h3>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: '1rem',
              color: '#e4cba9',
              lineHeight: '1.7',
            }}>
              Python • Flask • JavaScript • SQL • React • Machine Learning • Deep Learning • Tableau • ARIMA • CatBoost • LSTM • pandas • Demand Forecasting
            </p>
          </BentoCard>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{
        padding: '120px 20px',
        background: '#092f33',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '3.5rem',
            fontWeight: '700',
            color: '#e4cba9',
            marginBottom: '60px',
          }}>
            Experience<span style={{ color: '#980204' }}>.</span>
          </h2>
          
          {experiences.map((exp, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '40px',
              position: 'relative',
              marginBottom: '60px',
            }}>
              <div>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.85rem',
                  color: '#7fc7cc',
                  marginBottom: '10px',
                }}>
                  {exp.date}
                </p>
                <div style={{
                  width: '60px',
                  height: '4px',
                  background: '#980204',
                  borderRadius: '2px',
                }} />
              </div>
              
              <div style={{
                background: 'rgba(228, 203, 169, 0.05)',
                borderRadius: '20px',
                padding: '40px',
                border: '1px solid rgba(228, 203, 169, 0.1)',
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.8rem',
                  color: '#e4cba9',
                  marginBottom: '8px',
                }}>
                  {exp.title}
                </h3>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.9rem',
                  color: '#Ea8913',
                  marginBottom: '25px',
                }}>
                  {exp.company}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                }}>
                  {exp.points.map((point, j) => (
                    <li key={j} style={{
                      fontFamily: "'Crimson Text', serif",
                      fontSize: '1.1rem',
                      color: '#7fc7cc',
                      marginBottom: '15px',
                      paddingLeft: '25px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#af5031',
                      }}>→</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{
        padding: '120px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '3.5rem',
          fontWeight: '700',
          color: '#092f33',
          marginBottom: '80px',
        }}>
          Selected Work<span style={{ color: '#980204' }}>.</span>
        </h2>
        
        {projects.map((project, i) => (
          <ProjectShowcase key={i} project={project} index={i} />
        ))}
      </section>

      {/* Education Section */}
      <section id="education" style={{
        padding: '120px 20px',
        background: 'linear-gradient(180deg, #e4cba9 0%, #d4b896 100%)',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '3.5rem',
            fontWeight: '700',
            color: '#092f33',
            marginBottom: '60px',
          }}>
            Education<span style={{ color: '#980204' }}>.</span>
          </h2>
          
          <div style={{ position: 'relative' }}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute',
              left: '9px',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'linear-gradient(to bottom, #092f33, #af5031)',
            }} />
            
            {education.map((edu, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '30px',
                marginBottom: '50px',
                position: 'relative',
              }}>
                <TimelineDot active={i === 0} />
                
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '30px',
                  flex: 1,
                  boxShadow: '0 10px 30px rgba(9, 47, 51, 0.1)',
                }}>
                  <p style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.8rem',
                    color: '#Ea8913',
                    marginBottom: '8px',
                  }}>
                    {edu.date}
                  </p>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.4rem',
                    color: '#092f33',
                    marginBottom: '5px',
                  }}>
                    {edu.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '1rem',
                    color: '#980204',
                    marginBottom: '10px',
                  }}>
                    {edu.org}
                  </p>
                  {edu.detail && (
                    <p style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.85rem',
                      color: '#4b5b34',
                      marginBottom: '10px',
                    }}>
                      {edu.detail}
                    </p>
                  )}
                  <p style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '0.95rem',
                    color: '#af5031',
                    fontStyle: 'italic',
                  }}>
                    ↳ {edu.relevance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '150px 20px',
        background: '#092f33',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px solid rgba(228, 203, 169, 0.1)',
          left: '-100px',
          top: '-100px',
        }} />
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(228, 203, 169, 0.1)',
          right: '-50px',
          bottom: '-50px',
        }} />
        
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.9rem',
            color: '#7fc7cc',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            marginBottom: '20px',
          }}>
            Let's Connect
          </p>
          
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            color: '#e4cba9',
            marginBottom: '30px',
            lineHeight: '1.2',
          }}>
            Have a project in mind?
          </h2>
          
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: '1.3rem',
            color: '#7fc7cc',
            marginBottom: '50px',
            lineHeight: '1.8',
          }}>
            Open to opportunities in Data Analytics, Data Science, and AI Engineering. 
            Let's create something meaningful together.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {[
              { icon: '📧', label: 'Email', href: 'mailto:rahavisrose@gmail.com', color: '#980204' },
              { icon: '💻', label: 'GitHub', href: 'https://github.com/rahavi-r31', color: '#4b5b34' },
              { icon: '🔗', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahavi-s-671a76224', color: '#af5031' },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '20px 35px',
                  background: '#e4cba9',
                  color: '#092f33',
                  borderRadius: '50px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={e => {
                  e.target.style.background = link.color;
                  e.target.style.color = '#fff';
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = '#e4cba9';
                  e.target.style.color = '#092f33';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '30px 20px',
        background: '#080f10',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.8rem',
          color: '#4b5b34',
        }}>
          © 2025 Rahavi S — Crafted with data & design 🍂
        </p>
      </footer>
    </div>
  );
}