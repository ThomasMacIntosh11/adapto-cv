'use client'

import Link from 'next/link'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  FileText,
  Calendar,
  User,
  Plus
} from 'lucide-react'

// Mock data for CV library
const cvLibrary = [
  {
    id: 1,
    name: 'Alexandra Chen - Senior Data Scientist',
    project: 'TechCorp RFP Response',
    client: 'TechCorp Industries',
    status: 'Approved',
    createdDate: '2024-03-15',
    lastModified: '2024-03-16',
    version: '2.1',
    tags: ['Data Science', 'ML', 'Financial Services']
  },
  {
    id: 2,
    name: 'Michael Rodriguez - Cloud Architect',
    project: 'GlobalBank Infrastructure',
    client: 'Global Bank Ltd',
    status: 'In Review',
    createdDate: '2024-03-10',
    lastModified: '2024-03-14',
    version: '1.3',
    tags: ['Cloud', 'AWS', 'Architecture']
  },
  {
    id: 3,
    name: 'Sarah Johnson - Project Manager',
    project: 'StartupInc Consulting',
    client: 'Startup Inc',
    status: 'Draft',
    createdDate: '2024-03-08',
    lastModified: '2024-03-12',
    version: '1.0',
    tags: ['PM', 'Agile', 'Leadership']
  },
  {
    id: 4,
    name: 'David Kim - DevOps Engineer',
    project: 'FinTech Solutions',
    client: 'FinTech Corp',
    status: 'Approved',
    createdDate: '2024-02-28',
    lastModified: '2024-03-02',
    version: '1.2',
    tags: ['DevOps', 'Kubernetes', 'CI/CD']
  }
]

const statusColors = {
  'Draft': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'In Review': 'bg-blue-100 text-blue-800 border-blue-200',
  'Approved': 'bg-green-100 text-green-800 border-green-200'
}

export default function LibraryPage() {
  return (
    <SidebarLayout>
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">CV Library</h1>
          <p className="text-gray-600 mt-1">Manage and organize all generated CVs</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search CVs, projects, or clients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <Link href="/projects/new">
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              Export All
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">127</p>
                  <p className="text-sm text-gray-600">Total CVs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                  <p className="text-sm text-gray-600">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                  <p className="text-sm text-gray-600">In Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                  <p className="text-sm text-gray-600">Drafts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CV Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent CVs</CardTitle>
            <CardDescription>All generated CVs across your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">CV Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Project</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Version</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cvLibrary.map((cv) => (
                    <tr key={cv.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{cv.name}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cv.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{cv.project}</div>
                        <div className="text-xs text-gray-500">{cv.client}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          statusColors[cv.status as keyof typeof statusColors]
                        }`}>
                          {cv.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {new Date(cv.createdDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Modified {new Date(cv.lastModified).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900">
                        v{cv.version}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  )
}