import React, { useState, useRef, useEffect } from 'react';

export default function CustomSelect({ options = [], value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const selected = options.find((o) => o.code === value) || null;

  function openAndFocus() {
    setOpen(true);
    requestAnimationFrame(() => {
      const first = listRef.current && listRef.current.querySelector('li');
      if (first) first.focus();
    });
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) return openAndFocus();
      const next = listRef.current && listRef.current.querySelector('li');
      if (next) next.focus();
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        onKeyDown={onKeyDown}
        className="w-full h-12 flex items-center justify-between px-4 rounded-xl bg-gray-900 text-primary hover:border-white/6 border border-transparent focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`truncate ${selected ? '' : 'text-muted'}`}>
          {selected ? `${selected.name} (${selected.code})` : (placeholder || 'Select')}
        </span>
        <span className="ml-3 text-primary/80">▾</span>
      </button>

      {open && (
        <ul ref={listRef} tabIndex={-1} className="absolute z-50 mt-2 w-full bg-surface rounded-lg shadow-lg max-h-56 overflow-auto py-1">
          {options.map((o) => (
            <li
              key={o.code}
              role="option"
              tabIndex={0}
              aria-selected={o.code === value}
              className={`px-4 py-2 cursor-pointer hover:bg-primary/10 ${o.code === value ? 'bg-primary/6' : ''}`}
              onClick={() => { onChange(o.code); setOpen(false); }}
              onKeyDown={(ev) => { if (ev.key === 'Enter') { onChange(o.code); setOpen(false); } }}
            >
              <div className="text-primary font-medium">{o.name}</div>
              <div className="text-muted text-sm">{o.code}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
