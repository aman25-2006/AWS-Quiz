/**
 * AWS BUILDER CHALLENGE - EVENT APPLICATION SCRIPT
 * Event: AWS Builder Center Tabling Event
 * Organizer: Aman Kumar, AWS Student Builder Campus Leader
 */

// =============================================================================
// 1. CONFIGURATION (EASILY EDITABLE FOR THE ORGANIZER)
// =============================================================================
const CONFIG = {
  // Official Event Google Form Link for Screenshot Submission:
  GOOGLE_FORM_URL: "https://forms.gle/wGGXvvW8SRhWueuV8",

  // AWS Builder Center Portal Link:
  AWS_BUILDER_CENTER_URL: "https://builder.aws.amazon.com/"
};


// =============================================================================
// 2. MASTER QUESTIONS REPOSITORY (10 BEGINNER-FRIENDLY AWS / CLOUD QUESTIONS)
// Each question has a unique ID, stable option IDs, and a correctAnswerId.
// Questions and their options are dynamically shuffled using Fisher-Yates on every attempt.
// =============================================================================
const MASTER_QUESTIONS = [
  {
    id: "q_cloud_computing",
    category: "Cloud Basics",
    question: "What is cloud computing?",
    options: [
      { id: "cc_opt_correct", text: "On-demand delivery of IT resources over the internet with pay-as-you-go pricing" },
      { id: "cc_opt_weather", text: "A weather forecasting software used by meteorologists" },
      { id: "cc_opt_dorm", text: "Installing physical servers in your college dormitory room" },
      { id: "cc_opt_usb", text: "A local backup copy stored on a personal USB flash drive" }
    ],
    correctAnswerId: "cc_opt_correct"
  },
  {
    id: "q_aws_overview",
    category: "AWS Basics",
    question: "What is Amazon Web Services (AWS)?",
    options: [
      { id: "aws_opt_monitor", text: "An online marketplace for buying computer monitors" },
      { id: "aws_opt_correct", text: "A comprehensive, evolving cloud computing platform provided by Amazon" },
      { id: "aws_opt_mac", text: "An operating system installed exclusively on MacBooks" },
      { id: "aws_opt_isp", text: "A home broadband internet connection service" }
    ],
    correctAnswerId: "aws_opt_correct"
  },
  {
    id: "q_ec2_compute",
    category: "Compute",
    question: "What is Amazon EC2 primarily used for?",
    options: [
      { id: "ec2_opt_stream", text: "Streaming movies and music to mobile devices" },
      { id: "ec2_opt_domain", text: "Reserving physical website domain names on the internet" },
      { id: "ec2_opt_correct", text: "Providing secure, resizable compute capacity (virtual servers) in the cloud" },
      { id: "ec2_opt_scan", text: "Scanning paper documents into PDF format" }
    ],
    correctAnswerId: "ec2_opt_correct"
  },
  {
    id: "q_s3_storage",
    category: "Storage",
    question: "What is Amazon Simple Storage Service (Amazon S3)?",
    options: [
      { id: "s3_opt_correct", text: "An object storage service that offers industry-leading scalability, data availability, and security" },
      { id: "s3_opt_gpu", text: "A local graphics card driver update tool" },
      { id: "s3_opt_bank", text: "A relational database engine designed for banking transactions" },
      { id: "s3_opt_micro", text: "A programming language developed for microcontrollers" }
    ],
    correctAnswerId: "s3_opt_correct"
  },
  {
    id: "q_lambda_serverless",
    category: "Serverless",
    question: "What is AWS Lambda?",
    options: [
      { id: "lmb_opt_retail", text: "A physical warehouse for storing Amazon retail packages" },
      { id: "lmb_opt_correct", text: "A serverless compute service that runs code in response to events without managing servers" },
      { id: "lmb_opt_browser", text: "A web browser designed for testing cloud applications" },
      { id: "lmb_opt_av", text: "A desktop antivirus software application" }
    ],
    correctAnswerId: "lmb_opt_correct"
  },
  {
    id: "q_region_infra",
    category: "Global Infrastructure",
    question: "What is an AWS Region?",
    options: [
      { id: "reg_opt_correct", text: "A physical location around the world where AWS clusters data centers" },
      { id: "reg_opt_lab", text: "A single computer rack located in a local university computer lab" },
      { id: "reg_opt_zip", text: "A postal zip code used for package delivery tracking" },
      { id: "reg_opt_clock", text: "The time zone configured inside a computer operating system clock" }
    ],
    correctAnswerId: "reg_opt_correct"
  },
  {
    id: "q_az_infra",
    category: "Global Infrastructure",
    question: "What is an AWS Availability Zone (AZ)?",
    options: [
      { id: "az_opt_firewall", text: "A country-wide network firewall rule" },
      { id: "az_opt_correct", text: "One or more discrete data centers with redundant power, networking, and connectivity within a Region" },
      { id: "az_opt_tower", text: "A mobile network tower located on a national highway" },
      { id: "az_opt_profile", text: "A specific user profile on the AWS management console" }
    ],
    correctAnswerId: "az_opt_correct"
  },
  {
    id: "q_rds_database",
    category: "Databases",
    question: "What is Amazon Relational Database Service (Amazon RDS)?",
    options: [
      { id: "rds_opt_template", text: "A web design template for mobile responsive apps" },
      { id: "rds_opt_correct", text: "A managed service that makes it easy to set up, operate, and scale relational databases in the cloud" },
      { id: "rds_opt_video", text: "A multimedia tool for editing audio and video clips" },
      { id: "rds_opt_newsletter", text: "An email marketing tool for broadcasting weekly newsletters" }
    ],
    correctAnswerId: "rds_opt_correct"
  },
  {
    id: "q_iam_security",
    category: "Security & IAM",
    question: "What is AWS Identity and Access Management (IAM) used for?",
    options: [
      { id: "iam_opt_hardware", text: "Ordering laptop hardware for enterprise staff members" },
      { id: "iam_opt_correct", text: "Securely managing identities, permissions, and access to AWS services and resources" },
      { id: "iam_opt_compress", text: "Compressing image files to save hard drive space" },
      { id: "iam_opt_fake", text: "Generating temporary fake email addresses for testing forms" }
    ],
    correctAnswerId: "iam_opt_correct"
  },
  {
    id: "q_object_storage_service",
    category: "Storage",
    question: "Which AWS service is commonly used for storing files, media assets, and backups as objects?",
    options: [
      { id: "obj_opt_s3_correct", text: "Amazon S3 (Simple Storage Service)" },
      { id: "obj_opt_route53", text: "Amazon Route 53" },
      { id: "obj_opt_sns", text: "Amazon Simple Notification Service (SNS)" },
      { id: "obj_opt_direct", text: "AWS Direct Connect" }
    ],
    correctAnswerId: "obj_opt_s3_correct"
  }
];


