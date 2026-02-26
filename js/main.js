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
    initChapterCards();
    initContactForm();
    initScrollAnimations();
    initConsoleEasterEgg();
});

// 头部功能
function initHeader() {
    // 滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // 移动端菜单
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (navbarToggle && navbarNav) {
        navbarToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
        });
    }
    
    // 导航链接点击
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加活动状态到当前链接
            this.classList.add('active');
            
            // 关闭移动端菜单
            if (navbarNav) {
                navbarNav.classList.remove('active');
            }
        });
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

// 章节卡片交互
function initChapterCards() {
    const chapterCards = document.querySelectorAll('.chapter-card');
    
    chapterCards.forEach(card => {
        card.addEventListener('click', function() {
            // 切换卡片激活状态
            chapterCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 展开全文按钮交互
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            
            const card = this.closest('.chapter-card');
            const title = card.querySelector('.article-title').textContent;
            const meta = card.querySelector('.article-meta').innerHTML;
            const content = card.querySelector('.article-excerpt').innerHTML;
            
            // 打开弹窗
            openModal(title, meta, content);
        });
    });
    
    // 关闭弹窗事件
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // 点击弹窗外部关闭
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // 按ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 打开弹窗
function openModal(title, meta, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMeta = document.getElementById('modal-meta');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalTitle && modalMeta && modalBody) {
        modalTitle.textContent = title;
        modalMeta.innerHTML = meta;
        modalBody.innerHTML = content;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
}

// 关闭弹窗
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // 恢复背景滚动
    }
}

// 滚动动画
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.profile-content, .contact-content, .goal-item, .mission-item, .chapter-card');
    
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

// 章节展开/折叠功能
function toggleChapter(header) {
    const content = header.nextElementSibling;
    const btn = header.querySelector('.toggle-btn');
    
    if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        btn.textContent = '▲';
    } else {
        content.style.display = 'none';
        btn.textContent = '▼';
    }
}

// 全部展开功能
function expandAll() {
    const chapters = document.querySelectorAll('.chapter-content');
    const buttons = document.querySelectorAll('.toggle-btn');
    
    chapters.forEach(content => {
        content.style.display = 'block';
    });
    
    buttons.forEach(btn => {
        btn.textContent = '▲';
    });
}

// 全部折叠功能
function collapseAll() {
    const chapters = document.querySelectorAll('.chapter-content');
    const buttons = document.querySelectorAll('.toggle-btn');
    
    chapters.forEach(content => {
        content.style.display = 'none';
    });
    
    buttons.forEach(btn => {
        btn.textContent = '▼';
    });
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
