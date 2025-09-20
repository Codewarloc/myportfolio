import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Monitor, Palette, Code2, Database, Terminal, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';
import NavBar from './components/NavBar';
import ProjectCard from './components/ProjectCard';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const formRef = useRef<HTMLFormElement>(null);
  // const formRef = useRef(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        'service_koojunm',
        'template_6xevd6a',
        formRef.current,
        'mxMyxMSATAuV9R_n1'
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    { name: 'Frontend Development', icon: <Monitor />, level: 90 },
    { name: 'UI/UX Design', icon: <Palette />, level: 85 },
    { name: 'Backend Development', icon: <Database />, level: 75 },
    { name: 'React & TypeScript', icon: <Code2 />, level: 95 },
    { name: 'Command Line & Git', icon: <Terminal />, level: 80 },
    { name: 'Responsive Design', icon: <Globe />, level: 90 }
  ];

  const testimonials = [
    {
      name: 'John Doe',
      feedback:
        'Itam did an amazing job on our website! The design is stunning and the user experience is flawless.',
      role: 'CEO, TechCorp',
    },
    {
      name: 'Jane Smith',
      feedback:
        'Working with Itam was a pleasure. The project was delivered on time and exceeded our expectations.',
      role: 'Product Manager, InnovateX',
    },
    {
      name: 'Samuel Green',
      feedback:
        'Highly professional and creative! Will definitely work with Itam again for future projects.',
      role: 'Founder, StartUp Hub',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 to-black text-white'
          : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
      }`}
    >
      <NavBar isDark={isDark} />

      {/* Hero Section */}
      <section
        id="home"
        className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between min-h-screen"
      >
        <motion.div className="md:w-1/2" {...fadeIn}>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            My Name is Itam James and I'm a{' '}
            <TypeAnimation
              sequence={['Frontend Developer', 2000, 'UI/UX Designer', 2000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p
            className={`text-xl mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Creating beautiful, responsive, and user-friendly web experiences.
          </p>
          <div className="flex gap-4">
            <motion.a
              href="https://github.com/Codewarloc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:itamjames111@gmail.com"
              className="p-2 hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-[400px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-2xl transform rotate-3">
            <div
              className={`absolute inset-0 ${
                isDark ? 'bg-black/20' : 'bg-white/20'
              } backdrop-blur-sm rounded-lg`}
            ></div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={`p-6 rounded-lg ${
                isDark ? 'bg-gray-800/50' : 'bg-white shadow-lg'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="text-blue-500 mr-3">{skill.icon}</div>
                <h3 className="text-xl font-semibold">{skill.name}</h3>
              </div>
              <div
                className={`h-2 rounded-full ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {skill.level}%
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard
            title="Incredible Bridges Website"
            description="A detailed documentary website about bridges and types of bridges"
            image="https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg"
            tags={['React', 'Node.js', 'MongoDB']}
            isDark={isDark}
          />
          <ProjectCard
            title="Task Management App"
            description="Task management application with real-time collaboration features"
            image="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg"
            tags={['React', 'TypeScript', 'Tailwind']}
            isDark={isDark}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Testimonials
        </h2>
        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-lg shadow-lg ${
                isDark ? 'bg-gray-800/50' : 'bg-white'
              }`}
            >
              <p className="text-lg italic mb-4">
                "{testimonials[currentIndex].feedback}"
              </p>
              <h4 className="font-semibold">
                {testimonials[currentIndex].name}
              </h4>
              <span className="text-sm text-gray-500">
                {testimonials[currentIndex].role}
              </span>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Get In Touch
        </h2>
        <div className="max-w-2xl mx-auto">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                id="name"
                required
                className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                id="email"
                required
                className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              ></textarea>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-shadow hover:shadow-lg disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
            {submitStatus === 'success' && (
              <p className="text-green-500 text-center">
                Message sent successfully!
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-center">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            © 2025 Itam James. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Theme Toggle */}
      <div className="fixed bottom-4 right-4">
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;
