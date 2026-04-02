import OpenAI from 'openai'
import type { RFPAnalysisResult, Priority, Requirement } from '@/types/rfp-analysis'

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert consulting bid strategist with deep experience in professional services RFP responses.

Analyze the provided RFP document and return a JSON object with EXACTLY this structure — no extra keys, no markdown:

{
  "responseStrategy": {
    "companyCapabilities": [
      { "description": "string", "priority": "High" | "Medium" | "Low" }
    ],
    "positioning": [
      { "description": "string", "priority": "High" | "Medium" | "Low" }
    ],
    "differentiators": [
      { "description": "string", "priority": "High" | "Medium" | "Low" }
    ],
    "focusAreas": [
      { "description": "string", "priority": "High" | "Medium" | "Low" }
    ]
  },
  "candidateSkills": {
    "technicalSkills": [
      { "skill": "string", "requirement": "Mandatory" | "Desirable" }
    ],
    "softSkills": [
      { "skill": "string", "requirement": "Mandatory" | "Desirable" }
    ],
    "industryExperience": [
      { "skill": "string", "requirement": "Mandatory" | "Desirable" }
    ],
    "certifications": [
      { "skill": "string", "requirement": "Mandatory" | "Desirable" }
    ]
  }
}

Guidelines:
- responseStrategy describes what the RESPONDING FIRM needs to showcase to win the bid
- companyCapabilities: proven track record, delivery capacity, methodologies
- positioning: how to position the firm vs competitors (partner not vendor, outcomes not outputs, etc.)
- differentiators: specific things that make this firm stand out (case studies, IP, named leaders, etc.)
- focusAreas: key themes the response must emphasise (change management, risk, governance, etc.)
- candidateSkills describes what the PROPOSED CANDIDATES need to demonstrate
- technicalSkills: domain tools, platforms, methodologies, analytical skills
- softSkills: leadership, communication, change management, facilitation
- industryExperience: specific sectors or regulatory environments
- certifications: formal qualifications (PMP, PRINCE2, TOGAF, Prosci, etc.)
- Assign priority/requirement based on explicit RFP language: "must have" = High/Mandatory, "preferred" = Medium/Desirable, implied = Low/Desirable
- Return 3-6 items per category
- Be specific and actionable — avoid generic consulting platitudes`

// ─── Type guard ───────────────────────────────────────────────────────────────

function isValidPriority(v: unknown): v is Priority {
  return v === 'High' || v === 'Medium' || v === 'Low'
}

function isValidRequirement(v: unknown): v is Requirement {
  return v === 'Mandatory' || v === 'Desirable'
}

function normaliseAnalysis(raw: Record<string, unknown>): RFPAnalysisResult {
  const rs = (raw.responseStrategy ?? {}) as Record<string, unknown>
  const cs = (raw.candidateSkills ?? {}) as Record<string, unknown>

  const toStrategyItems = (arr: unknown[]) =>
    arr
      .filter((x): x is Record<string, unknown> => typeof x === 'object' && x !== null)
      .map(x => ({
        description: String(x.description ?? ''),
        priority: isValidPriority(x.priority) ? x.priority : 'Medium' as Priority,
      }))

  const toSkillItems = (arr: unknown[]) =>
    arr
      .filter((x): x is Record<string, unknown> => typeof x === 'object' && x !== null)
      .map(x => ({
        skill: String(x.skill ?? ''),
        requirement: isValidRequirement(x.requirement) ? x.requirement : 'Desirable' as Requirement,
      }))

  return {
    responseStrategy: {
      companyCapabilities: toStrategyItems(Array.isArray(rs.companyCapabilities) ? rs.companyCapabilities : []),
      positioning: toStrategyItems(Array.isArray(rs.positioning) ? rs.positioning : []),
      differentiators: toStrategyItems(Array.isArray(rs.differentiators) ? rs.differentiators : []),
      focusAreas: toStrategyItems(Array.isArray(rs.focusAreas) ? rs.focusAreas : []),
    },
    candidateSkills: {
      technicalSkills: toSkillItems(Array.isArray(cs.technicalSkills) ? cs.technicalSkills : []),
      softSkills: toSkillItems(Array.isArray(cs.softSkills) ? cs.softSkills : []),
      industryExperience: toSkillItems(Array.isArray(cs.industryExperience) ? cs.industryExperience : []),
      certifications: toSkillItems(Array.isArray(cs.certifications) ? cs.certifications : []),
    },
    analyzedAt: new Date().toISOString(),
  }
}

// ─── Mock fallback ────────────────────────────────────────────────────────────

function getMockAnalysis(): RFPAnalysisResult {
  return {
    responseStrategy: {
      companyCapabilities: [
        { description: 'Proven track record delivering large-scale transformation programmes in complex, regulated environments', priority: 'High' },
        { description: 'End-to-end delivery capability — from strategy through implementation to benefits realisation', priority: 'High' },
        { description: 'Established methodology for stakeholder engagement and governance across multi-supplier programmes', priority: 'Medium' },
        { description: 'Proprietary accelerators and toolkits that reduce delivery risk and time-to-value', priority: 'Medium' },
        { description: 'Flexible resourcing model supporting both embedded team and advisory engagement models', priority: 'Low' },
      ],
      positioning: [
        { description: 'Position as a strategic transformation partner, not a staff augmentation supplier', priority: 'High' },
        { description: 'Emphasise outcomes and accountability — demonstrate how you own delivery risk, not just scope', priority: 'High' },
        { description: 'Differentiate on cultural alignment: how your team integrates with the client\'s ways of working', priority: 'Medium' },
        { description: 'Lead with relevant client logos and testimonials from comparable programmes', priority: 'Medium' },
      ],
      differentiators: [
        { description: 'Quantified case studies showing measurable ROI from comparable engagements', priority: 'High' },
        { description: 'Named senior leadership committed to the programme (not just a pitch team)', priority: 'High' },
        { description: 'Unique IP or methodologies not available from competing firms', priority: 'Medium' },
        { description: 'Demonstrated knowledge of the client\'s sector, regulatory context, and competitive landscape', priority: 'Medium' },
        { description: 'Commitment to knowledge transfer and capability building within the client organisation', priority: 'Low' },
      ],
      focusAreas: [
        { description: 'Change management and end-user adoption — highlight this as a core competency, not an afterthought', priority: 'High' },
        { description: 'Risk identification and mitigation planning throughout the programme lifecycle', priority: 'High' },
        { description: 'Data governance and quality assurance across all workstreams', priority: 'Medium' },
        { description: 'Sustainability of outcomes post-engagement — avoid dependency on external resources', priority: 'Medium' },
        { description: 'Commercial transparency: clear pricing model, change control process, and value milestones', priority: 'Low' },
      ],
    },
    candidateSkills: {
      technicalSkills: [
        { skill: 'Programme and project management (Agile, Waterfall, hybrid)', requirement: 'Mandatory' },
        { skill: 'Business process analysis and redesign', requirement: 'Mandatory' },
        { skill: 'Data analysis and reporting (Power BI, Tableau, or equivalent)', requirement: 'Mandatory' },
        { skill: 'ERP or platform implementation (SAP, Oracle, Salesforce, or sector equivalent)', requirement: 'Desirable' },
        { skill: 'Solution architecture and integration design', requirement: 'Desirable' },
      ],
      softSkills: [
        { skill: 'Executive stakeholder management and C-suite communication', requirement: 'Mandatory' },
        { skill: 'Change management and organisational transformation', requirement: 'Mandatory' },
        { skill: 'Facilitation and workshop delivery', requirement: 'Mandatory' },
        { skill: 'Leadership coaching and team development', requirement: 'Desirable' },
        { skill: 'Conflict resolution and negotiation', requirement: 'Desirable' },
      ],
      industryExperience: [
        { skill: 'Public sector or government', requirement: 'Mandatory' },
        { skill: 'Financial services or regulated industry', requirement: 'Desirable' },
        { skill: 'Manufacturing or supply chain', requirement: 'Desirable' },
        { skill: 'Utilities or infrastructure', requirement: 'Desirable' },
      ],
      certifications: [
        { skill: 'PMP or PRINCE2 Practitioner', requirement: 'Mandatory' },
        { skill: 'MSP (Managing Successful Programmes)', requirement: 'Desirable' },
        { skill: 'Prosci or ACMP Change Management certification', requirement: 'Desirable' },
        { skill: 'TOGAF or equivalent architecture framework', requirement: 'Desirable' },
      ],
    },
    analyzedAt: new Date().toISOString(),
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Analyzes RFP text and returns a structured response strategy and candidate skill requirements.
 *
 * - When OPENAI_API_KEY is set: calls GPT-4o and returns AI-generated analysis
 * - When OPENAI_API_KEY is not set: returns realistic mock data (useful for development/demo)
 */
export async function analyzeRFP(rfpText: string): Promise<RFPAnalysisResult> {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('[rfp-analyzer] No OPENAI_API_KEY found — using mock data')
    await new Promise(resolve => setTimeout(resolve, 2500))
    return getMockAnalysis()
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    temperature: 0.3,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Analyse this RFP document:\n\n${rfpText}` },
    ],
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) throw new Error('OpenAI returned an empty response')

  return normaliseAnalysis(JSON.parse(raw))
}
