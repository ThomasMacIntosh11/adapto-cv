'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Upload, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  CheckCircle,
  X,
  User,
  Award,
  Building2,
  TrendingUp
} from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: string
  status: 'processing' | 'complete' | 'error'
  insights?: {
    tone: string
    structure: string
    seniority: string
    quantificationStyle: string
  }
}

export default function UploadExamplesPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'senior-data-scientist-example.pdf',
      size: '2.3 MB',
      status: 'complete',
      insights: {
        tone: 'Professional & Technical',
        structure: 'Achievement-focused sections',
        seniority: 'Senior Level (8-12 years)',
        quantificationStyle: 'Metrics-heavy with percentages'
      }
    },
    {
      id: '2',
      name: 'ml-engineer-cv-sample.pdf',
      size: '1.8 MB',
      status: 'complete',
      insights: {
        tone: 'Technical & Results-oriented',
        structure: 'Project-based highlights',
        seniority: 'Mid-Senior Level (5-8 years)',
        quantificationStyle: 'Numbers and scale indicators'
      }
    }
  ])
  
  const [isDragOver, setIsDragOver] = useState(false)
  const router = useRouter()
  const params = useParams()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    // Mock file processing
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: 'new-cv-example.pdf',
      size: '2.1 MB',
      status: 'processing'
    }
    setUploadedFiles(prev => [...prev, newFile])
    
    // Simulate processing
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === newFile.id 
            ? {
                ...file,
                status: 'complete' as const,
                insights: {
                  tone: 'Executive & Strategic',
                  structure: 'Leadership-focused narrative',
                  seniority: 'Executive Level (12+ years)',
                  quantificationStyle: 'Strategic impact metrics'
                }
              }
            : file
        )
      )
    }, 3000)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const handleContinue = () => {
    router.push(`/projects/${params.id}/generate`)
  }

  const canContinue = uploadedFiles.length >= 2 && uploadedFiles.every(file => file.status === 'complete')

  return (
    <SidebarLayout>
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => router.push(`/projects/${params.id}/rfp-input`)}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to RFP Analysis
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Upload CV Examples</h1>
          <p className="text-gray-600 mt-1">Add 2-3 high-quality CV examples to model tone, structure, and style</p>
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
                  <div className="h-0.5 w-full bg-blue-200" />
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
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-blue-600">Upload Examples</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload Area */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upload CV Examples</CardTitle>
                <CardDescription>
                  Add 2-3 high-quality CVs that represent the style and tone you want to match
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">
                      Drag and drop CV files here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF, Word documents up to 10MB each
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4" disabled>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files (Demo)
                  </Button>
                </div>

                {/* Tips */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Tips for Best Results</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use CVs from similar experience levels</li>
                    <li>• Include examples with strong quantified achievements</li>
                    <li>• Ensure CVs match your target industry/role</li>
                    <li>• Upload 2-3 examples for optimal style consistency</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {canContinue && (
              <div className="mt-6">
                <Button onClick={handleContinue} className="w-full" size="lg">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Continue to Generation
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Uploaded Files */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Examples ({uploadedFiles.length})</CardTitle>
                <CardDescription>
                  CV examples being analyzed for style and structure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-sm text-gray-500">
                      No files uploaded yet
                    </p>
                  </div>
                ) : (
                  uploadedFiles.map((file) => (
                    <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {file.status === 'processing' && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
                          )}
                          {file.status === 'complete' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {file.status === 'processing' && (
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-400 mr-2" />
                            Analyzing CV structure and style...
                          </div>
                        </div>
                      )}

                      {file.status === 'complete' && file.insights && (
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="flex items-center space-x-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Tone</p>
                              <p className="text-xs font-medium">{file.insights.tone}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-3 w-3 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Structure</p>
                              <p className="text-xs font-medium">{file.insights.structure}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Seniority</p>
                              <p className="text-xs font-medium">{file.insights.seniority}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-3 w-3 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Metrics Style</p>
                              <p className="text-xs font-medium">{file.insights.quantificationStyle}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}

                {uploadedFiles.length > 0 && uploadedFiles.length < 3 && (
                  <div className="text-center py-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Add {3 - uploadedFiles.length} more example{uploadedFiles.length === 2 ? '' : 's'} for optimal results
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