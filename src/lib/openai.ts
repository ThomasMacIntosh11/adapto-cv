import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION, // Optional
})

// Common prompts for the CV generation system
export const PROMPTS = {
  RFP_ANALYSIS: `You are an expert consultant CV analyst. Analyze the following RFP document and extract:
1. Key required skills and qualifications
2. Project scope and deliverables  
3. Industry/domain expertise needed
4. Experience level requirements
5. Specific technologies or methodologies mentioned

Provide your analysis in a structured JSON format with clear categories.`,

  CV_GENERATION: `You are an expert CV writer for management consultants. Generate a professional, tailored CV based on:
- RFP requirements and analysis
- Candidate background information
- Example CV style and format

Create a compelling CV that directly addresses the RFP requirements while showcasing relevant experience and achievements. Use quantified accomplishments and consulting-specific language.

Format the output as clean, professional CV content ready for presentation to clients.`,
}

// API response types
export interface RFPAnalysis {
  requiredSkills: string[]
  projectScope: string
  industryExpertise: string[]
  experienceLevel: string
  technologies: string[]
  keyRequirements: string[]
}

export interface CVGenerationRequest {
  rfpAnalysis: RFPAnalysis
  candidateInfo: {
    name: string
    currentRole: string
    experience: string
    skills: string[]
    achievements: string[]
  }
  exampleCVStyle?: string
}