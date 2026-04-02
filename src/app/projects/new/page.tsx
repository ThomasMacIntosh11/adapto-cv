'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Info } from 'lucide-react'

export default function NewProjectPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    role: '',
    submissionType: 'proposal',
    deadline: '',
    notes: ''
  })
  
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Mock project creation - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // TODO: Create actual project and save to database
    console.log('Creating project:', formData)
    
    // Redirect to RFP input
    router.push(`/projects/123/rfp-input`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <SidebarLayout>
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-600 mt-1">Set up a new CV generation project for your client proposal</p>
        </div>

        {/* Workflow Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              <li className="relative pr-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-blue-600">Project Setup</span>
                </div>
              </li>
              
              <li className="relative pr-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">RFP Analysis</span>
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

        {/* Form */}
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Provide basic information about your CV generation project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Name */}
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    required
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Senior Data Scientist - TechCorp RFP"
                  />
                </div>

                {/* Client Name */}
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., TechCorp Industries"
                  />
                </div>

                {/* Role/Position */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role/Position *
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Senior Data Scientist, Project Manager, Cloud Architect"
                  />
                </div>

                {/* Submission Type */}
                <div>
                  <label htmlFor="submissionType" className="block text-sm font-medium text-gray-700 mb-2">
                    Submission Type
                  </label>
                  <select
                    id="submissionType"
                    name="submissionType"
                    value={formData.submissionType}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="proposal">Proposal Response</option>
                    <option value="staffing">Staffing Request</option>
                    <option value="tender">Tender Submission</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Deadline */}
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any specific requirements, context, or notes about this project..."
                  />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Next Steps</h3>
                      <div className="mt-1 text-sm text-blue-700">
                        <p>After creating your project, you&apos;ll be guided through:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Uploading and analyzing the RFP requirements</li>
                          <li>Adding 2-3 example CVs for quality modeling</li>
                          <li>Generating tailored CVs that match your examples</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/library')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.projectName || !formData.clientName || !formData.role}
                    className="flex items-center"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    Create Project & Continue
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  )
}