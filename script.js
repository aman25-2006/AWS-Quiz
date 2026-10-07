/**
 * AWS BUILDER CHALLENGE - EVENT APPLICATION SCRIPT
 * Event: AWS Builder Center Tabling Event
 * Organizer: Aman Kumar, AWS Student Builder Campus Leader
 */

// =============================================================================
// 1. CONFIGURATION (EASILY EDITABLE FOR THE ORGANIZER)
// =============================================================================
// Replace the two placeholder URLs below with your actual links before the event:
const CONFIG = {
  // PASTE YOUR ACTUAL GOOGLE FORM LINK HERE:
  GOOGLE_FORM_URL: "PASTE_GOOGLE_FORM_URL_HERE",

  // PASTE YOUR ACTUAL AWS BUILDER CENTER LINK HERE (default points to AWS Builder Center portal):
  AWS_BUILDER_CENTER_URL: "PASTE_AWS_BUILDER_CENTER_URL_HERE"
};


// =============================================================================
// 2. QUIZ QUESTIONS REPOSITORY (10 BEGINNER-FRIENDLY AWS / CLOUD QUESTIONS)
// =============================================================================
const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Cloud Basics",
    question: "What is cloud computing?",
    options: [
      "On-demand delivery of IT resources over the internet with pay-as-you-go pricing",
      "A weather forecasting software used by meteorologists",
      "Installing physical servers in your college dormitory room",
      "A local backup copy stored on a personal USB flash drive"
    ],
    correctIndex: 0
  },
  {
    id: 2,
    category: "AWS Basics",
    question: "What is Amazon Web Services (AWS)?",
    options: [
      "An online marketplace for buying computer monitors",
      "A comprehensive, evolving cloud computing platform provided by Amazon",
      "An operating system installed exclusively on MacBooks",
      "A home broadband internet connection service"
    ],
    correctIndex: 1
  },
  {
    id: 3,
    category: "Compute",
    question: "What is Amazon EC2 primarily used for?",
    options: [
      "Streaming movies and music to mobile devices",
      "Reserving physical website domain names on the internet",
      "Providing secure, resizable compute capacity (virtual servers) in the cloud",
      "Scanning paper documents into PDF format"
    ],
    correctIndex: 2
  },
  {
    id: 4,
    category: "Storage",
    question: "What is Amazon Simple Storage Service (Amazon S3)?",
    options: [
      "An object storage service that offers industry-leading scalability, data availability, and security",
      "A local graphics card driver update tool",
      "A relational database engine designed for banking transactions",
      "A programming language developed for microcontrollers"
    ],
    correctIndex: 0
  },
  {
    id: 5,
    category: "Serverless",
    question: "What is AWS Lambda?",
    options: [
      "A physical warehouse for storing Amazon retail packages",
      "A serverless compute service that runs code in response to events without managing servers",
      "A web browser designed for testing cloud applications",
      "A desktop antivirus software application"
    ],
    correctIndex: 1
  },
  {
    id: 6,
    category: "Global Infrastructure",
    question: "What is an AWS Region?",
    options: [
      "A physical location around the world where AWS clusters data centers",
      "A single computer rack located in a local university computer lab",
      "A postal zip code used for package delivery tracking",
      "The time zone configured inside a computer operating system clock"
    ],
    correctIndex: 0
  },
  {
    id: 7,
    category: "Global Infrastructure",
    question: "What is an AWS Availability Zone (AZ)?",
    options: [
      "A country-wide network firewall rule",
      "One or more discrete data centers with redundant power, networking, and connectivity within a Region",
      "A mobile network tower located on a national highway",
      "A specific user profile on the AWS management console"
    ],
    correctIndex: 1
  },
  {
    id: 8,
    category: "Databases",
    question: "What is Amazon Relational Database Service (Amazon RDS)?",
    options: [
      "A web design template for mobile responsive apps",
      "A managed service that makes it easy to set up, operate, and scale relational databases in the cloud",
      "A multimedia tool for editing audio and video clips",
      "An email marketing tool for broadcasting weekly newsletters"
    ],
    correctIndex: 1
  },
  {
    id: 9,
    category: "Security & IAM",
    question: "What is AWS Identity and Access Management (IAM) used for?",
    options: [
      "Ordering laptop hardware for enterprise staff members",
      "Securely managing identities, permissions, and access to AWS services and resources",
      "Compressing image files to save hard drive space",
      "Generating temporary fake email addresses for testing forms"
    ],
    correctIndex: 1
  },
  {
    id: 10,
    category: "Storage",
    question: "Which AWS service is commonly used for storing files, media assets, and backups as objects?",
    options: [
      "Amazon S3 (Simple Storage Service)",
      "Amazon Route 53",
      "Amazon Simple Notification Service (SNS)",
      "AWS Direct Connect"
    ],
    correctIndex: 0
  }
];


