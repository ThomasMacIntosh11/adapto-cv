<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server'
import { openai, PROMPTS, RFPAnalysis } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { rfpText } = await request.json()

    if (!rfpText || rfpText.trim().length === 0) {
      return NextResponse.json(
        { error: 'RFP text is required' },
=======
import { NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import { analyzeRFP } from '@/services/rfp-analyzer'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const text = (formData.get('text') as string | null) ?? ''

    let extractedText = text

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = file.name.toLowerCase()

      if (filename.endsWith('.pdf')) {
        const parsed = await pdfParse(buffer)
        extractedText = parsed.text + (extractedText ? '\n\n' + extractedText : '')
      } else if (filename.endsWith('.docx')) {
        const result = await mammoth.extractRawText({ buffer })
        extractedText = result.value + (extractedText ? '\n\n' + extractedText : '')
      } else if (filename.endsWith('.txt')) {
        extractedText = buffer.toString('utf-8') + (extractedText ? '\n\n' + extractedText : '')
      }
    }

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: 'No content provided. Please upload a file or paste RFP text.' },
>>>>>>> 09aba94f1aae1d5406f264cb1845bcddc3ff6e8c
        { status: 400 }
      )
    }

<<<<<<< HEAD
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
=======
    const result = await analyzeRFP(extractedText)
    return NextResponse.json(result)
  } catch (err) {
    console.error('RFP analysis error:', err)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    )
  }
}
>>>>>>> 09aba94f1aae1d5406f264cb1845bcddc3ff6e8c
