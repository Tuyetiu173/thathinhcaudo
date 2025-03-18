document.addEventListener('DOMContentLoaded', () => {
    // Tạo container cho input
    const inputContainer = document.createElement('div');
    inputContainer.className = 'name-input-container';
    
    // Tạo input field
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'name-input';
    nameInput.placeholder = 'Nhập tên của em...';
    nameInput.maxLength = 20;
    
    // Tạo nút submit
    const submitButton = document.createElement('button');
    submitButton.className = 'name-submit-btn';
    submitButton.textContent = 'Gửi';
    
    // Tạo popup thông báo
    const message = document.createElement('div');
    message.className = 'love-message-popup';
    
    // Thêm các phần tử vào container
    inputContainer.appendChild(nameInput);
    inputContainer.appendChild(document.createElement('br'));
    inputContainer.appendChild(submitButton);
    
    // Thêm container và popup vào body
    document.body.appendChild(inputContainer);
    document.body.appendChild(message);
    
    // Hiển thị form sau 30 giây
    setTimeout(() => {
        inputContainer.classList.add('show');
    }, 30000);
    
    // Xử lý sự kiện submit
    submitButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            // Ẩn form nhập
            inputContainer.classList.remove('show');
            
            // Hiển thị thông báo
            message.innerHTML = `Thương ${name} nhiều lắm ó!!! ❤️`;
            message.classList.add('show');
            
            // Tạo hiệu ứng pháo hoa
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() - 0.5) * 200;
                    const offsetY = (Math.random() - 0.5) * 200;
                    createFirework(centerX + offsetX, centerY + offsetY);
                }, i * 200);
            }
            
            // Xóa popup sau khi animation kết thúc
            setTimeout(() => {
                message.classList.remove('show');
            }, 2000);
        }
    });
    
    // Cho phép submit bằng phím Enter
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitButton.click();
        }
    });
}); 