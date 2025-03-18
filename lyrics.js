document.addEventListener('DOMContentLoaded', () => {
    const lyrics = [
        "Có tham lam lắm không",
        "Khi anh chỉ muốn mình em trong đầu oh-oh-uh",
        "Với từng chiếc áo phông",
        "Mang hương em mỗi đêm cho ta quên sầu",
        "Loay hoay quay cuồng",
        "Tại sao con tim cứ ôm mãi một bông hoa không rời",
        "Sự thật là bộ nhớ đầy quá dữ liệu đẹp anh khó thể xoá",
        "Từng bóng hình em eh-eh-em",
        "Hoá ra chuyện mình thật tình",
        "Tựa cuốn phim từ đài truyền hình",
        "Nên anh lưu giữ file để khó phai",
        "Good vibe",
        "Tràn ngập bộ nhớ nhớ nhớ nhớ em",
        "Cho anh cảm giác không sao quên được",
        "Tràn ngập bộ nhớ nhớ nhớ nhớ em",
        "Nhưng anh mong có cảm giác này mãi",
        "Oh-uh-oh oh uh-oh-uh-oh",
        "Oh-uh-oh oh uh-oh-uh-oh",
        "Oh-uh-oh oh uh-oh-uh-oh",
        "Oh-uh-oh oh uh-oh-uh-oh",
        "Yêu thương sao cho họ vừa",
        "Hay anh đang lo thừa",
        "Cho anh mong như cơm bữa",
        "Em đừng xinh như thế nữa",
        "Loạn nhịp cả tim lên rồi",
        "Đầu này toàn là em mà thôi yeh eh y-yeh eh y-yeh (uh)",
        "Nỗi nhớ em cầu kỳ nên chẳng biết lý do là gì (lý do là gì)",
        "Hao tốn hơi nhiều GB nên cần dùng thêm USB (dùng thêm USB)",
        "Nỗi nhớ em cầu kỳ nên chẳng biết lý do là gì (lý do là gì)",
        "Hao tốn hơi nhiều GB nên cần D O M I C",
        "Tràn ngập bộ nhớ nhớ nhớ nhớ em",
        "Cho anh cảm giác không sao quên được",
        "Tràn ngập bộ nhớ nhớ nhớ nhớ em",
        "Nhưng anh mong có cảm giác này mãi",
        "Oh-uh-oh oh uh-oh-uh-oh",
        "Oh-uh-oh oh uh-oh-uh-oh",
        "Oh-uh-oh oh uh-oh-uh-oh",
        "Oh-uh-oh oh uh-woh",
        "Tràn ngập bộ nhớ nhớ nhớ nhớ em",
        "Tràn ngập bộ nhớ nhớ nhớ nhớ em",
        "Tràn ngập bộ nhớ nhớ nhớ nhớ em",
        "Tràn ngập bộ nhớ em",
        "Bộ nhớ ấy bao nhiêu điều thật quý",
        "Chỉ muốn giữ trong lòng chớ bay đi",
        "Cạnh bên nhau xua đi nhiều cơn đau",
        "Thành tâm với nốt nhạc cứu thân này"
    ];

    // Tạo container cho lời bài hát
    const lyricsContainer = document.createElement('div');
    lyricsContainer.className = 'lyrics-container';
    document.body.appendChild(lyricsContainer);

    // Tạo phần tử cho dòng lời bài hát
    const lyricsLine = document.createElement('div');
    lyricsLine.className = 'lyrics-line';
    lyricsContainer.appendChild(lyricsLine);

    let currentLine = 0;

    function showNextLine() {
        if (currentLine >= lyrics.length) {
            currentLine = 0;
        }

        // Tạo HTML với từ khóa được highlight
        const keywords = ['bộ nhớ', 'nhớ em', 'tràn ngập', 'dữ liệu', 'file', 'GB', 'USB', 'DOMIC'];
        let text = lyrics[currentLine];
        keywords.forEach(keyword => {
            const regex = new RegExp(keyword, 'gi');
            text = text.replace(regex, `<span class="lyrics-highlight">${keyword}</span>`);
        });

        lyricsLine.innerHTML = text;
        lyricsLine.classList.remove('active');
        void lyricsLine.offsetWidth; // Trigger reflow
        lyricsLine.classList.add('active');

        currentLine++;
    }

    // Bắt đầu hiển thị lời bài hát sau khi đếm ngược hoàn thành
    document.addEventListener('countdownComplete', () => {
        setTimeout(() => {
            setInterval(showNextLine, 4000); // Hiển thị mỗi dòng trong 4 giây
            showNextLine(); // Hiển thị dòng đầu tiên ngay lập tức
        }, 3000); // Đợi 3 giây sau khi hiệu ứng tràn bộ nhớ xuất hiện
    });
}); 