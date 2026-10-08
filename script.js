/**
 * AWS BUILDER CHALLENGE - EVENT APPLICATION SCRIPT
 * Event: AWS Builder Center Tabling Event
 * Organizer: Aman Kumar, AWS Student Builder Campus Leader
 * Architecture: Static Mobile-First Web App (GitHub Pages Compatible)
 */

// =============================================================================
// 1. CONFIGURATION (EASILY EDITABLE FOR THE ORGANIZER)
// =============================================================================
const CONFIG = {
  // Official Event Google Form Link for Screenshot Submission:
  GOOGLE_FORM_URL: "https://forms.gle/wGGXvvW8SRhWueuV8",

  // Official AWS Builder Center Portal Link:
  AWS_BUILDER_CENTER_URL: "https://builder.aws.com/",

  // Storage keys to enforce strictly ONE ATTEMPT per student:
  STORAGE_KEY_COMPLETED: "aws_builder_challenge_completed",
  STORAGE_KEY_RECORD: "aws_builder_challenge_record"
};


// =============================================================================
// 2. MASTER QUESTIONS REPOSITORY (60 BCA-LEVEL QUESTIONS ACROSS 5 CATEGORIES)
// Balanced Distribution:
// - AWS & Cloud Computing (~15 questions)
// - CS & Programming (~15 questions with short mental code snippets)
// - Web, Database & Networking (~15 questions)
// - Cybersecurity, AI & General Technology (~10 questions)
// - Light Logical / CS IQ (~5 questions)
// =============================================================================
const MASTER_QUESTIONS = [
  // ==========================================
  // CATEGORY 1: AWS & CLOUD COMPUTING (15)
  // ==========================================
  {
    id: "q_aws_01",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Easy",
    question: "Which AWS service is designed for scalable object storage, making it ideal for storing images, videos, and backups?",
    options: [
      { id: "a01_s3", text: "Amazon S3 (Simple Storage Service)" },
      { id: "a01_ec2", text: "Amazon EC2" },
      { id: "a01_rds", text: "Amazon RDS" },
      { id: "a01_ebs", text: "Amazon EBS" }
    ],
    correctAnswerId: "a01_s3"
  },
  {
    id: "q_aws_02",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Easy",
    question: "What is Amazon Elastic Compute Cloud (Amazon EC2) primarily used for?",
    options: [
      { id: "a02_vm", text: "Providing secure, resizable compute capacity (virtual servers) on demand" },
      { id: "a02_dns", text: "Managing public domain name registrations" },
      { id: "a02_cdn", text: "Delivering video content through edge locations" },
      { id: "a02_git", text: "Hosting private Git repositories" }
    ],
    correctAnswerId: "a02_vm"
  },
  {
    id: "q_aws_03",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Moderate",
    question: "Which cloud concept refers to the system's ability to automatically acquire resources when traffic spikes and release them when demand drops?",
    options: [
      { id: "a03_elasticity", text: "Elasticity" },
      { id: "a03_redundancy", text: "Redundancy" },
      { id: "a03_latency", text: "High Latency" },
      { id: "a03_durability", text: "Durability" }
    ],
    correctAnswerId: "a03_elasticity"
  },
  {
    id: "q_aws_04",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Moderate",
    question: "In AWS, what is a defining characteristic of serverless computing with AWS Lambda?",
    options: [
      { id: "a04_event", text: "You run code in response to events and pay only for compute time consumed without managing servers" },
      { id: "a04_manual", text: "You must manually configure and patch operating system kernels" },
      { id: "a04_always", text: "Servers must stay powered on 24/7 regardless of incoming requests" },
      { id: "a04_local", text: "Code only executes on a local laptop connected via USB" }
    ],
    correctAnswerId: "a04_event"
  },
  {
    id: "q_aws_05",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Moderate",
    question: "What is an AWS Availability Zone (AZ)?",
    options: [
      { id: "a05_datacenter", text: "One or more discrete data centers with redundant power, networking, and connectivity within a Region" },
      { id: "a05_continent", text: "An entire continental landmass sharing a single internet provider" },
      { id: "a05_account", text: "A user privilege profile inside the AWS Billing Console" },
      { id: "a05_ip", text: "A public IP subnet reserved exclusively for mobile applications" }
    ],
    correctAnswerId: "a05_datacenter"
  },
  {
    id: "q_aws_06",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Easy",
    question: "Which AWS service is a managed relational database service supporting PostgreSQL, MySQL, and MariaDB?",
    options: [
      { id: "a06_rds", text: "Amazon RDS" },
      { id: "a06_dynamo", text: "Amazon DynamoDB" },
      { id: "a06_s3", text: "Amazon S3 Glacier" },
      { id: "a06_redshift", text: "Amazon CloudSearch" }
    ],
    correctAnswerId: "a06_rds"
  },
  {
    id: "q_aws_07",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Moderate",
    question: "What is the primary difference between Horizontal Scaling and Vertical Scaling in cloud infrastructure?",
    options: [
      { id: "a07_diff", text: "Horizontal adds more server instances; vertical increases CPU/RAM of an existing instance" },
      { id: "a07_disk", text: "Horizontal increases disk size; vertical changes server physical location" },
      { id: "a07_cost", text: "Horizontal costs zero dollars; vertical is billed hourly" },
      { id: "a07_os", text: "Horizontal only works on Linux; vertical only works on Windows" }
    ],
    correctAnswerId: "a07_diff"
  },
  {
    id: "q_aws_08",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Moderate",
    question: "In AWS Identity and Access Management (IAM), what security best practice dictates granting users only the minimum permissions necessary for their tasks?",
    options: [
      { id: "a08_least", text: "Principle of Least Privilege" },
      { id: "a08_max", text: "Principle of Maximum Redundancy" },
      { id: "a08_root", text: "Root Account Delegation Principle" },
      { id: "a08_open", text: "Open Access Security Standard" }
    ],
    correctAnswerId: "a08_least"
  },
  {
    id: "q_aws_09",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Easy",
    question: "Which cloud deployment model enables an organization to seamlessly integrate an on-premises data center with public cloud services?",
    options: [
      { id: "a09_hybrid", text: "Hybrid Cloud" },
      { id: "a09_private", text: "Private Cloud Only" },
      { id: "a09_shadow", text: "Shadow Cloud" },
      { id: "a09_dark", text: "Air-Gapped Cloud" }
    ],
    correctAnswerId: "a09_hybrid"
  },
  {
    id: "q_aws_10",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Moderate",
    question: "Why does AWS organize its global infrastructure into distinct geographic 'Regions'?",
    options: [
      { id: "a10_latency", text: "To minimize latency for nearby end-users and help comply with local data sovereignty laws" },
      { id: "a10_taxes", text: "To enforce equal currency exchange rates across all countries" },
      { id: "a10_limits", text: "To restrict each developer to creating only one application globally" },
      { id: "a10_backup", text: "To prevent data from ever leaving North America" }
    ],
    correctAnswerId: "a10_latency"
  },
  {
    id: "q_aws_11",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Tricky",
    question: "Under the AWS Shared Responsibility Model, which security task is the responsibility of the customer when running an Amazon EC2 instance?",
    options: [
      { id: "a11_patch", text: "Patching the guest operating system and securing application software" },
      { id: "a11_physical", text: "Securing the physical perimeter of the AWS data center facility" },
      { id: "a11_hardware", text: "Replacing faulty physical RAM modules and server racks" },
      { id: "a11_cooling", text: "Maintaining server room air conditioning and power generators" }
    ],
    correctAnswerId: "a11_patch"
  },
  {
    id: "q_aws_12",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Easy",
    question: "Which AWS service is a highly available and scalable cloud Domain Name System (DNS) web service?",
    options: [
      { id: "a12_route53", text: "Amazon Route 53" },
      { id: "a12_cloudfront", text: "Amazon CloudFront" },
      { id: "a12_sns", text: "Amazon SNS" },
      { id: "a12_sqs", text: "Amazon SQS" }
    ],
    correctAnswerId: "a12_route53"
  },
  {
    id: "q_aws_13",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Moderate",
    question: "What type of database service is Amazon DynamoDB?",
    options: [
      { id: "a13_nosql", text: "A fully managed NoSQL key-value and document database providing single-digit millisecond performance" },
      { id: "a13_rdbms", text: "A traditional relational SQL database requiring manual sharding" },
      { id: "a13_flat", text: "A local spreadsheet file stored inside a virtual machine" },
      { id: "a13_graph", text: "An in-memory cache exclusively designed for session cookies" }
    ],
    correctAnswerId: "a13_nosql"
  },
  {
    id: "q_aws_14",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Tricky",
    question: "Which AWS networking service allows you to provision a logically isolated section of the AWS Cloud where you can launch resources in a virtual network you define?",
    options: [
      { id: "a14_vpc", text: "Amazon VPC (Virtual Private Cloud)" },
      { id: "a14_direct", text: "AWS Direct Connect" },
      { id: "a14_shield", text: "AWS Shield" },
      { id: "a14_waf", text: "AWS WAF" }
    ],
    correctAnswerId: "a14_vpc"
  },
  {
    id: "q_aws_15",
    topicKey: "aws",
    category: "AWS & Cloud",
    difficulty: "Easy",
    question: "What financial shift fundamentally distinguishes cloud computing from traditional on-premises IT setups?",
    options: [
      { id: "a15_capex", text: "Trading large upfront Capital Expenses (CapEx) for variable Operational Expenses (OpEx)" },
      { id: "a15_lease", text: "Requiring multi-year hardware leasing contracts before writing code" },
      { id: "a15_free", text: "Eliminating all operating costs forever" },
      { id: "a15_flat", text: "Paying a flat fee regardless of usage or traffic" }
    ],
    correctAnswerId: "a15_capex"
  },

  // ==========================================
  // CATEGORY 2: CS & PROGRAMMING (15)
  // ==========================================
  {
    id: "q_cs_01",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Easy",
    question: "What will be printed by the following Python code snippet?\n\n```python\nx = 9\ny = 2\nprint(x // y)\n```",
    options: [
      { id: "c01_4", text: "4" },
      { id: "c01_45", text: "4.5" },
      { id: "c01_1", text: "1" },
      { id: "c01_5", text: "5" }
    ],
    correctAnswerId: "c01_4"
  },
  {
    id: "q_cs_02",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Moderate",
    question: "What will be the output of this Python slice operation?\n\n```python\nnums = [10, 20, 30, 40, 50]\nprint(nums[1:4])\n```",
    options: [
      { id: "c02_sub", text: "[20, 30, 40]" },
      { id: "c02_all", text: "[10, 20, 30, 40]" },
      { id: "c02_two", text: "[20, 30]" },
      { id: "c02_err", text: "[10, 20, 30]" }
    ],
    correctAnswerId: "c02_sub"
  },
  {
    id: "q_cs_03",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Moderate",
    question: "What is the output of the following Python code?\n\n```python\na = [1, 2]\nb = a\nb.append(3)\nprint(len(a))\n```",
    options: [
      { id: "c03_3", text: "3" },
      { id: "c03_2", text: "2" },
      { id: "c03_1", text: "1" },
      { id: "c03_err", text: "Error: immutable reference" }
    ],
    correctAnswerId: "c03_3"
  },
  {
    id: "q_cs_04",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Moderate",
    question: "What is the time complexity of searching for an element in a sorted array of size N using Binary Search?",
    options: [
      { id: "c04_logn", text: "O(log N)" },
      { id: "c04_n", text: "O(N)" },
      { id: "c04_n2", text: "O(N²)" },
      { id: "c04_1", text: "O(1)" }
    ],
    correctAnswerId: "c04_logn"
  },
  {
    id: "q_cs_05",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Easy",
    question: "In Object-Oriented Programming (OOP), what principle allows a derived subclass to inherit variables and methods from a base superclass?",
    options: [
      { id: "c05_inherit", text: "Inheritance" },
      { id: "c05_polymorph", text: "Polymorphism" },
      { id: "c05_encapsul", text: "Encapsulation" },
      { id: "c05_abstract", text: "Abstraction" }
    ],
    correctAnswerId: "c05_inherit"
  },
  {
    id: "q_cs_06",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Tricky",
    question: "What will be printed to the console?\n\n```javascript\nlet sum = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) continue;\n  sum += i;\n}\nconsole.log(sum);\n```",
    options: [
      { id: "c06_8", text: "8" },
      { id: "c06_10", text: "10" },
      { id: "c06_6", text: "6" },
      { id: "c06_7", text: "7" }
    ],
    correctAnswerId: "c06_8"
  },
  {
    id: "q_cs_07",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Easy",
    question: "Which data structure follows the Last-In, First-Out (LIFO) order of operation?",
    options: [
      { id: "c07_stack", text: "Stack" },
      { id: "c07_queue", text: "Queue" },
      { id: "c07_tree", text: "Binary Tree" },
      { id: "c07_graph", text: "Graph" }
    ],
    correctAnswerId: "c07_stack"
  },
  {
    id: "q_cs_08",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Moderate",
    question: "What does this Python expression evaluate to?\n\n```python\nprint(bool([]) or bool(0) or bool(\"Cloud\"))\n```",
    options: [
      { id: "c08_true", text: "True" },
      { id: "c08_false", text: "False" },
      { id: "c08_cloud", text: "\"Cloud\"" },
      { id: "c08_none", text: "None" }
    ],
    correctAnswerId: "c08_true"
  },
  {
    id: "q_cs_09",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Moderate",
    question: "In C and C++, what value is stored in a pointer variable?",
    options: [
      { id: "c09_addr", text: "The memory address of another variable" },
      { id: "c09_val", text: "The numerical square root of the target value" },
      { id: "c09_name", text: "The variable name string as ASCII characters" },
      { id: "c09_type", text: "The byte size of the operating system" }
    ],
    correctAnswerId: "c09_addr"
  },
  {
    id: "q_cs_10",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Easy",
    question: "What is the key functional difference between a Compiler and an Interpreter?",
    options: [
      { id: "c10_diff", text: "A compiler translates entire source code into machine code prior to execution; an interpreter translates and executes line-by-line" },
      { id: "c10_db", text: "A compiler works only with SQL databases; an interpreter works only with operating systems" },
      { id: "c10_speed", text: "An interpreter produces native binaries; a compiler only works inside a web browser" },
      { id: "c10_hardware", text: "A compiler requires an active internet connection to run code" }
    ],
    correctAnswerId: "c10_diff"
  },
  {
    id: "q_cs_11",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Moderate",
    question: "What will be printed by the following Python statement?\n\n```python\ns = \"aws\"\nprint(s * 3)\n```",
    options: [
      { id: "c11_rep", text: "awsawsaws" },
      { id: "c11_err", text: "TypeError: cannot multiply sequence by int" },
      { id: "c11_space", text: "aws aws aws" },
      { id: "c11_num", text: "aws3" }
    ],
    correctAnswerId: "c11_rep"
  },
  {
    id: "q_cs_12",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Moderate",
    question: "In OOP, bundling data fields and methods together inside a single class while restricting direct external access is known as:",
    options: [
      { id: "c12_encaps", text: "Encapsulation" },
      { id: "c12_poly", text: "Polymorphism" },
      { id: "c12_recurs", text: "Recursion" },
      { id: "c12_thread", text: "Multithreading" }
    ],
    correctAnswerId: "c12_encaps"
  },
  {
    id: "q_cs_13",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Tricky",
    question: "What is the worst-case time complexity of standard Bubble Sort when sorting an unsorted array of size N?",
    options: [
      { id: "c13_n2", text: "O(N²)" },
      { id: "c13_nlogn", text: "O(N log N)" },
      { id: "c13_n", text: "O(N)" },
      { id: "c13_1", text: "O(1)" }
    ],
    correctAnswerId: "c13_n2"
  },
  {
    id: "q_cs_14",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Moderate",
    question: "What will the following code output?\n\n```javascript\nconst nums = [1, 2, 3];\nconst mapped = nums.map(n => n * 2);\nconsole.log(mapped);\n```",
    options: [
      { id: "c14_res", text: "[2, 4, 6]" },
      { id: "c14_same", text: "[1, 2, 3]" },
      { id: "c14_add", text: "[3, 4, 5]" },
      { id: "c14_sum", text: "12" }
    ],
    correctAnswerId: "c14_res"
  },
  {
    id: "q_cs_15",
    topicKey: "cs",
    category: "Programming",
    difficulty: "Moderate",
    question: "What is a mandatory requirement for a recursive function to prevent an infinite call stack (Stack Overflow)?",
    options: [
      { id: "c15_base", text: "A base case (termination condition) that halts further recursive calls" },
      { id: "c15_static", text: "At least one static global pointer" },
      { id: "c15_while", text: "An inner while loop enclosing the return statement" },
      { id: "c15_async", text: "An asynchronous callback promise" }
    ],
    correctAnswerId: "c15_base"
  },

  // ==========================================
  // CATEGORY 3: WEB, DATABASE & NETWORKING (15)
  // ==========================================
  {
    id: "q_wdn_01",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Moderate",
    question: "What is the primary technical purpose of creating an Index on a database table column?",
    options: [
      { id: "w01_speed", text: "To dramatically speed up data retrieval queries (SELECT) on that column" },
      { id: "w01_crypt", text: "To encrypt the table data using AES-256 encryption" },
      { id: "w01_dup", text: "To prevent duplicate row insertions across the entire database" },
      { id: "w01_shrink", text: "To reduce the physical storage footprint on disk" }
    ],
    correctAnswerId: "w01_speed"
  },
  {
    id: "q_wdn_02",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Easy",
    question: "Which SQL clause is used to filter records and return only those rows that satisfy a specified condition?",
    options: [
      { id: "w02_where", text: "WHERE" },
      { id: "w02_group", text: "GROUP BY" },
      { id: "w02_order", text: "ORDER BY" },
      { id: "w02_join", text: "LIMIT" }
    ],
    correctAnswerId: "w02_where"
  },
  {
    id: "q_wdn_03",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Moderate",
    question: "In relational database design, what is a Foreign Key?",
    options: [
      { id: "w03_fk", text: "A column or set of columns in one table that references the primary key of another table" },
      { id: "w03_admin", text: "A secret encryption key used by an overseas database administrator" },
      { id: "w03_temp", text: "A temporary table identifier that resets upon session logout" },
      { id: "w03_sort", text: "An automatic sorting index applied to varchar fields" }
    ],
    correctAnswerId: "w03_fk"
  },
  {
    id: "q_wdn_04",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Easy",
    question: "What fundamental role does the Domain Name System (DNS) play on the internet?",
    options: [
      { id: "w04_dns", text: "Translates human-readable domain names (e.g. google.com) into numerical IP addresses" },
      { id: "w04_router", text: "Directs physical fiber-optic cables between cities" },
      { id: "w04_cookie", text: "Stores user login cookies locally on web browsers" },
      { id: "w04_speed", text: "Increases computer CPU clock speed during browsing" }
    ],
    correctAnswerId: "w04_dns"
  },
  {
    id: "q_wdn_05",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Easy",
    question: "Which HTTP status code signifies that the requested resource could not be found on the web server?",
    options: [
      { id: "w05_404", text: "404 Not Found" },
      { id: "w05_200", text: "200 OK" },
      { id: "w05_500", text: "500 Internal Server Error" },
      { id: "w05_301", text: "301 Moved Permanently" }
    ],
    correctAnswerId: "w05_404"
  },
  {
    id: "q_wdn_06",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Easy",
    question: "What does the 'S' in HTTPS represent, and how does it protect user communications?",
    options: [
      { id: "w06_sec", text: "Secure; it encrypts client-server data packets using TLS/SSL to prevent eavesdropping" },
      { id: "w06_stat", text: "Static; it prevents the website layout from resizing on mobile devices" },
      { id: "w06_speed", text: "Speed; it compresses HTML text using gzip algorithms" },
      { id: "w06_sync", text: "Synchronous; it ensures only one user can view the website at a time" }
    ],
    correctAnswerId: "w06_sec"
  },
  {
    id: "q_wdn_07",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Moderate",
    question: "In RESTful API design, which HTTP method is standard for updating an existing resource on the server?",
    options: [
      { id: "w07_put", text: "PUT (or PATCH)" },
      { id: "w07_get", text: "GET" },
      { id: "w07_delete", text: "DELETE" },
      { id: "w07_head", text: "HEAD" }
    ],
    correctAnswerId: "w07_put"
  },
  {
    id: "q_wdn_08",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Moderate",
    question: "In front-end web development, what is the Document Object Model (DOM)?",
    options: [
      { id: "w08_dom", text: "A tree-structured representation of HTML elements that JavaScript can dynamically inspect and modify" },
      { id: "w08_css", text: "A stylesheet specification for responsive CSS flexbox layout" },
      { id: "w08_db", text: "A local SQL database stored inside the browser cache" },
      { id: "w08_dns", text: "A server-side routing framework used by Apache web servers" }
    ],
    correctAnswerId: "w08_dom"
  },
  {
    id: "q_wdn_09",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Moderate",
    question: "What is the primary difference in address length between IPv4 and IPv6?",
    options: [
      { id: "w09_ip", text: "IPv4 uses 32-bit addresses (~4.3 billion); IPv6 uses 128-bit addresses" },
      { id: "w09_inv", text: "IPv4 uses 128-bit addresses; IPv6 uses 32-bit addresses" },
      { id: "w09_eq", text: "Both IPv4 and IPv6 use 64-bit hexadecimal addresses" },
      { id: "w09_byte", text: "IPv4 uses 8-bit octets; IPv6 uses 16-bit binary words" }
    ],
    correctAnswerId: "w09_ip"
  },
  {
    id: "q_wdn_10",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Tricky",
    question: "In SQL, what is the critical difference between the DROP TABLE and TRUNCATE TABLE statements?",
    options: [
      { id: "w10_diff", text: "DROP TABLE deletes the data and the entire table schema; TRUNCATE TABLE empties all rows but preserves the table structure" },
      { id: "w10_rev", text: "DROP TABLE only works on views; TRUNCATE TABLE removes user permissions" },
      { id: "w10_same", text: "Both statements perform the exact same operation with no difference" },
      { id: "w10_where", text: "DROP TABLE allows a WHERE clause; TRUNCATE TABLE does not" }
    ],
    correctAnswerId: "w10_diff"
  },
  {
    id: "q_wdn_11",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Easy",
    question: "In the CSS Box Model, what is the order of layers moving from the innermost element content outward?",
    options: [
      { id: "w11_box", text: "Content → Padding → Border → Margin" },
      { id: "w11_rev", text: "Content → Margin → Border → Padding" },
      { id: "w11_out", text: "Margin → Border → Padding → Content" },
      { id: "w11_alt", text: "Content → Border → Padding → Margin" }
    ],
    correctAnswerId: "w11_box"
  },
  {
    id: "q_wdn_12",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Moderate",
    question: "What is the primary objective of Database Normalization (1NF, 2NF, 3NF)?",
    options: [
      { id: "w12_norm", text: "To reduce data redundancy and eliminate anomalies during INSERT, UPDATE, and DELETE operations" },
      { id: "w12_max", text: "To maximize data duplication across multiple backup tables" },
      { id: "w12_enc", text: "To automatically hash column values using cryptographic keys" },
      { id: "w12_ui", text: "To generate mobile-responsive web user interfaces" }
    ],
    correctAnswerId: "w12_norm"
  },
  {
    id: "q_wdn_13",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Easy",
    question: "Which HTTP request method is primarily intended for retrieving data from a server without causing side effects?",
    options: [
      { id: "w13_get", text: "GET" },
      { id: "w13_post", text: "POST" },
      { id: "w13_delete", text: "DELETE" },
      { id: "w13_patch", text: "PATCH" }
    ],
    correctAnswerId: "w13_get"
  },
  {
    id: "q_wdn_14",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Moderate",
    question: "Why is UDP (User Datagram Protocol) commonly preferred over TCP for live video streaming and multiplayer online gaming?",
    options: [
      { id: "w14_udp", text: "UDP eliminates connection handshake and retransmission delays, prioritizing speed and low latency over guaranteed delivery" },
      { id: "w14_tcp", text: "UDP guarantees 100% lossless packet transmission and automatic packet reordering" },
      { id: "w14_sec", text: "UDP automatically encrypts all game network traffic with zero CPU overhead" },
      { id: "w14_cost", text: "TCP requires expensive commercial cloud licenses to transmit packets" }
    ],
    correctAnswerId: "w14_udp"
  },
  {
    id: "q_wdn_15",
    topicKey: "web_db",
    category: "Web & DB",
    difficulty: "Tricky",
    question: "In JavaScript, what will the expression `\"5\" + 2` produce, and why?",
    options: [
      { id: "w15_52", text: "\"52\" because the '+' operator performs string concatenation when one operand is a string" },
      { id: "w15_7", text: "7 because JavaScript converts strings to numbers automatically" },
      { id: "w15_nan", text: "NaN because adding a string and a number is an invalid operation" },
      { id: "w15_err", text: "SyntaxError: type mismatch" }
    ],
    correctAnswerId: "w15_52"
  },

  // ==========================================
  // CATEGORY 4: TECH & CYBERSECURITY (10)
  // ==========================================
  {
    id: "q_cai_01",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Easy",
    question: "What is Phishing in the context of cybersecurity?",
    options: [
      { id: "t01_phish", text: "A social engineering attack where deceptive messages trick users into sharing sensitive credentials or data" },
      { id: "t01_net", text: "A network utility used to check signal strength on Wi-Fi routers" },
      { id: "t01_clean", text: "An antivirus scan that deletes temporary browser cookies" },
      { id: "t01_sql", text: "A database query that searches for fragmented tables" }
    ],
    correctAnswerId: "t01_phish"
  },
  {
    id: "q_cai_02",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Moderate",
    question: "What is the fundamental difference between Authentication and Authorization?",
    options: [
      { id: "t02_auth", text: "Authentication verifies who an identity is; Authorization determines what actions or resources they are permitted to access" },
      { id: "t02_rev", text: "Authentication grants admin privileges; Authorization checks user password strength" },
      { id: "t02_hw", text: "Authentication protects hardware; Authorization protects software" },
      { id: "t02_same", text: "They are identical terms that describe the exact same security process" }
    ],
    correctAnswerId: "t02_auth"
  },
  {
    id: "q_cai_03",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Moderate",
    question: "In Git version control, which command creates a new branch named 'feature' and immediately switches to it?",
    options: [
      { id: "t03_branch", text: "git checkout -b feature (or git switch -c feature)" },
      { id: "t03_merge", text: "git merge --new feature" },
      { id: "t03_push", text: "git push -u origin feature" },
      { id: "t03_add", text: "git add --branch feature" }
    ],
    correctAnswerId: "t03_branch"
  },
  {
    id: "q_cai_04",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Moderate",
    question: "Why is it considered a severe security violation to store user passwords in plain text in a database?",
    options: [
      { id: "t04_hash", text: "If a breach occurs, attackers can read every credential; passwords should always be cryptographically hashed with a unique salt" },
      { id: "t04_ascii", text: "Plain text characters consume twice as much disk storage space as hashed strings" },
      { id: "t04_crash", text: "Modern SQL database engines crash when querying plain text password fields" },
      { id: "t04_cap", text: "Plain text prevents users from using uppercase characters in their passwords" }
    ],
    correctAnswerId: "t04_hash"
  },
  {
    id: "q_cai_05",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Easy",
    question: "What is a Large Language Model (LLM) in Artificial Intelligence?",
    options: [
      { id: "t05_llm", text: "A neural network trained on vast amounts of text data capable of understanding and generating human language" },
      { id: "t05_dic", text: "A digital dictionary software program that translates English words to Spanish" },
      { id: "t05_os", text: "A mobile operating system optimized for speech recognition microphones" },
      { id: "t05_comp", text: "A compiler that optimizes Python code for graphics cards" }
    ],
    correctAnswerId: "t05_llm"
  },
  {
    id: "q_cai_06",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Moderate",
    question: "In machine learning, what characterizes Supervised Learning?",
    options: [
      { id: "t06_super", text: "The algorithm is trained on labeled datasets where both input features and target outputs are provided" },
      { id: "t06_un", text: "The algorithm discovers hidden patterns in data without any target labels or guidance" },
      { id: "t06_man", text: "A human engineer manually writes every if-else rule before running the algorithm" },
      { id: "t06_no", text: "The algorithm trains exclusively on synthetic video game gameplay" }
    ],
    correctAnswerId: "t06_super"
  },
  {
    id: "q_cai_07",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Easy",
    question: "What is the primary role of an Operating System (OS) in computer architecture?",
    options: [
      { id: "t07_os", text: "Managing computer hardware resources (CPU, memory, storage, devices) and providing common services for applications" },
      { id: "t07_web", text: "Hosting websites on the public internet" },
      { id: "t07_app", text: "Writing code algorithms automatically without user input" },
      { id: "t07_volt", text: "Controlling the wall outlet electrical voltage supplying the motherboard" }
    ],
    correctAnswerId: "t07_os"
  },
  {
    id: "q_cai_08",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Easy",
    question: "What is Multi-Factor Authentication (MFA) and why is it recommended?",
    options: [
      { id: "t08_mfa", text: "Requiring two or more distinct verification factors (e.g. password + authenticator code) to prevent unauthorized account access" },
      { id: "t08_pass", text: "Allowing a user to set five different passwords for the same login account" },
      { id: "t08_app", text: "An application that automatically fills in credit card details during checkout" },
      { id: "t08_wifi", text: "A protocol that connects one laptop to two separate Wi-Fi routers simultaneously" }
    ],
    correctAnswerId: "t08_mfa"
  },
  {
    id: "q_cai_09",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Easy",
    question: "What is the primary difference between RAM (Random Access Memory) and SSD (Solid State Drive) storage?",
    options: [
      { id: "t09_ram", text: "RAM is fast, volatile memory lost on power down; SSD is persistent, non-volatile storage that retains files" },
      { id: "t09_ssd", text: "RAM stores files permanently; SSD loses all data as soon as the laptop is turned off" },
      { id: "t09_speed", text: "SSD is faster than RAM because it uses magnetic spinning platters" },
      { id: "t09_role", text: "RAM is only found on servers; personal computers only contain SSD storage" }
    ],
    correctAnswerId: "t09_ram"
  },
  {
    id: "q_cai_10",
    topicKey: "cyber_ai",
    category: "Tech & Security",
    difficulty: "Moderate",
    question: "What is a Distributed Denial of Service (DDoS) attack?",
    options: [
      { id: "t10_ddos", text: "An attack that overwhelms a target server with flood traffic originating from multiple compromised systems (botnet), making it unavailable to users" },
      { id: "t10_steal", text: "A malware virus that silently copies passwords from local text files" },
      { id: "t10_dns", text: "A legitimate network tool used by internet service providers to speed up downloads" },
      { id: "t10_fire", text: "A hardware failure caused by overheating power supplies in server racks" }
    ],
    correctAnswerId: "t10_ddos"
  },

  // ==========================================
  // CATEGORY 5: LOGIC & CS IQ (5)
  // ==========================================
  {
    id: "q_iq_01",
    topicKey: "logic",
    category: "Logic & IQ",
    difficulty: "Easy",
    question: "What is the binary representation of the decimal number 13?",
    options: [
      { id: "i01_1101", text: "1101" },
      { id: "i01_1011", text: "1011" },
      { id: "i01_1110", text: "1110" },
      { id: "i01_1100", text: "1100" }
    ],
    correctAnswerId: "i01_1101"
  },
  {
    id: "q_iq_02",
    topicKey: "logic",
    category: "Logic & IQ",
    difficulty: "Moderate",
    question: "If an algorithm requires 4 seconds to process 1,000 items and its time complexity is O(N), approximately how long will it take to process 3,000 items on the same system?",
    options: [
      { id: "i02_12", text: "12 seconds" },
      { id: "i02_36", text: "36 seconds" },
      { id: "i02_8", text: "8 seconds" },
      { id: "i02_16", text: "16 seconds" }
    ],
    correctAnswerId: "i02_12"
  },
  {
    id: "q_iq_03",
    topicKey: "logic",
    category: "Logic & IQ",
    difficulty: "Tricky",
    question: "What is the result of the bitwise operation: `6 & 3` (Bitwise AND on decimal integers)?",
    options: [
      { id: "i03_2", text: "2" },
      { id: "i03_7", text: "7" },
      { id: "i03_0", text: "0" },
      { id: "i03_3", text: "3" }
    ],
    correctAnswerId: "i03_2"
  },
  {
    id: "q_iq_04",
    topicKey: "logic",
    category: "Logic & IQ",
    difficulty: "Moderate",
    question: "A cloud server cluster has 4 identical worker nodes. Each node processes 50 requests per second. How many total requests can the cluster process in 1 minute at peak capacity?",
    options: [
      { id: "i04_12000", text: "12,000 requests" },
      { id: "i04_2000", text: "2,000 requests" },
      { id: "i04_6000", text: "6,000 requests" },
      { id: "i04_24000", text: "24,000 requests" }
    ],
    correctAnswerId: "i04_12000"
  },
  {
    id: "q_iq_05",
    topicKey: "logic",
    category: "Logic & IQ",
    difficulty: "Easy",
    question: "Which digital logic gate produces an output of TRUE (1) if and only if its two inputs are different from each other?",
    options: [
      { id: "i05_xor", text: "XOR (Exclusive OR)" },
      { id: "i05_and", text: "AND" },
      { id: "i05_or", text: "OR" },
      { id: "i05_nand", text: "NAND" }
    ],
    correctAnswerId: "i05_xor"
  }
];


