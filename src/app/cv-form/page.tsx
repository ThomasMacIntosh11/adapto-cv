'use client'

import { useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Plus, ArrowRight } from 'lucide-react'

export default function CVFormPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    expertise: '',
    experienceBullets: ['', '', ''],
  })
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleBulletChange = (index: number, value: string) => {
    setFormData(prev => {
      const updated = [...prev.experienceBullets]
      updated[index] = value
      return { ...prev, experienceBullets: updated }
    })
  }

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills(prev => [...prev, trimmed])
    }
    setSkillInput('')
  }

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill))
  }

  const isFormValid =
    formData.name.trim() &&
    formData.role.trim() &&
    formData.expertise.trim() &&
    skills.length > 0 &&
    formData.experienceBullets.every(b => b.trim())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock submission — replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('CV form submitted:', { ...formData, skills })

    router.push('/library')
  }

  return (
    <SidebarLayout>
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add CV Details</h1>
          <p className="text-gray-600 mt-1">Fill in the required fields to create a new CV entry</p>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>CV Information</CardTitle>
              <CardDescription>All fields are required</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Alexandra Chen"
                  />
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Senior Data Scientist"
                  />
                </div>

                {/* Expertise */}
                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-2">
                    Expertise *
                  </label>
                  <textarea
                    id="expertise"
                    name="expertise"
                    rows={3}
                    required
                    value={formData.expertise}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Machine learning, predictive modelling, and large-scale data pipeline design"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills *
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type a skill and press Enter or Add"
                    />
                    <Button type="button" variant="outline" onClick={addSkill} className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-blue-600 focus:outline-none"
                            aria-label={`Remove ${skill}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {skills.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">Add at least one skill</p>
                  )}
                </div>

                {/* Experience Bullets */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Highlights *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">Provide 3 key achievement bullets</p>
                  <div className="space-y-3">
                    {formData.experienceBullets.map((bullet, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mt-1">
                          {i + 1}
                        </span>
                        <textarea
                          rows={2}
                          required
                          value={bullet}
                          onChange={e => handleBulletChange(i, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`e.g., Led a team of 5 engineers to deliver a $2M data platform on time`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
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
                    disabled={isLoading || !isFormValid}
                    className="flex items-center"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    Save CV
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
