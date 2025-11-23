import React, { useEffect, useMemo, useState } from "react";

/**
 * StudyGuide - a simple study guide page component
 * - searchable list of topics
 * - filter by tag
 * - mark topics complete (persisted to localStorage)
 * - progress indicator and print view
 */

const STORAGE_KEY = "studyguide.progress.v1";

const DEFAULT_TOPICS = [
    {
        id: "1",
        title: "Traffic Signs & Signals",
        summary: "Common road signs, meanings, and actions required.",
        content:
            "Study stop signs, yield signs, regulatory signs, warning signs, and traffic signals. Learn colors and shapes to recognize meaning quickly.",
        tags: ["Signs", "Basics"],
        estimatedMins: 20,
    },
    {
        id: "2",
        title: "Right-of-Way Rules",
        summary: "Who yields and when at intersections and crosswalks.",
        content:
            "Understand four-way stops, uncontrolled intersections, turning vehicles vs pedestrians, and emergency vehicle rules.",
        tags: ["Rules", "Intersections"],
        estimatedMins: 25,
    },
    {
        id: "3",
        title: "Safe Following & Stopping",
        summary: "Keeping safe distances and proper braking techniques.",
        content:
            "Use the 3-second rule, adjust for weather, avoid tailgating, and practice controlled stops to prevent collisions.",
        tags: ["Safety", "Driving"],
        estimatedMins: 15,
    },
    {
        id: "4",
        title: "Lane Management & Merging",
        summary: "Proper lane usage, signaling, and merging onto highways.",
        content:
            "Check mirrors and blind spots, signal early, match speed for safe merges, and know HOV lane rules where applicable.",
        tags: ["Highway", "Maneuvers"],
        estimatedMins: 20,
    },
];

