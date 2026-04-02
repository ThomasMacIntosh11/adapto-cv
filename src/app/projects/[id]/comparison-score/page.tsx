'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  BarChart3,
  Target,
  AlertTriangle,
  TrendingUp,
  Award,
  Briefcase,
  Code,
  GraduationCap,
  RefreshCw
} from 'lucide-react'

interface ScoreCategory {
  name: string
  score: number
  maxScore: number
  status: 'strong' | 'moderate' | 'weak'
  details: string[]
  icon: React.ReactNode
}

interface GapItem {
  requirement: string
  severity: 'critical' | 'moderate' | 'minor'
  suggestion: string
}

const mockScoreCategories: ScoreCategory[] = [
  {
    name: 'Technical Skills Match',
    score: 87,
    maxScore: 100,
    status: 'strong',
    details: [
      'Python, R, SQL — fully matched',
      'Cloud platforms (AWS, Azure) — matched',
      'Machine Learning frameworks — strong coverage',
      'Spark/Hadoop — partially matched'
    ],
    icon: <Code className="h-5 w-5" />
  },
  {
    name: 'Experience Alignment',
    score: 78,
    maxScore: 100,
    status: 'moderate',
    details: [
      '8+ years data science — exceeds 5-year minimum',
      'Financial services domain — directly relevant',
      'Team leadership — demonstrated with 5-person team',
      'Client-facing experience — limited evidence'
    ],
    icon: <Briefcase className="h-5 w-5" />
  },
  {
    name: 'Industry Relevance',
    score: 91,
    maxScore: 100,
    status: 'strong',
    details: [
      'Financial services — primary domain match',
      'Risk modeling & fraud detection — directly applicable',
      'Regulatory compliance awareness — implied',
      'Consulting methodology — not demonstrated'
    ],
    icon: <Target className="h-5 w-5" />
  },
  {
    name: 'Qualifications & Certifications',
    score: 82,
    maxScore: 100,
    status: 'strong',
    details: [
      'M.S. Data Science (Stanford) — exceeds requirements',
      'AWS ML Specialty — directly relevant',
      'Google Data Engineer — additional value',
      'No PMP or consulting certifications'
    ],
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    name: 'Seniority & Leadership',
    score: 72,
    maxScore: 100,
    status: 'moderate',
    details: [
      'Senior-level positioning — appropriate',
      'Team leadership of 5 — moderate scale',
      'Cross-functional collaboration — evidenced',
      'Strategic influence scope — could be stronger'
    ],
    icon: <Award className="h-5 w-5" />
  }
]

const mockGaps: GapItem[] = [
  {
    requirement: 'Consulting methodology experience (Agile, Waterfall)',
    severity: 'critical',
    suggestion: 'Highlight any project management frameworks used in cross-functional work'
  },
  {
    requirement: 'Client-facing presentation and stakeholder management',
    severity: 'moderate',
    suggestion: 'Emphasize collaboration with product teams and strategic recommendations'
  },
  {
    requirement: 'Change management and organizational transformation',
    severity: 'moderate',
    suggestion: 'Frame ML model deployments as transformation initiatives with measurable outcomes'
  },
  {
    requirement: 'Multi-sector industry exposure',
    severity: 'minor',
    suggestion: 'Reference any cross-industry datasets or transferable analytics patterns'
  }
]

