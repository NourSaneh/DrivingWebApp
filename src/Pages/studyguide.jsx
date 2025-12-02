import React, { useEffect, useMemo, useState } from "react";
import topicsData from "../data/topics.json";
import { API_BASE } from "../config";

export default function StudyGuide() {
  const [topics, setTopics] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  // Load topics
  useEffect(() => {
    setTopics(topicsData);
    setLoading(false);
  }, []);

  // Save progress
  async function saveProgress(updated) {
    setCompleted(updated);

    await fetch(`${API_BASE}/api/studyguide/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completedTopics: updated }),
    });
  }

  function toggleComplete(id) {
    let updated;
    if (completed.includes(id)) {
      updated = completed.filter((x) => x !== id);
    } else {
      updated = [...completed, id];
    }
    saveProgress(updated);
  }

  // Build tag list
  const allTags = useMemo(() => {
    const s = new Set();
    topics.forEach((t) => t.tags.forEach((tag) => s.add(tag)));
    return ["All", ...Array.from(s)];
  }, [topics]);

  // Filters
  const filtered = useMemo(() => {
    return topics.filter((t) => {
      if (selectedTag !== "All" && !t.tags.includes(selectedTag)) return false;
      if (showOnlyIncomplete && completed.includes(t.id)) return false;
      if (!query) return true;

      const q = query.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.tags.join(" ").toLowerCase().includes(q)
      );
    });
  }, [topics, selectedTag, showOnlyIncomplete, query, completed]);

  const progress = topics.length
    ? Math.round((completed.length / topics.length) * 100)
    : 0;

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading topics…</p>;

  // Emotes for each lesson (15 total)
  const emojiSet = [
    "🚦", "🚗", "📏", "🛣️", "⚠️",
    "🚧", "🚘", "🕒", "🌧️", "🌙",
    "🔧", "🚨", "🚌", "📚", "🛑"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-center">Study Guide</h1>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-3 w-full bg-gray-200 rounded-full">
          <div
            className="h-3 bg-blue-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1 text-gray-600">
          {completed.length} / {topics.length} complete ({progress}%)
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          placeholder="Search lessons..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-60"
        />

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          {allTags.map((tag) => (
            <option key={tag}>{tag}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showOnlyIncomplete}
            onChange={(e) => setShowOnlyIncomplete(e.target.checked)}
          />
          Only incomplete
        </label>
      </div>

      {/* Lessons list */}
      <div className="space-y-6">
        {filtered.map((t, index) => {
          const isCompleted = completed.includes(t.id);
          const isExpanded = expandedId === t.id;

          return (
            <div
              key={t.id}
              className="bg-white border rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-4xl mt-1">
                    {emojiSet[index % emojiSet.length]}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">{t.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{t.summary}</p>

                    {/* Tags row */}
                    <div className="flex gap-2 mt-3 flex-wrap">

                      {/* NEW — LESSON BADGE */}
                      <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md font-medium">
                        Lesson {index + 1}
                      </span>

                      <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                        ⏱ {t.estimatedMins} mins
                      </span>

                      <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                        🏷 {t.tags.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Complete button */}
                <button
                  onClick={() => toggleComplete(t.id)}
className={`px-4 py-2 rounded-lg text-sm font-medium ${
  isCompleted
    ? "bg-blue-600 text-white hover:bg-green-700"
    : "bg-purple-600 text-white hover:bg-purple-700"
}`}

                >
                  {isCompleted ? "Completed" : "Mark Complete"}
                </button>
              </div>

              {/* Expand section */}
<button
  className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-[#1f6feb] text-white text-sm font-medium shadow-sm hover:bg-[#1557c0] transition"
  onClick={() => setExpandedId(isExpanded ? null : t.id)}
>
  Start Lesson →
</button>


              {isExpanded && (
                <div className="border-l-2 border-blue-500 pl-4 mt-3 text-gray-700">
                  <p className="text-sm leading-relaxed">{t.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
