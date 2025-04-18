
export interface Author {
  name: string;
  avatar: string;
  role?: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  category: string;
  featured?: boolean;
  author: Author;
}

// Sample authors
const authors: Record<string, Author> = {
  sama: {
    name: "Sam Altman",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "CEO, OpenAI"
  },
  pg: {
    name: "Paul Graham",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "Co-founder, Y Combinator"
  },
  jl: {
    name: "Jessica Livingston",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "Co-founder, Y Combinator"
  },
  daly: {
    name: "Dalton Caldwell",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "Managing Director, YC"
  },
  mregev: {
    name: "Michael Regev",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "Partner, YC"
  },
};

export const posts: Post[] = [
  {
    id: 1,
    title: "How to Build a Successful Startup",
    slug: "how-to-build-a-successful-startup",
    excerpt: "The foundational principles that every startup founder needs to know about building a company that lasts.",
    content: `Building a successful startup involves several key principles that founders must understand and implement effectively.

First, focus on solving a real problem. Successful startups begin with identifying a genuine pain point that a significant number of people experience. Your solution should make their lives meaningfully better.

Second, build a strong founding team. The quality of your initial team is often the difference between success and failure. Look for complementary skills, shared values, and the resilience to weather inevitable challenges.

Third, talk to your users constantly. Many founders make the mistake of building in isolation. Regular feedback from actual users helps you refine your product and ensure you're creating something people actually want.

Fourth, stay lean and manage your runway carefully. Conserve cash until you've found product-market fit. Being frugal gives you more time to iterate and find the right business model.

Finally, focus on growth metrics that matter. Identify the key performance indicators that truly reflect the health of your business, and optimize relentlessly for those metrics.`,
    coverImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "April 5, 2025",
    category: "Startups",
    featured: true,
    author: authors.sama
  },
  {
    id: 2,
    title: "The Future of AI in 2025",
    slug: "future-of-ai-2025",
    excerpt: "Where AI technology is headed and how founders can prepare for the next wave of innovation.",
    content: `The AI landscape in 2025 is poised for transformative changes across multiple domains, creating new opportunities for founders and developers.

Multimodal AI systems that can process and generate content across text, images, audio, and video simultaneously will become the new standard. These systems will enable more natural human-computer interaction and unlock creative possibilities.

AI will increasingly move to the edge, with sophisticated models running directly on devices rather than in the cloud. This shift will improve privacy, reduce latency, and enable AI capabilities in areas with limited connectivity.

Specialized AI for scientific discovery will accelerate breakthroughs in fields like drug discovery, materials science, and climate technology. Companies building tools in this space will create enormous value.

Enterprise adoption of AI will reach maturity, with larger organizations integrating AI throughout their operations. The focus will shift from experimental projects to systematic transformation of business processes.

Regulatory frameworks will evolve globally, with clearer guidelines around AI safety, transparency, and accountability. Successful startups will build compliance into their foundations rather than treating it as an afterthought.`,
    coverImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "April 2, 2025",
    category: "Technology",
    author: authors.sama
  },
  {
    id: 3,
    title: "Fundraising Strategies for Early-stage Startups",
    slug: "fundraising-strategies",
    excerpt: "Practical advice for navigating your seed round and setting your startup up for long-term success.",
    content: `Securing funding for your early-stage startup requires strategic planning and execution. Here are key strategies to help you navigate your seed round successfully.

Focus on building relationships well before you need capital. The strongest fundraising positions come from having conversations with potential investors months in advance of your actual raise. This gives you time to build credibility and demonstrate progress.

Perfect your pitch to clearly communicate your vision, market opportunity, and competitive advantage. Your pitch should be compelling, concise, and backed by data. Practice it extensively to ensure you can deliver it confidently.

Leverage social proof whenever possible. Commitments from respected investors or advisors can create momentum and help other investors overcome their hesitation. Even small investments from well-regarded angels can open doors.

Create a strategic target list of investors who have relevant experience in your industry or have funded similar companies. Research their investment thesis and portfolio to ensure alignment with your vision.

Be transparent about risks and challenges. Experienced investors appreciate founders who are honest about obstacles and have thoughtful plans to address them. This builds trust and demonstrates your maturity as a leader.`,
    coverImage: "https://images.pexels.com/photos/7821487/pexels-photo-7821487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "March 28, 2025",
    category: "Fundraising",
    author: authors.pg
  },
  {
    id: 4,
    title: "Building in Public: Transparency as a Growth Strategy",
    slug: "building-in-public",
    excerpt: "How being open about your startup journey can actually accelerate growth and build a loyal community.",
    content: `Building in public—sharing your startup journey openly—has emerged as a powerful strategy for growth and community building. This approach offers several advantages for early-stage companies.

Transparency creates trust with potential customers and investors. When you share both successes and failures openly, you demonstrate authenticity and build credibility that traditional marketing cannot achieve.

Regular updates create a feedback loop with your audience. By sharing works in progress, you can gather insights, identify pain points, and refine your product before full launch. This reduces the risk of building something people don't want.

Public building attracts like-minded individuals who can become customers, partners, or team members. People who resonate with your mission and approach will find you through the content you share about your journey.

Consistent documentation creates valuable content marketing that drives organic discovery. Each milestone, lesson learned, or challenge overcome becomes an opportunity to create content that can attract new audiences to your brand.

The practice enforces accountability and maintains momentum. When you commit publicly to goals and deadlines, you're more likely to follow through, even when facing obstacles or distractions.`,
    coverImage: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "March 22, 2025",
    category: "Growth",
    author: authors.jl
  },
  {
    id: 5,
    title: "From YC to IPO: Success Stories",
    slug: "yc-to-ipo-success-stories",
    excerpt: "Looking back at Y Combinator graduates who made it big and what we can learn from their journeys.",
    content: `Y Combinator's most successful graduates offer valuable lessons for founders at all stages. Their journeys from early-stage startups to public companies reveal common patterns worth studying.

Airbnb demonstrates the power of perseverance through multiple near-death experiences. The founders faced rejection from investors, slow initial growth, and significant market challenges, yet they continued to iterate on their core concept until achieving product-market fit.

Stripe shows the importance of obsessive focus on user experience. By making payments infrastructure radically simpler for developers, they created enormous value in a space that incumbents had overcomplicated. Their attention to documentation and API design set new standards.

Dropbox illustrates how technical excellence combined with simplicity can disrupt established markets. By solving a universal problem in a way that felt magical to users, they achieved rapid organic growth through word-of-mouth.

Instacart reveals how timing and market evolution can create opportunities for reinvention. Their ability to adapt their model as consumer behavior changed allowed them to scale through industry shifts and competitive pressures.

Coinbase demonstrates the value of regulatory foresight in emerging industries. By prioritizing compliance and security from the beginning, they positioned themselves as a trusted gateway to cryptocurrency when competitors faced challenges.`,
    coverImage: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "March 18, 2025",
    category: "Success Stories",
    author: authors.daly
  },
  {
    id: 6,
    title: "How to Apply to Y Combinator in 2025",
    slug: "how-to-apply-yc-2025",
    excerpt: "Insider tips for creating a standout Y Combinator application that gets noticed.",
    content: `Creating a successful Y Combinator application requires careful preparation and strategic thinking. These insider tips can help your application stand out in an increasingly competitive environment.

Focus on demonstrating traction above all else. While a compelling vision is important, YC partners are looking for evidence that you can execute. Quantifiable metrics showing growth—even from a small base—are more persuasive than elaborate future plans.

Keep your application concise and direct. YC partners review thousands of applications, so clarity and brevity are essential. Avoid jargon, technical complexity, and marketing language. Instead, explain your startup in terms a smart but non-expert would understand.

Highlight your team's unique advantages. What makes your founding team uniquely qualified to solve this particular problem? Emphasize relevant domain expertise, technical capabilities, or past experiences that give you unusual insight into your market.

Address obvious questions and objections proactively. If there are clear challenges to your business model or common criticisms of your approach, acknowledge them and explain your thinking. This demonstrates self-awareness and critical thinking.

Make your demo memorable if you have a product. If you're invited to interview, your demo should clearly showcase your core value proposition in the first few seconds. Practice until you can demonstrate your product fluently under pressure.`,
    coverImage: "https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "March 15, 2025",
    category: "YC Application",
    author: authors.mregev
  }
];

export const getFeaturedPost = (): Post | undefined => {
  return posts.find(post => post.featured);
};

export const getRecentPosts = (exclude: number = 0, limit: number = 5): Post[] => {
  return posts
    .filter(post => post.id !== exclude)
    .slice(0, limit);
};
