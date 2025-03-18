document.addEventListener('DOMContentLoaded', () => {
    // Tạo phần tử đếm ngược
    const countdownOverlay = document.createElement('div');
    countdownOverlay.className = 'countdown-overlay';
    document.body.appendChild(countdownOverlay);

    // Tạo container cho số đếm và chữ
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'countdown-container';
    countdownOverlay.appendChild(countdownContainer);

    // Tạo phần tử cho chữ "Chạm vào đi nè"
    const touchText = document.createElement('div');
    touchText.className = 'touch-text';
    touchText.textContent = 'Chạm vào đi nè';
    countdownContainer.appendChild(touchText);

    // Tạo phần tử cho số đếm
    const countdownNumber = document.createElement('div');
    countdownNumber.className = 'countdown-number';
    countdownContainer.appendChild(countdownNumber);

    const readyMessage = document.createElement('div');
    readyMessage.className = 'countdown-ready';
    readyMessage.textContent = 'Chuẩn bị nhé...';
    document.body.appendChild(readyMessage);

    // Lấy element audio
    const bgMusic = document.getElementById('bgMusic');

    // Hiển thị thông báo chuẩn bị trong 5 giây đầu
    setTimeout(() => {
        readyMessage.classList.add('show');
    }, 500);

    // Bắt đầu đếm ngược sau 5 giây
    setTimeout(() => {
        readyMessage.classList.remove('show');
        countdownOverlay.style.display = 'flex';
        startCountdown();
    }, 5000);

    function startCountdown() {
        let count = 10;
        
        function updateCount() {
            if (count > 0) {
                countdownNumber.textContent = count;
                countdownNumber.style.opacity = '0';
                void countdownNumber.offsetWidth; // Trigger reflow
                countdownNumber.style.animation = 'none';
                void countdownNumber.offsetWidth; // Trigger reflow
                countdownNumber.style.animation = 'countdownPulse 1.5s ease-in-out';

                // Hiển thị/ẩn dòng chữ "Chạm vào đi nè"
                if (count === 10) {
                    touchText.style.opacity = '1';
                } else {
                    touchText.style.opacity = '0';
                }

                count--;
                setTimeout(updateCount, 1500);
            } else {
                countdownOverlay.style.display = 'none';
                // Phát nhạc khi đếm ngược kết thúc
                bgMusic.play().catch(error => {
                    console.log("Không thể tự động phát nhạc:", error);
                });
                // Kích hoạt hiệu ứng tràn bộ nhớ
                document.dispatchEvent(new Event('countdownComplete'));
            }
        }

        updateCount();
    }

    // Thêm sự kiện click cho overlay
    countdownOverlay.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(error => {
                console.log("Không thể phát nhạc:", error);
            });
        }
    });
}); 