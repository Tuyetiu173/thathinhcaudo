document.addEventListener('DOMContentLoaded', () => {
    const memoryOverflow = document.querySelector('.memory-overflow');
    const loveMessage = document.querySelector('.love-message');
    const heartsContainer = document.querySelector('.hearts-container');
    const bgMusic = document.getElementById('bgMusic');
    const clickMessage = document.querySelector('.click-message');
    const backgroundOverlay = document.querySelector('.background-overlay');
    const notificationContainer = document.querySelector('.notification-container');
    
    // Đợi sự kiện đếm ngược hoàn thành
    document.addEventListener('countdownComplete', () => {
        // Hiển thị thông báo tràn bộ nhớ sau khi đếm ngược xong
        memoryOverflow.classList.add('active');
        
        // Ẩn thông báo tràn bộ nhớ và hiển thị lời tỏ tình sau 3 giây
        setTimeout(() => {
            memoryOverflow.classList.remove('active');
            loveMessage.classList.add('visible');
            startHeartAnimation();
        }, 3000);
    });

    // Danh sách các thông báo
    const messages = [
        "NHỚ EM NHIỀU LẮM! ❤️",
        "EM LÀ TẤT CẢ! 💖",
        "ANH YÊU EM! 💝",
        "EM LÀ ĐIỀU TUYỆT VỜI NHẤT! 💕",
        "KHÔNG THỂ QUÊN EM! 💗",
        "EM LÀ MÃ NGUỒN CỦA ANH! 💓",
        "EM LÀ BUG ĐẸP NHẤT! 💘",
        "EM LÀ PHẦN MỀM HOÀN HẢO! 💞",
        "EM LÀ MÁY CHỦ CỦA ANH! 💖",
        "EM LÀ DATABASE CỦA ANH! 💝"
    ];

    // Danh sách thông báo tràn bộ nhớ
    const memoryMessages = [
        "Tràn bộ nhớ: Nhớ em quá! 💘",
        "Warning: Memory overflow - Nhớ em! 💖",
        "Error: Stack overflow - Tình yêu quá lớn 💝",
        "Alert: Memory leak - Không thể quên em 💗",
        "Critical: RAM đầy kỷ niệm về em 💓",
        "System overload: Quá nhiều nhớ nhung 💕"
    ];

    let messageIndex = 0;
    let isPlaying = false;
    let activeNotifications = [];

    // Tạo một tab thông báo mới
    function createNotificationTab(message) {
        const tab = document.createElement('div');
        tab.className = 'notification-tab';
        tab.textContent = message;
        
        // Tính toán vị trí ngẫu nhiên cho tab
        const top = Math.random() * (window.innerHeight - 100);
        const left = Math.random() * (window.innerWidth - 300);
        
        tab.style.top = `${top}px`;
        tab.style.left = `${left}px`;
        
        notificationContainer.appendChild(tab);
        activeNotifications.push(tab);

        // Xóa tab sau 3 giây
        setTimeout(() => {
            tab.classList.add('fade-out');
            setTimeout(() => {
                tab.remove();
                activeNotifications = activeNotifications.filter(t => t !== tab);
                if (activeNotifications.length === 0) {
                    backgroundOverlay.classList.remove('active');
                }
            }, 500);
        }, 3000);
    }

    // Xử lý click vào màn hình
    document.addEventListener('click', (e) => {
        // Hiệu ứng rung
        document.body.style.animation = 'shake 0.5s';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);

        // Hiển thị thông báo chính
        clickMessage.textContent = messages[messageIndex];
        clickMessage.classList.remove('show');
        void clickMessage.offsetWidth;
        clickMessage.classList.add('show');

        // Tạo tab thông báo
        backgroundOverlay.classList.add('active');
        const randomMessage = memoryMessages[Math.floor(Math.random() * memoryMessages.length)];
        createNotificationTab(randomMessage);

        // Tạo hiệu ứng pháo hoa
        createFirework(e.clientX, e.clientY);

        // Tạo hiệu ứng chữ bay
        const emojis = ['❤️', '💕', '💗', '💓', '💖'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        createFloatingText(randomEmoji, e.clientX, e.clientY);

        // Chuyển sang thông báo tiếp theo
        messageIndex = (messageIndex + 1) % messages.length;

        // Xử lý nhạc nền
        if (!isPlaying) {
            bgMusic.play();
            isPlaying = true;
        }
    });

    // Thêm hiệu ứng hover cho các phần tử
    const elements = document.querySelectorAll('.love-message p');
    elements.forEach(el => {
        el.addEventListener('mouseover', () => {
            el.classList.add('heartbeat');
        });
        el.addEventListener('mouseout', () => {
            el.classList.remove('heartbeat');
        });
    });
});

function startHeartAnimation() {
    setInterval(createHeart, 300);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    
    document.querySelector('.hearts-container').appendChild(heart);
    
    // Xóa trái tim sau khi animation kết thúc
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Thêm style cho hiệu ứng rung
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
