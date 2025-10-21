"""
Enhanced formatter for digital artist collaboration matches with detailed descriptions
"""

def format_detailed_match(match):
    """
    Format a match result with enhanced details.
    
    Args:
        match: Match result dictionary
        
    Returns:
        str: Formatted output string with detailed descriptions
    """
    artist = match["artist"]
    score = match["compatibility_score"]
    insights = match["insights"]
    score_breakdown = match["score_breakdown"]
    
    basic_info = artist.get("basicInfo", {})
    
    # Start with basic artist information
    output = [
        f"## {basic_info.get('name')} - Compatibility Score: {score:.1f}/100",
        f"**Location:** {basic_info.get('location', 'Not specified')}",
        f"**Bio:** {basic_info.get('bio')}",
        "",
        "### Detailed Compatibility Analysis:",
    ]
    
    # Enhanced tool match description
    tools = artist.get("extracted_tools", {})
    primary_tools = tools.get("primary_tools", [])
    all_tools = tools.get("tools", {})
    
    if "tool_match" in score_breakdown:
        tool_score = score_breakdown["tool_match"]
        tool_percentage = (tool_score / 30) * 100  # Tool match is worth 30%
        
        if tool_percentage >= 80:
            output.append(f"**Tool Expertise (Excellent - {tool_score}/30):** This artist has exceptional proficiency in the exact tools you're looking for. Their portfolio demonstrates extensive use of {', '.join(primary_tools)}.")
        elif tool_percentage >= 60:
            output.append(f"**Tool Expertise (Strong - {tool_score}/30):** This artist has strong experience with most of the tools you need. They regularly work with {', '.join(primary_tools)}.")
        elif tool_percentage >= 40:
            output.append(f"**Tool Expertise (Good - {tool_score}/30):** This artist has good familiarity with some of your required tools. They work with {', '.join(primary_tools)}.")
        elif tool_percentage >= 20:
            output.append(f"**Tool Expertise (Basic - {tool_score}/30):** This artist has basic experience with a few tools relevant to your project. They occasionally use {', '.join(primary_tools)}.")
        else:
            output.append(f"**Tool Expertise (Limited - {tool_score}/30):** This artist doesn't appear to use the specific tools you mentioned, but works with {', '.join(primary_tools)}.")
    
    # Enhanced art type match description
    art_types = artist.get("extracted_art_types", {})
    primary_art_types = art_types.get("primary_art_types", [])
    all_art_types = art_types.get("art_types", {})
    
    if "art_type_match" in score_breakdown:
        art_score = score_breakdown["art_type_match"]
        art_percentage = (art_score / 30) * 100  # Art type match is worth 30%
        
        if art_percentage >= 80:
            output.append(f"**Art Type Alignment (Excellent - {art_score}/30):** This artist specializes in exactly the type of work you need. Their portfolio is focused on {', '.join(primary_art_types)}.")
        elif art_percentage >= 60:
            output.append(f"**Art Type Alignment (Strong - {art_score}/30):** This artist has strong experience in the art types you're looking for. They regularly create {', '.join(primary_art_types)}.")
        elif art_percentage >= 40:
            output.append(f"**Art Type Alignment (Good - {art_score}/30):** This artist has good experience with some of the art types you need. Their work includes {', '.join(primary_art_types)}.")
        elif art_percentage >= 20:
            output.append(f"**Art Type Alignment (Basic - {art_score}/30):** This artist has some experience with art types related to your project. They occasionally create {', '.join(primary_art_types)}.")
        else:
            output.append(f"**Art Type Alignment (Limited - {art_score}/30):** This artist works in different art types than what you specified. Their focus is on {', '.join(primary_art_types)}.")
    
    # Enhanced keyword relevance description
    if "keyword_relevance" in score_breakdown:
        keyword_score = score_breakdown["keyword_relevance"]
        keyword_percentage = (keyword_score / 20) * 100  # Keyword relevance is worth 20%
        
        if keyword_percentage >= 80:
            output.append(f"**Project Relevance (Excellent - {keyword_score}/20):** This artist's profile and portfolio strongly align with your project requirements. Their work directly addresses the key aspects you mentioned.")
        elif keyword_percentage >= 60:
            output.append(f"**Project Relevance (Strong - {keyword_score}/20):** This artist's work is highly relevant to your project needs. Their portfolio shows good alignment with your requirements.")
        elif keyword_percentage >= 40:
            output.append(f"**Project Relevance (Good - {keyword_score}/20):** This artist's work is somewhat relevant to your project. There are several points of alignment between their experience and your needs.")
        elif keyword_percentage >= 20:
            output.append(f"**Project Relevance (Basic - {keyword_score}/20):** This artist's work has some basic relevance to your project. There are a few connections between their experience and your requirements.")
        else:
            output.append(f"**Project Relevance (Limited - {keyword_score}/20):** This artist's work doesn't directly align with your specific project requirements, but they may bring a fresh perspective.")
    
    # Enhanced experience level description
    if "experience" in score_breakdown:
        exp_score = score_breakdown["experience"]
        exp_percentage = (exp_score / 10) * 100  # Experience is worth 10%
        
        if exp_percentage >= 80:
            output.append(f"**Experience Level (Excellent - {exp_score}/10):** This artist has extensive professional experience (6+ years) in digital art, indicating mastery of their craft.")
        elif exp_percentage >= 60:
            output.append(f"**Experience Level (Strong - {exp_score}/10):** This artist has significant professional experience (4-5 years) in digital art, showing strong proficiency.")
        elif exp_percentage >= 40:
            output.append(f"**Experience Level (Good - {exp_score}/10):** This artist has good professional experience (2-3 years) in digital art, demonstrating solid skills.")
        elif exp_percentage >= 20:
            output.append(f"**Experience Level (Basic - {exp_score}/10):** This artist has some professional experience (1-2 years) in digital art, showing developing skills.")
        else:
            output.append(f"**Experience Level (Limited - {exp_score}/10):** This artist's professional experience level is not specified or is limited.")
    
    # Enhanced portfolio quality description
    if "portfolio_quality" in score_breakdown:
        portfolio_score = score_breakdown["portfolio_quality"]
        portfolio_percentage = (portfolio_score / 10) * 100  # Portfolio quality is worth 10%
        
        if portfolio_percentage >= 80:
            output.append(f"**Portfolio Quality (Excellent - {portfolio_score}/10):** This artist has an outstanding portfolio with high-profile projects, awards, or recognition in the industry.")
        elif portfolio_percentage >= 60:
            output.append(f"**Portfolio Quality (Strong - {portfolio_score}/10):** This artist has a strong portfolio with notable projects and evidence of professional success.")
        elif portfolio_percentage >= 40:
            output.append(f"**Portfolio Quality (Good - {portfolio_score}/10):** This artist has a good portfolio with solid examples of their work and some professional achievements.")
        elif portfolio_percentage >= 20:
            output.append(f"**Portfolio Quality (Basic - {portfolio_score}/10):** This artist has a basic portfolio showing their capabilities but with limited professional highlights.")
        else:
            output.append(f"**Portfolio Quality (Limited - {portfolio_score}/10):** This artist's portfolio is limited or doesn't include significant professional work.")
    
    # Add collaboration potential section
    output.append("")
    output.append("### Collaboration Potential:")
    
    # Calculate overall potential
    if score >= 75:
        output.append("**Exceptional Match (75%+):** This artist would be an ideal collaborator for your project. Their skills, experience, and art style align perfectly with your requirements.")
    elif score >= 60:
        output.append("**Strong Match (60-74%):** This artist would be a very good collaborator for your project. Their skills and experience align well with most of your requirements.")
    elif score >= 45:
        output.append("**Good Match (45-59%):** This artist would be a good collaborator for your project. While not perfect, they bring valuable skills that align with your core requirements.")
    elif score >= 30:
        output.append("**Potential Match (30-44%):** This artist could potentially collaborate on your project, but there may be some gaps in skills or experience that would need to be addressed.")
    else:
        output.append("**Limited Match (<30%):** This artist may not be the best fit for your specific project requirements, but could still bring unique perspectives.")
    
    # Add specific insights
    output.append("")
    output.append("### Specific Collaboration Insights:")
    for insight in insights:
        output.append(f"- {insight}")
    
    # Add portfolio highlights
    output.append("")
    output.append("### Portfolio Highlights:")
    gallery = artist.get("completeGallery", [])
    for artwork in gallery[:3]:  # Show top 3 artworks
        output.append(f"- **{artwork.get('title')}** ({artwork.get('year')}) - {artwork.get('medium')}")
        output.append(f"  {artwork.get('description')}")
    
    # Add contact information
    output.append("")
    output.append("### Contact Information:")
    output.append(f"- **Website:** {basic_info.get('website', 'Not available')}")
    output.append(f"- **Email:** {basic_info.get('email', 'Not available')}")
    if "social" in basic_info and basic_info["social"]:
        output.append(f"- **Social:** {', '.join(basic_info['social'])}")
    
    return "\n".join(output)


