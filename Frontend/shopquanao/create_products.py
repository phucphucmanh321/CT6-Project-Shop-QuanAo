import os

# Tạo 20 sản phẩm SVG
products = [
    ("product-1-big-ss-long-tee-black.svg", "#1a1a1a", "BIG SS\nLONG TEE", "#ffffff"),
    ("product-2-striped-sweatshirt.svg", "#ffffff", "STRIPED\nSWEATSHIRT", "#001f5c"),
    ("product-3-striped-long-sleeve.svg", "#e8e8e8", "STRIPED\nLONG SLEEVE", "#001f5c"),
    ("product-4-sweatshirt-black.svg", "#1a1a1a", "SWEATSHIRT\nBLACK", "#ffffff"),
    ("product-5-long-sleeve-tee-white.svg", "#ffffff", "LONG SLEEVE\nTEE", "#333333"),
    ("product-6-knit-sweater-navy.svg", "#003d82", "KNIT\nSWEATER", "#ffffff"),
    ("product-7-numbered-tee-9.svg", "#1a1a1a", "NUMBERED\nTEE 9", "#ffffff"),
    ("product-8-doc-tee-black.svg", "#1a1a1a", "DOC\nTEE", "#ffffff"),
    ("product-9-golf-tee-black.svg", "#1a1a1a", "GOLF\nTEE", "#ffffff"),
    ("product-10-dna-gradient-tee.svg", "#1a1a1a", "DNA\nGRADIENT", "#00ffff"),
    ("product-11-dna-neon-tee.svg", "#1a1a1a", "DNA\nNEON", "#ff00ff"),
    ("product-12-colorblock-tee.svg", "#007bff", "COLORBLOCK\nTEE", "#ffffff"),
    ("product-13-queen-mouse-tee.svg", "#ffffff", "QUEEN\nMOUSE", "#333333"),
    ("product-14-spider-baby-gray.svg", "#a9a9a9", "SPIDER\nBABY", "#ffffff"),
    ("product-15-spider-baby-black.svg", "#1a1a1a", "SPIDER\nBABY", "#ffffff"),
    ("product-16-plain-tee-gray.svg", "#c0c0c0", "PLAIN\nTEE", "#333333"),
    ("product-17-plain-tee-gray-lg.svg", "#a9a9a9", "PLAIN\nTEE", "#333333"),
    ("product-18-polo-tan.svg", "#d4a574", "POLO\nSHIRT", "#333333"),
    ("product-19-polo-white.svg", "#ffffff", "POLO\nSHIRT", "#333333"),
    ("product-20-polo-black.svg", "#1a1a1a", "POLO\nSHIRT", "#ffffff"),
]

svg_template = '''<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad{id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#bgGrad{id})"/>
  <!-- Áo -->
  <ellipse cx="200" cy="80" rx="60" ry="40" fill="{color}"/>
  <path d="M 140 120 L 140 350 Q 140 380 170 380 L 230 380 Q 260 380 260 350 L 260 120 Z" fill="{color}"/>
  <path d="M 140 120 L 100 150 L 100 300 Q 100 320 115 330 L 140 330 Z" fill="{color}"/>
  <path d="M 260 120 L 300 150 L 300 300 Q 300 320 285 330 L 260 330 Z" fill="{color}"/>
  <!-- Text -->
  <text x="200" y="240" font-size="16" font-weight="bold" text-anchor="middle" fill="{text_color}" font-family="Arial">{text}</text>
  <text x="200" y="290" font-size="12" text-anchor="middle" fill="#888888" font-family="Arial">TPNQT</text>
</svg>'''

base_path = "d:\\ShopQA\\Frontend\\shopquanao\\src\\assets\\images\\products\\"

for i, (filename, color, text, text_color) in enumerate(products, 1):
    svg_content = svg_template.format(
        id=i,
        color=color,
        text=text.replace("\n", "</text>\n  <text x=\"200\" y=\"260\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"" + text_color + "\" font-family=\"Arial\">"),
        text_color=text_color
    )
    
    filepath = base_path + filename
    print(f"Creating: {filepath}")

print("Done! All SVG files created.")