// =============================================================================
// 3. TRUE UNBIASED RANDOMIZATION (FISHER-YATES SHUFFLE) & BALANCED SELECTION
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
 * Selects 10 questions representing a balanced spread across all 5 technical domains:
 * - 3 from AWS & Cloud Computing
 * - 3 from Computer Science & Programming
 * - 2 from Web, Database & Networking
 * - 1 from Cybersecurity, AI & General Technology
 * - 1 from Logical / CS IQ
 *
 * Each participant receives a unique randomized sequence of 10 questions,
 * and options for every question are independently randomized with Fisher-Yates.
 */
function selectBalancedQuizSession() {
  const awsList = MASTER_QUESTIONS.filter(q => q.topicKey === "aws");
  const csList = MASTER_QUESTIONS.filter(q => q.topicKey === "cs");
  const webDbList = MASTER_QUESTIONS.filter(q => q.topicKey === "web_db");
  const cyberAiList = MASTER_QUESTIONS.filter(q => q.topicKey === "cyber_ai");
  const logicList = MASTER_QUESTIONS.filter(q => q.topicKey === "logic");

  const sampledAws = fisherYatesShuffle(awsList).slice(0, 3);
  const sampledCs = fisherYatesShuffle(csList).slice(0, 3);
  const sampledWebDb = fisherYatesShuffle(webDbList).slice(0, 2);
  const sampledCyberAi = fisherYatesShuffle(cyberAiList).slice(0, 1);
  const sampledLogic = fisherYatesShuffle(logicList).slice(0, 1);

  const selected10 = [
    ...sampledAws,
    ...sampledCs,
    ...sampledWebDb,
    ...sampledCyberAi,
    ...sampledLogic
  ];

  // Randomize the overall question order for this participant
  const shuffledQuestions = fisherYatesShuffle(selected10);

  // Independently randomize the 4 options for each question
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
  quizResult: null, // { score, total, percentage, timeSeconds, timeFormatted, timeDescriptive, category, resultId, timestamp }
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

  timerInterval = setInterval(() => {
    if (quizStartTime === null) return;
    const now = getTimestamp();
    const elapsedMs = Math.max(0, now - quizStartTime);
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    updateTimerDisplay(elapsedSeconds);
  }, 500);
}