// =============================================================================
// 3. APPLICATION STATE
// =============================================================================
const state = {
  currentScreen: "welcome", // 'welcome' | 'details' | 'quiz' | 'result'
  participant: {
    fullName: "",
    rollNumber: "",
    email: ""
  },
  currentQuestionIndex: 0,
  selectedAnswers: new Array(QUIZ_QUESTIONS.length).fill(null),
  quizResult: null, // { score, percentage, category, message, resultId, timestamp }
  isSubmitting: false
};


// =============================================================================
// 4. DOM ELEMENTS CACHE
// =============================================================================
const DOM = {
  // Screens
  screens: {
    welcome: document.getElementById("screenWelcome"),
    details: document.getElementById("screenDetails"),
    quiz: document.getElementById("screenQuiz"),
    result: document.getElementById("screenResult")
  },

  // Welcome Screen
  btnStartChallenge: document.getElementById("btnStartChallenge"),

  // Details Screen
  btnBackToWelcome: document.getElementById("btnBackToWelcome"),
  participantForm: document.getElementById("participantForm"),
  inputFullName: document.getElementById("inputFullName"),
  inputRollNumber: document.getElementById("inputRollNumber"),
  inputEmail: document.getElementById("inputEmail"),
  nameError: document.getElementById("nameError"),
  rollError: document.getElementById("rollError"),
  emailError: document.getElementById("emailError"),
  btnContinueToQuiz: document.getElementById("btnContinueToQuiz"),

  // Quiz Screen
  questionCounterText: document.getElementById("questionCounterText"),
  progressPercentageText: document.getElementById("progressPercentageText"),
  quizProgressBar: document.getElementById("quizProgressBar"),
  progressFill: document.getElementById("progressFill"),
  questionCategoryBadge: document.getElementById("questionCategoryBadge"),
  questionText: document.getElementById("questionText"),
  optionsContainer: document.getElementById("optionsContainer"),
  quizValidationWarning: document.getElementById("quizValidationWarning"),
  btnNextQuestion: document.getElementById("btnNextQuestion"),
  btnNextText: document.getElementById("btnNextText"),

  // Result Screen & Card
  resultCard: document.getElementById("resultCard"),
  resResultId: document.getElementById("resResultId"),
  resParticipantName: document.getElementById("resParticipantName"),
  resRollNumber: document.getElementById("resRollNumber"),
  resEmail: document.getElementById("resEmail"),
  resScoreValue: document.getElementById("resScoreValue"),
  resPercentageValue: document.getElementById("resPercentageValue"),
  categoryContainer: document.getElementById("categoryContainer"),
  resCategoryIcon: document.getElementById("resCategoryIcon"),
  resCategoryTitle: document.getElementById("resCategoryTitle"),
  resCategoryMessage: document.getElementById("resCategoryMessage"),
  resTimestampText: document.getElementById("resTimestampText"),
  
  // CTAs
  btnDownloadResult: document.getElementById("btnDownloadResult"),
  linkGoogleForm: document.getElementById("linkGoogleForm"),
  linkAwsBuilderCenter: document.getElementById("linkAwsBuilderCenter"),
  btnRetakeQuiz: document.getElementById("btnRetakeQuiz"),
  exportCanvas: document.getElementById("exportCanvas")
};


