import * as puppeteer from "puppeteer"

export function generateMermaidSVG(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let page;

    puppeteer.launch()
      .then(browser => {
        return browser.newPage();
      })
      .then(p => {
        page = p;
        return page.goto(`file://${__dirname}/generateMermaidSVG/index.html`);
      })
      .then(() => {
        return page.$eval("#container", (container, code) => {
          container.textContent = code;
          window.mermaid.initialize();

          window.mermaid.init(undefined, container);
        }, code);
      })
      .then(() => {
        return page.$eval("#container", container => container.innerHTML);
      })
      .then(svg => {
        resolve(svg);
      })
      .catch(reject);
  });
}
