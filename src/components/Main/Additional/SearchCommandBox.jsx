import * as React from "react"
import { Command } from "cmdk"
import { IoSearch } from "react-icons/io5"
import CardofCarouselMainCard from "../Cards/CardofCarouselMainCard"
import { useState, useEffect } from "react"
import { tmdbBasicImg } from "@/components/values"
import useSWR from 'swr'
import ImageWithFallback from "@/components/ImageFallback";

const fetcher = url => fetch(url).then(r => r.json())

export default function SearchCommandBox({ open, setOpen }) {
  const [value, setValue] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [bgImgBlur, setbgImgBlur] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const { data: trendingData } = useSWR(
    '/api/gettrend?type=movie',
    fetcher
  )

  const OnHoverFn = (data) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setbgImgBlur(data?.backdrop_path)
      setIsTransitioning(false)
    }, 300)
  }

  useEffect(() => {
    const fetchResults = async () => {
      if (!value.trim()) {
        setResults([])
        return
      }
      
      setLoading(true)
      try {
        const res = await fetch(`/api/search?query=${value}&page=1`)
        const data = await res.json()
        setResults(data.results.results || [])
        if (data.results.results?.[0]?.backdrop_path) {
          setbgImgBlur(data.results.results[0].backdrop_path)
        }
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      }
      setLoading(false)
    }

    const debounce = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounce)
  }, [value])

  const displayResults = value.trim() ? results : trendingData?.results?.results || []

  if (!open) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-start justify-center pt-[10vh]">
      <div className="absolute w-full h-full top-0 left-0">
        <div className="w-full h-full absolute top-0 left-0 bg-black/80" />
        {bgImgBlur && (
          <ImageWithFallback
            src={`${tmdbBasicImg}w300/${bgImgBlur}`}
            aspectRatio="16/9"
            className={`w-full h-full object-cover blur-2xl opacity-30 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>
      
      <div className="w-[90vw] max-w-[1200px] bg-black/30 backdrop-blur-xl rounded-lg border border-gray-800 relative z-10">
        <Command className="w-full bg-transparent">
          <div className="flex items-center border-b border-gray-800 px-3">
            <IoSearch className="w-5 h-5 text-gray-400 mr-2" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search movies, TV shows..."
              className="w-full py-4 text-base outline-none bg-transparent text-gray-100 placeholder:text-gray-400"
              autoFocus
            />
          </div>
          <div className="py-2 px-1 max-h-[70vh] overflow-y-auto">
            <div className="px-3 py-2 text-sm text-gray-400">
              {value.trim() ? 'Search Results' : 'Trending Movies'}
            </div>
            {loading ? (
              <div className="py-6 text-center text-sm text-gray-400">
                Searching...
              </div>
            ) : displayResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-2">
                {displayResults.map((item, i) => (
                  <CardofCarouselMainCard
                    hoverFn={OnHoverFn}
                    data={item}
                    key={`search-result-${i}`}
                  />
                ))}
              </div>
            ) : value && (
              <div className="py-6 text-center text-sm text-gray-400">
                No results found.
              </div>
            )}
          </div>
        </Command>
      </div>
    </div>
  )
}