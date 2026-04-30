import { useState } from 'react'
import { submitBugReport } from './api'

const SEVERITIES = ['Critical', 'High', 'Medium', 'Low']
const COMPONENTS = ['Authentication', 'Dashboard', 'Billing', 'API', 'Notifications', 'Settings']

const EMPTY_FORM = {
  title: '',
  severity: '',
  component: '',
  description: '',
  steps: '',
  stepsCount: '',
}

export default function App() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [submitted, setSubmitted] = useState([])
  const [successId, setSuccessId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((f) => ({ ...f, [name]: value }))

    // clear field error when user edits
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[name]
      return newErrors
    })
  }

  const validate = (data) => {
    const errs = {}

    if (!data.title.trim()) {
      errs.title = 'Bug title is required.'
    }

    if (!data.severity) {
      errs.severity = 'Please select a severity level.'
    }

    if (!data.component) {
      errs.component = 'Please select a component.'
    }

    if (!data.description.trim()) {
      errs.description = 'Description is required.'
    }

    if (!data.stepsCount) {
      errs.stepsCount = 'Steps count is required.'
    } else if (Number(data.stepsCount) <= 0) {
      errs.stepsCount = 'Steps must be greater than 0.'
    }

    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setServerError(null)

    const errs = validate(form)

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)

    try {
      const result = await submitBugReport(form)

      setSuccessId(result.id)
      setSubmitted((prev) => [result, ...prev])
      setForm(EMPTY_FORM)
      setErrors({})
    } catch (err) {
      if (err.field) {
        setErrors({ [err.field]: err.message })
      } else {
        setServerError(err.message || 'Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  const sevClass = (s) =>
    ({ Critical: 'sev-critical', High: 'sev-high', Medium: 'sev-medium', Low: 'sev-low' }[s] ?? '')

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="badge">⬡ TrackFlow Internal Tools</div>
        <h1>Report a Bug</h1>
      </header>

      <div className="card">
        <form onSubmit={handleSubmit} noValidate>

          {/* SUCCESS */}
          {successId && (
            <div style={{ background: 'rgba(76,175,125,0.1)', padding: 12 }}>
              ✓ Bug {successId} filed successfully!
            </div>
          )}

          {/* SERVER ERROR */}
          {serverError && (
            <div style={{ background: 'rgba(247,95,95,0.1)', padding: 12 }}>
              {serverError}
            </div>
          )}

          <div className="form-group">
            <label>Bug Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              style={errors.title ? { borderColor: 'red' } : {}}
            />
            {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Severity *</label>
              <select
                name="severity"
                value={form.severity}
                onChange={handleChange}
                style={errors.severity ? { borderColor: 'red' } : {}}
              >
                <option value="">Select</option>
                {SEVERITIES.map((s) => <option key={s}>{s}</option>)}
              </select>
              {errors.severity && <span style={{ color: 'red' }}>{errors.severity}</span>}
            </div>

            <div className="form-group">
              <label>Component *</label>
              <select
                name="component"
                value={form.component}
                onChange={handleChange}
                style={errors.component ? { borderColor: 'red' } : {}}
              >
                <option value="">Select</option>
                {COMPONENTS.map((c) => <option key={c}>{c}</option>)}
              </select>
              {errors.component && <span style={{ color: 'red' }}>{errors.component}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={errors.description ? { borderColor: 'red' } : {}}
            />
            {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>No. of Steps *</label>
            <input
              type="number"
              name="stepsCount"
              value={form.stepsCount}
              onChange={handleChange}
              style={errors.stepsCount ? { borderColor: 'red' } : {}}
            />
            {errors.stepsCount && <span style={{ color: 'red' }}>{errors.stepsCount}</span>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Bug Report'}
          </button>

        </form>
      </div>
    </div>
  )
}