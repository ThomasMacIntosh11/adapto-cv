export type Priority = 'High' | 'Medium' | 'Low'
export type Requirement = 'Mandatory' | 'Desirable'

// Output 1: What the respondent needs to showcase
export interface ResponseStrategyItem {
  description: string
  priority: Priority
}

export interface ResponseStrategy {
  companyCapabilities: ResponseStrategyItem[]
  positioning: ResponseStrategyItem[]
  differentiators: ResponseStrategyItem[]
  focusAreas: ResponseStrategyItem[]
}

// Output 2: Skills candidates need to have
export interface SkillItem {
  skill: string
  requirement: Requirement
}

export interface CandidateSkills {
  technicalSkills: SkillItem[]
  softSkills: SkillItem[]
  industryExperience: SkillItem[]
  certifications: SkillItem[]
}

export interface RFPAnalysisResult {
  responseStrategy: ResponseStrategy
  candidateSkills: CandidateSkills
  analyzedAt: string
}
