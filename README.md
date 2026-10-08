# AWS Builder Challenge ⚡
> **Interactive Cloud Quiz Web App for the AWS Builder Center Tabling Event**  
> Organized by **Aman Kumar**, AWS Student Builder Campus Leader

---

## 📌 Overview

**AWS Builder Challenge** is a fast, responsive, mobile-first static web application built specifically for physical college tabling events.

Students scan a QR code on the table, enter their basic details (Name, Roll Number, Email), complete a quick 10-question AWS/Cloud challenge on their smartphones, and instantly receive a digital result card with an automatically computed score, completion time, and unique event Result ID. Students then capture a screenshot of the card and submit it via the official event Google Form.

### 🎯 Key Highlights
- **100% Static & Serverless**: Runs completely in the browser; perfect for GitHub Pages.
- **Zero Backend / Zero Database**: No external database or server needed; participant privacy preserved.
- **Strong Fisher-Yates Randomization**: Every participant and every attempt receives a completely randomized question sequence AND randomized answer choices. Prevents serial cheating.
- **Precision Quiz Timer**: Measures real elapsed time (`performance.now()`) from the moment question 1 opens until submit. Frozen on completion for tie-breaker reference.
- **Mobile-First UX**: Large tap targets (52px+), responsive from 320px screens to desktops.
- **Automatic Score Calculation**: Tamper-proof client-side evaluation (0–10 score & percentage).
- **Screenshot-Optimized Digital Card**: Includes Result ID, name, roll number, score, accuracy, completion time, category badge, and verification timestamp.
- **1-Click High-Res Image Download**: Built-in HTML5 Canvas generator saves a crisp result badge PNG image directly to their device.
- **Direct Event Form Integration**: Opens the official Google Form (`https://forms.gle/wGGXvvW8SRhWueuV8`) directly in a new tab.
- **Offline Capable**: Works smoothly even in spotty college campus Wi-Fi once loaded.
- **Strict Compliance**: No fake certification claims; clear student event activity disclaimers.

---

## 🚀 Live Demo & Deployment

