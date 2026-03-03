Website Analyzer

A modern web performance analysis dashboard powered by Google PageSpeed Insights.

This tool allows users to enter any website URL and instantly view:

⚡ Performance Score

🔍 SEO Score

♿ Accessibility Score

📊 Core Web Vitals (LCP, CLS, INP)

📈 Interactive Doughnut Chart

🧠 Smart Performance Recommendations

📋 Detailed Report Table

🌟 Features
🔹 1. Beautiful Modern UI

Glassmorphism design

Gradient-based theme

Smooth fade-in animations

Responsive dashboard layout

🔹 2. Live Performance Analysis

Fetches real-time website metrics from backend API:

fetch(`http://localhost:5000/analyze?url=${url}`)
🔹 3. Core Web Vitals

Displays:

LCP (Largest Contentful Paint)

CLS (Cumulative Layout Shift)

INP (Interaction to Next Paint)

Each metric is categorized as:

🟢 Good

🟡 Needs Improvement

🔴 Poor

🔹 4. Interactive Chart

Uses Chart.js to display:

Performance

SEO

Accessibility

As a dynamic doughnut chart.

🔹 5. Smart Recommendations Engine

Based on score thresholds:

Performance improvements

Accessibility fixes

SEO enhancements

Core Web Vitals suggestions

🛠 Tech Stack

Frontend:

HTML5 

index

CSS3 (Glassmorphism UI) 

style

Vanilla JavaScript 

script

Chart.js

Backend (Expected):

Node.js

Express.js

Google PageSpeed Insights API

📂 Project Structure
Website-Analyzer/
│
├── index.html
├── style.css
├── script.js
├── README.md
▶️ How To Run Locally
1️⃣ Clone the Repository
git clone https://github.com/yourusername/Website-Analyzer.git
cd Website-Analyzer
2️⃣ Start Backend Server

Make sure your backend runs on:

http://localhost:5000
3️⃣ Open Frontend

Open:

index.html

in your browser.

🔮 Future Improvements

🌍 Deploy backend to Render / Railway

🔐 Add API key security

📊 Add historical comparison

📱 Improve mobile UI

🌙 Add dark/light theme toggle

📈 Add Lighthouse category breakdown

📸 Preview

Modern dashboard includes:

Animated score counters

Core Web Vitals badges

Glass UI cards

Real-time performance chart

Smart recommendations list

👩‍💻 Author

Shruthi Sagar

Built as a real-world API integration project to demonstrate:

API consumption

Performance analytics

Data visualization

Clean UI/UX implementation
