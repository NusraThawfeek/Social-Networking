import React from 'react'

export const Loader = () => {
    return (
        <div className="fp-container">
            <div class="d-flex justify-content-center fp-loader">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
}
