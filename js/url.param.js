export function getParamInUrl(paramName) {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get(paramName)
}