"use client"
import { FormEvent, useState } from 'react'
import { scrapeAndStoreProduct } from '../lib/actions'
const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;
        if (hostname.includes("amazon") || hostname.includes("amazon.") || hostname.endsWith("amazon")) {
            return true;
        }
    } catch (error) {
        return false;
    }
}
const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURL(searchPrompt)
        if (!isValidLink) {
            return alert("Please enter a valid Amazon product URL");
        }
        try {
            setIsLoading(true);
            // console.log(searchPrompt)
            const product = await scrapeAndStoreProduct(searchPrompt);
        }  catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <form className="flex flex-wrap gap-3 mt-12"
        onSubmit={handleSubmit}
    >
        <input 
         type="text"
         value={searchPrompt}
         onChange={(e) => setSearchPrompt(e.target.value)}
         placeholder="Enter Product Link"
         className="searchbar-input"
         />
         <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
            {isLoading ? 'Searching...' : 'Search'}
        </button>

    </form>
  )
}

export default SearchBar