- **Repository**: [https://github.com/aman25-2006/AWS-Quiz](https://github.com/aman25-2006/AWS-Quiz)
- **Live GitHub Pages URL**: [https://aman25-2006.github.io/AWS-Quiz/](https://aman25-2006.github.io/AWS-Quiz/)

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
   Shuffled 10-Question Quiz & Timer
   (Fisher-Yates questions & options)
                 ↓
       Automatic Evaluation
  (Score 0-10, percentage, time taken)
                 ↓
      Digital Result Card
  (Result ID, Screenshot instructions)
                 ↓
         Google Form Submission
 (Upload result screenshot + AWS profile)
```

---

## ⚙️ Configuration & Customization

All configuration is centralized at the very top of [`script.js`](./script.js):

```javascript
const CONFIG = {
  // Official Event Google Form Link:
  GOOGLE_FORM_URL: "https://forms.gle/wGGXvvW8SRhWueuV8",

  // AWS Builder Center Portal Link:
  AWS_BUILDER_CENTER_URL: "https://builder.aws.com/"
};
```

---

## 🎲 60-Question Bank & Balanced Selection (Anti-Cheating)

The quiz features a permanent bank of **60 BCA-level technical questions** spanning 5 core domains:
1. **AWS & Cloud Computing** (~15 questions): EC2, S3, RDS, Lambda, VPC, IAM, Regions & AZs, Elasticity, Shared Responsibility, Cloud Economics.
2. **Computer Science & Programming** (~15 questions): Python mental code output, time complexity, list slicing, pointers, recursion, OOP inheritance & encapsulation.
3. **Web, Database & Networking** (~15 questions): SQL indexing, Foreign keys, DROP vs TRUNCATE, Normalization, DNS, HTTP/HTTPS, REST, DOM, TCP vs UDP.
4. **Cybersecurity, AI & General Tech** (~10 questions): Phishing, AuthN vs AuthZ, Password hashing, LLMs, Supervised learning, OS roles, MFA, RAM vs SSD, DDoS.
5. **Light Logical / CS IQ** (~5 questions): Binary conversion, bitwise operations, linear algorithm scaling, logic gates.

### ⚖️ Balanced Selection per Participant
When a student begins, the app randomly draws **10 balanced questions**:
- **3 AWS & Cloud questions**
- **3 Programming questions**
- **2 Web / Database / Networking questions**
- **1 Cybersecurity / AI question**
- **1 Logical / CS IQ question**

Both the question sequence and all 4 options per question are independently shuffled using the unbiased **Fisher-Yates algorithm**. Correct answers are securely matched using stable IDs (`correctAnswerId`).

---

## 🔒 Strict Single-Attempt Rule (Tabling Event Integrity)

To maintain fair competition during physical tabling events:
- **One Attempt Only**: Participants are allowed strictly 1 official attempt per browser session.
- **Session Locking**: On quiz completion, the score and participant record are permanently locked in `sessionStorage`.
- **No Retakes**: All "Take Quiz Again" restart buttons have been removed. If a user refreshes or revisits the page, their locked digital result card is displayed immediately with a reminder to submit their screenshot to the Participation Form.

---

## ⏱️ Completion Time & Tie-Breaking

- The timer starts strictly when the participant begins Question 1 (ignoring time spent on the details form).
- Timer freezes immediately upon submission using high-precision `performance.now()`.
- Displayed clearly on the Result Card and on the downloadable Result Image: exact format `MM:SS` (e.g. `01:42`) and descriptive `(1m 42s)`.
- Actual completion timestamp with seconds (e.g. `Oct 08, 2026 • 02:14:38 PM`) is stamped on both the card and downloaded image.
- Small neutral organizer note: *"Score is the primary result. If scores are tied, completion time may be used as a tie-breaker by the event organizer."*

---

## 🏆 Result Categories

The quiz automatically assigns one of four encouraging event categories:

| Score | Category | Encouraging Note |
| :--- | :--- | :--- |
| **9 – 10** | **AWS Builder Pro** | *Outstanding! You demonstrated an advanced technical foundation across cloud and core computing concepts.* |
| **7 – 8** | **Cloud Builder** | *Great job! You have a solid grasp of cloud infrastructure, programming, and web technologies.* |
| **5 – 6** | **Cloud Explorer** | *Good effort! You understand essential fundamentals. Keep building and exploring AWS tools.* |
| **0 – 4** | **Getting Started** | *Every great engineer starts somewhere. Keep learning, practicing, and building!* |

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

```bash
git add .
git commit -m "Update AWS Builder Challenge with randomization, timer, and Google Form"
git push origin main
git push origin gh-pages
```

### Enable GitHub Pages:
1. Go to your repository settings:  
   `https://github.com/aman25-2006/AWS-Quiz/settings/pages`
2. Under **Build and deployment** > **Source**:
   - Choose **Deploy from a branch** -> branch: `main` (or `gh-pages`) -> `/ (root)`.
   - *Or* choose **GitHub Actions** to deploy via the `.github/workflows/deploy.yml` workflow.
3. Within 1–2 minutes, your website will be live at:  
   👉 **`https://aman25-2006.github.io/AWS-Quiz/`**

---

## 📁 Project Structure

```text
AWS-Quiz/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions auto-deploy to GitHub Pages
├── assets/
│   └── favicon.svg         # SVG Cloud & Builder tab icon
├── index.html              # Main Single Page Application structure
├── style.css               # Responsive AWS-styled mobile-first CSS
├── script.js               # Logic, questions, validation, timer, canvas generator
└── README.md               # Event guide and documentation
```

---

## 🛡️ Disclaimer
This web app is an interactive educational activity created for the **AWS Builder Center Tabling Event** organized by **Aman Kumar**, AWS Student Builder Campus Leader. It is not an official AWS certification examination.
