// Keeps the form answers while the user is on Stripe, so we can refill the form
// if they come back without paying

export type SignUpDraft = Record<string, string>

const keyFor = (sessionId: string) => `signUpDraft:${sessionId}`

// sessionStorage can throw in private windows, but it's fine to just lose the draft

export function saveSignUpDraft(sessionId: string, answers: SignUpDraft) {
  try {
    sessionStorage.setItem(keyFor(sessionId), JSON.stringify(answers))
  } catch {}
}

export function loadSignUpDraft(sessionId: string): SignUpDraft | null {
  try {
    const saved = sessionStorage.getItem(keyFor(sessionId))
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export function clearSignUpDraft(sessionId: string) {
  try {
    sessionStorage.removeItem(keyFor(sessionId))
  } catch {}
}
