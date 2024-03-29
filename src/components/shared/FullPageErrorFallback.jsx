import React from 'react';

function FullPageErrorFallback({ error }) {
  return (
    <div
      role="alert"
      className="full-page-error"
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message || ''}</pre>
    </div>
  )
}

export default FullPageErrorFallback
