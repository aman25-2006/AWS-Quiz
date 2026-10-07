# AWS Builder Challenge ⚡
> **Interactive Cloud Quiz Web App for the AWS Builder Center Tabling Event**  
> Organized by **Aman Kumar**, AWS Student Builder Campus Leader

---

## 📌 Overview

**AWS Builder Challenge** is a fast, responsive, mobile-first static web application built specifically for physical college tabling events.

Students scan a QR code on the table, enter their basic details (Name, Roll Number, Email), complete a quick 10-question AWS/Cloud challenge on their smartphones, and instantly receive a digital result card with an automatically computed score and unique event Result ID. Students then capture a screenshot of the card and submit it via the event Google Form.

### 🎯 Key Highlights
- **100% Static & Serverless**: Runs completely in the browser; perfect for GitHub Pages.
- **Zero Backend / Zero Database**: No external database or server needed; participant privacy preserved.
- **Mobile-First UX**: Large tap targets (52px+), responsive from 320px screens to desktops.
- **Automatic Score Calculation**: Tamper-proof client-side evaluation (0–10 score & percentage).
- **Screenshot-Optimized Digital Card**: Includes Result ID, name, roll number, category badge, and verification timestamp.
- **1-Click High-Res Image Download**: Built-in HTML5 Canvas generator saves a crisp result badge PNG image directly to their device.
- **Offline Capable**: Works smoothly even in spotty college campus Wi-Fi once loaded.
- **Strict Compliance**: No fake certification claims; clear student event activity disclaimers.

---

## 🚀 Live Demo & Deployment

- **Repository**: [https://github.com/aman25-2006/aws-builder-challenge](https://github.com/aman25-2006/aws-builder-challenge)
- **Live GitHub Pages URL**: [https://aman25-2006.github.io/aws-builder-challenge/](https://aman25-2006.github.io/aws-builder-challenge/)

---

## 📱 Participant Journey

```text
       QR Code at Tabling Event
                 ↓
           Welcome Screen
   (Event context, organizer info)
                 ↓
    Participant Details Form
   (Name, Roll Number, Email)
                 ↓
      10-Question Cloud Quiz
  (Single-choice, progress tracking)
                 ↓
       Automatic Evaluation
  (Score 0-10, percentage, category)
                 ↓
      Digital Result Card
  (Result ID, Screenshot instructions)
                 ↓
         Google Form Submission
 (Upload result screenshot + AWS profile)
```

---

## ⚙️ Configuration & Customization

All configuration is centralized at the very top of [`script.js`](./script.js).

### 1. How to Change the Google Form URL
Open `script.js` in any text editor and find the `CONFIG` object on line 12:

```javascript
const CONFIG = {
  // PASTE YOUR ACTUAL GOOGLE FORM LINK HERE:
  GOOGLE_FORM_URL: "https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/viewform",

  // PASTE YOUR ACTUAL AWS BUILDER CENTER LINK HERE:
  AWS_BUILDER_CENTER_URL: "https://builder.aws.amazon.com/"
};
```

Replace `"PASTE_GOOGLE_FORM_URL_HERE"` with your actual Google Form URL.

### 2. How to Change the AWS Builder Center Link
In the same `CONFIG` block in `script.js`:
```javascript
  AWS_BUILDER_CENTER_URL: "https://builder.aws.amazon.com/"
```
Paste your custom campus referral link or community page link.

---

## ✏️ How to Edit or Add Quiz Questions

All questions are located in the `QUIZ_QUESTIONS` array in [`script.js`](./script.js):

```javascript
{
  id: 1,
  category: "Cloud Basics",
  question: "What is cloud computing?",
  options: [
    "On-demand delivery of IT resources over the internet with pay-as-you-go pricing", // Index 0
    "A weather forecasting software used by meteorologists",                             // Index 1
    "Installing physical servers in your college dormitory room",                        // Index 2
    "A local backup copy stored on a personal USB flash drive"                           // Index 3
  ],
  correctIndex: 0 // Indicates option A is the correct answer
}
```

- Each question has **4 options**.
- Set `correctIndex` from `0` to `3` to define the correct answer (`0 = A`, `1 = B`, `2 = C`, `3 = D`).
- Answers are evaluated only upon submission and are never exposed in the UI beforehand.

---

## 🏆 Result Categories

The quiz automatically assigns one of four encouraging event categories:

| Score | Category | Encouraging Note |
| :--- | :--- | :--- |
| **9 – 10** | **AWS Builder Pro** | *Excellent! You have a strong foundation in AWS and cloud concepts.* |
| **7 – 8** | **Cloud Builder** | *Great job! You already have a good understanding of cloud basics.* |
| **5 – 6** | **Cloud Explorer** | *Good start! Keep exploring AWS and cloud technologies.* |
| **0 – 4** | **Getting Started** | *Every builder starts somewhere. Keep learning and building!* |

> *Note: These are fun event participation titles and are explicitly not official AWS certifications.*

---

## 💻 How to Run Locally

You do not need to install Node or any server dependencies.

### Option 1: Direct File Opening
Double-click `index.html` to open it in your browser (Google Chrome, Firefox, Safari, or Edge).

### Option 2: Local HTTP Server (Recommended for testing downloads)
Using Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

Using Node / npx:
```bash
npx serve .
```

---

## 📦 How to Push to GitHub & Enable GitHub Pages

### Step 1: Initialize Git and Commit
From this folder (`c:\Users\Aman\Desktop\AWS-QUIZ`):

```bash
git init
git add .
git commit -m "Initial release: AWS Builder Challenge web app"
git branch -M main
```

### Step 2: Create the Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Repository name: `aws-builder-challenge`
3. Description: `Interactive AWS Builder Challenge quiz for college tabling event`
4. Set visibility to **Public**.
5. Do **NOT** initialize with README, .gitignore, or license (we already created them).
6. Click **Create repository**.

### Step 3: Link and Push
```bash
git remote add origin https://github.com/aman25-2006/aws-builder-challenge.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository settings:  
   `https://github.com/aman25-2006/aws-builder-challenge/settings/pages`
2. Under **Build and deployment** > **Source**:
   - Select **GitHub Actions** (the included `.github/workflows/deploy.yml` workflow will automatically build and deploy the app).
   - *Alternatively*, select **Deploy from a branch**, choose `main` branch, and root `/ (root)`.
3. Within 1–2 minutes, your website will be live at:  
   👉 **`https://aman25-2006.github.io/aws-builder-challenge/`**

---

## 📁 Project Structure

```text
AWS-QUIZ/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions auto-deploy to GitHub Pages
├── assets/
│   └── favicon.svg         # SVG Cloud & Builder tab icon
├── index.html              # Main Single Page Application structure
├── style.css               # Responsive AWS-styled mobile-first CSS
├── script.js               # Logic, questions, validation, canvas generator
└── README.md               # Event guide and documentation
```

---

## 🛡️ Disclaimer
This web app is an interactive educational activity created for the **AWS Builder Center Tabling Event** organized by **Aman Kumar**, AWS Student Builder Campus Leader. It is not an official AWS certification examination.
