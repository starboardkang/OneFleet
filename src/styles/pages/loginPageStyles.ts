export const loginPageStyles = {
  shell:
    "relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 pb-4 pt-16 font-['Poppins',sans-serif] text-left text-blue-950 md:px-5 md:py-4",
  backgroundImage: 'absolute inset-0 h-full w-full object-cover',
  backgroundOverlay:
    'absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,46,103,0.12),transparent_32%),linear-gradient(135deg,rgba(248,250,252,0.35),rgba(238,242,247,0.18))]',
  switcherDock: 'fixed right-3 top-3 z-40 md:right-5 md:top-5',
  switcherPosition: '',
  card:
    'relative z-10 w-full max-w-[580px] rounded-[16px] bg-[rgba(217,217,217,0.83)] px-4 py-5 shadow-[0_20px_48px_rgba(15,23,42,0.16)] backdrop-blur-[40px] md:px-8 md:py-6',
  logo: 'mx-auto mb-1.5 block h-[82px] w-full max-w-[215px] object-contain md:h-[112px]',
  title:
    'mx-auto mb-3 max-w-[430px] text-center text-[clamp(1.12rem,1.8vw,1.45rem)] font-bold tracking-[0.04em] text-blue-950',
  credentialsCard:
    'mx-auto mb-2.5 w-full max-w-[430px] rounded-2xl border border-blue-200 bg-white/75 px-3.5 py-2 text-[11px] text-slate-700 md:text-xs',
  credentialsTitle: 'font-semibold text-blue-950',
  errorCard:
    'mx-auto mb-2.5 w-full max-w-[430px] rounded-2xl bg-red-100 px-3.5 py-2 text-center text-[11px] font-semibold text-red-700 md:text-xs',
  successCard:
    'mx-auto mb-2.5 w-full max-w-[430px] rounded-2xl bg-emerald-100 px-3.5 py-2 text-center text-[11px] font-semibold text-emerald-700 md:text-xs',
  fieldWrapper:
    'mx-auto mb-2.5 flex h-[56px] w-full max-w-[430px] items-center rounded-[14px] border border-neutral-500 bg-white/70 px-4 md:h-[62px] md:px-6',
  input:
    'h-7 w-full border-none bg-transparent text-sm tracking-[0.03em] text-slate-700 outline-none placeholder:text-neutral-500 md:text-[1.3rem]',
  submitButton:
    'mx-auto mb-4 block h-[56px] w-full max-w-[430px] rounded-[14px] border border-neutral-600 bg-slate-900 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-slate-800 md:h-[62px] md:text-[1.3rem]',
  forgotPassword:
    'mx-auto block bg-transparent text-center text-xs tracking-[0.045em] text-blue-900 underline underline-offset-4 md:text-sm',
} as const
