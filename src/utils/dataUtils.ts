import { Lead, KPIData, CampaignBreakdown } from '../types';

export const calculateKPIs = (leads: Lead[]): KPIData => {
  const totalLeads = leads.length;
  const totalEmailsSent = leads.reduce((sum, lead) => {
    return sum + (lead.email1Sent ? 1 : 0) + (lead.email2Sent ? 1 : 0) + (lead.email3Sent ? 1 : 0);
  }, 0);
  const totalReplies = leads.filter(lead => lead.replied).length;
  const totalOptOuts = leads.filter(lead => lead.optedOut).length;
  const activeCampaigns = leads.filter(lead => 
    lead.analysed && !lead.replied && !lead.optedOut && 
    (lead.email1Sent || lead.email2Sent || lead.email3Sent)
  ).length;
  const analyzedLeads = leads.filter(lead => lead.analysed).length;

  return {
    totalLeads,
    totalEmailsSent,
    totalReplies,
    totalOptOuts,
    activeCampaigns,
    replyRate: totalEmailsSent > 0 ? (totalReplies / totalEmailsSent) * 100 : 0,
    optOutRate: totalEmailsSent > 0 ? (totalOptOuts / totalEmailsSent) * 100 : 0,
    analyzedRate: totalLeads > 0 ? (analyzedLeads / totalLeads) * 100 : 0,
  };
};

export const calculateCampaignBreakdown = (leads: Lead[]): CampaignBreakdown => {
  const byTimeZone: { [key: string]: number } = {};
  const bySender: { [key: string]: number } = {};

  leads.forEach(lead => {
    const emailCount = (lead.email1Sent ? 1 : 0) + (lead.email2Sent ? 1 : 0) + (lead.email3Sent ? 1 : 0);
    
    if (emailCount > 0) {
      byTimeZone[lead.timeZone] = (byTimeZone[lead.timeZone] || 0) + emailCount;
      if (lead.senderEmail) {
        bySender[lead.senderEmail] = (bySender[lead.senderEmail] || 0) + emailCount;
      }
    }
  });

  return { byTimeZone, bySender };
};

export const getLeadStatus = (lead: Lead): string => {
  if (lead.replied) return 'Replied';
  if (lead.optedOut) return 'Opted Out';
  if (!lead.analysed) return 'Pending Analysis';
  if (lead.email3Sent) return 'Email #3 Sent';
  if (lead.email2Sent) return 'Email #2 Sent';
  if (lead.email1Sent) return 'Email #1 Sent';
  return 'Ready to Send';
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Replied': return 'text-green-600 bg-green-50';
    case 'Opted Out': return 'text-red-600 bg-red-50';
    case 'Pending Analysis': return 'text-yellow-600 bg-yellow-50';
    case 'Email #3 Sent': return 'text-blue-600 bg-blue-50';
    case 'Email #2 Sent': return 'text-purple-600 bg-purple-50';
    case 'Email #1 Sent': return 'text-indigo-600 bg-indigo-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};