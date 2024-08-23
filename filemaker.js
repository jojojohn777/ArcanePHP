const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// Read head.html content
const headHtmlPath = path.join(__dirname, "head.html");
const headHtmlContent = fs.readFileSync(headHtmlPath, "utf8");

// Load the HTML content using cheerio
const $ = cheerio.load(headHtmlContent);

// Function to create folders and files from a given path
function createFolderAndFile(filePath) {
  const dirName = path.dirname(filePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
    console.log(`Directory created: ${dirName}`);
  }

  // Create file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "", "utf8");
    console.log(`File created: ${filePath}`);
  }
}

// Process <link> elements
$("link[href]").each((index, element) => {
  const href = $(element).attr("href");
  if (href) {
    const filePath = path.join(__dirname, href);
    createFolderAndFile(filePath);
  }
});

// Process <script> elements
$("script[src]").each((index, element) => {
  const src = $(element).attr("src");
  if (src) {
    const filePath = path.join(__dirname, src);
    createFolderAndFile(filePath);
  }
});

console.log("Folders and files creation completed.");
