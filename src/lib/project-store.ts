import type { RFPAnalysisResult } from '@/types/rfp-analysis'

const STORAGE_KEY = 'adaptovate_projects'

interface ProjectData {
  rfpAnalysis?: RFPAnalysisResult
}

function load(): Record<string, ProjectData> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save(projects: Record<string, ProjectData>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function saveProjectAnalysis(projectId: string, analysis: RFPAnalysisResult) {
  const projects = load()
  projects[projectId] = { ...projects[projectId], rfpAnalysis: analysis }
  save(projects)
}

export function getProjectAnalysis(projectId: string): RFPAnalysisResult | null {
  const projects = load()
  return projects[projectId]?.rfpAnalysis ?? null
}