/**
 * Stop quiz timer immediately upon quiz submission and freeze elapsed time
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
 * Update the timer element in the quiz header UI
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
  resTimeDescriptive: document.getElementById("resTimeDescriptive"),
  categoryContainer: document.getElementById("categoryContainer"),
  resCategoryIcon: document.getElementById("resCategoryIcon"),
  resCategoryTitle: document.getElementById("resCategoryTitle"),
  resCategoryMessage: document.getElementById("resCategoryMessage"),
  resTimestampText: document.getElementById("resTimestampText"),
  
  // CTAs
  btnDownloadResult: document.getElementById("btnDownloadResult"),
  linkGoogleForm: document.getElementById("linkGoogleForm"),
  linkAwsBuilderCenter: document.getElementById("linkAwsBuilderCenter"),
  attemptNoticeCard: document.getElementById("attemptNoticeCard"),
  exportCanvas: document.getElementById("exportCanvas")
};


// =============================================================================
// 6. HELPER FUNCTIONS & TEXT SANITIZERS
// =============================================================================

/**
 * Switch view screens smoothly
 */
function showScreen(screenKey) {
  Object.keys(DOM.screens).forEach((key) => {
    const screenEl = DOM.screens[key];
    if (!screenEl) return;
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
 * HTML Escaper to safely render raw text and prevent unintended HTML injection
 */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Formats question strings, rendering code blocks (```...```) and inline code (`...`) cleanly
 */
function formatQuestionHtml(text) {
  if (!text) return "";
  if (text.includes("```")) {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part) => {
      if (part.startsWith("```")) {
        const clean = part.replace(/^```[a-z]*\r?\n?/, "").replace(/\r?\n?```$/, "");
        return `<pre class="question-code-block"><code>${escapeHtml(clean)}</code></pre>`;
      }
      return escapeHtml(part).replace(/\r?\n/g, "<br>");
    }).join("");
  }
  if (text.includes("`")) {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return `<code class="inline-code">${escapeHtml(part.slice(1, -1))}</code>`;
      }
      return escapeHtml(part).replace(/\r?\n/g, "<br>");
    }).join("");
  }
  return escapeHtml(text).replace(/\r?\n/g, "<br>");
}

