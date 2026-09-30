import { useState, useEffect, useCallback } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore'
import { DEFAULT_FORM_OPTIONS, type FormOptions } from '../types'

const LOCAL_STORAGE_KEY = 'proxy_form_options'

function getInitialOptions(): FormOptions {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      return {
        highestEducation: Array.isArray(parsed.highestEducation) && parsed.highestEducation.length ? parsed.highestEducation : DEFAULT_FORM_OPTIONS.highestEducation,
        preferredRole: Array.isArray(parsed.preferredRole) && parsed.preferredRole.length ? parsed.preferredRole : DEFAULT_FORM_OPTIONS.preferredRole,
        workExperience: Array.isArray(parsed.workExperience) && parsed.workExperience.length ? parsed.workExperience : DEFAULT_FORM_OPTIONS.workExperience,
        currentLocation: Array.isArray(parsed.currentLocation) && parsed.currentLocation.length ? parsed.currentLocation : DEFAULT_FORM_OPTIONS.currentLocation,
        industry: Array.isArray(parsed.industry) && parsed.industry.length ? parsed.industry : DEFAULT_FORM_OPTIONS.industry,
        companySize: Array.isArray(parsed.companySize) && parsed.companySize.length ? parsed.companySize : DEFAULT_FORM_OPTIONS.companySize,
      }
    }
  } catch {
    // Ignore error
  }
  return DEFAULT_FORM_OPTIONS
}

export function useAdminFormOptions() {
  const [options, setOptions] = useState<FormOptions>(getInitialOptions)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    try {
      const settingsRef = doc(db, 'settings', 'formOptions')
      const unsub = onSnapshot(
        settingsRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data()
            const merged: FormOptions = {
              highestEducation: Array.isArray(data.highestEducation) && data.highestEducation.length ? data.highestEducation : DEFAULT_FORM_OPTIONS.highestEducation,
              preferredRole: Array.isArray(data.preferredRole) && data.preferredRole.length ? data.preferredRole : DEFAULT_FORM_OPTIONS.preferredRole,
              workExperience: Array.isArray(data.workExperience) && data.workExperience.length ? data.workExperience : DEFAULT_FORM_OPTIONS.workExperience,
              currentLocation: Array.isArray(data.currentLocation) && data.currentLocation.length ? data.currentLocation : DEFAULT_FORM_OPTIONS.currentLocation,
              industry: Array.isArray(data.industry) && data.industry.length ? data.industry : DEFAULT_FORM_OPTIONS.industry,
              companySize: Array.isArray(data.companySize) && data.companySize.length ? data.companySize : DEFAULT_FORM_OPTIONS.companySize,
            }
            setOptions(merged)
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged))
            } catch {
              // Ignore
            }
          }
          setLoading(false)
        },
        (error) => {
          console.warn('Could not read formOptions from Firestore (using cached/default):', error)
          setLoading(false)
        }
      )
      return () => unsub()
    } catch (err) {
      console.warn('Error setting up formOptions snapshot:', err)
      setLoading(false)
    }
  }, [])

  const saveOptions = useCallback(async (newOptions: FormOptions) => {
    setSaving(true)
    setStatusMessage(null)
    setOptions(newOptions)
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newOptions))
    } catch {
      // Ignore
    }

    try {
      const settingsRef = doc(db, 'settings', 'formOptions')
      await setDoc(
        settingsRef,
        {
          highestEducation: newOptions.highestEducation,
          preferredRole: newOptions.preferredRole,
          workExperience: newOptions.workExperience,
          currentLocation: newOptions.currentLocation,
          industry: newOptions.industry,
          companySize: newOptions.companySize,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
      setStatusMessage({ type: 'success', text: 'All field options saved to Firestore successfully!' })
    } catch (err: any) {
      console.warn('Firestore write failed, saved locally:', err)
      setStatusMessage({
        type: 'error',
        text: 'Saved locally. (Firestore update error: ' + (err?.message || 'Check permissions') + ')',
      })
    } finally {
      setSaving(false)
    }
  }, [])

  const updateCategory = useCallback(
    async (category: keyof Omit<FormOptions, 'updatedAt'>, newItems: string[]) => {
      const updated: FormOptions = {
        ...options,
        [category]: newItems,
      }
      await saveOptions(updated)
    },
    [options, saveOptions]
  )

  const resetToDefaults = useCallback(async () => {
    await saveOptions(DEFAULT_FORM_OPTIONS)
  }, [saveOptions])

  return {
    options,
    loading,
    saving,
    statusMessage,
    saveOptions,
    updateCategory,
    resetToDefaults,
  }
}
