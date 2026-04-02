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
        { status: 400 }
      )
    }

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
