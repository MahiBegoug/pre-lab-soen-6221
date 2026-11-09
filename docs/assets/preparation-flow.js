/** Draw the pre-lab preparation flow after the page has loaded. */
(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const STEPS = [
    {
      color: "#dbeafe",
      border: "#2563eb",
      title: "(1) Install local tools",
      detail: "Install Git, Python, and Docker. Confirm each works in your terminal.",
    },
    {
      color: "#ffedd5",
      border: "#ea580c",
      title: "(2) Prepare a small Python environment",
      detail: "Use it only for the pre-lab connection checks.",
    },
    {
      color: "#ffedd5",
      border: "#ea580c",
      title: "(3) Choose one vibe-coding assistant",
      detail: "Use Codex, Claude Code, or Cursor.",
    },
    {
      color: "#dcfce7",
      border: "#16a34a",
      title: "(4) Test a repair-model route",
      detail: "Choose a local model for your laptop, or a cloud API when necessary.",
    },
    {
      color: "#fef3c7",
      border: "#d97706",
      title: "(5) Test a restricted GitHub token",
      detail: "Prepare the bounded code-research connection.",
    },
    {
      color: "#fef3c7",
      border: "#d97706",
      title: "(6) Test Langfuse Cloud",
      detail: "Prepare the repair-trajectory connection.",
    },
    {
      color: "#e0f2fe",
      border: "#0284c7",
      title: "(7) Final readiness check",
      detail: "Arrive with the tools, accounts, and connections ready.",
    },
  ];

  /** Create one SVG element and apply its attributes. */
  function svgElement(name, attributes = {}) {
    const element = document.createElementNS(SVG_NS, name);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, String(value));
    });
    return element;
  }

  /** Add one labelled step box to the workflow graphic. */
  function addStep(svg, step, index) {
    const y = 16 + index * 118;
    const box = svgElement("rect", {
      x: 30,
      y,
      width: 740,
      height: 88,
      rx: 16,
      fill: step.color,
      stroke: step.border,
      "stroke-width": 2,
    });
    const title = svgElement("text", {
      x: 60,
      y: y + 35,
      fill: "#0f172a",
      "font-family": "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      "font-size": 20,
      "font-weight": 700,
    });
    const detail = svgElement("text", {
      x: 60,
      y: y + 62,
      fill: "#334155",
      "font-family": "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      "font-size": 15,
    });

    title.textContent = step.title;
    detail.textContent = step.detail;
    svg.append(box, title, detail);
  }

  /** Create and mount the full connected workflow diagram. */
  function drawPreparationFlow() {
    const container = document.getElementById("preparation-flow");
    const fallback = document.getElementById("preparation-flow-fallback");
    if (!container) return;

    const svg = svgElement("svg", {
      viewBox: "0 0 800 844",
      role: "img",
      "aria-labelledby": "flow-title flow-description",
    });
    svg.style.cssText = "display:block;max-width:800px;width:100%;height:auto;margin:1rem auto;";

    const title = svgElement("title", { id: "flow-title" });
    const description = svgElement("desc", { id: "flow-description" });
    title.textContent = "Pre-lab preparation flow";
    description.textContent = "A seven-step flow from installing local tools to the final readiness check.";

    const definitions = svgElement("defs");
    const marker = svgElement("marker", {
      id: "flow-arrow",
      viewBox: "0 0 10 10",
      refX: 5,
      refY: 5,
      markerWidth: 7,
      markerHeight: 7,
      orient: "auto-start-reverse",
    });
    const arrowHead = svgElement("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#475569" });
    marker.append(arrowHead);
    definitions.append(marker);
    svg.append(title, description, definitions);

    STEPS.slice(0, -1).forEach((_, index) => {
      const connectorY = 104 + index * 118;
      svg.append(
        svgElement("path", {
          d: `M400 ${connectorY} V${connectorY + 24}`,
          stroke: "#475569",
          "stroke-width": 3,
          "marker-end": "url(#flow-arrow)",
        }),
      );
    });
    STEPS.forEach((step, index) => addStep(svg, step, index));

    container.replaceChildren(svg);
    if (fallback) fallback.hidden = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", drawPreparationFlow, { once: true });
  } else {
    drawPreparationFlow();
  }
})();
