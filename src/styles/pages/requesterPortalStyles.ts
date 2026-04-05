export const requesterPortalStyles = {
  shell: "min-h-screen bg-slate-100 font-['Poppins',sans-serif] text-slate-700",
  header: 'relative h-[117px] overflow-visible bg-slate-800 text-white',
  headerOverlay: 'absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%)]',
  headerInner: 'relative mx-auto flex h-full w-full max-w-[1685px] items-center justify-between px-4 md:px-8',
  brandGroup: 'flex items-center gap-3 md:gap-5',
  heroLogo: 'h-[117px] w-[309px] object-contain',
  portalTitle: 'text-sm font-bold tracking-[0.18em] md:text-xl',
  userMenuButton: 'flex items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-white/10',
  userAvatar: 'flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/20',
  userAvatarImage: 'h-full w-full object-cover',
  userAvatarInitials: 'text-xs font-semibold tracking-[0.12em] text-white',
  userName: 'text-sm font-semibold tracking-[0.08em] text-white',
  userOffice: 'text-[11px] tracking-[0.1em] text-slate-300',
  caret: 'h-5 w-5 text-slate-300 transition',
  menuPanel: 'absolute right-0 top-[calc(100%+10px)] z-20 min-w-[180px] rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-xl',
  menuItem: 'block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition hover:bg-slate-100',
  menuItemDanger: 'block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50',
  main: 'mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-8',
  panel: 'rounded-2xl border border-slate-300 bg-white p-5 shadow-sm',
  overviewHeader: 'mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between',
  overviewDate: 'mb-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-500',
  overviewTitle: 'text-2xl font-bold text-slate-800 md:text-4xl',
  overviewActions: 'flex w-full flex-col gap-3 md:max-w-xl md:flex-row',
  searchBox: 'flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500',
  createButton:
    'rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold tracking-[0.06em] text-white transition hover:bg-slate-800',
  overviewSummaryRow: 'flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between',
  pastNoticeCard: 'mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4',
  pastNoticeTitle: 'text-sm font-semibold uppercase tracking-[0.18em] text-slate-700',
  pastNoticeText: 'mt-2 text-sm leading-7 text-slate-600',
  statsGrid: 'grid flex-1 gap-3 md:grid-cols-4',
  statCard: 'rounded-xl px-4 py-4',
  statLabel: 'text-sm font-medium',
  statValue: 'mt-2 text-2xl font-bold',
  requestTabs: 'shrink-0',
  requestList: 'space-y-4',
  requestCard: 'rounded-2xl border border-slate-300 bg-white p-4',
  requestCardHeader:
    'mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between',
  requestMetaRow: 'flex flex-wrap items-center gap-3',
  requestId: 'text-lg font-bold text-slate-900',
  requestType: 'rounded-md border border-slate-300 bg-slate-50 px-3 py-1 text-sm',
  requestDate: 'text-sm text-slate-500',
  requestStatus: 'rounded-md px-3 py-2 text-sm font-bold',
  requestDetailsGrid: 'grid gap-3 md:grid-cols-2 xl:grid-cols-4',
  requestDetailCard: 'rounded-xl border border-slate-300 bg-slate-50 p-4',
  requestDetailLabel: 'mb-2 text-xs uppercase tracking-[0.16em] text-slate-500',
  requestDetailValue: 'text-base font-semibold text-slate-900',
  requestFooter:
    'mt-4 grid gap-4 border-t border-slate-200 pt-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start',
  remarks: 'min-w-0 max-w-3xl text-sm leading-7 text-slate-600 break-words',
  remarksLabel: 'font-semibold text-slate-800',
  actionRow: 'flex w-fit shrink-0 flex-wrap justify-start gap-2 md:min-w-[420px] md:flex-nowrap md:justify-end',
  actionIcon: 'h-4 w-4 shrink-0',
  actionEdit:
    'inline-flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-200',
  actionCancel:
    'inline-flex items-center gap-2 rounded-lg bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200',
  actionDetails:
    'rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800',
  actionResubmit:
    'inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500',
  modalOverlay:
    'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-6',
  profileModal:
    'w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl md:p-8',
  profileModalHeader: 'mb-6 flex items-start justify-between gap-4',
  profileModalEyebrow: 'text-xs font-semibold uppercase tracking-[0.22em] text-slate-500',
  profileModalTitle: 'mt-2 text-3xl font-bold text-slate-900',
  modalCloseButton:
    'h-11 w-11 rounded-full border border-slate-200 p-0 text-slate-500 transition hover:bg-slate-100',
  profileModalBody: 'grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]',
  profilePhotoColumn: 'flex flex-col items-center gap-4',
  profileAvatarLarge:
    'flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-slate-200',
  profileAvatarImage: 'h-full w-full object-cover',
  profileAvatarFallback: 'text-4xl font-bold tracking-[0.12em] text-slate-600',
  profilePhotoButton:
    'rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100',
  profileFormGrid: 'grid gap-4',
  profileInput:
    'min-h-[52px] rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-800 focus:bg-white',
  profileTextarea:
    'min-h-[116px] rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-800 focus:bg-white',
  profileValidationMessage: 'mt-2 text-sm text-rose-600',
  profileModalActions: 'mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end',
  profilePrimaryButton:
    'rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800',
  profileSecondaryButton:
    'rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50',
  tripModal:
    'w-full max-w-6xl rounded-[20px] bg-white p-6 shadow-2xl md:p-8',
  tripModalHeader: 'mb-5 flex items-start justify-between gap-4',
  tripModalTitle: 'text-2xl font-bold text-slate-800',
  tripModalBody: 'space-y-6',
  tripGrid: 'grid gap-6 xl:grid-cols-2',
  tripSectionTitle: 'mb-3 text-2xl text-slate-800',
  tripSectionStack: 'space-y-3',
  tripFieldLabel: 'mb-2 text-sm text-slate-500',
  tripFieldBox:
    'min-h-[52px] rounded-[10px] border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-800',
  tripFieldBoxTall: 'min-h-[110px]',
  tripTwoColumn: 'grid gap-3 md:grid-cols-2',
  tripRemarksRow:
    'flex flex-col gap-4 border-t border-slate-200 pt-4 md:flex-row md:items-start md:justify-between',
  tripRemarks: 'min-w-0 max-w-4xl text-sm leading-7 text-slate-600 break-words',
  tripEditButton:
    'shrink-0 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800',
  deleteModal: 'w-full max-w-xl rounded-[20px] bg-white p-6 shadow-2xl md:p-8',
  deleteModalHeader: 'mb-4 flex items-start justify-between gap-4',
  deleteModalEyebrow: 'text-xs font-semibold uppercase tracking-[0.22em] text-rose-500',
  deleteModalTitle: 'mt-2 text-3xl font-bold text-slate-900',
  deleteModalText: 'text-sm leading-7 text-slate-600',
  deleteModalActions: 'mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end',
  deleteConfirmButton:
    'rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500',
} as const
