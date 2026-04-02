'use client'

import SidebarLayout from '@/components/layout/sidebar-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <SidebarLayout>
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your CV Studio preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Settings</CardTitle>
              <CardDescription>Customize CV branding and templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                  <Button variant="outline" disabled>Upload Logo (Coming Soon)</Button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Template</label>
                  <select className="block w-full px-3 py-2 border border-gray-300 rounded-md" disabled>
                    <option>ADAPTOVATE Executive Template</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Settings</CardTitle>
              <CardDescription>Configure AI model preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Generation Model</label>
                  <select className="block w-full px-3 py-2 border border-gray-300 rounded-md" disabled>
                    <option>GPT-4 (Recommended)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quality Threshold</label>
                  <input type="range" min="80" max="100" value="90" className="w-full" disabled />
                  <div className="text-sm text-gray-500">90% minimum quality score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Button disabled>Save Settings (Demo)</Button>
        </div>
      </div>
    </SidebarLayout>
  )
}