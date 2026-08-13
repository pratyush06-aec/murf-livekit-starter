"use client";

import { useEffect, useState, useRef } from "react";
import ShaderBackground from "./ShaderBackground";
import gsap from "gsap";

function DashboardSkeleton() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulse animation for skeleton elements
      gsap.fromTo(
        ".skeleton-line",
        {
          background: "rgba(239, 68, 68, 0.05)",
        },
        {
          background: "rgba(239, 68, 68, 0.2)",
          duration: 0.8,
          yoyo: true,
          repeat: -1,
          stagger: 0.1,
          ease: "sine.inOut"
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ background: "rgba(255, 255, 255, 0.02)", borderRadius: "16px", padding: "32px 24px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <div className="skeleton-line" style={{ width: "60%", height: "14px", borderRadius: "4px", margin: "0 auto 16px auto" }} />
            <div className="skeleton-line" style={{ width: "40%", height: "48px", borderRadius: "8px", margin: "0 auto" }} />
          </div>
        ))}
      </div>
      <div style={{ width: "100%", background: "rgba(255, 255, 255, 0.02)", borderRadius: "16px", padding: "24px 32px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className="skeleton-line" style={{ width: "30%", height: "20px", borderRadius: "4px", marginBottom: "16px" }} />
        <div className="skeleton-line" style={{ width: "100%", height: "12px", borderRadius: "6px" }} />
      </div>
    </div>
  );
}

interface CallStats {
  total: number;
  successful: number;
  failed: number;
}

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<CallStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    if (stats !== null) {
      const ctx = gsap.context(() => {
        gsap.from(".card", {
          x: (i) => i % 2 === 0 ? -100 : 100,
          opacity: 0, 
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "transform,opacity"
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [stats !== null]);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:8089/api/stats");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: CallStats = await res.json();
      setStats(data);
      setError(null);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError("Unable to reach the stats server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const successRate =
    stats && stats.total > 0
      ? Math.round((stats.successful / stats.total) * 100)
      : 0;

  return (
    <>
      <ShaderBackground />
      <div
        ref={containerRef}
        style={{
          minHeight: "100vh",
          color: "#e0e0e0",
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
          📊 Call Analytics Dashboard
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#8892b0",
            marginTop: "8px",
          }}
        >
          Pooja — Disaster Response Voice Agent
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div
          style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "32px",
            color: "#fca5a5",
            fontSize: "14px",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading && !error && <DashboardSkeleton />}

      {/* Stats Cards */}
      {stats && !loading && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
              maxWidth: "800px",
              width: "100%",
              marginBottom: "40px",
            }}
          >
            {/* Total Calls */}
            <div
              className="card"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div style={{ fontSize: "14px", color: "#8892b0", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Total Calls
              </div>
              <div style={{ fontSize: "56px", fontWeight: 800, color: "#60a5fa", lineHeight: 1 }}>
                {stats.total}
              </div>
            </div>

            {/* Successful Calls */}
            <div
              className="card"
              style={{
                background: "rgba(34, 197, 94, 0.08)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div style={{ fontSize: "14px", color: "#86efac", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Successful Calls
              </div>
              <div style={{ fontSize: "56px", fontWeight: 800, color: "#22c55e", lineHeight: 1 }}>
                {stats.successful}
              </div>
            </div>

            {/* Failed Calls */}
            <div
              className="card"
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div style={{ fontSize: "14px", color: "#fca5a5", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Failed Calls
              </div>
              <div style={{ fontSize: "56px", fontWeight: 800, color: "#ef4444", lineHeight: 1 }}>
                {stats.failed}
              </div>
            </div>
          </div>

          {/* Success Rate Bar */}
          <div
            className="card"
            style={{
              maxWidth: "800px",
              width: "100%",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "24px 32px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#8892b0", textTransform: "uppercase", letterSpacing: "1px" }}>
                Success Rate
              </span>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>
                {successRate}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "12px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${successRate}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #22c55e, #4ade80)",
                  borderRadius: "6px",
                  transition: "width 0.5s ease-in-out",
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
}
