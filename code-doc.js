function generateCodeBlock(data) {
  const codeContent = data.lines
    .map((line) => {
      // Replace placeholders with actual HTML tags
      return line.replace(/<(\w+)>(.*?)<\/\1>/g, (_, tag, content) => {
        switch (tag) {
          case "keyword":
            return `<span class="keyword">${content}</span>`;
          case "string":
            return `<span class="string">${content}</span>`;
          case "attr":
            return `<span class="hljs-attr">${content}</span>`;
          default:
            return content;
        }
      });
    })
    .join("\n");

  return `
    <div class="docs-code-block code-block" ${data.attribute}>
        <pre class="shadow-lg rounded"><code class="json hljs">
${codeContent}
        </code></pre>
    </div>
    `;
}

const codeData = {
  "welcome-route": {
    attribute: "named-route",
    lines: [
      "    <attr>use \\</attr><string>Core\\Router</string>;",
      "",
      "    <keyword>Router::get</keyword>(<string>'/welcome'</string>, <keyword>function</keyword> () {",
      "    <keyword>return</keyword> <string>'Welcome to ArcanePHP!'</string>;",

      "    });",
    ],
  },
  "named-route": {
    attribute: "another-code-snippet",
    lines: [
      "    <attr>use \\</attr><string>Core\\Router</string>;",
      "",
      "    <keyword>Router::get</keyword>(<string>'/dashboard'</string>, <keyword>function</keyword> () {",
      "    <keyword>return</keyword> <string>'Welcome to your dashboard!'</string>;",

      "    })-><keyword gold>callAs('dashboard_page')</keyword>;",
    ],
  },
};

function populateDivs() {
  Object.keys(codeData).forEach((key) => {
    const div = document.querySelector(`div[json-${key}]`);
    if (div) {
      div.outerHTML = generateCodeBlock(codeData[key]);
    }
  });
}

// Call this function when the DOM is loaded
document.addEventListener("DOMContentLoaded", populateDivs);
