import feedparser
import json

SOURCES = {
    "BBC Tech": "https://feeds.bbci.co.uk/news/technology/rss.xml",
    "The Verge": "https://www.theverge.com/rss/index.xml",
    "TechCrunch": "https://techcrunch.com/feed/"
}

# High-quality editorial tech photo backups
FALLBACK_IMAGES = {
    "BBC Tech": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=200&fit=crop",
    "The Verge": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop",
    "TechCrunch": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop"
}

print("Fetching news feeds and securing premium media layouts...")
articles_list = []

for source_name, url in SOURCES.items():
    print(f"Syncing entries from {source_name}...")
    feed = feedparser.parse(url)
    
    for entry in feed.entries[:3]:
        summary_text = getattr(entry, 'summary', '')
        if not summary_text and hasattr(entry, 'description'):
            summary_text = entry.description
            
        if "<" in summary_text:
            summary_text = summary_text.split("<")[0]

        clean_summary = summary_text.strip().rstrip('.')
        
        # Track down feed images safely
        image_url = ""
        
        if 'media_content' in entry and len(entry.media_content) > 0:
            image_url = entry.media_content[0].get('url', '')
        elif 'media_thumbnail' in entry and len(entry.media_thumbnail) > 0:
            image_url = entry.media_thumbnail[0].get('url', '')
        elif 'enclosures' in entry and len(entry.enclosures) > 0:
            image_url = entry.enclosures[0].get('url', '')
            
        # If the network stream left the image link completely blank, use our premium editorial card
        if not image_url or not isinstance(image_url, str) or not image_url.startswith("http"):
            image_url = FALLBACK_IMAGES[source_name]

        brief_data = {
            "title": entry.title,
            "summary": clean_summary[:150].strip() + "...",
            "link": entry.link,
            "category": source_name,
            "date": "Fresh Update",
            "image": image_url
        }
        articles_list.append(brief_data)

with open("news.json", "w") as file:
    json.dump(articles_list, file, indent=4)

print(f"Success! Rebuilt news database with robust graphical placeholders.")
