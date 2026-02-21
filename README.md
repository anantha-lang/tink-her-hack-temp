<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# [ArthaDhan] 🎯

## Basic Details

### Team Name: [Securock]

### Team Members
- Member 1: [Anantha T R] - [Lourdes Matha College of Science and Technology]
- Member 2: [Aswani M S] - [Lourdes Matha College of Science and Technology]

### Hosted Project Link
[mention your project hosted link here]

### Project Description
[Our project ArthaDhan is a trading platform which positions AI as an Intelligent research assistant and opportunity scanner that helps traders discover and eveluate trading opportunities across stocks and commodities]

### The Problem statement
[Indian retail traders face several critical challenges: information overload with 5,000+ tradable
securities, inability to monitor markets continuously, difficulty identifying opportunities that match their
trading style, lack of contextual understanding beyond raw technical/fundamental data, and delayed
discovery of market-moving events. Professional traders and institutions have teams of analysts, retail
traders have none]

### The Solution
[Our platform deploys AI as a personal research analyst that works 24/7 to scan the entire market,
identify patterns and anomalies, contextualize opportunities based on current events and historical
performance, filter results based on user's portfolio and preferences, and present findings with clear
explanations of why something deserves attention and what factors to consider before acting.]

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: [TypeScript, Python,HTML,CSS]
- Frameworks used: [React, Fast API]
- Libraries used: package.json
 (framer-motion, recharts, Tailwind CSS) and requirements.txt(yfinance, pandas)
-  Tools used: [Git Hub, Gemini,Chatgpt,antigravity,terminal]

**For Hardware:**
- Main components: [List main components]
- Specifications: [Technical specifications]
- Tools required: [List tools needed]

---

## Features

List the key features of your project:
- Insights: [AI generated daily summary of overnight market]
- Opportunity Scanner: [Real time identification of stocks and commodities]
- Stock/Community deep dive: [Comprehensive AI analysis ]
- Portfolio Health Check: [Daily AI assesment of portfolio]
- Backtested ideas
- Risk Warnings

---

## Implementation

### For Software:

#### Installation
```bash
# Backend Installation
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
cd ..

# Frontend Installation
cd frontend
npm install
cd ..


#### Run
# Terminal 1: Run Backend
cd backend
.\venv\Scripts\activate
uvicorn main:app --reload --port 8000

# Terminal 2: Run Frontend
cd frontend
npm run dev

### For Hardware:

#### Components Required
[List all components needed with specifications]

#### Circuit Setup
[Explain how to set up the circuit]

---

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

(https://github.com/user-attachments/assets/9a05bc44-ccd6-4cde-846e-3729c78282f5)
ts/landing-page.png)
*Figure 1: The premium dark-themed Landing Page featuring animated typography and glassmorphism design.*

![2](https://github.com/user-attachments/assets/1c594fb5-9a22-4eed-9450-92603ef17229)



![Risk![3](https://github.com/user-attachments/assets/ee9deac3-ef8f-403b-907c-5712a4250480)
*Figure 3: Deep Dive Analysis providing risk analytics, portfolio health breakdowns, and dynamic charting.*
![4](https://github.com/user-attachments/assets/0a3aea94-7afa-49d0-b5fa-7f836b64319d)
![5](https://github.com/user-attachments/assets/c9be5f40-e6ae-4e83-a755-9f52fd1a804a)


#### Diagrams

**System Architecture:**
![7](https://github.com/user-attachments/assets/07791083-5d93-4721-8f4d-95c9bb9778cf)


*The ArthaDhan platform follows a decoupled client-server architecture. The Frontend (Client) is a Single Page Application (SPA) built with React and TypeScript, leveraging Vite for lightning-fast bundling and Tailwind CSS for adaptive styling. It communicates via RESTful APIs via Axios to the Backend (Server). The Backend is an asynchronous Python service built on FastAPI and Uvicorn. It acts as the core engine, utilizing `yfinance` and `pandas` to fetch, sanitize, and analyze live Indian stock market data before serving it back to the client interface for real-time visualization through Recharts and Lightweight Charts.*
*Explain your system architecture - components, data flow, tech stack interaction*

**Application Workflow:**
![8](https://github.com/user-attachments/assets/62f1a777-83c2-41fe-af5f-449bdbca1a28)


1. User Initiation: User accesses the dashboard and requests data (e.g., viewing a specific stock's deep-dive).
2. API Request: The React frontend dispatches an asynchronous HTTP GET request mapping to the target FastAPI endpoint.
3. Data Aggregation: The FastAPI backend securely routes the request, executing yfinance to pull live market constraints and historical candlestick data.
4. Processing: Pandas normalizes the data structures, calculating real-time technical indicators or risk metrics.
5. Delivery & Render: Data is returned as a structured JSON payload to the frontend, which instantly triggers a state update, smoothly animating the Recharts UI with Framer Motion to reflect the new financial data.

---

### For Hardware:

#### Schematic & Circuit

![Circuit](Add your circuit diagram here)
*Add caption explaining connections*

![Schematic](Add your schematic diagram here)
*Add caption explaining the schematic*

#### Build Photos

![Team]![p](https://github.com/user-attachments/assets/45214b46-922f-4efd-b3cf-a59305900de9)


![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

---

## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://api.yourproject.com`