// =============================================================================
// 3. TRUE UNBIASED RANDOMIZATION (FISHER-YATES SHUFFLE)
// =============================================================================

/**
 * Standard Fisher-Yates (Knuth) Shuffle algorithm.
 * Guarantees uniform, unbiased permutations without mutating original array.
 */
function fisherYatesShuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Generates a completely new randomized quiz session:
 * 1. Randomizes the complete question order across all 10 questions.
 * 2. Independently randomizes the 4 answer choices for each question.
 * Correct answers remain reliably matched via stable correctAnswerId.
 */
function createRandomizedQuizSession() {
  const shuffledQuestions = fisherYatesShuffle(MASTER_QUESTIONS);
  return shuffledQuestions.map((q) => ({
    ...q,
    options: fisherYatesShuffle(q.options)
  }));
}


// =============================================================================
// 4. APPLICATION STATE & ACCURATE TIMER
// =============================================================================
const state = {
  currentScreen: "welcome", // 'welcome' | 'details' | 'quiz' | 'result'
  participant: {
    fullName: "",
    rollNumber: "",
    email: ""
  },
  activeQuestions: [], // Shuffled on each quiz attempt
  currentQuestionIndex: 0,
  selectedAnswerIds: [], // Stores selected option ID for each question
  quizResult: null, // { score, total, percentage, timeSeconds, timeFormatted, category, resultId, timestamp }
  isSubmitting: false
};

