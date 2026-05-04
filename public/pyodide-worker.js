/* eslint-disable no-restricted-globals */
let pyodide = null;

async function initPyodide() {
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");
  pyodide = await loadPyodide({
    stdout: (text) => self.postMessage({ type: "stdout", payload: { output: text } }),
    stderr: (text) => self.postMessage({ type: "stderr", payload: { output: text } }),
  });
  self.postMessage({ type: "ready", payload: {} });
}

async function loadPkgs(packages) {
  if (!pyodide) return;
  const importCode = packages.map((p) => "import " + p).join("\n");
  await pyodide.loadPackagesFromImports(importCode, {
    messageCallback: (msg) => self.postMessage({ type: "progress", payload: { output: msg } }),
  });
  self.postMessage({ type: "packages-loaded", payload: {} });
}

async function runCode(code) {
  if (!pyodide) {
    self.postMessage({ type: "error", payload: { error: "Pyodide not initialized" } });
    return;
  }
  try {
    pyodide.setStdout({ batched: (text) => self.postMessage({ type: "stdout", payload: { output: text } }) });
    pyodide.setStderr({ batched: (text) => self.postMessage({ type: "stderr", payload: { output: text } }) });
    const result = await pyodide.runPythonAsync(code);
    self.postMessage({ type: "success", payload: { output: result != null ? result.toString() : "" } });
  } catch (e) {
    self.postMessage({ type: "error", payload: { error: e.message || String(e) } });
  }
}

async function runWithAssertions(code, assertions) {
  if (!pyodide) {
    self.postMessage({ type: "error", payload: { error: "Pyodide not initialized" } });
    return;
  }
  try {
    pyodide.setStdout({ batched: (text) => self.postMessage({ type: "stdout", payload: { output: text } }) });
    pyodide.setStderr({ batched: (text) => self.postMessage({ type: "stderr", payload: { output: text } }) });

    await pyodide.runPythonAsync(code);

    const escaped = JSON.stringify(assertions);
    const wrappedCode = [
      "import json as _json",
      "_assertion_results = []",
      "_assertion_lines = " + escaped + ".strip().split('\\n')",
      "for _line in _assertion_lines:",
      "    _line = _line.strip()",
      "    if not _line or _line.startswith('#'):",
      "        continue",
      "    try:",
      "        exec(_line)",
      "        _assertion_results.append({'assertion': _line, 'passed': True})",
      "    except AssertionError as _e:",
      "        _assertion_results.append({'assertion': _line, 'passed': False, 'error': str(_e) or _line})",
      "    except Exception as _e:",
      "        _assertion_results.append({'assertion': _line, 'passed': False, 'error': str(_e)})",
      "_json.dumps(_assertion_results)",
    ].join("\n");

    const resultStr = await pyodide.runPythonAsync(wrappedCode);
    const results = JSON.parse(resultStr);
    self.postMessage({ type: "assertion-results", payload: { assertionResults: results } });
  } catch (e) {
    self.postMessage({ type: "error", payload: { error: e.message || String(e) } });
  }
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;
  switch (type) {
    case "init":
      await initPyodide();
      break;
    case "load-packages":
      await loadPkgs(payload.packages);
      break;
    case "run":
      await runCode(payload.code);
      break;
    case "run-with-assertions":
      await runWithAssertions(payload.code, payload.assertions);
      break;
  }
};
