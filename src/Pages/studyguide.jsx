import React, { useEffect, useMemo, useState } from "react";

export default function StudyGuide() {
  const [topics, setTopics] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  // 1️⃣ Load topics
  useEffect(() => {
    fetch("http://localhost:5000/api/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
        setLoading(false);
      });
  }, []);

  // 2️⃣ Load progress
  useEffect(() => {
    fetch("http://localhost:5000/api/study")
      .then((res) => res.json())
      .then((data) => {
        setCompleted(data.completedTopics || []);
      });
  }, []);

  // 3️⃣ Save progress
  async function saveProgress(updated) {
    setCompleted(updated);

    await fetch("http://localhost:5000/api/study/save", {
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

  // 4️⃣ Tags
  const allTags = useMemo(() => {
    const s = new Set();
    topics.forEach((t) => t.tags.forEach((tag) => s.add(tag)));
    return ["All", ...Array.from(s)];
  }, [topics]);

  // 5️⃣ Filter + Search
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1A1A1A]">Study Guide</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          placeholder="Search topics..."
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

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 w-full bg-gray-200 rounded-full">
          <div
            className="h-3 bg-[#1f6feb] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {completed.length} / {topics.length} complete ({progress}%)
        </p>
      </div>

      {/* Topic Cards */}
      <div className="space-y-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{t.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{t.summary}</p>
              </div>

              <button
                onClick={() => toggleComplete(t.id)}
                className={`px-3 py-1 rounded-lg text-white text-sm ${
                  completed.includes(t.id)
                    ? "bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {completed.includes(t.id) ? "Completed" : "Mark complete"}
              </button>
            </div>

            {/* Details Toggle */}
            <button
              onClick={() =>
                setExpandedId(expandedId === t.id ? null : t.id)
              }
              className="text-blue-600 text-sm mt-3"
            >
              {expandedId === t.id ? "Hide details ↑" : "Show details ↓"}
            </button>

            {expandedId === t.id && (
              <div className="mt-3 text-gray-700">
                <p>{t.content}</p>
                <p className="mt-2 text-sm">
                  <strong>Tags:</strong> {t.tags.join(", ")}
                </p>
                <p className="text-sm">
                  <strong>Estimated Time:</strong> {t.estimatedMins} mins
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
