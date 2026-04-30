#  TrackFlow Bug Report – Form Fixes

## Overview

This document explains the issues found in the Bug Report Form and how each was fixed. The bugs were related to validation, submission lifecycle, and error handling.

---

## Bug 1: Empty Form Submission Allowed

**Issue:**
The form submitted even when all required fields were empty.

**Root Cause:**
The `validate()` function always returned `true`, and its result was ignored in `handleSubmit`.

**Fix:**
Implemented a proper `validate()` function that returns an `errors` object and prevented submission when errors exist.

---

## Bug 2: Multiple Submissions

**Issue:**
Users could click Submit multiple times, causing duplicate entries.

**Root Cause:**
No loading state was implemented and the button was never disabled.

**Fix:**
Added `loading` state, set it before API call, and disabled the button using `disabled={loading}`.

---

## Bug 3: Form Not Reset After Submission

**Issue:**
Form fields remained filled after successful submission.

**Root Cause:**
No reset logic after successful API call.

**Fix:**
Used `setForm(EMPTY_FORM)` after success.

---

## Bug 4: Silent Server Errors

**Issue:**
Errors from API (e.g., "login" title conflict) were not shown to the user.

**Root Cause:**
The `catch` block was empty.

**Fix:**
Handled errors properly:

* Field errors → `setErrors`
* General errors → `setServerError`

---

## Bug 5: No Field-Level Error Messages

**Issue:**
Users didn’t see which field failed validation.

**Root Cause:**
Errors state was not connected to JSX.

**Fix:**
Displayed error messages under each field and added red border styling.

---

## Bug 6: Invalid Steps Count Accepted

**Issue:**
Negative or zero values were allowed.

**Root Cause:**
No validation rule for `stepsCount`.

**Fix:**
Added validation: must be greater than 0.

---

## Final Outcome

* Validation prevents invalid submissions
* Proper loading state avoids duplicates
* Errors are visible and actionable
* Form resets after success
* Server errors are handled correctly

---

## Live Demo

(Add your deployed link here after deployment)
