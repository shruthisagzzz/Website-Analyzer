const loadingOverlay = document.getElementById("loadingOverlay");
const analyzeBtn = document.querySelector("button");

document.querySelectorAll(".fade-in").forEach(el => {
  el.style.animationDelay = Math.random() * 0.4 + "s";
});

let chart;

function analyze() {
  const url = document.getElementById("url").value;
  if (!url) return;

  // Show loader
  loadingOverlay.classList.remove("hidden");
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = "Analyzing...";

  fetch(`http://localhost:5000/analyze?url=${url}`)
    .then(res => res.json())
    .then(data => {
      drawChart(data);
      updateTable(data);
      updateVitals(data);
      updateRecommendations(data); 
      animateValue(document.getElementById("perfScore"), 0, data.performance, 900);
  animateValue(document.getElementById("seoScore"), 0, data.seo, 900);
  animateValue(document.getElementById("accScore"), 0, data.accessibility, 900);
    })
    .catch(err => {
      alert("Analysis failed. Try another website.");
      console.error(err);
    })
    .finally(() => {
  
      loadingOverlay.classList.add("hidden");
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = "Analyze";
    });
}
function animateValue(el, start, end, duration) {
  let startTime = null;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    el.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


function drawChart(data) {
  const ctx = document.getElementById("pieChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Performance", "SEO", "Accessibility"],
      datasets: [
        {
          data: [
            data.performance,
            data.seo,
            data.accessibility
          ],
          backgroundColor: [
            "rgba(157, 78, 221, 0.9)",
            "rgba(199, 125, 255, 0.9)",
            "rgba(116, 0, 184, 0.9)"
          ],
          borderWidth: 0,
          hoverOffset: 12
        }
      ]
    },
    options: {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "72%",
  animation: {
    duration: 1200,
    easing: "easeOutCubic"
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#e0d7ff",
        padding: 18,
        font: { size: 13 }
      }
    }
  }
}

  });
}


function updateTable(data) {
  const table = document.getElementById("reportTable");

  table.innerHTML = `
    <tr><td>Website</td><td>${data.website}</td></tr>

    <tr><td>Page Size</td><td>${data.pageSizeKB} KB</td></tr>
    <tr><td>Performance Score</td><td>${data.performance}</td></tr>
    <tr><td>SEO Score</td><td>${data.seo}</td></tr>
    <tr><td>Accessibility Score</td><td>${data.accessibility}</td></tr>
  `;
}
function renderVital(id, name, value, status, color) {
  document.getElementById(id).innerHTML = `
    <div class="vital-title">${name}</div>
    <div class="vital-value">${value}</div>
    <span class="vital-status" style="background:${color}">
      ${status}
    </span>
  `;
}

function updateVitals(data) {
  // LCP
  if (typeof data.lcp === "number") {
    const lcp = data.lcp;
    renderVital(
      "lcpBadge",
      "LCP (s)",
      lcp,
      lcp <= 2.5 ? "Good" : lcp <= 4 ? "Needs Improvement" : "Poor",
      lcp <= 2.5 ? "#2ecc71" : lcp <= 4 ? "#f39c12" : "#e74c3c"
    );
  } else {
    renderVital("lcpBadge", "LCP (s)", "—", "Unavailable", "#7f8c8d");
  }

  // CLS
  if (typeof data.cls === "number") {
    const cls = data.cls;
    renderVital(
      "clsBadge",
      "CLS",
      cls.toFixed(2),
      cls <= 0.1 ? "Good" : cls <= 0.25 ? "Needs Improvement" : "Poor",
      cls <= 0.1 ? "#2ecc71" : cls <= 0.25 ? "#f39c12" : "#e74c3c"
    );
  } else {
    renderVital("clsBadge", "CLS", "—", "Unavailable", "#7f8c8d");
  }

  // INP
  if (typeof data.inp === "number") {
    const inp = data.inp;
    renderVital(
      "inpBadge",
      "INP (ms)",
      inp,
      inp <= 200 ? "Good" : inp <= 500 ? "Needs Improvement" : "Poor",
      inp <= 200 ? "#2ecc71" : inp <= 500 ? "#f39c12" : "#e74c3c"
    );
  } else {
    renderVital("inpBadge", "INP (ms)", "—", "Unavailable", "#7f8c8d");
  }
}
function updateRecommendations(data) {
  const list = document.getElementById("recommendations");
  list.innerHTML = "";


  if (data.performance < 60) {
    addRec("bad", "Performance is low. Reduce unused JavaScript, optimize images, and enable compression.");
  } else if (data.performance < 85) {
    addRec("warn", "Performance can be improved. Consider optimizing images and reducing render-blocking resources.");
  } else {
    addRec("good", "Performance score is strong. Keep up the good optimization practices.");
  }

  // LCP
  if (typeof data.lcp === "number" && data.lcp > 2.5) {
    addRec("warn", "Largest Contentful Paint is slow. Optimize hero images, preload fonts, and use faster hosting.");
  }

  // CLS
  if (typeof data.cls === "number" && data.cls > 0.1) {
    addRec("bad", "High Cumulative Layout Shift detected. Set width/height on images and avoid late-loading ads.");
  }

  // INP
  if (typeof data.inp === "number" && data.inp > 200) {
    addRec("warn", "Interaction latency is high. Reduce heavy JavaScript and break up long tasks.");
  }

  // Accessibility
  if (data.accessibility < 80) {
    addRec("warn", "Accessibility needs improvement. Check color contrast, labels, and ARIA attributes.");
  }

  // SEO
  if (data.seo < 80) {
    addRec("warn", "SEO score is low. Ensure proper meta tags, headings, and mobile friendliness.");
  }
}

function addRec(type, text) {
  const li = document.createElement("li");
  li.className = type;
  li.textContent = text;
  document.getElementById("recommendations").appendChild(li);
}