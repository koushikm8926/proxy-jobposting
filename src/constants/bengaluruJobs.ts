import type { JobListing } from '../types/user'

export const BENGALURU_LOCALITIES = [
  'All Bengaluru',
  'Koramangala',
  'HSR Layout',
  'Electronic City',
  'Whitefield',
  'Indiranagar',
  'Marathahalli',
  'Manyata Tech Park',
  'Hebbal',
  'Yelahanka',
  'Rajajinagar',
  'Peenya',
  'BTM Layout',
  'Bellandur'
]

export const JOB_CATEGORIES_LIST = [
  'All Categories',
  'Customer Support',
  'BPO / Telecalling',
  'Sales & BD',
  'IT Support',
  'Finance & Accounts',
  'HR & Admin',
  'Logistics & Delivery'
]

export const INITIAL_BENGALURU_JOBS: JobListing[] = [
  {
    id: 'proxy-job-1',
    companyId: 'comp-zepto',
    companyName: 'Zepto Express Logistics',
    recruiterId: 'rec-1',
    recruiterName: 'Ananya Sharma',
    title: 'Customer Support Executive (Voice & Chat)',
    category: 'Customer Support',
    vacancies: 8,
    description:
      'We are hiring enthusiastic Customer Support Executives to handle customer inquiries, order tracking, and resolution management via omnichannel voice and chat.',
    responsibilities:
      '• Manage incoming customer queries via ticketing and live chat.\n• Troubleshoot delivery exceptions and issue refunds/credits per policy.\n• Maintain high CSAT scores (>90%) and first contact resolution.',
    requiredSkills: ['English & Hindi', 'CRM Ticketing', 'Active Listening', 'Chat Support'],
    experience: 'Fresher / 0 - 2 Years',
    salary: '₹18,000 – ₹25,000 / month',
    location: 'Koramangala, Bengaluru',
    workMode: 'In-Office',
    jobType: 'Full-time',
    status: 'PUBLISHED',
    isFeatured: true,
    applicantCount: 14,
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'proxy-job-2',
    companyId: 'comp-fingrow',
    companyName: 'FinGrow Microfinance Services',
    recruiterId: 'rec-2',
    recruiterName: 'Rajesh Iyer',
    title: 'Sales & Business Development Executive',
    category: 'Sales & BD',
    vacancies: 5,
    description:
      'Drive customer acquisition for SME loan and merchant onboarding across tech parks and local business hubs in South Bengaluru.',
    responsibilities:
      '• Conduct on-ground visits to merchant establishments and SMEs.\n• Explain product benefits and complete digital KYC documentation.\n• Achieve monthly loan disbursement targets.',
    requiredSkills: ['B2B Sales', 'Kannada & English', 'Negotiation', 'Field Sales'],
    experience: '1 - 3 Years',
    salary: '₹22,000 – ₹32,000 / month + Incentives',
    location: 'HSR Layout, Bengaluru',
    workMode: 'In-Office',
    jobType: 'Full-time',
    status: 'PUBLISHED',
    isFeatured: true,
    applicantCount: 22,
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'proxy-job-3',
    companyId: 'comp-cloudops',
    companyName: 'CloudOps Technologies India',
    recruiterId: 'rec-3',
    recruiterName: 'Vikram Mehta',
    title: 'IT Helpdesk & System Support Specialist',
    category: 'IT Support',
    vacancies: 4,
    description:
      'Provide tier-1 IT support for enterprise client workstations, Active Directory accounts, VPN tunnels, and network hardware.',
    responsibilities:
      '• Diagnose and troubleshoot Windows & macOS desktop anomalies.\n• Manage user provisioning in Azure AD and Google Workspace.\n• Handle IT asset allocation and onboarding for new hires.',
    requiredSkills: ['Active Directory', 'Windows 11 / Mac OS', 'LAN/WAN', 'Ticketing Tools'],
    experience: '1 - 4 Years',
    salary: '₹25,000 – ₹35,000 / month',
    location: 'Whitefield, Bengaluru',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    status: 'PUBLISHED',
    isPremium: true,
    applicantCount: 9,
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'proxy-job-4',
    companyId: 'comp-telelink',
    companyName: 'TeleLink Global Solutions',
    recruiterId: 'rec-4',
    recruiterName: 'Sneha Patel',
    title: 'Inbound Process Telecalling Representative',
    category: 'BPO / Telecalling',
    vacancies: 12,
    description:
      'Join our expanding BPO operations supporting national telecom and banking clients. Freshers with strong communication are encouraged to apply.',
    responsibilities:
      '• Receive and handle customer inquiries regarding service activations and billing.\n• Maintain call duration (AHT) and documentation standards.\n• Follow standard operating scripts for escalation management.',
    requiredSkills: ['Verbal Communication', 'Hindi & English Fluency', 'Data Entry', 'Customer Service'],
    experience: 'Fresher / 0 - 1 Years',
    salary: '₹16,000 – ₹22,000 / month',
    location: 'Electronic City, Bengaluru',
    workMode: 'In-Office',
    jobType: 'Full-time',
    status: 'PUBLISHED',
    applicantCount: 31,
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'proxy-job-5',
    companyId: 'comp-quicklog',
    companyName: 'QuickLog Fulfillment Centers',
    recruiterId: 'rec-5',
    recruiterName: 'Karthik Rao',
    title: 'Warehouse Operations Supervisor',
    category: 'Logistics & Delivery',
    vacancies: 3,
    description:
      'Oversee dispatch queues, inventory tallying, and rider departure schedules for high-volume quick commerce dark stores in North Bengaluru.',
    responsibilities:
      '• Supervise inbound stock unloading and SKU verification.\n• Manage dispatch time windows to achieve 10-minute order fulfilment.\n• Ensure safety protocols and shift attendance.',
    requiredSkills: ['Inventory Management', 'Shift Supervision', 'Kannada & Hindi', 'Warehouse ERP'],
    experience: '2 - 5 Years',
    salary: '₹24,000 – ₹30,000 / month',
    location: 'Hebbal, Bengaluru',
    workMode: 'In-Office',
    jobType: 'Full-time',
    status: 'PUBLISHED',
    applicantCount: 17,
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'proxy-job-6',
    companyId: 'comp-fintech',
    companyName: 'Nexus FinTech Labs',
    recruiterId: 'rec-6',
    recruiterName: 'Priya Nambiar',
    title: 'Junior Accounts & Billing Associate',
    category: 'Finance & Accounts',
    vacancies: 2,
    description:
      'Review invoice settlements, perform GST reconciliation, and assist finance controllers with vendor payment schedules.',
    responsibilities:
      '• Process day-to-day accounts payable and receivable entries.\n• Reconcile monthly bank statements and ledger accounts.\n• Prepare GST 2B vs purchase register discrepancy reports.',
    requiredSkills: ['Tally Prime', 'MS Excel (VLOOKUP)', 'GST Filing', 'Accounts Reconciliation'],
    experience: '1 - 3 Years',
    salary: '₹20,000 – ₹28,000 / month',
    location: 'Indiranagar, Bengaluru',
    workMode: 'In-Office',
    jobType: 'Full-time',
    status: 'PUBLISHED',
    applicantCount: 11,
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
]
