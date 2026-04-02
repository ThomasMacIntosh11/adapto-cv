import { RFPAnalysis, CVGenerationRequest } from './openai'

// API client functions for frontend components

export async function analyzeRFP(rfpText: string): Promise<RFPAnalysis> {
  const response = await fetch('/api/analyze-rfp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rfpText }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to analyze RFP')
  }

  const data = await response.json()
  return data.analysis
}

export async function generateCV(request: CVGenerationRequest): Promise<string> {
  const response = await fetch('/api/generate-cv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to generate CV')
  }

  const data = await response.json()
  return data.cv
}

// Helper function to validate API key is configured
export async function validateAPIConfiguration(): Promise<boolean> {
  try {
    const response = await fetch('/api/analyze-rfp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rfpText: 'test' }),
    })
    
    // If we get a response (even an error), the API is configured
    return response.status !== 500
  } catch {
    return false
  }
}