// Accurate Timer Tracking variables
let quizStartTime = null;
let timerInterval = null;
let finalElapsedMs = 0;

/**
 * High-precision timestamp with safe fallback
 */
function getTimestamp() {
  return (typeof performance !== "undefined" && performance.now) 
    ? performance.now() 
    : Date.now();
}

/**
 * Start quiz timer when participant actually enters the first quiz question
 */
function startQuizTimer() {
  stopQuizTimer(); // Ensure any previous interval is cleared
  quizStartTime = getTimestamp();
  finalElapsedMs = 0;
  updateTimerDisplay(0);

  // Update timer display smoothly
  timerInterval = setInterval(() => {
    if (quizStartTime === null) return;
    const now = getTimestamp();
    const elapsedMs = Math.max(0, now - quizStartTime);
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    updateTimerDisplay(elapsedSeconds);
  }, 500);
}

/**
 * Stop quiz timer immediately upon quiz submission and freeze time
 */
function stopQuizTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (quizStartTime !== null) {
    const now = getTimestamp();
    finalElapsedMs = Math.max(0, now - quizStartTime);
  }
}

/**
 * Format elapsed seconds into standard MM:SS string
 * Guarantees no NaN, Infinity, or undefined
 */
function formatTime(totalSeconds) {
  if (isNaN(totalSeconds) || !isFinite(totalSeconds) || totalSeconds < 0) {
    return "00:00";
  }
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(mins)}:${pad(secs)}`;
}

/**
 * Update the subtle header timer element in the quiz UI
 */
function updateTimerDisplay(totalSeconds) {
  if (DOM.quizTimerDisplay) {
    DOM.quizTimerDisplay.textContent = formatTime(totalSeconds);
  }
}


// =============================================================================
// 5. DOM ELEMENTS CACHE
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

  // Quiz Screen & Timer
  questionCounterText: document.getElementById("questionCounterText"),
  progressPercentageText: document.getElementById("progressPercentageText"),
  quizTimerDisplay: document.getElementById("quizTimerDisplay"),
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
  resTimeValue: document.getElementById("resTimeValue"),
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
// 6. HELPER FUNCTIONS
// =============================================================================

/**
 * Switch view screens smoothly
 */
function showScreen(screenKey) {
  Object.keys(DOM.screens).forEach((key) => {
    const screenEl = DOM.screens[key];
    if (key === screenKey) {
      screenEl.hidden = false;
      void screenEl.offsetWidth; // Trigger reflow for CSS opacity animation
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
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Clean readable chars
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
// 7. FORM VALIDATION LOGIC
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
// 8. QUIZ RENDER & INTERACTION LOGIC
// =============================================================================

function renderCurrentQuestion() {
  const qIndex = state.currentQuestionIndex;
  const total = state.activeQuestions.length;
  const question = state.activeQuestions[qIndex];

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
  const selectedOptionId = state.selectedAnswerIds[qIndex];

  question.options.forEach((opt, optIdx) => {
    const isSelected = selectedOptionId === opt.id;
    const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `option-btn ${isSelected ? "is-selected" : ""}`;
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", isSelected ? "true" : "false");
    btn.setAttribute("data-option-id", opt.id);

    btn.innerHTML = `
      <span class="option-indicator" aria-hidden="true">${optionLetter}</span>
      <span class="option-text">${opt.text}</span>
    `;

    btn.addEventListener("click", () => handleSelectOption(opt.id));
    DOM.optionsContainer.appendChild(btn);
  });

  // Update Next / Submit Button Text & Disabled State
  if (qIndex === total - 1) {
    DOM.btnNextText.textContent = "SUBMIT QUIZ";
  } else {
    DOM.btnNextText.textContent = "NEXT QUESTION";
  }

  DOM.btnNextQuestion.disabled = selectedOptionId === null || selectedOptionId === undefined;
}

function handleSelectOption(optionId) {
  state.selectedAnswerIds[state.currentQuestionIndex] = optionId;
  DOM.quizValidationWarning.hidden = true;

  // Update UI selection highlights
  const allOptionBtns = DOM.optionsContainer.querySelectorAll(".option-btn");
  allOptionBtns.forEach((btn) => {
    const isSelected = btn.getAttribute("data-option-id") === optionId;
    btn.classList.toggle("is-selected", isSelected);
    btn.setAttribute("aria-checked", isSelected ? "true" : "false");
  });

  // Enable Next button
  DOM.btnNextQuestion.disabled = false;
}

function handleNextOrSubmit() {
  const currentAnswerId = state.selectedAnswerIds[state.currentQuestionIndex];
  
  if (!currentAnswerId) {
    DOM.quizValidationWarning.hidden = false;
    return;
  }

  // If there are more questions, advance
  if (state.currentQuestionIndex < state.activeQuestions.length - 1) {
    state.currentQuestionIndex++;
    renderCurrentQuestion();
    window.scrollTo({ top: 120, behavior: "smooth" });
  } else {
    // Final question submission
    submitQuiz();
  }
}


// =============================================================================
// 9. SCORE CALCULATION & RESULT SCREEN
// =============================================================================

function submitQuiz() {
  if (state.isSubmitting) return;
  state.isSubmitting = true;

  // 1. Stop and freeze the quiz timer
  stopQuizTimer();
  const totalSeconds = Math.max(0, Math.floor(finalElapsedMs / 1000));
  const timeFormatted = formatTime(totalSeconds);

  // 2. Automatically calculate score comparing selected option ID with correctAnswerId
  let correctCount = 0;
  state.activeQuestions.forEach((q, index) => {
    if (state.selectedAnswerIds[index] === q.correctAnswerId) {
      correctCount++;
    }
  });

  const totalQuestions = state.activeQuestions.length;
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
  const timeOfDayFormatted = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const timestampString = `${dateFormatted} • ${timeOfDayFormatted}`;

  // Store result in state
  state.quizResult = {
    score: correctCount,
    total: totalQuestions,
    percentage: percentage,
    timeSeconds: totalSeconds,
    timeFormatted: timeFormatted,
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
  DOM.resTimeValue.textContent = timeFormatted;
  
  DOM.resCategoryIcon.textContent = categoryInfo.icon;
  DOM.resCategoryTitle.textContent = categoryInfo.title;
  DOM.resCategoryMessage.textContent = categoryInfo.message;
  DOM.resTimestampText.textContent = timestampString;

  // Category styling theme
  DOM.categoryContainer.className = `category-result-card ${categoryInfo.themeClass}`;

  // Update External CTA Links
  setupCtaLinks();

  // Show result screen
  showScreen("result");
  state.isSubmitting = false;
}


// =============================================================================
// 10. EXTERNAL CTA LINKS MANAGEMENT
// =============================================================================

function setupCtaLinks() {
  // Google Form Link (Exact event link)
  DOM.linkGoogleForm.href = CONFIG.GOOGLE_FORM_URL;
  DOM.linkGoogleForm.target = "_blank";
  DOM.linkGoogleForm.rel = "noopener noreferrer";

  // AWS Builder Center Link
  DOM.linkAwsBuilderCenter.href = CONFIG.AWS_BUILDER_CENTER_URL;
  DOM.linkAwsBuilderCenter.target = "_blank";
  DOM.linkAwsBuilderCenter.rel = "noopener noreferrer";
}


// =============================================================================
// 11. DOWNLOAD RESULT CARD (HIGH RESOLUTION CANVAS IMAGE GENERATOR)
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

  // 5. Score Cards (Right Column - 3 Columns: Score, Accuracy, Time Taken)
  const scoreCardX = 570;
  const scoreCardY = 170;
  const scoreCardW = 565;
  const scoreCardH = 145;

  ctx.fillStyle = "#080e1a";
  ctx.fillRect(scoreCardX, scoreCardY, scoreCardW, scoreCardH);
  ctx.strokeStyle = "#2d4263";
  ctx.lineWidth = 2;
  ctx.strokeRect(scoreCardX, scoreCardY, scoreCardW, scoreCardH);

  // Col 1: Score
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SCORE", scoreCardX + 25, scoreCardY + 36);

  ctx.fillStyle = "#ff9900";
  ctx.font = "bold 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${state.quizResult.score}`, scoreCardX + 25, scoreCardY + 105);

  ctx.fillStyle = "#64748b";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`/ 10`, scoreCardX + 90, scoreCardY + 105);

  // Divider 1
  ctx.strokeStyle = "#1c2a40";
  ctx.beginPath();
  ctx.moveTo(scoreCardX + 175, scoreCardY + 20);
  ctx.lineTo(scoreCardX + 175, scoreCardY + scoreCardH - 20);
  ctx.stroke();

  // Col 2: Accuracy
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ACCURACY", scoreCardX + 195, scoreCardY + 36);

  ctx.fillStyle = "#10b981";
  ctx.font = "bold 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${state.quizResult.percentage}%`, scoreCardX + 195, scoreCardY + 105);

  // Divider 2
  ctx.strokeStyle = "#1c2a40";
  ctx.beginPath();
  ctx.moveTo(scoreCardX + 355, scoreCardY + 20);
  ctx.lineTo(scoreCardX + 355, scoreCardY + scoreCardH - 20);
  ctx.stroke();

  // Col 3: Time Taken
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("TIME TAKEN", scoreCardX + 375, scoreCardY + 36);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 44px 'Courier New', monospace";
  ctx.fillText(`${state.quizResult.timeFormatted}`, scoreCardX + 375, scoreCardY + 105);

  // 6. Category Banner
  const catBoxY = 335;
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
  ctx.fillText(`Timestamp: ${state.quizResult.timestamp} • Duration: ${state.quizResult.timeFormatted}`, 65, 655);

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
// 12. RETAKE / RESET QUIZ (GENERATES FRESH RANDOMIZED QUESTION SET)
// =============================================================================