def format_project_requirements(preference_text, analysis):
    """
    Format the project requirements based on preference analysis.
    
    Args:
        preference_text: Original preference text
        analysis: Analyzed preference data
        
    Returns:
        str: Formatted project requirements
    """
    tools = analysis.get("tools", [])
    art_types = analysis.get("art_types", [])
    keywords = analysis.get("keywords", [])
    
    output = [
        "## Project Requirements Analysis",
        "",
        f"**Original Request:** {preference_text}",
        "",
        "### Technical Requirements:",
    ]
    
    # Tool requirements
    if tools:
        output.append("#### Required Tools/Software:")
        for tool in tools:
            if tool == "blender":
                output.append(f"- **Blender:** 3D modeling, rendering, and animation")
            elif tool == "photoshop":
                output.append(f"- **Photoshop:** Image editing and digital painting")
            elif tool == "after effects":
                output.append(f"- **After Effects:** Motion graphics and visual effects")
            elif tool == "illustrator":
                output.append(f"- **Illustrator:** Vector graphics and illustration")
            elif tool == "procreate":
                output.append(f"- **Procreate:** Digital painting on iPad")
            elif tool == "zbrush":
                output.append(f"- **ZBrush:** Digital sculpting and painting")
            elif tool == "unity":
                output.append(f"- **Unity:** Game development and interactive experiences")
            elif tool == "ar" or tool == "vr":
                output.append(f"- **{tool.upper()}:** {tool.upper()} development experience")
            elif tool == "nft":
                output.append(f"- **NFT:** Experience with blockchain art and NFT creation")
            else:
                output.append(f"- **{tool.title()}:** Digital art tool")
    else:
        output.append("No specific tools were mentioned in your request.")
    
    # Art type requirements
    output.append("")
    output.append("#### Art Type Requirements:")
    if art_types:
        for art_type in art_types:
            if art_type == "3d":
                output.append(f"- **3D Art:** Three-dimensional modeling, texturing, and rendering")
            elif art_type == "animation":
                output.append(f"- **Animation:** Character or motion graphics animation")
            elif art_type == "illustration":
                output.append(f"- **Illustration:** Digital or traditional illustration")
            elif art_type == "photography":
                output.append(f"- **Photography:** Digital photography and editing")
            elif art_type == "ui/ux":
                output.append(f"- **UI/UX:** User interface and experience design")
            elif art_type == "concept art":
                output.append(f"- **Concept Art:** Visual development for games, film, etc.")
            elif art_type == "mural":
                output.append(f"- **Mural/Street Art:** Large-scale or public artwork")
            elif art_type == "nft":
                output.append(f"- **NFT Art:** Digital art for blockchain/NFT platforms")
            elif art_type == "ar/vr":
                output.append(f"- **AR/VR Art:** Augmented or virtual reality experiences")
            elif art_type == "motion graphics":
                output.append(f"- **Motion Graphics:** Animated graphic design elements")
            elif art_type == "video":
                output.append(f"- **Video/Film:** Video production or filmmaking")
            elif art_type == "music visual":
                output.append(f"- **Music Visuals:** Visual content for music or audio")
            else:
                output.append(f"- **{art_type.title()}:** Digital art style")
    else:
        output.append("No specific art types were mentioned in your request.")
    
    # Additional keywords
    if keywords and len(keywords) > 2:
        output.append("")
        output.append("#### Additional Keywords/Requirements:")
        for keyword in keywords[:5]:
            if keyword not in tools and keyword not in [at.replace("/", "") for at in art_types]:
                output.append(f"- **{keyword.title()}**")
    
    return "\n".join(output)


