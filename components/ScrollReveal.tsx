
import React, { useRef, useEffect, useState } from 'react';

type AnimationType = 'fade-up' | 'fade-in' | 'zoom-in' | 'zoom-out' | 'slide-left' | 'slide-right' | 'blur-in' | 'scale-rotate';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  duration = 1.2,
  className = '',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getInitialClass = () => {
    switch (animation) {
      case 'fade-up': return 'translate-y-16 opacity-0';
      case 'fade-in': return 'opacity-0';
      case 'zoom-in': return 'scale-90 opacity-0';
      case 'zoom-out': return 'scale-110 opacity-0';
      case 'slide-left': return '-translate-x-24 md:-translate-x-40 opacity-0';
      case 'slide-right': return 'translate-x-24 md:translate-x-40 opacity-0';
      case 'blur-in': return 'blur-md opacity-0 scale-95';
      case 'scale-rotate': return 'scale-75 rotate-3 opacity-0';
      default: return 'translate-y-16 opacity-0';
    }
  };

  const getFinalClass = () => {
    switch (animation) {
      case 'blur-in': return 'blur-0 opacity-100 scale-100';
      case 'scale-rotate': return 'scale-100 rotate-0 opacity-100';
      default: return 'translate-y-0 translate-x-0 scale-100 opacity-100';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${className} ${isVisible ? getFinalClass() : getInitialClass()}`}
      style={{ 
        transitionDuration: `${duration}s`, 
        transitionDelay: `${delay}s`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
