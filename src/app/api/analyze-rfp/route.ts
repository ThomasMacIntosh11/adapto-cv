import { NextRequest, NextResponse } from 'next/server'
import { openai, PROMPTS, RFPAnalysis } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { rfpText } = await request.json()

    if (!rfpText || rfpText.trim().length === 0) {
      return NextResponse.json(
        { error: 'RFP text is required' },
        { status: 400 }
      )
    }

    // Call OpenAI to analyze the RFP
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: PROMPTS.RFP_ANALYSIS
        },
        {
          role: 'user',
          content: `Please analyze this RFP document:\n\n${rfpText}`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    })

    const analysisText = completion.choices[0]?.message?.content
    
    if (!analysisText) {
      throw new Error('No analysis generated')
    }

    // Parse the JSON response from OpenAI
    let analysis: RFPAnalysis
    try {
      analysis = JSON.parse(analysisText)
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      analysis = {
        requiredSkills: ['Analysis pending - please review RFP manually'],
        projectScope: analysisText.substring(0, 200) + '...',
        industryExpertise: ['To be determined'],
        experienceLevel: 'Senior level assumed',
        technologies: ['Various technologies mentioned'],
        keyRequirements: ['Detailed analysis in progress']
      }
    }

    return NextResponse.json({ analysis })

  } catch (error) {
    console.error('RFP Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze RFP. Please try again.' },
      { status: 500 }
    )
  }
}