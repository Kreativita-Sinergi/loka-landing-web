/** Small, locally drawn menu illustrations. No remote assets or image requests. */
export default function ProductArt({ item }: { item: number }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" aria-hidden="true" className="product-art">
      <ellipse cx="60" cy="78" rx="31" ry="5" fill="#263f32" opacity=".09" />
      {item === 0 || item === 1 ? <>
        <path d="M70 10 63 43" stroke={item === 0 ? '#8b553a' : '#42714f'} strokeWidth="5" strokeLinecap="round" />
        <path d="M38 29h44l-5 44q-17 8-34 0z" fill={item === 0 ? '#e6c29b' : '#b67332'} stroke="#785a3e" strokeWidth="2" />
        <path d="m41 46 3 25q16 7 31 0l3-25" fill={item === 0 ? '#faf0dc' : '#dfad5f'} />
        <ellipse cx="60" cy="29" rx="22" ry="5" fill={item === 0 ? '#724d35' : '#94592c'} stroke="#785a3e" strokeWidth="2" />
        <rect x="47" y="36" width="11" height="10" rx="2" fill="#fff" opacity=".55" transform="rotate(-10 47 36)" />
        <rect x="63" y="39" width="10" height="9" rx="2" fill="#fff" opacity=".45" transform="rotate(12 63 39)" />
        <path d="m48 52 2 15" stroke="white" strokeWidth="3" strokeLinecap="round" opacity=".6" />
      </> : item === 2 ? <>
        <ellipse cx="60" cy="43" rx="36" ry="16" fill="#f9f4e8" stroke="#879b86" strokeWidth="2" />
        <path d="M25 45q5 33 35 33t35-33" fill="#f9f4e8" stroke="#879b86" strokeWidth="2" />
        <ellipse cx="60" cy="43" rx="28" ry="11" fill="#e5bd64" />
        <path d="M40 40q12-10 16 0t16 0m-34 7q12-10 16 0t20 0" stroke="#b68032" strokeWidth="3" strokeLinecap="round" />
        <path d="m69 32 10 5-7 7-10-4z" fill="#b46e44" />
        <path d="m43 33 6-4 8 5-5 5z" fill="#44794c" />
        <path d="m83 17-21 22m31-18L70 42" stroke="#78553c" strokeWidth="3" strokeLinecap="round" />
      </> : item === 3 ? <>
        <ellipse cx="60" cy="55" rx="42" ry="22" fill="#f9f4e8" stroke="#9cae92" strokeWidth="2" />
        <ellipse cx="60" cy="54" rx="33" ry="16" fill="#dfaa57" />
        <path d="M42 40q4-12 16-8t17 10q11 6 2 13t-24 0q-17 1-16-6t5-9" fill="#fffbed" />
        <circle cx="58" cy="43" r="10" fill="#efb63f" />
        <path d="m77 57 4 3m-39 0 4 2m6 4 4-1m22-18 3 2" stroke="#46774c" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="45" r="7" fill="#d97551" />
        <circle cx="32" cy="45" r="4" stroke="#f5b38d" strokeWidth="1.5" />
      </> : item === 4 ? <>
        <ellipse cx="60" cy="64" rx="42" ry="15" fill="#faf5e7" stroke="#afa58a" strokeWidth="2" />
        <path d="m28 42 30-18 35 21-31 21z" fill="#b97735" stroke="#8e572e" strokeWidth="2" />
        <path d="m30 43 31 18 30-17v13L61 75 30 56z" fill="#e4b865" stroke="#8e572e" strokeWidth="2" />
        <path d="m34 39 25-12 27 17-25 14z" fill="#f0d49a" />
        <path d="m48 37 24 14m-16-18 24 14m-39-7 24 14" stroke="#b47837" strokeWidth="3" />
        <path d="m32 51 29 17 28-16" stroke="#5c3928" strokeWidth="4" />
      </> : <>
        <rect x="50" y="11" width="20" height="9" rx="3" fill="#447995" />
        <path d="M51 21v10L43 44v27q0 7 17 7t17-7V44l-8-13V21z" fill="#d6e9e6" stroke="#73a19e" strokeWidth="2" />
        <path d="M47 49h26v17H47z" fill="#447995" />
        <path d="m58 52-4 7h8l-4 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M49 41v5m0 24v2" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </>}
    </svg>
  );
}
