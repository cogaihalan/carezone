# Carezone - Không gian an toàn cho sinh viên

Carezone là một trang web được thiết kế đặc biệt cho sinh viên từ 18-22 tuổi, nhằm giảm căng thẳng học tập và tạo ra một không gian trú ẩn an toàn.

## 🎯 Mục tiêu

- Xoa dịu sự căng thẳng trong học tập
- Tạo không gian an toàn cho sinh viên
- Cung cấp các hoạt động thư giãn và giải tỏa áp lực

## 🎨 Thiết kế

### Màu sắc chủ đạo

- **Xanh dương nhạt**: Màu làm dịu tâm trí, giảm cảm giác đau đầu
- **Trắng ngà/kem nhạt**: Tạo cảm giác ấm áp và thư giãn

### Font chữ

- **Tên web và tiêu đề**: Poppins
- **Nội dung**: Nunito Sans

### Bố cục

- Nhiều khoảng trắng
- Giao diện tinh giản, dễ thao tác
- Chia thành các trang riêng biệt

## 📱 Các trang chính

### 1. Trang Chào mừng (`/welcome`)

- Thông điệp chào mừng với Baymax
- Nút "Bắt đầu nhé" dẫn vào trang Home

### 2. Trang chủ (`/home`)

- Âm thanh thư giãn (528Hz) - tiếng lá rơi và mưa
- Baymax đồng hành
- Giới thiệu các tính năng chính

### 3. Trang Stories (`/stories`)

- Nhạc Lofi thư giãn (432Hz)
- Hộp viết thư bong bóng để chia sẻ tâm sự
- Hiệu ứng Baymax an ủi sau khi gửi

### 4. Trang Gợi ý (`/suggestions`)

- Âm thanh suối (396Hz)
- **Góc tĩnh tâm**: Tập trung vào hình ảnh tách trà
- **Minigame**: Thả bong bóng và click để nổ

### 5. Trang Contact (`/contact`)

- Thông tin liên hệ của nhóm phát triển
- Baymax động viên

## 🎵 Tính năng âm thanh

- **528Hz**: Âm thanh thư giãn (lá rơi, mưa) - 45s, có lặp
- **432Hz**: Nhạc Lofi - 4 phút, có lặp
- **396Hz**: Tiếng suối - 5 phút, có lặp

## 🎮 Tính năng tương tác

### Baymax Animation

- Baymax với hiệu ứng ôm trái tim
- Animation floating và hugging
- Xuất hiện để an ủi người dùng

### Minigame Bong bóng

- Tạo bong bóng ngẫu nhiên
- Click để nổ bong bóng
- Đếm điểm và hiển thị lời chúc

### Góc tĩnh tâm

- Timer thiền định
- Tập trung vào hình ảnh tách trà
- Animation nhẹ nhàng

## 🚀 Cài đặt và chạy

```bash
# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm dev

# Build cho production
pnpm build

# Chạy production server
pnpm start
```

## 🛠️ Công nghệ sử dụng

- **Next.js 16**: Framework React
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Lucide React**: Icons

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── welcome/          # Trang chào mừng
│   ├── home/             # Trang chủ
│   ├── stories/          # Trang chia sẻ
│   ├── suggestions/      # Trang gợi ý
│   ├── contact/          # Trang liên hệ
│   ├── layout.tsx        # Layout chính
│   └── page.tsx          # Redirect đến welcome
├── components/
│   ├── Header.tsx        # Header với navigation
│   ├── AudioPlayer.tsx   # Component phát nhạc
│   └── Baymax.tsx        # Component Baymax
└── globals.css           # CSS global và animations
```

## 🎨 Brand Guidelines

- **Slogan**: "We're here to hug you"
- **Logo**: Baymax ôm trái tim
- **Tone**: Ấm áp, thân thiện, hỗ trợ
- **Target**: Sinh viên 18-22 tuổi

## 📝 Ghi chú

- Các file âm thanh cần được thay thế bằng file thực tế
- Có thể tùy chỉnh màu sắc và font chữ trong `globals.css`
- Responsive design hỗ trợ mobile và desktop

---

**Carezone** - Không gian an toàn cho hành trình học tập của bạn 💙
