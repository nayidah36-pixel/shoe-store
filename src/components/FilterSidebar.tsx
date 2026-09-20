'use client';

import React from 'react';

interface FilterSidebarProps {
  selectedGenders: string[];
  setSelectedGenders: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFeatures: string[];
  setSelectedFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSizes: number[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<number[]>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  onClearAll: () => void;
}

export default function FilterSidebar({
  selectedGenders,
  setSelectedGenders,
  selectedBrands,
  setSelectedBrands,
  selectedFeatures,
  setSelectedFeatures,
  selectedSizes,
  setSelectedSizes,
  maxPrice,
  setMaxPrice,
  onClearAll,
}: FilterSidebarProps) {
  const toggle = <T,>(arr: T[], setArr: React.Dispatch<React.SetStateAction<T[]>>, val: T) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 py-3">
      <h4 className="font-bold text-sm text-gray-900 mb-2">{title}</h4>
      {children}
    </div>
  );

  const CheckItem = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <label className="flex items-center gap-2 text-xs text-gray-700 hover:text-amber-600 cursor-pointer py-0.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-amber-500 w-3.5 h-3.5"
      />
      {label}
    </label>
  );

  return (
    <aside className="w-full md:w-56 shrink-0 bg-white rounded-md border border-gray-200 p-4 h-fit md:sticky md:top-28">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Filters</h3>
        <button
          onClick={onClearAll}
          className="text-[11px] text-cyan-700 hover:text-amber-600 hover:underline font-semibold"
        >
          Clear all
        </button>
      </div>

      <Section title="Gender">
        {['Men', 'Women', 'Unisex'].map((g) => (
          <CheckItem
            key={g}
            label={g}
            checked={selectedGenders.includes(g)}
            onChange={() => toggle(selectedGenders, setSelectedGenders, g)}
          />
        ))}
      </Section>

      <Section title="Price">
        <p className="text-xs text-gray-700 mb-2">
          Up to <span className="font-bold">KES {(maxPrice * 130).toLocaleString()}</span>
        </p>
        <input
          type="range"
          min={20}
          max={300}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-500"
        />
      </Section>

      <Section title="Brand">
        {['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance'].map((b) => (
          <CheckItem
            key={b}
            label={b}
            checked={selectedBrands.includes(b)}
            onChange={() => toggle(selectedBrands, setSelectedBrands, b)}
          />
        ))}
      </Section>

      <Section title="Features">
        {['Running', 'Casual', 'Formal', 'Basketball', 'Waterproof'].map((f) => (
          <CheckItem
            key={f}
            label={f}
            checked={selectedFeatures.includes(f)}
            onChange={() => toggle(selectedFeatures, setSelectedFeatures, f)}
          />
        ))}
      </Section>

      <Section title="Size (EU)">
        <div className="flex flex-wrap gap-1.5">
          {[38, 39, 40, 41, 42, 43, 44, 45].map((s) => (
            <button
              key={s}
              onClick={() => toggle(selectedSizes, setSelectedSizes, s)}
              className={`px-2 py-1 text-[11px] rounded border font-semibold transition ${
                selectedSizes.includes(s)
                  ? 'bg-amber-400 text-black border-amber-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>
    </aside>
  );
}