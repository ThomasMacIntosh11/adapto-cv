import { NextRequest, NextResponse } from 'next/server'
import { openai, PROMPTS, CVGenerationRequest } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const data: CVGenerationRequest = await request.json()

    if (!data.rfpAnalysis || !data.candidateInfo) {
      return NextResponse.json(
        { error: 'RFP analysis and candidate information are required' },
        { status: 400 }
      )
    }

    // Prepare the prompt with structured data
    const prompt = `
RFP ANALYSIS:
Required Skills: ${data.rfpAnalysis.requiredSkills.join(', ')}
Project Scope: ${data.rfpAnalysis.projectScope}
Industry Expertise: ${data.rfpAnalysis.industryExpertise.join(', ')}
Experience Level: ${data.rfpAnalysis.experienceLevel}
Technologies: ${data.rfpAnalysis.technologies.join(', ')}
Key Requirements: ${data.rfpAnalysis.keyRequirements.join(', ')}

CANDIDATE INFORMATION:
Name: ${data.candidateInfo.name}
Current Role: ${data.candidateInfo.currentRole}
Experience: ${data.candidateInfo.experience}
Skills: ${data.candidateInfo.skills.join(', ')}
Key Achievements: ${data.candidateInfo.achievements.join('; ')}

${data.exampleCVStyle ? `STYLE REFERENCE:\n${data.exampleCVStyle}` : ''}

Please generate a tailored, professional CV that addresses the RFP requirements.
`

    // Call OpenAI to generate the CV
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: PROMPTS.CV_GENERATION
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    })

    const generatedCV = completion.choices[0]?.message?.content
    
    if (!generatedCV) {
      throw new Error('No CV content generated')
    }

    return NextResponse.json({ 
      cv: generatedCV,
      metadata: {
        generatedAt: new Date().toISOString(),
        model: 'gpt-4',
        candidateName: data.candidateInfo.name
      }
    })

  } catch (error) {
    console.error('CV Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CV. Please try again.' },
      { status: 500 }
    )
  }
}