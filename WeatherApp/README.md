


# 🌤️ React Weather App

A sleek and responsive weather forecast app built using **ReactJS** and the [OpenWeatherMap API](https://openweathermap.org/api). This app allows users to search for any city worldwide and view both current weather and a 4-day forecast.

---

## 🚀 Features

- Real-time weather information
- 4-day weather forecast
- Clean and responsive UI
- Reusable components
- Background styling and blur effects for visual clarity

---

## 🖼️ Screenshot

![Weather App Screenshot](./src/assets/Screenshot%20.png)

---

## 🛠️ Getting Started

These instructions will help you set up and run the project on your local machine.

### 🔧 Prerequisites

- Node.js (v16 or later recommended)
- npm 
- A free [OpenWeatherMap API Key](https://openweathermap.org/api)

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/VictorPaulArony/reactjs.git
cd reactjs/WeatherApp
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file in the root of `WeatherApp/` directory**

```env
VITE_API_KEY=your_openweathermap_api_key_here
```

> 💡 Replace `your_openweathermap_api_key_here` with your actual OpenWeatherMap API key.

4. **Start the development server**

```bash
npm run dev
```

Then open your browser and navigate to:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
WeatherApp/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CityDisplay.jsx
│   │   ├── CitySearch.jsx
│   │   ├── Days.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

---

## 🧠 Technologies Used

* ReactJS (with Hooks)
* Vite
* CSS (with backdrop filters and responsive layout)
* OpenWeatherMap API

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 🙌 Acknowledgements

* [OpenWeatherMap API](https://openweathermap.org/api) for providing the weather data
* [React](https://reactjs.org/) for the front-end framework

---