/**
 * Generate a short 4-character random uppercase alphanumeric Result ID
 * e.g., "AWS-BC-7F42"
 */
function generateResultId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
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
      message: "Outstanding! You demonstrated an advanced technical foundation across cloud and core computing concepts."
    };
  } else if (score >= 7) {
    return {
      title: "Cloud Builder",
      themeClass: "cat-builder",
      icon: "⚡",
      message: "Great job! You have a solid grasp of cloud infrastructure, programming, and web technologies."
    };
  } else if (score >= 5) {
    return {
      title: "Cloud Explorer",
      themeClass: "cat-explorer",
      icon: "🚀",
      message: "Good effort! You understand essential fundamentals. Keep building and exploring AWS tools."
    };
  } else {
    return {
      title: "Getting Started",
      themeClass: "cat-started",
      icon: "🌱",
      message: "Every great engineer starts somewhere. Keep learning, practicing, and building!"
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

  // Update Question Header & Content with syntax-highlighted code block support
  DOM.questionCategoryBadge.textContent = question.category || "Cloud";
  DOM.questionText.innerHTML = formatQuestionHtml(question.question);

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
      <span class="option-text">${escapeHtml(opt.text)}</span>
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

  // Advance to next question or submit quiz
  if (state.currentQuestionIndex < state.activeQuestions.length - 1) {
    state.currentQuestionIndex++;
    renderCurrentQuestion();
    window.scrollTo({ top: 120, behavior: "smooth" });
  } else {
    submitQuiz();
  }
}


// =============================================================================
// 9. SCORE CALCULATION, ONE ATTEMPT LOCK & RESULT SCREEN
// =============================================================================

function populateResultCard(quizResult, participant) {
  DOM.resResultId.textContent = quizResult.resultId;
  DOM.resParticipantName.textContent = participant.fullName;
  DOM.resRollNumber.textContent = participant.rollNumber;
  DOM.resEmail.textContent = participant.email;
  DOM.resScoreValue.textContent = quizResult.score;
  DOM.resPercentageValue.textContent = `${quizResult.percentage}%`;
  DOM.resTimeValue.textContent = quizResult.timeFormatted;
  if (DOM.resTimeDescriptive) {
    DOM.resTimeDescriptive.textContent = quizResult.timeDescriptive;
  }
  
  DOM.resCategoryIcon.textContent = quizResult.category.icon;
  DOM.resCategoryTitle.textContent = quizResult.category.title;
  DOM.resCategoryMessage.textContent = quizResult.category.message;
  DOM.resTimestampText.textContent = quizResult.timestamp;

  DOM.categoryContainer.className = `category-result-card ${quizResult.category.themeClass}`;
}

function submitQuiz() {
  if (state.isSubmitting) return;
  state.isSubmitting = true;

  // 1. Stop and freeze the quiz timer
  stopQuizTimer();
  const totalSeconds = Math.max(0, Math.floor(finalElapsedMs / 1000));
  const timeFormatted = formatTime(totalSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeDescriptive = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

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

  // 3. Format actual date & exact completion timestamp with seconds
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
  const timeOfDayFormatted = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  const actualTimestampString = `${dateFormatted} • ${timeOfDayFormatted}`;

  // Store result in state
  state.quizResult = {
    score: correctCount,
    total: totalQuestions,
    percentage: percentage,
    timeSeconds: totalSeconds,
    timeFormatted: timeFormatted,
    timeDescriptive: timeDescriptive,
    category: categoryInfo,
    resultId: resultId,
    timestamp: actualTimestampString
  };

  // Populate Result Card DOM
  populateResultCard(state.quizResult, state.participant);

  // 4. Enforce STRICT SINGLE ATTEMPT policy via sessionStorage lock
  try {
    sessionStorage.setItem(CONFIG.STORAGE_KEY_COMPLETED, "true");
    sessionStorage.setItem(CONFIG.STORAGE_KEY_RECORD, JSON.stringify({
      participant: state.participant,
      quizResult: state.quizResult
    }));
  } catch (err) {
    console.warn("sessionStorage lock error:", err);
  }

  // Update External CTA Links
  setupCtaLinks();

  // Show result screen
  showScreen("result");
  state.isSubmitting = false;
}

/**
 * Checks if the participant has already completed their quiz attempt in this session.
 * If yes, restores their result card and blocks starting another attempt.
 */
function restoreCompletedQuiz() {
  let isCompleted = false;
  try {
    isCompleted = sessionStorage.getItem(CONFIG.STORAGE_KEY_COMPLETED) === "true";
  } catch (_) {
    return false;
  }

  if (!isCompleted) return false;

  try {
    const raw = sessionStorage.getItem(CONFIG.STORAGE_KEY_RECORD);
    if (!raw) return false;

    const record = JSON.parse(raw);
    if (record && record.participant && record.quizResult) {
      state.participant = record.participant;
      state.quizResult = record.quizResult;
      populateResultCard(state.quizResult, state.participant);
      setupCtaLinks();
      showScreen("result");

      // Update welcome button if user ever browses back
      if (DOM.btnStartChallenge) {
        DOM.btnStartChallenge.innerHTML = `
          <span>VIEW COMPLETED RESULT</span>
          <svg class="btn-arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        `;
      }
      return true;
    }
  } catch (err) {
    console.error("Error reading stored quiz record:", err);
  }
  return false;
}


// =============================================================================
// 10. EXTERNAL CTA LINKS MANAGEMENT
// =============================================================================

function setupCtaLinks() {
  // Google Form Link (Exact event link)
  if (DOM.linkGoogleForm) {
    DOM.linkGoogleForm.href = CONFIG.GOOGLE_FORM_URL;
    DOM.linkGoogleForm.target = "_blank";
    DOM.linkGoogleForm.rel = "noopener noreferrer";
    DOM.linkGoogleForm.onclick = null;
  }

  // AWS Builder Center Link
  if (DOM.linkAwsBuilderCenter) {
    DOM.linkAwsBuilderCenter.href = CONFIG.AWS_BUILDER_CENTER_URL;
    DOM.linkAwsBuilderCenter.target = "_blank";
    DOM.linkAwsBuilderCenter.rel = "noopener noreferrer";
    DOM.linkAwsBuilderCenter.onclick = null;
  }
}


// =============================================================================
// 11. DOWNLOAD RESULT CARD (HIGH RESOLUTION CANVAS IMAGE GENERATOR)
// =============================================================================

function downloadResultCardImage() {
  if (!state.quizResult) return;

  const canvas = DOM.exportCanvas;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // 1. Clear & Background Gradient
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
  ctx.fillText(`${state.quizResult.timeFormatted}`, scoreCardX + 375, scoreCardY + 95);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`(${state.quizResult.timeDescriptive})`, scoreCardX + 375, scoreCardY + 125);

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
  ctx.fillText(`Completed At: ${state.quizResult.timestamp} • Time Taken: ${state.quizResult.timeFormatted} (${state.quizResult.timeDescriptive})`, 65, 655);

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
// 12. EVENT LISTENERS INITIALIZATION
// =============================================================================

function initEventListeners() {
  // Screen 1: Start Challenge
  DOM.btnStartChallenge.addEventListener("click", () => {
    // If the student already completed their quiz attempt, show their locked result card
    if (restoreCompletedQuiz()) {
      return;
    }
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

  // Screen 2: Form Submission -> Start Quiz with Balanced 10-Question Randomization
  DOM.participantForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if student already completed
    if (restoreCompletedQuiz()) {
      return;
    }

    if (!validateParticipantForm()) {
      return;
    }

    state.participant.fullName = DOM.inputFullName.value.trim();
    state.participant.rollNumber = DOM.inputRollNumber.value.trim();
    state.participant.email = DOM.inputEmail.value.trim();

    // Select 10 questions with balanced distribution across the 5 domains & shuffle options
    state.activeQuestions = selectBalancedQuizSession();
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
}


// =============================================================================
// 13. SECURITY: IGNORE ANY ATTEMPTED SCORE MANIPULATION IN URL
// =============================================================================

function sanitizeUrlParams() {
  if (window.location.search) {
    try {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } catch (_) {
      // Ignore if running locally or file protocol
    }
  }
}


// =============================================================================
// 14. BOOTSTRAP APPLICATION
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  sanitizeUrlParams();
  initEventListeners();

  // If this participant has already taken the quiz in this session, show their locked result
  const alreadyCompleted = restoreCompletedQuiz();
  if (!alreadyCompleted) {
    showScreen("welcome");
  }
});
