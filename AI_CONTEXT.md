# AI CONTEXT – AlmadanOnce Platform

## Project Identity

AlmadanOnce is a Turkish comparison and roundup affiliate platform.

Main goal:
Generate high-quality, SEO-optimized roundup content and structured product comparison pages.

Target market:
Turkey (TR)

Language:
Turkish

Tone:
Professional, trustworthy, data-driven, non-clickbait.

---

## Content Philosophy

- No fake hype
- No unrealistic claims
- Data-oriented explanations
- Balanced pros and cons
- Transparent pricing range
- Suitable for affiliate monetization

---

## Roundup Content Rules

Each roundup must:

- Include introduction explaining buying criteria
- List 10 products
- Each product must contain:
  - Short intro paragraph
  - Key specs (structured)
  - Pros (3 items)
  - Cons (2 items)
  - Estimated TR price range
- Neutral evaluation tone
- SEO friendly headings (H2, H3)
- Markdown compatible

---

## Product Data Standards

Specs must be structured JSON-like format:
{
  "işlemci": "...",
  "ram": "...",
  "ekran": "...",
  "batarya": "..."
}

Pros/Cons must be arrays.

No imaginary features.
If uncertain, use realistic market assumptions.

---

## AI Output Requirements

When generating content:

Return structured JSON:

{
  "title": "",
  "intro": "",
  "products": [
    {
      "name": "",
      "short_description": "",
      "specs": {},
      "pros": [],
      "cons": [],
      "price_range": ""
    }
  ]
}

Do not return plain text unless specifically requested.

---

## SEO Principles

- Focus keyword in title
- Semantic variations in intro
- Natural Turkish
- Avoid keyword stuffing
- Structured data compatible

---

## Future Extensions

- Affiliate link injection
- Price API integration
- User review aggregation
- Automated content refresh