##### Endpoints

**GET /api/endpoint**
- **Description:** [What it does]
- **Parameters:**
  - `param1` (string): [Description]
  - `param2` (integer): [Description]
- **Response:**
```json
{
  "status": "success",
  "data": {}
}
```

**POST /api/endpoint**
- **Description:** [What it does]
- **Request Body:**
```json
{
  "field1": "value1",
  "field2": "value2"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Operation completed"
}
```

[Add more endpoints as needed...]

---

### For Mobile Apps:

#### App Flow Diagram

![App Flow](docs/app-flow.png)
*Explain the user flow through your application*

#### Installation Guide

**For Android (APK):**
1. Download the APK from [Release Link]
2. Enable "Install from Unknown Sources" in your device settings:
   - Go to Settings > Security
   - Enable "Unknown Sources"
3. Open the downloaded APK file
4. Follow the installation prompts
5. Open the app and enjoy!

**For iOS (IPA) - TestFlight:**
1. Download TestFlight from the App Store
2. Open this TestFlight link: [Your TestFlight Link]
3. Click "Install" or "Accept"
4. Wait for the app to install
5. Open the app from your home screen

**Building from Source:**
```bash
# For Android
flutter build apk
# or
./gradlew assembleDebug

# For iOS
flutter build ios
# or
xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug
```

---

### For Hardware Projects:

#### Bill of Materials (BOM)

| Component | Quantity | Specifications | Price | Link/Source |
|-----------|----------|----------------|-------|-------------|
| Arduino Uno | 1 | ATmega328P, 16MHz | ₹450 | [Link] |
| LED | 5 | Red, 5mm, 20mA | ₹5 each | [Link] |
| Resistor | 5 | 220Ω, 1/4W | ₹1 each | [Link] |
| Breadboard | 1 | 830 points | ₹100 | [Link] |
| Jumper Wires | 20 | Male-to-Male | ₹50 | [Link] |
| [Add more...] | | | | |

**Total Estimated Cost:** ₹[Amount]


**Step 4: [Continue for all steps...]**


## Project Demo

### Video
[https://drive.google.com/file/d/1V5luvdsGXdK0DE7NBYAuF1R5sBFdfsr4/view?usp=drive_link]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

Chatgpt,Gemini,Antigravity

**Tool Used:** [GitHub,ChatGPT, Claude]

**Purpose:** [What you used it for]
- Example: "Generated boilerplate React components"
- Example: "Debugging assistance for async functions"
- Example: "Code review and optimization suggestions"

**Key Prompts Used:**
- "Create a REST API endpoint for user authentication"
- "Debug this async function that's causing race conditions"
- "Optimize this database query for better performance"

**Percentage of AI-generated code:** [100%]

**Human Contributions:**
- Architecture design and planning
- Custom business logic implementation
- Integration and testing
- UI/UX design decisions

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- [Aswani M S]: [Specific contributions -Frontend development, API integration]
- [Anantha T R]: [Specific contributions - Backend development, Database design]

---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
