document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra thiết bị
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return;

    // Thêm loading bar
    const loadingBar = document.createElement('div');
    loadingBar.className = 'loading-bar';
    document.body.appendChild(loadingBar);

    // Thêm nút điều khiển âm thanh
    const soundControl = document.createElement('div');
    soundControl.className = 'sound-control';
    soundControl.innerHTML = '<i class="fas fa-volume-up"></i>';
    document.body.appendChild(soundControl);

    // Thêm chỉ dẫn vuốt
    const swipeIndicator = document.createElement('div');
    swipeIndicator.className = 'swipe-indicator';
    swipeIndicator.textContent = '⬆️ Vuốt lên để xem thêm hiệu ứng ⬆️';
    document.body.appendChild(swipeIndicator);

    // Xử lý loading
    let loadingWidth = 0;
    const loadingInterval = setInterval(() => {
        loadingWidth += 2;
        loadingBar.style.width = loadingWidth + '%';
        if (loadingWidth >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingBar.style.opacity = '0';
                setTimeout(() => loadingBar.remove(), 300);
            }, 200);
        }
    }, 20);

    // Xử lý âm thanh
    const bgMusic = document.getElementById('bgMusic');
    let isMuted = true;
    soundControl.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            bgMusic.pause();
            soundControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            bgMusic.play();
            soundControl.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    // Xử lý vuốt
    let startY;
    let currentY;
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
        currentY = e.touches[0].clientY;
        const diff = startY - currentY;
        
        // Nếu vuốt lên
        if (diff > 50) {
            createMultipleFireworks();
            startY = currentY;
        }
        // Nếu vuốt xuống
        else if (diff < -50) {
            createRainbowHearts();
            startY = currentY;
        }
    });

    // Tạo nhiều pháo hoa
    function createMultipleFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight / 2);
                createFirework(x, y);
            }, i * 200);
        }
    }

    // Tạo mưa tim cầu vồng
    function createRainbowHearts() {
        const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff4500', '#ff6347'];
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
                document.querySelector('.hearts-container').appendChild(heart);
                
                setTimeout(() => heart.remove(), 3000);
            }, i * 100);
        }
    }

    // Tối ưu hiệu ứng rung cho mobile
    const originalShake = document.body.style.animation;
    document.body.style.animation = originalShake.replace('shake', 'mobileShake');

    // Tối ưu vị trí notification tabs
    const createNotificationTab = window.createNotificationTab;
    window.createNotificationTab = (message) => {
        const tab = document.createElement('div');
        tab.className = 'notification-tab';
        tab.textContent = message;
        
        // Tính toán vị trí cho mobile
        const top = Math.random() * (window.innerHeight - 150) + 50;
        const left = Math.random() * (window.innerWidth - 200) + 10;
        
        tab.style.top = `${top}px`;
        tab.style.left = `${left}px`;
        
        document.querySelector('.notification-container').appendChild(tab);
        
        setTimeout(() => {
            tab.classList.add('fade-out');
            setTimeout(() => tab.remove(), 500);
        }, 2000);
    };

    // Thêm hiệu ứng rung khi nhận thông báo
    window.navigator.vibrate = window.navigator.vibrate || window.navigator.webkitVibrate || window.navigator.mozVibrate || window.navigator.msVibrate;
    if (window.navigator.vibrate) {
        document.addEventListener('click', () => {
            window.navigator.vibrate(100);
        });
    }
}); 