export default function StudyGuide() {
    const [topics, setTopics] = useState(() =>
        DEFAULT_TOPICS.map((t) => ({ ...t, completed: false }))
    );
    const [query, setQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");
    const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    // Load persisted progress
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const saved = JSON.parse(raw);
            setTopics((prev) =>
                prev.map((t) => ({
                    ...t,
                    completed: !!saved[t.id],
                }))
            );
        } catch {
            // ignore parse errors
        }
    }, []);

    // Persist progress when topics change
    useEffect(() => {
        const map = topics.reduce((acc, t) => {
            if (t.completed) acc[t.id] = true;
            return acc;
        }, {});
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    }, [topics]);

    const allTags = useMemo(() => {
        const s = new Set();
        topics.forEach((t) => t.tags.forEach((tag) => s.add(tag)));
        return ["All", ...Array.from(s).sort()];
    }, [topics]);

    const filtered = useMemo(() => {
        return topics.filter((t) => {
            if (selectedTag !== "All" && !t.tags.includes(selectedTag)) return false;
            if (showOnlyIncomplete && t.completed) return false;
            if (!query) return true;
            const q = query.toLowerCase();
            return (
                t.title.toLowerCase().includes(q) ||
                t.summary.toLowerCase().includes(q) ||
                t.tags.join(" ").toLowerCase().includes(q)
            );
        });
    }, [topics, selectedTag, showOnlyIncomplete, query]);

    const completedCount = topics.filter((t) => t.completed).length;
    const progress = Math.round((completedCount / topics.length) * 100);

    function toggleComplete(id) {
        setTopics((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }

    function clearProgress() {
        setTopics((prev) => prev.map((t) => ({ ...t, completed: false })));
        localStorage.removeItem(STORAGE_KEY);
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={{ margin: 0 }}>Study Guide</h1>
                <div style={styles.controls}>
                    <input
                        aria-label="Search topics"
                        placeholder="Search topics, tags, summaries..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={styles.search}
                    />
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        style={styles.select}
                        aria-label="Filter by tag"
                    >
                        {allTags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={showOnlyIncomplete}
                            onChange={(e) => setShowOnlyIncomplete(e.target.checked)}
                        />{" "}
                        Only incomplete
                    </label>
                    <button onClick={() => window.print()} style={styles.button}>
                        Print
                    </button>
                    <button onClick={clearProgress} style={styles.secondaryButton}>
                        Reset
                    </button>
                </div>
            </header>

            <section style={styles.progressSection}>
                <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                </div>
                <div style={styles.progressText}>
                    {completedCount} / {topics.length} complete ({progress}%)
                </div>
            </section>

            <main>
                {filtered.length === 0 ? (
                    <p style={{ color: "#666" }}>No topics match your filters.</p>
                ) : (
                    filtered.map((t) => (
                        <article id={`topic-${t.id}`} key={t.id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div>
                                    <h2 style={{ margin: "0 0 6px 0" }}>{t.title}</h2>
                                    <div style={styles.meta}>
                                        <small>{t.summary}</small>
                                        <small style={{ marginLeft: 12 }}>
                                            Tags: {t.tags.join(", ")} • {t.estimatedMins} min
                                        </small>
                                    </div>
                                </div>
                                <div style={styles.cardActions}>
                                    <button
                                        onClick={() => {
                                            const willOpen = expandedId !== t.id;
                                            setExpandedId(willOpen ? t.id : null);
                                            if (willOpen) {
                                                // scroll the opened topic into view and focus a control for keyboard users
                                                setTimeout(() => {
                                                    const el = document.getElementById(`topic-${t.id}`);
                                                    el?.scrollIntoView({ behavior: "smooth", block: "center" });
                                                    const focusBtn = el?.querySelector("button[data-focusable]");
                                                    focusBtn?.focus();
                                                }, 120);
                                            }
                                        }}
                                        style={styles.linkButton}
                                        aria-expanded={expandedId === t.id}
                                    >
                                        {expandedId === t.id ? "Hide details" : "Open details"}
                                    </button>
                                    <button
                                        onClick={() => toggleComplete(t.id)}
                                        data-focusable
                                        style={t.completed ? styles.completeButton : styles.button}
                                    >
                                        {t.completed ? "Completed" : "Mark complete"}
                                    </button>
                                </div>
                            </div>

                            {expandedId === t.id && (
                                <div style={styles.cardBody}>
                                    <p style={{ marginTop: 0 }}>{t.content}</p>

                                    <ul>
                                        <li>
                                            <strong>Key point:</strong> {t.summary}
                                        </li>
                                        <li>
                                            <strong>Tags:</strong> {t.tags.join(", ")}
                                        </li>
                                        <li>
                                            <strong>Estimated time:</strong> {t.estimatedMins} minutes
                                        </li>
                                    </ul>

                                    <section style={{ marginTop: 12 }}>
                                        <h3 style={{ margin: "8px 0" }}>Practice questions</h3>
                                        <ol>
                                            <li>
                                                What does a solid red traffic light mean?
                                                <details>
                                                    <summary>Answer</summary>
                                                    Stop, remain stopped until the light turns green (unless turning where permitted).
                                                </details>
                                            </li>
                                            <li>
                                                At a four-way stop, two vehicles arrive at the same time. Who proceeds first?
                                                <details>
                                                    <summary>Answer</summary>
                                                    The vehicle on the right has the right-of-way.
                                                </details>
                                            </li>
                                            <li>
                                                Describe the "three-second rule."
                                                <details>
                                                    <summary>Answer</summary>
                                                    Stay at least three seconds behind the vehicle ahead under normal conditions to maintain a safe following distance.
                                                </details>
                                            </li>
                                            <li>
                                                When must you yield to pedestrians?
                                                <details>
                                                    <summary>Answer</summary>
                                                    Always yield to pedestrians in crosswalks and at intersections, even if the signal is green for you.
                                                </details>
                                            </li>
                                            <li>
                                                What should you do when approaching a stop sign with poor visibility?
                                                <details>
                                                    <summary>Answer</summary>
                                                    Stop fully, creep forward carefully if needed, and proceed only when safe.
                                                </details>
                                            </li>
                                            <li>
                                                How do you merge safely onto a highway?
                                                <details>
                                                    <summary>Answer</summary>
                                                    Accelerate to match highway speed, check mirrors and blind spots, signal early, and merge when a safe gap appears.
                                                </details>
                                            </li>
                                            <li>
                                                What is the proper response to a flashing yellow traffic signal?
                                                <details>
                                                    <summary>Answer</summary>
                                                    Slow down and proceed with caution; yield to any traffic or pedestrians if necessary.
                                                </details>
                                            </li>
                                            <li>
                                                When is it legal to pass another vehicle on the right?
                                                <details>
                                                    <summary>Answer</summary>
                                                    When the vehicle ahead is making or about to make a left turn and there is a safe, unobstructed lane to pass on the right, or on multi-lane roads where lanes permit passing.
                                                </details>
                                            </li>
                                            <li>
                                                How should you react to an emergency vehicle with lights and siren?
                                                <details>
                                                    <summary>Answer</summary>
                                                    Pull over to the right and stop, clear of intersections, and remain stopped until it passes.
                                                </details>
                                            </li>
                                            <li>
                                                What does a yellow diamond-shaped sign typically indicate?
                                                <details>
                                                    <summary>Answer</summary>
                                                    A warning about road conditions or hazards ahead (e.g., curves, intersections, merges).
                                                </details>
                                            </li>
                                            <li>
                                                How do weather conditions affect stopping distance?
                                                <details>
                                                    <summary>Answer</summary>
                                                    Wet, icy, or slippery roads increase stopping distances; reduce speed and increase following distance accordingly.
                                                </details>
                                            </li>
                                            <li>
                                                When approaching a school bus with flashing red lights, what must you do?
                                                <details>
                                                    <summary>Answer</summary>
                                                    Stop until the lights stop flashing and children are clear; on divided highways, rules may vary for opposing lanes—follow local law.
                                                </details>
                                            </li>
                                        </ol>
                                    </section>

                                    <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
                                        <button
                                            onClick={() => toggleComplete(t.id)}
                                            style={t.completed ? styles.completeButton : styles.button}
                                        >
                                            {t.completed ? "Completed" : "Mark complete"}
                                        </button>

                                        <button
                                            onClick={() => {
                                                const qCount = 10;
                                                alert(`Starting a ${qCount}-question quick practice for "${t.title}".`);
                                            }}
                                            style={styles.secondaryButton}
                                        >
                                            Start quick quiz
                                        </button>

                                        <button
                                            onClick={() => {
                                                const mins = 5;
                                                // quick, lightweight timer feedback
                                                alert(`Started a ${mins}-minute timer for "${t.title}".`);
                                                setTimeout(() => {
                                                    alert(`Timer finished for "${t.title}".`);
                                                }, mins * 60 * 1000);
                                            }}
                                            style={styles.secondaryButton}
                                        >
                                            Start 5-min timer
                                        </button>

                                        <a
                                            href={`https://www.google.com/search?q=${encodeURIComponent(
                                                t.title + " driving rules"
                                            )}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={styles.linkButton}
                                        >
                                            Open resources
                                        </a>
                                    </div>

                                    <details style={{ marginTop: 12 }}>
                                        <summary>Practice question</summary>
                                        <p style={{ marginTop: 8 }}>
                                            Example: At a four-way stop where all vehicles arrive at the same time,
                                            which vehicle has the right-of-way?
                                        </p>
                                    </details>
                                </div>
                            )}
                        </article>
                    ))
                )}
            </main>
        </div>
    );
}

/* Inline styles for a compact, dependency-free component */
const styles = {
    container: { maxWidth: 920, margin: "24px auto", padding: "0 16px", fontFamily: "system-ui, Arial, sans-serif" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
    controls: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
    search: { padding: "8px 10px", minWidth: 200, borderRadius: 6, border: "1px solid #ccc" },
    select: { padding: "8px 10px", borderRadius: 6, border: "1px solid #ccc" },
    checkboxLabel: { fontSize: 14, color: "#333" },
    button: { padding: "8px 12px", borderRadius: 6, border: "1px solid #1f6feb", background: "#1f6feb", color: "#fff", cursor: "pointer" },
    secondaryButton: { padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: "pointer" },
    linkButton: { padding: "6px 8px", border: "none", background: "transparent", color: "#1f6feb", cursor: "pointer" },
    completeButton: { padding: "8px 12px", borderRadius: 6, border: "1px solid #28a745", background: "#28a745", color: "#fff", cursor: "pointer" },
    progressSection: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
    progressBar: { flex: 1, height: 12, background: "#eee", borderRadius: 999 },
    progressFill: { height: "100%", background: "#1f6feb", borderRadius: 999 },
    progressText: { minWidth: 140, textAlign: "right", color: "#333", fontSize: 14 },
    card: { border: "1px solid #e6e6e6", borderRadius: 8, padding: 12, marginBottom: 12, background: "#fff" },
    cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    meta: { color: "#666", display: "flex", gap: 8, alignItems: "center", marginTop: 6 },
    cardActions: { display: "flex", gap: 8, alignItems: "center" },
    cardBody: { marginTop: 12, color: "#333" },
};