export default function ComparisonScorePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [overallScore, setOverallScore] = useState(0)
  const [categories, setCategories] = useState<ScoreCategory[]>([])
  const [gaps, setGaps] = useState<GapItem[]>([])
  const router = useRouter()
  const params = useParams()

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // TODO: Replace with actual AI comparison analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    setCategories(mockScoreCategories)
    setGaps(mockGaps)
    setOverallScore(82)
    setIsAnalyzing(false)
    setHasAnalyzed(true)
  }

  const handleContinue = () => {
    router.push(`/projects/${params.id}/generate`)
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getScoreTrackBg = (score: number) => {
    if (score >= 85) return 'bg-green-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getStatusBadge = (status: 'strong' | 'moderate' | 'weak') => {
    const styles = {
      strong: 'bg-green-100 text-green-700',
      moderate: 'bg-yellow-100 text-yellow-700',
      weak: 'bg-red-100 text-red-700'
    }
    return styles[status]
  }

  const getSeverityStyles = (severity: 'critical' | 'moderate' | 'minor') => {
    const styles = {
      critical: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
      moderate: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
      minor: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' }
    }
    return styles[severity]
  }

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
              Back to Upload Examples
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Comparison Score</h1>
          <p className="text-gray-600 mt-1">Analyze how well the CV aligns with the business context and RFP requirements</p>
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
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="text-sm font-semibold">4</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-blue-600">Comparison Score</span>
                </div>
              </li>

              <li className="relative pr-8">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  <span className="text-sm font-semibold">5</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Generate CVs</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Pre-analysis state */}
        {!hasAnalyzed && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Ready to Analyze</CardTitle>
                <CardDescription className="text-base mt-2">
                  Compare the uploaded CV against the RFP requirements and business context to generate a detailed alignment score with actionable insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">RFP Requirements Loaded</p>
                      <p className="text-xs text-green-600">4 key requirements identified from business context</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">CV Examples Uploaded</p>
                      <p className="text-xs text-green-600">2 CV examples analyzed and ready for comparison</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  className="w-full"
                  size="lg"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing alignment...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Run Comparison Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Post-analysis results */}
        {hasAnalyzed && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative h-24 w-24">
                      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50" cy="50" r="42"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50" cy="50" r="42"
                          fill="none"
                          stroke={overallScore >= 85 ? '#22c55e' : overallScore >= 70 ? '#eab308' : '#ef4444'}
                          strokeWidth="8"
                          strokeDasharray={`${(overallScore / 100) * 264} 264`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                          {overallScore}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Overall Alignment Score</h2>
                      <p className="text-gray-600 mt-1">
                        Good match — CV covers most RFP requirements with some gaps to address
                      </p>
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-xs text-gray-600">3 Strong</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 rounded-full bg-yellow-500" />
                          <span className="text-xs text-gray-600">2 Moderate</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                          <span className="text-xs text-gray-600">0 Weak</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={handleAnalyze} disabled={isAnalyzing}>
                      <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                      Re-analyze
                    </Button>
                    <Button onClick={handleContinue}>
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Continue to Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Category Breakdown */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Score Breakdown</h3>
                {categories.map((category) => (
                  <Card key={category.name}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                            {category.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">{category.name}</h4>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(category.status)}`}>
                              {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <span className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                          {category.score}%
                        </span>
                      </div>

                      {/* Score bar */}
                      <div className={`h-2 w-full rounded-full ${getScoreTrackBg(category.score)} mb-3`}>
                        <div
                          className={`h-2 rounded-full ${getScoreBg(category.score)}`}
                          style={{ width: `${category.score}%` }}
                        />
                      </div>

                      {/* Details */}
                      <ul className="space-y-1">
                        {category.details.map((detail, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Gaps & Recommendations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  Gaps & Recommendations
                </h3>
                {gaps.map((gap, index) => {
                  const styles = getSeverityStyles(gap.severity)
                  return (
                    <Card key={index} className={`${styles.bg} border ${styles.border}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className={`text-sm font-medium ${styles.text}`}>{gap.requirement}</p>
                          <span className={`ml-2 flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${styles.badge}`}>
                            {gap.severity}
                          </span>
                        </div>
                        <div className="flex items-start space-x-2 mt-2">
                          <TrendingUp className={`h-4 w-4 ${styles.text} flex-shrink-0 mt-0.5`} />
                          <p className={`text-xs ${styles.text}`}>{gap.suggestion}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                <Card className="bg-gray-50 border border-gray-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-gray-500">
                      These recommendations will be used to enhance the generated CV in the next step.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => router.push(`/projects/${params.id}/upload-examples`)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Upload Examples
              </Button>
              <Button onClick={handleContinue} size="lg">
                <ArrowRight className="h-4 w-4 mr-2" />
                Continue to Generate CV
              </Button>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  )
}
