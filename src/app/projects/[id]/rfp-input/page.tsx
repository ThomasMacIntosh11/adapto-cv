'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { analyzeRFP } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Upload, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Sparkles,
  CheckCircle,
  Users,
  Building,
  Target
} from 'lucide-react'

export default function RFPInputPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [rfpText, setRfpText] = useState('')
  const router = useRouter()
  const params = useParams()

  const handleAnalyze = async () => {
    if (!rfpText.trim()) return
    
    setIsAnalyzing(true)
    try {
      // Call OpenAI API to analyze RFP
      const analysis = await analyzeRFP(rfpText)
      console.log('RFP Analysis:', analysis)
      
      // TODO: Store analysis results in state/context for next steps
      setHasAnalyzed(true)
    } catch (error) {
      console.error('Failed to analyze RFP:', error)
      alert('Failed to analyze RFP. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }
    // Mock analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
    setHasAnalyzed(true)
  }

  const handleContinue = () => {
    router.push(`/projects/${params.id}/upload-examples`)
  }

  // Mock analysis results
  const analysisResults = {
    requiredExperience: [
      '5+ years in data science and machine learning',
      'Experience with Python, R, and SQL',
      'Cloud platform experience (AWS, Azure, or GCP)',
      'Statistical analysis and modeling expertise'
    ],
    requiredCapabilities: [
      'Lead cross-functional data science projects',
      'Develop predictive models and algorithms',
      'Communicate insights to stakeholders',
      'Mentor junior team members'
    ],
    industryContext: 'Financial Services / Banking',
    toneStyle: 'Professional, technical, results-oriented with quantified achievements'
  }

  return (
    <SidebarLayout>
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => router.push('/projects/new')}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Project Setup
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">RFP Analysis</h1>
          <p className="text-gray-600 mt-1">Upload or paste the RFP requirements for AI analysis</p>
        </div>

        {/* Workflow Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              <li className="relative pr-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-blue-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-green-600">Project Setup</span>
                </div>
              </li>
              
              <li className="relative pr-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-blue-600">RFP Analysis</span>
                </div>
              </li>
              
              <li className="relative pr-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Upload Examples</span>
                </div>
              </li>
              
              <li className="relative pr-8">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  <span className="text-sm font-semibold">4</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Generate CVs</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>RFP Requirements</CardTitle>
                <CardDescription>
                  Paste the RFP text below or upload a file for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">Upload RFP file</p>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF, Word, or text files up to 10MB
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4" disabled>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File (Coming Soon)
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or paste text below</span>
                  </div>
                </div>

                {/* Text Input */}
                <div>
                  <label htmlFor="rfp-text" className="block text-sm font-medium text-gray-700 mb-2">
                    RFP Text Content
                  </label>
                  <textarea
                    id="rfp-text"
                    name="rfp-text"
                    rows={12}
                    value={rfpText}
                    onChange={(e) => setRfpText(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Paste the RFP requirements, job description, or staffing request here...

Example:
We are seeking a Senior Data Scientist with 5+ years of experience in machine learning and statistical analysis. The ideal candidate will have:
- Advanced Python and R programming skills
- Experience with cloud platforms (AWS/Azure/GCP)
- Strong background in financial services
- Proven track record of leading data science projects..."
                  />
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    {rfpText.length} characters
                  </div>
                  <Button 
                    onClick={handleAnalyze}
                    disabled={!rfpText.trim() || isAnalyzing}
                    className="flex items-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Analyze RFP
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analysis Results */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
                  AI Analysis Preview
                </CardTitle>
                <CardDescription>
                  {hasAnalyzed 
                    ? 'Analysis complete - review the extracted requirements'
                    : 'Requirements will be extracted automatically'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!hasAnalyzed ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-sm text-gray-500">
                      Paste RFP content and click &ldquo;Analyze RFP&rdquo; to see extracted requirements
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Required Experience */}
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-900 mb-2">
                        <Users className="h-4 w-4 mr-2" />
                        Required Experience
                      </h3>
                      <ul className="space-y-2">
                        {analysisResults.requiredExperience.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            <span className="text-xs text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Capabilities */}
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-900 mb-2">
                        <Target className="h-4 w-4 mr-2" />
                        Required Capabilities
                      </h3>
                      <ul className="space-y-2">
                        {analysisResults.requiredCapabilities.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            <span className="text-xs text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Industry Context */}
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-900 mb-2">
                        <Building className="h-4 w-4 mr-2" />
                        Industry Context
                      </h3>
                      <p className="text-xs text-gray-700">{analysisResults.industryContext}</p>
                    </div>

                    {/* Tone & Style */}
                    <div>
                      <h3 className="flex items-center text-sm font-medium text-gray-900 mb-2">
                        <FileText className="h-4 w-4 mr-2" />
                        Tone & Style
                      </h3>
                      <p className="text-xs text-gray-700">{analysisResults.toneStyle}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {hasAnalyzed && (
              <div className="mt-6">
                <Button onClick={handleContinue} className="w-full">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Continue to Examples
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}