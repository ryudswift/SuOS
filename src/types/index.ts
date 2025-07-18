export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  location: string;
  industry: string;
  companyName: string;
  jobTitle: string;
  seniority: string;
  websiteUrl: string;
  linkedinUrl: string;
  analysed: boolean;
  researchReport: string;
  email1Body: string;
  email1Subject: string;
  email2Body: string;
  email3Body: string;
  email3Subject: string;
  senderEmail: string;
  timeZone: 'T1' | 'T2' | 'T3' | 'T4';
  email1Sent: boolean;
  email2Sent: boolean;
  email3Sent: boolean;
  messageId: string;
  replied: boolean;
  token: string;
  optedOut: boolean;
  createdAt: Date;
  lastUpdated: Date;
}

export interface KPIData {
  totalLeads: number;
  totalEmailsSent: number;
  totalReplies: number;
  totalOptOuts: number;
  activeCampaigns: number;
  replyRate: number;
  optOutRate: number;
  analyzedRate: number;
}

export interface CampaignBreakdown {
  byTimeZone: { [key: string]: number };
  bySender: { [key: string]: number };
}

export interface FilterOptions {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  timeZone: string;
  sender: string;
  status: string;
  searchQuery: string;
}