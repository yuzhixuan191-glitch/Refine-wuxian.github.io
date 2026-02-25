/**
 * ACAL认知宇宙 · 主JavaScript文件
 * 现代高端交互效果
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initHeader();
    initParticles();
    initParallax();
    initBackToTop();
    initContactForm();
    initScrollAnimations();
    initConsoleEasterEgg();
});

// 头部功能
function initHeader() {
    // 滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// 粒子系统
function initParticles() {
    // 创建粒子容器
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // 随机属性
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 10;
        const opacity = Math.random() * 0.5 + 0.1;
        const color = getRandomColor();
        
        // 设置样式
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animation = `particleFloat ${duration}s ease-in-out ${delay}s infinite`;
        particle.style.pointerEvents = 'none';
        
        particlesContainer.appendChild(particle);
    }
    
    // 添加粒子动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.1;
            }
            25% {
                transform: translateY(-50px) rotate(90deg);
                opacity: 0.5;
            }
            50% {
                transform: translateY(-100px) rotate(180deg);
                opacity: 0.8;
            }
            75% {
                transform: translateY(-50px) rotate(270deg);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
}

// 随机颜色生成
function getRandomColor() {
    const colors = [
        'rgba(59, 130, 246, 0.8)',   // 蓝色
        'rgba(139, 92, 246, 0.8)',   // 紫色
        'rgba(236, 72, 153, 0.8)',   // 粉色
        'rgba(16, 185, 129, 0.8)',   // 绿色
        'rgba(245, 158, 11, 0.8)'     // 橙色
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 视差滚动效果
function initParallax() {
    // 创建视差容器
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'parallax-bg';
    
    // 创建视差层
    for (let i = 1; i <= 3; i++) {
        const layer = document.createElement('div');
        layer.className = `parallax-layer layer-${i}`;
        parallaxContainer.appendChild(layer);
    }
    
    document.body.appendChild(parallaxContainer);
    
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        parallaxLayers.forEach((layer, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrollY * speed);
            const xPos = -(scrollY * speed * 0.5);
            layer.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${scrollY * 0.001 * (index + 1)}deg)`;
        });
    });
    
    // 鼠标移动视差
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxLayers.forEach((layer, index) => {
            const intensity = (index + 1) * 10;
            layer.style.transform += ` translate(${mouseX * intensity}px, ${mouseY * intensity}px)`;
        });
    });
}

// 回到顶部按钮
function initBackToTop() {
    // 创建回到顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 联系表单处理
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // 表单验证已通过HTML的required属性处理
            // Formspree会处理实际的提交
        });
    }
}

// 滚动动画
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.profile-content, .contact-content, .goal-item, .mission-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// 控制台彩蛋
function initConsoleEasterEgg() {
    console.log('%c📚 ACAL认知宇宙 · 现代高端版', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('%c探索认知的无限可能', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c✨ 特色功能：粒子系统、视差效果、3D交互', 'color: #ec4899; font-size: 14px;');
    console.log('%c🌐 响应式设计，适配所有设备', 'color: #10b981; font-size: 14px;');
}

// 平滑滚动
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 数字动画效果
function animateNumber(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateNumber() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    }
    
    updateNumber();
}

// 页面加载动画
window.addEventListener('load', function() {
    // 隐藏加载动画（如果有的话）
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // 显示页面内容
    const content = document.querySelector('body');
    content.style.opacity = '1';
});