// =============================================================================
// 5. HELPER FUNCTIONS
// =============================================================================

/**
 * Switch view screens smoothly
 */
function showScreen(screenKey) {
  Object.keys(DOM.screens).forEach((key) => {
    const screenEl = DOM.screens[key];
    if (key === screenKey) {
      screenEl.hidden = false;
      // Trigger reflow for CSS opacity animation
      void screenEl.offsetWidth;
      screenEl.classList.add("screen-active");
    } else {
      screenEl.classList.remove("screen-active");
      screenEl.hidden = true;
    }
  });

  state.currentScreen = screenKey;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Generate a short 4-character random uppercase alphanumeric Result ID
 * e.g., "AWS-BC-7F42"
 */
function generateResultId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Clean readable chars without confusion
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AWS-BC-${code}`;
}

/**
 * Determine Result Category, Badge, Icon and Encouraging Message
 */
function calculateResultCategory(score) {
  if (score >= 9) {
    return {
      title: "AWS Builder Pro",
      themeClass: "cat-pro",
      icon: "🏆",
      message: "Excellent! You have a strong foundation in AWS and cloud concepts."
    };
  } else if (score >= 7) {
    return {
      title: "Cloud Builder",
      themeClass: "cat-builder",
      icon: "⚡",
      message: "Great job! You already have a good understanding of cloud basics."
    };
  } else if (score >= 5) {
    return {
      title: "Cloud Explorer",
      themeClass: "cat-explorer",
      icon: "🚀",
      message: "Good start! Keep exploring AWS and cloud technologies."
    };
  } else {
    return {
      title: "Getting Started",
      themeClass: "cat-started",
      icon: "🌱",
      message: "Every builder starts somewhere. Keep learning and building!"
    };
  }
}

/**
 * Validate email address format
 */
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}


// =============================================================================
// 6. FORM VALIDATION LOGIC
// =============================================================================

function validateParticipantForm() {
  let isValid = true;

  // Validate Name (min 2 characters)
  const nameVal = DOM.inputFullName.value.trim();
  if (!nameVal) {
    showFieldError(DOM.inputFullName, DOM.nameError, "Please enter your full name.");
    isValid = false;
  } else if (nameVal.length < 2) {
    showFieldError(DOM.inputFullName, DOM.nameError, "Full name must be at least 2 characters.");
    isValid = false;
  } else {
    clearFieldError(DOM.inputFullName, DOM.nameError);
  }

  // Validate Roll Number
  const rollVal = DOM.inputRollNumber.value.trim();
  if (!rollVal) {
    showFieldError(DOM.inputRollNumber, DOM.rollError, "Please enter your college roll number.");
    isValid = false;
  } else if (rollVal.length < 2) {
    showFieldError(DOM.inputRollNumber, DOM.rollError, "Please enter a valid roll number.");
    isValid = false;
  } else {
    clearFieldError(DOM.inputRollNumber, DOM.rollError);
  }

  // Validate Email
  const emailVal = DOM.inputEmail.value.trim();
  if (!emailVal) {
    showFieldError(DOM.inputEmail, DOM.emailError, "Please enter your email address.");
    isValid = false;
  } else if (!isValidEmail(emailVal)) {
    showFieldError(DOM.inputEmail, DOM.emailError, "Please enter a valid email address (e.g. name@domain.com).");
    isValid = false;
  } else {
    clearFieldError(DOM.inputEmail, DOM.emailError);
  }

  return isValid;
}

function showFieldError(inputEl, errorEl, message) {
  inputEl.classList.add("is-invalid");
  errorEl.textContent = message;
  errorEl.classList.add("is-visible");
}

function clearFieldError(inputEl, errorEl) {
  inputEl.classList.remove("is-invalid");
  errorEl.textContent = "";
  errorEl.classList.remove("is-visible");
}


// =============================================================================
// 7. QUIZ RENDER & INTERACTION LOGIC
// =============================================================================

function renderCurrentQuestion() {
  const qIndex = state.currentQuestionIndex;
  const total = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[qIndex];

  // Update progress numbers & bar
  const progressPercent = Math.round(((qIndex + 1) / total) * 100);
  DOM.questionCounterText.textContent = `Question ${qIndex + 1} of ${total}`;
  DOM.progressPercentageText.textContent = `${progressPercent}%`;
  DOM.progressFill.style.width = `${progressPercent}%`;
  DOM.quizProgressBar.setAttribute("aria-valuenow", progressPercent);

  // Update Question Header & Content
  DOM.questionCategoryBadge.textContent = question.category || "Cloud";
  DOM.questionText.textContent = question.question;

  // Clear previous warning
  DOM.quizValidationWarning.hidden = true;

  // Render Answer Options
  DOM.optionsContainer.innerHTML = "";
  const selectedAnswer = state.selectedAnswers[qIndex];

  question.options.forEach((optText, optIdx) => {
    const isSelected = selectedAnswer === optIdx;
    const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `option-btn ${isSelected ? "is-selected" : ""}`;
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", isSelected ? "true" : "false");
    btn.setAttribute("data-opt-index", optIdx);

    btn.innerHTML = `
      <span class="option-indicator" aria-hidden="true">${optionLetter}</span>
      <span class="option-text">${optText}</span>
    `;

    btn.addEventListener("click", () => handleSelectOption(optIdx));
    DOM.optionsContainer.appendChild(btn);
  });

  // Update Next / Submit Button Text & Disabled State
  if (qIndex === total - 1) {
    DOM.btnNextText.textContent = "SUBMIT QUIZ";
  } else {
    DOM.btnNextText.textContent = "NEXT QUESTION";
  }

  DOM.btnNextQuestion.disabled = selectedAnswer === null;
}

function handleSelectOption(optIdx) {
  state.selectedAnswers[state.currentQuestionIndex] = optIdx;
  DOM.quizValidationWarning.hidden = true;

  // Update UI selection highlights
  const allOptionBtns = DOM.optionsContainer.querySelectorAll(".option-btn");
  allOptionBtns.forEach((btn, index) => {
    const isSelected = index === optIdx;
    btn.classList.toggle("is-selected", isSelected);
    btn.setAttribute("aria-checked", isSelected ? "true" : "false");
  });

  // Enable Next button
  DOM.btnNextQuestion.disabled = false;
}

function handleNextOrSubmit() {
  const currentAnswer = state.selectedAnswers[state.currentQuestionIndex];
  
  if (currentAnswer === null) {
    DOM.quizValidationWarning.hidden = false;
    return;
  }

  // If there are more questions, advance
  if (state.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
    state.currentQuestionIndex++;
    renderCurrentQuestion();
    window.scrollTo({ top: 120, behavior: "smooth" });
  } else {
    // Final question submission
    submitQuiz();
  }
}


// =============================================================================
// 8. SCORE CALCULATION & RESULT SCREEN
// =============================================================================

function submitQuiz() {
  if (state.isSubmitting) return;
  state.isSubmitting = true;

  // Automatically calculate score: number of correct answers
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q, index) => {
    if (state.selectedAnswers[index] === q.correctIndex) {
      correctCount++;
    }
  });

  const totalQuestions = QUIZ_QUESTIONS.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const categoryInfo = calculateResultCategory(correctCount);
  const resultId = generateResultId();

  // Format current date & time
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const timeFormatted = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const timestampString = `${dateFormatted} • ${timeFormatted}`;

  // Store in state
  state.quizResult = {
    score: correctCount,
    total: totalQuestions,
    percentage: percentage,
    category: categoryInfo,
    resultId: resultId,
    timestamp: timestampString
  };

  // Populate Result Card DOM
  DOM.resResultId.textContent = resultId;
  DOM.resParticipantName.textContent = state.participant.fullName;
  DOM.resRollNumber.textContent = state.participant.rollNumber;
  DOM.resEmail.textContent = state.participant.email;
  DOM.resScoreValue.textContent = correctCount;
  DOM.resPercentageValue.textContent = `${percentage}%`;
  
  DOM.resCategoryIcon.textContent = categoryInfo.icon;
  DOM.resCategoryTitle.textContent = categoryInfo.title;
  DOM.resCategoryMessage.textContent = categoryInfo.message;
  DOM.resTimestampText.textContent = timestampString;

  // Category styling theme
  DOM.categoryContainer.className = `category-result-card ${categoryInfo.themeClass}`;

  // Update External CTA Links with fallback check
  setupCtaLinks();

  // Show result screen
  showScreen("result");
  state.isSubmitting = false;
}


// =============================================================================
// 9. EXTERNAL CTA LINKS MANAGEMENT
// =============================================================================

function setupCtaLinks() {
  // Google Form Link
  DOM.linkGoogleForm.onclick = (e) => {
    if (
      !CONFIG.GOOGLE_FORM_URL || 
      CONFIG.GOOGLE_FORM_URL.includes("PASTE_GOOGLE_FORM_URL_HERE")
    ) {
      e.preventDefault();
      alert(
        "Event Notice:\nThe Google Form link has not been configured yet.\n\nPlease open script.js and update CONFIG.GOOGLE_FORM_URL with your actual form link."
      );
      return;
    }
  };

  if (CONFIG.GOOGLE_FORM_URL && !CONFIG.GOOGLE_FORM_URL.includes("PASTE_GOOGLE_FORM_URL_HERE")) {
    DOM.linkGoogleForm.href = CONFIG.GOOGLE_FORM_URL;
  } else {
    DOM.linkGoogleForm.href = "#";
  }

  // AWS Builder Center Link
  DOM.linkAwsBuilderCenter.onclick = (e) => {
    if (
      !CONFIG.AWS_BUILDER_CENTER_URL || 
      CONFIG.AWS_BUILDER_CENTER_URL.includes("PASTE_AWS_BUILDER_CENTER_URL_HERE")
    ) {
      e.preventDefault();
      // Default to official AWS Builder Center landing if not customized
      window.open("https://builder.aws.amazon.com/", "_blank", "noopener,noreferrer");
      return;
    }
  };

  if (CONFIG.AWS_BUILDER_CENTER_URL && !CONFIG.AWS_BUILDER_CENTER_URL.includes("PASTE_AWS_BUILDER_CENTER_URL_HERE")) {
    DOM.linkAwsBuilderCenter.href = CONFIG.AWS_BUILDER_CENTER_URL;
  } else {
    DOM.linkAwsBuilderCenter.href = "https://builder.aws.amazon.com/";
  }
}


// =============================================================================
// 10. DOWNLOAD RESULT CARD (HIGH RESOLUTION CANVAS IMAGE GENERATOR)
// =============================================================================

function downloadResultCardImage() {
  if (!state.quizResult) return;

  const canvas = DOM.exportCanvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // 1. Clear & Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0e1726");
  bgGrad.addColorStop(0.5, "#131f33");
  bgGrad.addColorStop(1, "#090f19");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle grid pattern
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 2. Card Frame Border
  ctx.strokeStyle = "#2d4263";
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Corner Gold/Orange accents
  ctx.strokeStyle = "#ff9900";
  ctx.lineWidth = 6;
  const cLen = 35;
  // Top-left
  ctx.beginPath(); ctx.moveTo(25, 25 + cLen); ctx.lineTo(25, 25); ctx.lineTo(25 + cLen, 25); ctx.stroke();
  // Top-right
  ctx.beginPath(); ctx.moveTo(width - 25 - cLen, 25); ctx.lineTo(width - 25, 25); ctx.lineTo(width - 25, 25 + cLen); ctx.stroke();
  // Bottom-left
  ctx.beginPath(); ctx.moveTo(25, height - 25 - cLen); ctx.lineTo(25, height - 25); ctx.lineTo(25 + cLen, height - 25); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.moveTo(width - 25 - cLen, height - 25); ctx.lineTo(width - 25, height - 25); ctx.lineTo(width - 25, height - 25 - cLen); ctx.stroke();

  // 3. Header Branding
  ctx.fillStyle = "#ff9900";
  ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("AWS BUILDER CHALLENGE", 65, 85);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("AWS Builder Center Tabling Event  •  College Event Challenge", 65, 115);

  // Result ID Box (Top Right)
  const idBoxW = 220;
  const idBoxH = 46;
  const idBoxX = width - 65 - idBoxW;
  const idBoxY = 65;

  ctx.fillStyle = "#070b13";
  ctx.fillRect(idBoxX, idBoxY, idBoxW, idBoxH);
  ctx.strokeStyle = "#ff9900";
  ctx.lineWidth = 2;
  ctx.strokeRect(idBoxX, idBoxY, idBoxW, idBoxH);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 18px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.fillText(`ID: ${state.quizResult.resultId}`, idBoxX + idBoxW / 2, idBoxY + 30);
  ctx.textAlign = "left"; // reset

  // Divider Line
  ctx.strokeStyle = "#24344d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(65, 145);
  ctx.lineTo(width - 65, 145);
  ctx.stroke();

  // 4. Participant Info Left Column
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("PARTICIPANT NAME", 65, 185);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(state.participant.fullName, 65, 230);

  ctx.fillStyle = "#64748b";
  ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ROLL NUMBER", 65, 275);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 22px 'Courier New', monospace";
  ctx.fillText(state.participant.rollNumber, 65, 305);

  ctx.fillStyle = "#64748b";
  ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("REGISTERED EMAIL", 65, 350);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "18px 'Courier New', monospace";
  ctx.fillText(state.participant.email, 65, 380);

  // 5. Score Cards (Right Column)
  const scoreCardX = 640;
  const scoreCardY = 170;
  const scoreCardW = 495;
  const scoreCardH = 150;

  ctx.fillStyle = "#080e1a";
  ctx.fillRect(scoreCardX, scoreCardY, scoreCardW, scoreCardH);
  ctx.strokeStyle = "#2d4263";
  ctx.lineWidth = 2;
  ctx.strokeRect(scoreCardX, scoreCardY, scoreCardW, scoreCardH);

  // Left Score Value
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("QUIZ SCORE", scoreCardX + 30, scoreCardY + 38);

  ctx.fillStyle = "#ff9900";
  ctx.font = "bold 64px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${state.quizResult.score}`, scoreCardX + 30, scoreCardY + 115);

  ctx.fillStyle = "#64748b";
  ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`/ 10`, scoreCardX + 115, scoreCardY + 115);

  // Vertical split inside score card
  ctx.strokeStyle = "#1c2a40";
  ctx.beginPath();
  ctx.moveTo(scoreCardX + 245, scoreCardY + 20);
  ctx.lineTo(scoreCardX + 245, scoreCardY + scoreCardH - 20);
  ctx.stroke();

  // Right Accuracy Value
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ACCURACY", scoreCardX + 275, scoreCardY + 38);

  ctx.fillStyle = "#10b981";
  ctx.font = "bold 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${state.quizResult.percentage}%`, scoreCardX + 275, scoreCardY + 115);

  // 6. Category Banner
  const catBoxY = 345;
  ctx.fillStyle = "#16233a";
  ctx.fillRect(scoreCardX, catBoxY, scoreCardW, 115);
  ctx.strokeStyle = "#ff9900";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(scoreCardX, catBoxY, scoreCardW, 115);

  ctx.fillStyle = "#ff9900";
  ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("EVENT CATEGORY", scoreCardX + 25, catBoxY + 30);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${state.quizResult.category.icon} ${state.quizResult.category.title}`, scoreCardX + 25, catBoxY + 68);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(state.quizResult.category.message, scoreCardX + 25, catBoxY + 96);

  // 7. Footer Stamp / Verification
  ctx.strokeStyle = "#24344d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(65, 595);
  ctx.lineTo(width - 65, 595);
  ctx.stroke();

  ctx.fillStyle = "#10b981";
  ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("✔ Verified Event Activity Challenge", 65, 630);

  ctx.fillStyle = "#64748b";
  ctx.font = "13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`Timestamp: ${state.quizResult.timestamp}`, 65, 655);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("Organized by Aman Kumar • AWS Student Builder Campus Leader", width - 65, 630);

  ctx.fillStyle = "#475569";
  ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("This is a student-organized event activity and is not an AWS certification exam.", width - 65, 655);
  ctx.textAlign = "left"; // reset

  // 8. Trigger Browser File Download
  try {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `AWS_Builder_Challenge_${state.quizResult.resultId}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Canvas export error:", err);
    alert("Please take a screenshot of your screen to save your result card.");
  }
}


