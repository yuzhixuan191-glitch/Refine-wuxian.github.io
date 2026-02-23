/**
 * ACAL认知宇宙 - 主JavaScript文件
 */

// 导航滚动效果
function initNavScroll() {
    const nav = document.querySelector('.nav-container');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// 章节折叠功能
function initChapterToggle() {
    // 更新导航激活状态
    function updateNavActive(chapterId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${chapterId}`) {
                item.classList.add('active');
            }
        });
    }
    
    // 单个章节切换
    window.toggleChapter = function(header) {
        const content = header.nextElementSibling;
        const button = header.querySelector('.toggle-btn');
        
        content.classList.toggle('expanded');
        button.textContent = content.classList.contains('expanded') ? '▲' : '▼';
        
        // 更新导航
        const chapterId = header.parentElement.id;
        updateNavActive(chapterId);
        
        // 保存状态到 localStorage（可选）
        saveChapterState(chapterId, content.classList.contains('expanded'));
    };
    
    // 全部展开
    window.expandAll = function() {
        document.querySelectorAll('.chapter-content').forEach(content => {
            content.classList.add('expanded');
        });
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.textContent = '▲';
        });
        
        // 更新所有章节状态
        document.querySelectorAll('.chapter').forEach((chapter, index) => {
            saveChapterState(chapter.id, true);
        });
    };
    
    // 全部折叠
    window.collapseAll = function() {
        document.querySelectorAll('.chapter-content').forEach(content => {
            content.classList.remove('expanded');
        });
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.textContent = '▼';
        });
        
        // 重置到第一个章节
        const firstChapter = document.getElementById('chapter-art');
        if (firstChapter) {
            updateNavActive('chapter-art');
        }
        
        // 更新所有章节状态
        document.querySelectorAll('.chapter').forEach((chapter, index) => {
            saveChapterState(chapter.id, false);
        });
    };
    
    // 保存章节状态到 localStorage
    function saveChapterState(chapterId, isExpanded) {
        try {
            const states = JSON.parse(localStorage.getItem('chapterStates') || '{}');
            states[chapterId] = isExpanded;
            localStorage.setItem('chapterStates', JSON.stringify(states));
        } catch (e) {
            // 忽略 localStorage 错误
        }
    }
    
    // 恢复章节状态
    function restoreChapterStates() {
        try {
            const states = JSON.parse(localStorage.getItem('chapterStates') || '{}');
            Object.entries(states).forEach(([chapterId, isExpanded]) => {
                const chapter = document.getElementById(chapterId);
                if (chapter && isExpanded) {
                    const content = chapter.querySelector('.chapter-content');
                    const button = chapter.querySelector('.toggle-btn');
                    if (content && button) {
                        content.classList.add('expanded');
                        button.textContent = '▲';
                    }
                }
            });
        } catch (e) {
            // 默认展开第一个
            const firstChapter = document.getElementById('chapter-art');
            if (firstChapter) {
                const content = firstChapter.querySelector('.chapter-content');
                const button = firstChapter.querySelector('.toggle-btn');
                if (content && button) {
                    content.classList.add('expanded');
                    button.textContent = '▲';
                    updateNavActive('chapter-art');
                }
            }
        }
    }
    
    // 导航点击处理
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetChapter = document.getElementById(targetId);
            
            if (!targetChapter) return;
            
            // 展开目标章节
            const content = targetChapter.querySelector('.chapter-content');
            const button = targetChapter.querySelector('.toggle-btn');
            
            if (!content.classList.contains('expanded')) {
                content.classList.add('expanded');
                if (button) button.textContent = '▲';
            }
            
            // 滚动到章节
            targetChapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // 更新导航
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 恢复状态
    restoreChapterStates();
}

// 阅读进度条
function initProgressBar() {
    const createBar = () => {
        let bar = document.querySelector('.progress-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 'progress-bar';
            document.body.appendChild(bar);
        }
        return bar;
    };
    
    const bar = createBar();
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + '%';
    });
}

// 回到顶部按钮
function initBackToTop() {
    const createButton = () => {
        let btn = document.querySelector('.back-to-top');
        if (!btn) {
            btn = document.createElement('div');
            btn.className = 'back-to-top';
            btn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
            `;
            document.body.appendChild(btn);
            
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        return btn;
    };
    
    const btn = createButton();
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

// 控制台彩蛋
function initConsoleEasterEgg() {
    console.log('%c📚 ACAL认知宇宙 · 升级版', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('%c基于 mustenergy.com 设计思路重构', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c包含：艺术之魂 · 黑箱/番外 · 结构拓扑 · 推荐序 · 结构解析 · 作品集', 'color: #94a3b8;');
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initChapterToggle();
    initProgressBar();
    initBackToTop();
    initConsoleEasterEgg();
});
