'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  FileText,
  Sparkles,
  CheckCircle,
  X,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Building2,
  Target,
  Star,
  Crosshair,
  Wrench,
  Heart,
  Factory,
  Award,
} from 'lucide-react'
import type { RFPAnalysisResult, Priority, Requirement } from '@/types/rfp-analysis'
import { saveProjectAnalysis, getProjectAnalysis } from '@/lib/project-store'

// ─── Helpers ────────────────────────────────────────────────────────────────

function priorityBadge(priority: Priority) {
  const styles: Record<Priority, string> = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[priority]}`}>
      {priority}
    </span>
  )
}

function requirementBadge(requirement: Requirement) {
  const styles: Record<Requirement, string> = {
    Mandatory: 'bg-blue-100 text-blue-700 border-blue-200',
    Desirable: 'bg-gray-100 text-gray-600 border-gray-200',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[requirement]}`}>
      {requirement}
    </span>
  )
}

// ─── Collapsible section ─────────────────────────────────────────────────────

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          {icon}
          {title}
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
      </button>
      {open && <div className="px-4 py-3 space-y-2">{children}</div>}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RFPInputPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  const [rfpText, setRfpText] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<RFPAnalysisResult | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Load persisted analysis on mount
  useEffect(() => {
    const saved = getProjectAnalysis(projectId)
    if (saved) setResults(saved)
  }, [projectId])

  // Scroll to results after analysis completes
  useEffect(() => {
    if (results) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [results])

  const canAnalyze = (uploadedFile !== null || rfpText.trim().length > 0) && !isAnalyzing

  const handleFileChange = (file: File) => {
    const allowed = ['.pdf', '.docx', '.txt']
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!allowed.includes(ext)) {
      setError('Unsupported file type. Please upload a PDF, Word (.docx), or plain text file.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum size is 10 MB.')
      return
    }
    setError(null)
    setUploadedFile(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileChange(file)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAnalyze = async () => {
    if (!canAnalyze) return
    setIsAnalyzing(true)
    setError(null)

    try {
      const body = new FormData()
      if (uploadedFile) body.append('file', uploadedFile)
      body.append('text', rfpText)

      const res = await fetch('/api/analyze-rfp', { method: 'POST', body })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Analysis failed. Please try again.')
        return
      }

      setResults(data as RFPAnalysisResult)
      saveProjectAnalysis(projectId, data as RFPAnalysisResult)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <SidebarLayout>
      <div className="px-6 py-8 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/projects/new')}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Project Setup
          </button>
          <h1 className="text-2xl font-bold text-gray-900">RFP Analysis</h1>
          <p className="text-gray-600 mt-1">Upload the RFP or paste notes, then run AI analysis to build your response strategy</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {[
                { label: 'Project Setup', done: true },
                { label: 'RFP Analysis', active: true },
                { label: 'Upload Examples' },
                { label: 'Generate CVs' },
              ].map((step, i) => (
                <li key={i} className={`relative ${i < 3 ? 'pr-8' : ''}`}>
                  {i < 3 && (
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className={`h-0.5 w-full ${step.done ? 'bg-blue-200' : 'bg-gray-200'}`} />
                    </div>
                  )}
                  <div className={`relative flex h-8 w-8 items-center justify-center rounded-full
                    ${step.done ? 'bg-green-500 text-white' : step.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {step.done ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm font-semibold">{i + 1}</span>}
                  </div>
                  <div className="mt-2">
                    <span className={`text-sm font-medium ${step.done ? 'text-green-600' : step.active ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.label}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* ── Input Card ─────────────────────────────────────────────────────── */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>RFP Content</CardTitle>
            <CardDescription>
              Upload a file, paste RFP text, or add meeting notes — or combine both
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* File Upload */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => !uploadedFile && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
                ${uploadedFile ? 'border-green-400 bg-green-50 cursor-default' : isDragging ? 'border-blue-400 bg-blue-50 cursor-copy' : 'border-gray-300 hover:border-gray-400 cursor-pointer'}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFileChange(f) }}
              />

              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-green-800">{uploadedFile.name}</p>
                    <p className="text-xs text-green-600">{(uploadedFile.size / 1024).toFixed(0)} KB — text will be extracted on analysis</p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); setUploadedFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                    className="ml-4 p-1 rounded-full hover:bg-green-200 text-green-700"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-3 text-sm font-medium text-gray-900">
                    {isDragging ? 'Drop file here' : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, Word (.docx), or plain text — up to 10 MB</p>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">And / or paste text below</span>
              </div>
            </div>

            {/* Text Area */}
            <div>
              <label htmlFor="rfp-text" className="block text-sm font-medium text-gray-700 mb-2">
                RFP text or meeting notes
              </label>
              <textarea
                id="rfp-text"
                rows={12}
                value={rfpText}
                onChange={e => setRfpText(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Paste the full RFP, a job description, or notes from your scoping meetings here..."
              />
              <p className="mt-1 text-xs text-gray-400 text-right">{rfpText.length} characters</p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Analyze Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className="flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Analysing RFP...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {results ? 'Re-analyse RFP' : 'Analyse RFP'}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── Results Panel ───────────────────────────────────────────────────── */}
        {results && (
          <div ref={resultsRef} className="space-y-6">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  Analysis Results
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Last analysed {new Date(results.analyzedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              {/* ── Output 1: Response Strategy ─────────────────────────────── */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Response Strategy
                  </CardTitle>
                  <CardDescription>What your firm needs to showcase to win this RFP</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Section icon={<Building2 className="h-4 w-4 text-blue-400" />} title="Company Capabilities">
                    {results.responseStrategy.companyCapabilities.map((item, i) => (
                      <div key={i} className="flex items-start justify-between gap-3 py-1">
                        <p className="text-sm text-gray-700 flex-1">{item.description}</p>
                        {priorityBadge(item.priority)}
                      </div>
                    ))}
                  </Section>

                  <Section icon={<Star className="h-4 w-4 text-amber-400" />} title="Positioning">
                    {results.responseStrategy.positioning.map((item, i) => (
                      <div key={i} className="flex items-start justify-between gap-3 py-1">
                        <p className="text-sm text-gray-700 flex-1">{item.description}</p>
                        {priorityBadge(item.priority)}
                      </div>
                    ))}
                  </Section>

                  <Section icon={<Crosshair className="h-4 w-4 text-purple-400" />} title="Differentiators">
                    {results.responseStrategy.differentiators.map((item, i) => (
                      <div key={i} className="flex items-start justify-between gap-3 py-1">
                        <p className="text-sm text-gray-700 flex-1">{item.description}</p>
                        {priorityBadge(item.priority)}
                      </div>
                    ))}
                  </Section>

                  <Section icon={<Target className="h-4 w-4 text-green-500" />} title="Focus Areas">
                    {results.responseStrategy.focusAreas.map((item, i) => (
                      <div key={i} className="flex items-start justify-between gap-3 py-1">
                        <p className="text-sm text-gray-700 flex-1">{item.description}</p>
                        {priorityBadge(item.priority)}
                      </div>
                    ))}
                  </Section>
                </CardContent>
              </Card>

              {/* ── Output 2: Candidate Skills ───────────────────────────────── */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Candidate Skill Requirements
                  </CardTitle>
                  <CardDescription>Skills your proposed candidates should demonstrate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Section icon={<Wrench className="h-4 w-4 text-slate-500" />} title="Technical Skills">
                    {results.candidateSkills.technicalSkills.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 py-1">
                        <p className="text-sm text-gray-700 flex-1">{item.skill}</p>
                        {requirementBadge(item.requirement)}
                      </div>
                    ))}
                  </Section>

                  <Section icon={<Heart className="h-4 w-4 text-rose-400" />} title="Soft Skills">
                    {results.candidateSkills.softSkills.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 py-1">
                        <p className="text-sm text-gray-700 flex-1">{item.skill}</p>
                        {requirementBadge(item.requirement)}
                      </div>
                    ))}
                  </Section>

                  <Section icon={<Factory className="h-4 w-4 text-orange-400" />} title="Industry Experience">
                    {results.candidateSkills.industryExperience.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 py-1">
                        <p className="text-sm text-gray-700 flex-1">{item.skill}</p>
                        {requirementBadge(item.requirement)}
                      </div>
                    ))}
                  </Section>

                  <Section icon={<Award className="h-4 w-4 text-yellow-500" />} title="Certifications">
                    {results.candidateSkills.certifications.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 py-1">
                        <p className="text-sm text-gray-700 flex-1">{item.skill}</p>
                        {requirementBadge(item.requirement)}
                      </div>
                    ))}
                  </Section>
                </CardContent>
              </Card>
            </div>

            {/* Continue */}
            <div className="flex justify-end pt-2 pb-8">
              <Button onClick={() => router.push(`/projects/${projectId}/upload-examples`)} className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Continue to Upload Examples
              </Button>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  )
}
