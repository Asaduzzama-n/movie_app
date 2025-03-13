import { useEffect, useState } from "react"

 const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await fetchFunction()
            setLoading(false)
            setData(result)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }else{
                setError('An unknown error occurred')
            }
        } finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setData(null)
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData()
        }
    }, [])

    return { data, loading,error,refetch: fetchData, reset, setLoading }
}

export default useFetch;