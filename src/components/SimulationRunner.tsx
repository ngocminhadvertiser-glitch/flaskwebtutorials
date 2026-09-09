import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, Globe, Send, ArrowRight, Server } from 'lucide-react';
import { SimulationScenario } from '../types';

interface SimulationRunnerProps {
  initialScenario: SimulationScenario;
  onSuccess?: () => void;
}

export const SimulationRunner: React.FC<SimulationRunnerProps> = ({
  initialScenario,
  onSuccess
}) => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>(
    (initialScenario.method as any) || 'GET'
  );
  const [endpoint, setEndpoint] = useState<string>(initialScenario.endpoint);
  const [requestBody, setRequestBody] = useState<string>(initialScenario.requestBody || '');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'preview' | 'logs' | 'headers'>('preview');

  const handleExecute = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasExecuted(true);
      if (onSuccess) onSuccess();
    }, 450);
  };

  const handleReset = () => {
    setMethod((initialScenario.method as any) || 'GET');
    setEndpoint(initialScenario.endpoint);
    setRequestBody(initialScenario.requestBody || '');
    setHasExecuted(true);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300';
    if (status >= 300 && status < 400) return 'bg-sky-50 text-sky-700 border-sky-300 dark:bg-sky-950/50 dark:text-sky-300';
    if (status >= 400 && status < 500) return 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300';
    return 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300';
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Simulation Header */}
      <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Server className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Trình Mô Phỏng Yêu Cầu Flask (Interactive Simulation)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kiểm tra phản hồi thực tế của server Flask trên cổng 127.0.0.1:5000
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1 transition-colors px-2 py-1 rounded"
          title="Đặt lại kịch bản ban đầu"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* Request Bar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Method selector */}
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
            className={`font-mono text-xs font-bold px-3 py-2 rounded-lg border focus:outline-none transition-colors ${
              method === 'GET'
                ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-300'
                : method === 'POST'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                : method === 'DELETE'
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300'
            }`}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

          {/* Endpoint input */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-mono text-xs">
              http://127.0.0.1:5000
            </span>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full pl-[150px] pr-4 py-2 font-mono text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              placeholder="/hello"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleExecute}
            disabled={isRunning}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang gửi...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Request</span>
              </>
            )}
          </button>
        </div>

        {/* Request Body (if POST/PUT) */}
        {(method === 'POST' || method === 'PUT') && (
          <div className="mt-3">
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Phần thân yêu cầu (Request Payload / Form Data):
            </label>
            <textarea
              rows={2}
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full p-2.5 font-mono text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="username=sinhvien&password=123"
            />
          </div>
        )}
      </div>

      {/* Response Section */}
      {hasExecuted && (
        <div>
          {/* Response Status Bar */}
          <div className="px-5 py-2.5 bg-slate-100/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-medium text-slate-600 dark:text-slate-400">Trạng thái:</span>
              <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold border ${getStatusColor(initialScenario.expectedStatus)}`}>
                {initialScenario.expectedStatus} {initialScenario.expectedStatus === 200 ? 'OK' : initialScenario.expectedStatus === 201 ? 'CREATED' : initialScenario.expectedStatus === 302 ? 'FOUND' : 'NOT FOUND'}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500 dark:text-slate-400">
                Định dạng: <span className="font-mono font-medium text-slate-700 dark:text-slate-300 uppercase">{initialScenario.responseType}</span>
              </span>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Giao diện (Preview)
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === 'logs'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Nhật ký Server ({initialScenario.serverConsoleLog.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'preview' && (
              <div>
                {initialScenario.responseType === 'html' ? (
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">Trình duyệt hiển thị:</div>
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: initialScenario.responsePreview }}
                    />
                  </div>
                ) : initialScenario.responseType === 'json' ? (
                  <div className="p-3.5 rounded-lg bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                    <pre>{initialScenario.responsePreview}</pre>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-xs border border-slate-200 dark:border-slate-800">
                    {initialScenario.responsePreview}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="rounded-lg bg-slate-950 p-3.5 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800">
                <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-500">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Werkzeug / Flask Development Server Console Output</span>
                </div>
                {initialScenario.serverConsoleLog.map((log, i) => (
                  <div key={i} className="py-0.5 leading-relaxed text-emerald-400">
                    <span className="text-slate-500 mr-2">$</span>
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
