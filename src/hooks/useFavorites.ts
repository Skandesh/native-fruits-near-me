import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('native-fruits-favorites')
      if (stored) {
        const parsed = JSON.parse(stored)
        setFavorites(new Set(parsed))
      }
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('native-fruits-favorites', JSON.stringify(Array.from(favorites)))
      } catch (error) {
        console.error('Failed to save favorites:', error)
      }
    }
  }, [favorites, isLoaded])

  const addFavorite = (fruitName: string) => {
    setFavorites(prev => new Set(prev).add(fruitName))
  }

  const removeFavorite = (fruitName: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev)
      newSet.delete(fruitName)
      return newSet
    })
  }

  const toggleFavorite = (fruitName: string) => {
    if (favorites.has(fruitName)) {
      removeFavorite(fruitName)
    } else {
      addFavorite(fruitName)
    }
  }

  const isFavorite = (fruitName: string) => {
    return favorites.has(fruitName)
  }

  const clearAllFavorites = () => {
    setFavorites(new Set())
  }

  const favoriteCount = favorites.size

  return {
    favorites: Array.from(favorites),
    favoriteCount,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    isLoaded
  }
}