function resetQuiz() {
  stopQuizTimer();
  state.currentQuestionIndex = 0;
  state.activeQuestions = [];
  state.selectedAnswerIds = [];
  state.quizResult = null;
  state.isSubmitting = false;

  // Clear inputs for the next attempt or next student
  DOM.participantForm.reset();
  clearFieldError(DOM.inputFullName, DOM.nameError);
  clearFieldError(DOM.inputRollNumber, DOM.rollError);
  clearFieldError(DOM.inputEmail, DOM.emailError);

  showScreen("details");
}


// =============================================================================
// 13. EVENT LISTENERS INITIALIZATION
// =============================================================================

function initEventListeners() {
  // Screen 1: Start Challenge -> Details Screen
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

  // Screen 2: Form Submission -> Start Quiz with Fresh Randomization & Start Timer
  DOM.participantForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateParticipantForm()) {
      return;
    }

    state.participant.fullName = DOM.inputFullName.value.trim();
    state.participant.rollNumber = DOM.inputRollNumber.value.trim();
    state.participant.email = DOM.inputEmail.value.trim();

    // Generate FRESH randomized question set & shuffled options via Fisher-Yates
    state.activeQuestions = createRandomizedQuizSession();
    state.currentQuestionIndex = 0;
    state.selectedAnswerIds = new Array(state.activeQuestions.length).fill(null);

    // Render first question and switch screen
    renderCurrentQuestion();
    showScreen("quiz");

    // START TIMER NOW (only when entering the first question)
    startQuizTimer();
  });

  // Screen 3: Next Question / Submit
  DOM.btnNextQuestion.addEventListener("click", handleNextOrSubmit);

  // Screen 4: Download Result Card Image
  DOM.btnDownloadResult.addEventListener("click", downloadResultCardImage);

  // Screen 4: Take Quiz Again -> Generates brand new random attempt
  DOM.btnRetakeQuiz.addEventListener("click", resetQuiz);
}


// =============================================================================
// 14. SECURITY: IGNORE ANY ATTEMPTED SCORE MANIPULATION IN URL
// =============================================================================

function sanitizeUrlParams() {
  if (window.location.search) {
    // If URL contains queries like ?score=10, cleanly strip them
    try {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } catch (_) {
      // Ignore if running locally or file protocol
    }
  }
}


// =============================================================================
// 15. BOOTSTRAP APPLICATION
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  sanitizeUrlParams();
  initEventListeners();
  showScreen("welcome");
});
