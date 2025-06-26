// Replace with your local IP address when running http-server
const API_BASE_URL = 'http://192.168.171.99:8080'; // Update this with your IP

export const fetchQuoteByMood = async (mood) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mood_quotes_100_with_authors.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }
    
    const quotes = await response.json();
    
    // Filter quotes by mood category
    const moodQuotes = quotes.filter(quote => 
      quote.category.toLowerCase() === mood.toLowerCase()
    );
    
    if (moodQuotes.length === 0) {
      return {
        quote: "Keep your spirits up! Every mood is a chance to grow.",
        author: "Anonymous"
      };
    }
    
    // Return a random quote from the filtered results
    const randomIndex = Math.floor(Math.random() * moodQuotes.length);
    return moodQuotes[randomIndex];
  } catch (error) {
    console.error('Error fetching quote:', error);
    // Return a default quote if there's an error
    return {
      quote: "Life is full of emotions. Embrace them all.",
      author: "Anonymous"
    };
  }
}; 