// =============================================================================
// 11. RETAKE / RESET QUIZ
// =============================================================================

function resetQuiz() {
  state.currentQuestionIndex = 0;
  state.selectedAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
  state.quizResult = null;
  state.isSubmitting = false;

  // Clear inputs if requested or let participant retain name
  // To keep it clean and allow another student on the same phone:
  DOM.participantForm.reset();
  clearFieldError(DOM.inputFullName, DOM.nameError);
  clearFieldError(DOM.inputRollNumber, DOM.rollError);
  clearFieldError(DOM.inputEmail, DOM.emailError);

  showScreen("details");
}


// =============================================================================
// 12. EVENT LISTENERS INITIALIZATION
// =============================================================================

function initEventListeners() {
  // Screen 1: Start Challenge
  DOM.btnStartChallenge.addEventListener("click", () => {
    showScreen("details");
  });

  // Screen 2: Back to Welcome
  DOM.btnBackToWelcome.addEventListener("click", () => {
    showScreen("welcome");
  });

  // Real-time input error removal on typing
  DOM.inputFullName.addEventListener("input", () => {
    if (DOM.inputFullName.value.trim().length >= 2) {
      clearFieldError(DOM.inputFullName, DOM.nameError);
    }
  });

  DOM.inputRollNumber.addEventListener("input", () => {
    if (DOM.inputRollNumber.value.trim().length >= 2) {
      clearFieldError(DOM.inputRollNumber, DOM.rollError);
    }
  });

  DOM.inputEmail.addEventListener("input", () => {
    if (isValidEmail(DOM.inputEmail.value.trim())) {
      clearFieldError(DOM.inputEmail, DOM.emailError);
    }
  });

  // Screen 2: Form Submission -> Start Quiz
  DOM.participantForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateParticipantForm()) {
      return;
    }

    state.participant.fullName = DOM.inputFullName.value.trim();
    state.participant.rollNumber = DOM.inputRollNumber.value.trim();
    state.participant.email = DOM.inputEmail.value.trim();

    // Reset quiz answers & start from question 0
    state.currentQuestionIndex = 0;
    state.selectedAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);

    renderCurrentQuestion();
    showScreen("quiz");
  });

  // Screen 3: Next Question / Submit
  DOM.btnNextQuestion.addEventListener("click", handleNextOrSubmit);

  // Screen 4: Download Result Card
  DOM.btnDownloadResult.addEventListener("click", downloadResultCardImage);

  // Screen 4: Take Quiz Again
  DOM.btnRetakeQuiz.addEventListener("click", resetQuiz);
}


// =============================================================================
// 13. BOOTSTRAP APPLICATION
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  showScreen("welcome");
});
