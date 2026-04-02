'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  Download,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  FileText,
  BarChart3,
  User,
  Target
} from 'lucide-react'

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const router = useRouter()
  const params = useParams()

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Mock generation delay
    await new Promise(resolve => setTimeout(resolve, 4000))
    setIsGenerating(false)
    setHasGenerated(true)
  }

  const mockCV = `
ALEXANDRA CHEN
Senior Data Scientist | Machine Learning Specialist

PROFESSIONAL SUMMARY
Results-driven Senior Data Scientist with 8+ years of experience developing and deploying machine learning solutions in financial services. Led cross-functional teams to deliver predictive models that increased revenue by 23% and reduced risk exposure by $2.4M annually. Expert in Python, R, and cloud platforms with a proven track record of translating complex data insights into actionable business strategies.

CORE COMPETENCIES
• Machine Learning & Statistical Modeling • Python, R, SQL, Scala Programming
• Cloud Platforms: AWS, Azure, Google Cloud • Big Data: Spark, Hadoop, Kafka
• Financial Risk Modeling & Fraud Detection • Team Leadership & Stakeholder Communication
• A/B Testing & Experimental Design • MLOps & Model Deployment

PROFESSIONAL EXPERIENCE

SENIOR DATA SCIENTIST | TechBank Financial (2020-Present)
• Developed ensemble ML models for credit risk assessment, improving prediction accuracy by 34% and reducing default rates by 18%
• Led a team of 5 data scientists to build real-time fraud detection system, preventing $4.2M in fraudulent transactions annually
• Architected scalable data pipelines on AWS, processing 10M+ transactions daily with 99.9% uptime
• Collaborated with product and engineering teams to deploy 12 ML models into production, serving 2M+ customers

DATA SCIENTIST | Global Analytics Corp (2017-2020)
• Built predictive models for customer lifetime value, enabling targeted marketing campaigns that increased conversion rates by 28%
• Implemented automated feature engineering pipeline, reducing model development time by 45%
• Conducted statistical analysis and A/B tests for product optimization, influencing strategic decisions for $50M revenue stream

TECHNICAL SKILLS
• Programming: Python (NumPy, Pandas, Scikit-learn, TensorFlow), R, SQL, Scala
• Cloud & Big Data: AWS (SageMaker, EC2, S3), Azure ML, Google Cloud, Apache Spark, Hadoop
• Visualization: Tableau, Power BI, matplotlib, seaborn, ggplot2
• Databases: PostgreSQL, MySQL, MongoDB, Redshift, BigQuery

EDUCATION
M.S. Data Science, Stanford University (2017)
B.S. Mathematics & Computer Science, UC Berkeley (2015)

CERTIFICATIONS
• AWS Certified Machine Learning - Specialty (2022)
• Google Professional Data Engineer (2021)
• Certified Analytics Professional (CAP) (2020)
`

  return (
    <SidebarLayout>
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => router.push(`/projects/${params.id}/upload-examples`)}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Examples
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Generate CV</h1>
          <p className="text-gray-600 mt-1">Create tailored CVs based on RFP requirements and example styles</p>
        </div>

        {/* Workflow Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              <li className="relative pr-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-green-200" />
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
                  <div className="h-0.5 w-full bg-green-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-green-600">RFP Analysis</span>
                </div>
              </li>
              
              <li className="relative pr-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-green-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-green-600">Upload Examples</span>
                </div>
              </li>
              
              <li className="relative pr-8">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="text-sm font-semibold">4</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-blue-600">Generate CVs</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Source Materials */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Source Materials</CardTitle>
                <CardDescription>Review inputs for generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">RFP Requirements</h3>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• 5+ years data science experience</li>
                    <li>• Python, R, SQL expertise</li>
                    <li>• Cloud platform knowledge</li>
                    <li>• Financial services background</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Style Examples (3)</h3>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• Professional & technical tone</li>
                    <li>• Achievement-focused structure</li>
                    <li>• Senior-level positioning</li>
                    <li>• Quantified results emphasis</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Generation Controls */}
            <div className="mt-6">
              {!hasGenerated ? (
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Generating CV...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Draft CV
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Export to Word
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Center - Generated CV */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Generated CV Draft</CardTitle>
                <CardDescription>
                  {hasGenerated 
                    ? 'AI-generated CV tailored to RFP requirements'
                    : 'Click "Generate Draft CV" to create tailored content'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!hasGenerated && !isGenerating ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FileText className="mx-auto h-16 w-16 text-gray-300" />
                    <p className="mt-4 text-gray-500">Generated CV content will appear here</p>
                  </div>
                ) : isGenerating ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto" />
                    <p className="mt-4 text-gray-700 font-medium">Generating CV...</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Analyzing requirements and examples to create the perfect CV
                    </p>
                  </div>
                ) : (
                  <div className="bg-white border rounded-lg p-6 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
                      {mockCV}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Quality Metrics */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quality Assessment</CardTitle>
                <CardDescription>RFP compliance and style matching</CardDescription>
              </CardHeader>
              <CardContent>
                {hasGenerated ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-700">RFP Match</span>
                      </div>
                      <div className="text-sm font-medium text-green-600">94%</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-700">Style Match</span>
                      </div>
                      <div className="text-sm font-medium text-green-600">91%</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-700">Quantification</span>
                      </div>
                      <div className="text-sm font-medium text-green-600">88%</div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Compliance Check</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          <span className="text-gray-700">Required experience level</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          <span className="text-gray-700">Technical skills coverage</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          <span className="text-gray-700">Industry background</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          <span className="text-gray-700">Leadership experience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-sm text-gray-500">
                      Quality metrics will be shown after generation
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}