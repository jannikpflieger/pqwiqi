"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { setCookie } from "cookies-next";
import { ChevronLeft, ChevronRight, Menu, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ShareWidget } from "@/components/ShareWidget";
import { EntryBanner, ReadingTimePill } from "@/components/EntryBanner";

interface PostClientProps {
    post: any;
    params: {
        locale: string;
        subfolder: string;
        slug: string;
        difficulty: string;
    };
    readingTime: number;
    tldrContent: string | null;
    toc: string[];
}

export default function PostClient({
    post,
    params,
    readingTime,
    tldrContent,
    toc,
}: PostClientProps) {
    const t = useTranslations("Posts");
    const router = useRouter();
    const pathname = usePathname();
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
    const [randomPosts, setRandomPosts] = useState<{ title: string; subtitle: string; slug: string }[]>([]);
    
    // Format date in European format (DD.MM.YYYY)
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        } catch {
            return dateString;
        }
    };
    
    const difficulties = [
        {
            id: "elementary",
            emoji: "🧑‍🏫",
            label: "Elementary",
            bg: "bg-green-500 dark:bg-green-600",
        },
        {
            id: "highschool",
            emoji: "🧑‍🎓",
            label: "High School",
            bg: "bg-yellow-500 dark:bg-yellow-600",
        },
        {
            id: "college",
            emoji: "🧑‍🔬",
            label: "College",
            bg: "bg-red-500 dark:bg-red-600",
        },
    ];
    
    const currentDifficultyIndex = difficulties.findIndex(d => d.id === params.difficulty);
    
    // Get category label for banner
    const getCategoryLabel = () => {
        if (params.subfolder === "entries") {
            return "Quantum";
        }
        return params.subfolder;
    };
    
    const switchDifficulty = (newDifficulty: string) => {
        // Get all path segments
        const pathSegments = pathname.split('/');
        // Find the index of difficulty in the path (it's at index 3: /en/posts/entries/[difficulty]/slug)
        const difficultyIndex = pathSegments.indexOf(params.difficulty);
        
        if (difficultyIndex !== -1) {
            // Replace the difficulty segment
            pathSegments[difficultyIndex] = newDifficulty;
            const newPath = pathSegments.join('/');
            setCookie("difficulty", newDifficulty);
            router.push(newPath);
        }
    };
    
    // Helper function to generate IDs for headings
    const generateHeadingId = (text: string) => {
        // Remove brackets before generating ID to ensure matching between TOC and headings
        const cleanText = text.replace(/[\[\]]/g, '');
        return cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    };
    
    // Helper function to extract text from React children (handles links, etc.)
    const extractTextFromChildren = (children: any): string => {
        if (typeof children === 'string') {
            return children;
        }
        if (Array.isArray(children)) {
            return children.map(child => extractTextFromChildren(child)).join('');
        }
        if (children && typeof children === 'object' && 'props' in children) {
            return extractTextFromChildren(children.props.children);
        }
        return '';
    };
    
    // Fetch random posts for "Read Next" widget
    useEffect(() => {
        const fetchRandomPosts = async () => {
            try {
                const response = await fetch("/api/getBlogPosts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        language: params.locale,
                        difficulty: params.difficulty,
                        folder: [params.subfolder],
                    }),
                });
                const data = await response.json();
                
                if (data.files && data.files.length > 0) {
                    // Filter out current post
                    const otherPosts = data.files.filter((file: any) => file.slug !== params.slug);
                    
                    if (otherPosts.length > 0) {
                        // Shuffle array and pick up to 3 random posts
                        const shuffled = [...otherPosts].sort(() => 0.5 - Math.random());
                        const selectedPosts = shuffled.slice(0, Math.min(3, shuffled.length));
                        
                        setRandomPosts(
                            selectedPosts.map((post: any) => ({
                                title: post.metadata.title,
                                subtitle: post.metadata.subtitle || '',
                                slug: post.slug,
                            }))
                        );
                    }
                }
            } catch (error) {
                console.error("Failed to fetch random posts:", error);
            }
        };
        
        fetchRandomPosts();
    }, [params.locale, params.difficulty, params.subfolder, params.slug]);
    
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* Modern Scroll Progress Bar */}
            <ScrollProgressBar
                position="sticky"
                contentOnly={true}
                ariaLabel="Article reading progress"
                minProgress={1}
                showOnMobile={false}
            />
            
            {/* Banner */}
            <EntryBanner
                badge={<>Blog: {getCategoryLabel()}</>}
                title={post.data.title}
                subtitle={post.data.subtitle}
            >
                <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(post.data.date)}
                </span>
                {post.data.author && (
                    <>
                        <span className="text-white/50">•</span>
                        <span className="flex items-center gap-1.5">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            By {post.data.author}
                        </span>
                    </>
                )}
                <span className="text-white/50">•</span>
                <ReadingTimePill>{readingTime} min read</ReadingTimePill>
            </EntryBanner>
            
            <div className="mx-auto max-w-7xl">
                <div className="flex gap-6">
                    {/* Left Sidebar - Desktop */}
                    {isLeftSidebarOpen ? (
                        <aside className="hidden lg:block w-64 transition-all duration-300">
                            <div className="sticky top-1 py-6 h-fit">
                                <Card className="p-4 h-full">
                                    {/* Back to Posts Button */}
                                    <div className="mb-4">
                                        <Link 
                                            href={`/${params.locale}/posts/${params.subfolder}`}
                                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Back to Posts
                                        </Link>
                                    </div>
                                    
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">Navigation</h3>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setIsLeftSidebarOpen(false)}
                                            className="h-6 w-6"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {toc.length > 0 && (
                                        <nav className="max-h-[60vh] space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                                            {toc.map((heading, index) => {
                                                const id = generateHeadingId(heading);
                                                return (
                                                    <a
                                                        key={index}
                                                        href={`#${id}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const element = document.getElementById(id);
                                                            if (element) {
                                                                const offset = 80; // Add space above the heading
                                                                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                                                const offsetPosition = elementPosition - offset;
                                                                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                                                            }
                                                        }}
                                                        className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                                    >
                                                        {heading}
                                                    </a>
                                                );
                                            })}
                                        </nav>
                                    )}
                                </Card>
                            </div>
                        </aside>
                    ) : (
                        <aside className="hidden lg:block w-12 transition-all duration-300">
                            <div className="sticky top-1 py-6">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setIsLeftSidebarOpen(true)}
                                    className="h-10 w-10"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </div>
                        </aside>
                    )}
                    
                    {/* Main Content */}
                    <main className="min-w-0 flex-1">
                        {/* TLDR Section */}
                        {tldrContent && (
                            <section className="my-6 rounded-lg border-2 border-blue-500 bg-blue-50 p-6 dark:border-blue-600 dark:bg-blue-950/20">
                                <h2 className="mb-3 text-xl font-bold text-blue-900 dark:text-blue-100">
                                    TL;DR
                                </h2>
                                <div className="prose prose-sm max-w-none text-blue-800 dark:text-blue-200">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {tldrContent}
                                    </ReactMarkdown>
                                </div>
                            </section>
                        )}
                        
                        {/* Article */}
                        <div className="py-6">
                            <Card className="p-6 md:p-8">
                            <article className="prose prose-lg mx-auto max-w-full text-justify prose-a:[overflow-wrap:anywhere] prose-headings:text-left text-slate-900 dark:prose-invert dark:text-white">
                                <ReactMarkdown
                                    remarkPlugins={[remarkMath, remarkGfm]}
                                    rehypePlugins={[
                                        [rehypeKatex, { throwOnError: false, strict: false }],
                                    ]}
                                    components={{
                                    h2({ node, children, ...props }) {
                                        const headingText = extractTextFromChildren(children);
                                        const id = generateHeadingId(headingText);
                                        return (
                                            <h2 id={id} {...props}>
                                                {children}
                                            </h2>
                                        );
                                    },
                                    h3({ node, children, ...props }) {
                                        const headingText = extractTextFromChildren(children);
                                        const id = generateHeadingId(headingText);
                                        return (
                                            <h3 id={id} {...props}>
                                                {children}
                                            </h3>
                                        );
                                    },
                                    code({ node, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || "");
                                        return match ? (
                                            <SyntaxHighlighter customStyle={atomDark} language={match[1]}>
                                                {String(children).replace(/\n$/, "")}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                            </article>
                            </Card>
                        </div>
                    </main>
                    
                    {/* Right Sidebar - Desktop */}
                    {isRightSidebarOpen ? (
                        <aside className="hidden lg:block w-64 transition-all duration-300">
                            <div className="sticky top-1 py-6 h-fit">
                                <Card className="p-4 h-full">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{t("difficulty")}</h3>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setIsRightSidebarOpen(false)}
                                            className="h-6 w-6"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {difficulties.map((difficulty) => (
                                            <Button
                                                key={difficulty.id}
                                                variant={params.difficulty === difficulty.id ? "default" : "outline"}
                                                className="w-full justify-start"
                                                onClick={() => switchDifficulty(difficulty.id)}
                                            >
                                                <span className="mr-2">{difficulty.emoji}</span>
                                                {difficulty.label}
                                            </Button>
                                        ))}
                                    </div>
                                </Card>
                                
                                {/* Share Widget */}
                                <ShareWidget
                                    currentUrl=""
                                    postTitle={post.data.title}
                                    postSubtitle={post.data.subtitle}
                                    shareLabel={t("share")}
                                    shareHelper={t("shareHelper")}
                                />
                                
                                {/* Read Next Widget */}
                                <Card className="p-4 h-full mt-4">
                                    <div className="mb-3">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{t("readNext")}</h3>
                                    </div>
                                    {randomPosts.length > 0 ? (
                                        <div className="space-y-2">
                                            {randomPosts.map((post, index) => (
                                                <Link
                                                    key={index}
                                                    href={`/${params.locale}/posts/${params.subfolder}/${params.difficulty}/${post.slug}`}
                                                    className="block rounded-md p-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                                >
                                                    <p className="font-semibold text-slate-900 dark:text-white">{post.title}</p>
                                                    {post.subtitle && (
                                                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{post.subtitle}</p>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            Loading...
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </aside>
                    ) : (
                        <aside className="hidden lg:block w-12 transition-all duration-300">
                            <div className="sticky top-1 py-6">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setIsRightSidebarOpen(true)}
                                    className="h-10 w-10"
                                >
                                    <GraduationCap className="h-5 w-5" />
                                </Button>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
            
            {/* Mobile Bottom Bar - Difficulty Switcher */}
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
                <div className="relative mx-auto flex h-14 w-full max-w-md items-center overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-gray-800">
                    {/* Sliding background indicator */}
                    <div
                        className={`absolute left-0 top-0 h-full w-1/3 rounded-full shadow-lg transition-all duration-500 ease-out ${currentDifficultyIndex !== -1 ? difficulties[currentDifficultyIndex].bg : difficulties[0].bg}`}
                        style={{
                            transform: `translateX(${currentDifficultyIndex !== -1 ? currentDifficultyIndex * 100 : 0}%)`,
                        }}
                    ></div>
                    
                    {/* Difficulty buttons */}
                    {difficulties.map((difficulty, index) => {
                        const isSelected = index === currentDifficultyIndex;
                        return (
                            <button
                                key={difficulty.id}
                                className={`relative z-10 flex-1 rounded-full text-center font-bold transition-all duration-300 ${
                                    isSelected
                                        ? "text-white"
                                        : "text-gray-600 dark:text-gray-400"
                                } hover:scale-105 active:scale-95`}
                                onClick={() => switchDifficulty(difficulty.id)}
                            >
                                <span className="text-lg">{difficulty.emoji}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

