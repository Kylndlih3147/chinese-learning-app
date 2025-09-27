# 🈶 Chinese Pronunciation Practice App

Ứng dụng luyện nói tiếng Trung dành cho người học, giúp:
- Ghi âm giọng nói
- Gửi lên server để đánh giá phát âm
- Nhận điểm số và phản hồi
- Theo dõi lịch sử học tập

---

## 📱 Tính năng chính

- ✅ Hiển thị danh sách câu luyện nói
- 🎙️ Ghi âm giọng nói
- 📤 Gửi file âm thanh đến backend Flask để chấm điểm
- 🧠 Nhận điểm số và phản hồi từ AI
- 📈 Lưu và xem lại lịch sử luyện nói

---

## 📂 Cấu trúc thư mục

    ChinesePronunciationApp/
├── App.js
├── android/
├── ios/
├── assets/
├── navigation/
├── screens/
├── backend/
│   └── app.py

---

## ▶️ Cài đặt và chạy app (React Native)

### 1. Cài đặt dependencies:
npm install hoặc yarn

### 2. Cài React Native CLI nếu chưa có:
npm install -g react-native-cli

### 3. Cài dependencies cho Android (nếu dùng Android Studio):
npx react-native doctor

### 4. Chạy ứng dụng:
npx react-native run-android
hoặc
npx react-native run-ios

---

## ⚙️ Cài đặt backend Flask

### 1. Di chuyển vào thư mục backend:
cd backend

### 2. Tạo môi trường ảo và cài dependencies:
python -m venv venv
source venv/bin/activate  # Hoặc venv\Scripts\activate với Windows
pip install -r requirements.txt

### 3. Chạy server:
python app.py
> Server sẽ chạy tại `http://localhost:5000/evaluate`

---

## 🔁 Kết nối frontend và backend

Sửa file `PracticeScreen.js`:

const response = await fetch('http://<IP máy bạn>:5000/evaluate', { ... });
> Ví dụ: `http://192.168.1.5:5000/evaluate`

---

## 📦 Dependencies chính

### Frontend (React Native)
- `@react-navigation/native`
- `react-native-audio-recorder-player`
- `@react-native-async-storage/async-storage`

### Backend (Python Flask)
- `Flask`
- `SpeechRecognition`
- `pydub`, `librosa` (tuỳ chọn nếu dùng AI nâng cao)

---

## 🛠️ TODO

- [ ] Tự động phát lại âm thanh mẫu
- [ ] Gợi ý chỉnh phát âm nếu sai
- [ ] Đồng bộ dữ liệu với tài khoản học viên

---

## 📝 License

MIT License.
# chinese-learning-app
>>>>>>> 0786e37b55b7d162ac914c4ffffb9b1cfadab351

