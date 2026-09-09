import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  filename,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className={`rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 text-slate-100 shadow-md ${className}`}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 text-slate-300 font-medium">{filename}</span>
            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{language}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-100 transition-colors px-2 py-1 rounded hover:bg-slate-800"
            title="Sao chép mã"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-sans">Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="font-sans">Sao chép</span>
              </>
            )}
          </button>
        </div>
      )}

      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50">
                <td className="w-10 pr-4 text-right text-slate-600 select-none text-xs align-top pt-0.5">
                  {idx + 1}
                </td>
                <td className="text-slate-200 whitespace-pre">
                  {formatSyntax(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Syntax highlighting helper for Python & Jinja
function formatSyntax(line: string) {
  // Comments
  if (line.trim().startsWith('#') || line.trim().startsWith('<!--')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Keywords
  const pythonKeywords = ['def ', 'return ', 'import ', 'from ', 'if ', 'elif ', 'else:', 'class ', 'with ', 'as ', 'for ', 'in ', 'while '];
  const decorators = line.trim().startsWith('@');

  if (decorators) {
    return <span className="text-amber-400 font-semibold">{line}</span>;
  }

  return (
    <span>
      {line.split(/(\s+|[(),={}:"'])/).map((token, i) => {
        if (['def', 'return', 'import', 'from', 'if', 'elif', 'else', 'class', 'with', 'for', 'in'].includes(token)) {
          return <span key={i} className="text-purple-400 font-semibold">{token}</span>;
        }
        if (['Flask', 'render_template', 'request', 'redirect', 'url_for', 'jsonify', 'flash', 'session', 'SQLAlchemy', 'Blueprint'].includes(token)) {
          return <span key={i} className="text-sky-400 font-medium">{token}</span>;
        }
        if (token.startsWith('"') || token.startsWith("'")) {
          return <span key={i} className="text-emerald-300">{token}</span>;
        }
        if (['True', 'False', 'None'].includes(token)) {
          return <span key={i} className="text-amber-300 font-semibold">{token}</span>;
        }
        return <span key={i}>{token}</span>;
      })}
    </span>
  );
}