if __name__ == "__main__":
    # Example usage
    example_match = {
        "artist": {
            "artistId": "ART002",
            "basicInfo": {
                "name": "Raj Patel",
                "age": 28,
                "location": "Mumbai, India",
                "email": "raj@patelillustration.com",
                "bio": "Digital fantasy illustrator - Procreate, Photoshop, Blender. 4+ years.",
                "website": "patelillustration.com",
                "social": ["@rajfantasyart (IG)"]
            },
            "extracted_tools": {
                "tools": {"photoshop": 3, "blender": 2, "procreate": 1},
                "primary_tools": ["photoshop", "blender", "procreate"]
            },
            "extracted_art_types": {
                "art_types": {"3d": 5, "illustration": 3, "concept art": 2},
                "primary_art_types": ["3d", "illustration", "concept art"]
            },
            "completeGallery": [
                {"id": "IMG006", "title": "Dragon Realm", "year": 2024, "medium": "Digital (Procreate + Photoshop)", 
                 "description": "Dragon with 200+ layers. Penguin India book cover. 4000x6000px. Status: Published"},
                {"id": "IMG007", "title": "Enchanted Forest", "year": 2023, "medium": "Digital (Blender + Photoshop)", 
                 "description": "3D base rendered in Blender, painted in Photoshop. Spotify album art. Status: Streaming"}
            ]
        },
        "compatibility_score": 74.0,
        "score_breakdown": {
            "tool_match": 20.0,
            "art_type_match": 20.0,
            "keyword_relevance": 20.0,
            "experience": 8.0,
            "portfolio_quality": 6.0
        },
        "insights": [
            "Uses requested tools: blender, photoshop",
            "Specializes in requested art types: 3d, illustration",
            "Profile matches key terms: digital, fantasy, 3d",
            "Has 4+ years of experience"
        ]
    }
    
    example_preference = "Looking for 3D artists who work in Blender for a fantasy book cover project"
    example_analysis = {
        "tools": ["blender"],
        "art_types": ["3d", "illustration"],
        "keywords": ["fantasy", "book", "cover", "project", "looking", "artists", "work"]
    }
    
    print(format_detailed_match(example_match))
    print("\n" + "="*80 + "\n")
    print(format_project_requirements(example_preference, example_analysis))
