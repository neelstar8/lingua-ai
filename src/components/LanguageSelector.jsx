import { LANGUAGE_CODES } from '../api';

export default function LanguageSelector({ sourceLang, targetLang, setSourceLang, setTargetLang }) {
  const languages = Object.keys(LANGUAGE_CODES);

  return (
    <div className="flex items-center gap-2 mb-6 w-full justify-center text-sm md:text-base">
      <select 
        value={sourceLang}
        onChange={(e) => setSourceLang(e.target.value)}
        className="bg-[#2f2f2f] text-[#ececec] border border-gray-600/50 rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
      >
        {languages.map(lang => (
          <option key={`source-${lang}`} value={lang}>{lang}</option>
        ))}
      </select>

      <span className="text-[#b4b4b4] px-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </span>

      <select 
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        className="bg-[#2f2f2f] text-[#ececec] border border-gray-600/50 rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
      >
        {languages.filter(lang => lang !== 'Auto').map(lang => (
          <option key={`target-${lang}`} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
}
