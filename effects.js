// Hiệu ứng pháo hoa
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        const particleCount = window.FIREWORK_PARTICLES || 50;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 / particleCount) * i;
            const velocity = 2 + Math.random() * 2;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 100,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            });
        }
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Trọng lực
            p.life -= 1;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    }
}

// Hiệu ứng chữ bay
class FloatingText {
    constructor(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.vy = -2;
        this.fontSize = 20 + Math.random() * 20;
    }

    update() {
        this.y += this.vy;
        this.alpha -= 0.02;
        if (this.alpha <= 0) return false;
        return true;
    }

    draw(ctx) {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = `rgba(255, 0, 0, ${this.alpha})`;
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y);
    }
}

// Khởi tạo canvas cho hiệu ứng
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '1';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let fireworks = [];
let floatingTexts = [];

// Cập nhật kích thước canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Cập nhật và vẽ pháo hoa
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw(ctx);
        if (fireworks[i].particles.length === 0) {
            fireworks.splice(i, 1);
        }
    }

    // Cập nhật và vẽ chữ bay
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
        if (!floatingTexts[i].update()) {
            floatingTexts.splice(i, 1);
        } else {
            floatingTexts[i].draw(ctx);
        }
    }

    requestAnimationFrame(animate);
}
animate();

// Export các hàm để sử dụng
window.createFirework = (x, y) => {
    fireworks.push(new Firework(x, y));
};

window.createFloatingText = (text, x, y) => {
    floatingTexts.push(new FloatingText(text, x, y));
}; 