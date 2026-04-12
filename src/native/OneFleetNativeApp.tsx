import { StatusBar } from 'expo-status-bar'
import { useMemo, useState } from 'react'
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import type { Profile } from '../components/global/profile/types'
import type { RequestItem, RequestStatus } from '../components/global/transport/types'

type Portal = 'requester' | 'staff'

type LoginCredentials = {
  email: string
  password: string
}

type StaffDispatchItem = {
  id: string
  requester: string
  destination: string
  schedule: string
  status: 'For Approval' | 'Approved'
}

type StaffTransportRequest = {
  id: string
  requester: string
  destination: string
  schedule: string
  status: RequestStatus
}

const requesterProfile: Profile = {
  fullName: 'Vico Sotto',
  office: 'Office of the Mayor',
  email: 'requester@onefleet.local',
  contactNumber: '+63 912 345 6789',
  employeeId: 'REQ-2026-001',
  address: 'Pasig City Hall, Caruncho Avenue, Pasig City',
}

const staffProfile: Profile = {
  fullName: 'Juan Dela Cruz',
  office: 'Officer Administrator',
  email: 'staff@onefleet.local',
  contactNumber: '+63 917 123 4567',
  employeeId: 'STF-2026-001',
  address: 'Pasig City Hall, Caruncho Avenue, Pasig City',
}

const requesterCredentials: LoginCredentials = {
  email: 'requester@onefleet.local',
  password: 'Requester123!',
}

const staffCredentials: LoginCredentials = {
  email: 'staff@onefleet.local',
  password: 'Staff123!',
}

const requesterSeedData: RequestItem[] = [
  {
    id: 'RVDSS-001',
    tripType: 'Driver and Vehicle',
    requestedAt: 'Requested: April 2, 2026',
    requestedOn: '2026-04-02',
    status: 'Ongoing',
    passengerNames: ['Vico Sotto'],
    purpose: 'Official city engagement',
    street: 'Kapitolyo',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateFrom: '2026-04-06',
    dateTo: '2026-04-06',
    timeNeeded: '1:00 PM',
    driver: 'Juan Luna',
    vehicle: 'Toyota Avanza',
    plateNumber: 'SAB-2132',
    destination: 'Kapitolyo',
    schedule: 'April 6, 2026 - 1:00 PM',
    remarks: 'Driver and vehicle request has been approved.',
    remarksHistory: [],
  },
  {
    id: 'RVDSS-002',
    tripType: 'Driver and Vehicle',
    requestedAt: 'Requested: April 1, 2026',
    requestedOn: '2026-04-01',
    status: 'Processing',
    passengerNames: ['Vico Sotto', 'Mia Reyes'],
    purpose: 'Site inspection and coordination meeting',
    street: 'Caruncho Avenue',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateFrom: '2026-04-08',
    dateTo: '2026-04-10',
    timeNeeded: '9:00 AM',
    driver: 'Pending assignment',
    vehicle: 'To be assigned',
    plateNumber: 'Pending assignment',
    destination: 'Pasig City Hall Annex',
    schedule: 'April 8, 2026 - 9:00 AM',
    remarks: 'Your request is currently being reviewed by the dispatch office.',
    remarksHistory: [],
  },
  {
    id: 'RVDSS-003',
    tripType: 'Driver Only',
    requestedAt: 'Requested: March 30, 2026',
    requestedOn: '2026-03-30',
    status: 'Denied',
    passengerNames: ['Vico Sotto'],
    purpose: 'Attendance to external coordination meeting',
    street: 'Kapitolyo',
    province: 'Metro Manila',
    city: 'Pasig City',
    dateFrom: '2026-04-09',
    dateTo: '2026-04-11',
    timeNeeded: '3:30 PM',
    driver: '--',
    vehicle: '--',
    plateNumber: '--',
    destination: 'Kapitolyo',
    schedule: 'April 9, 2026 - 3:30 PM',
    remarks: 'The requested vehicle was unavailable for the selected schedule.',
    remarksHistory: [],
  },
]

const staffSeedData: StaffTransportRequest[] = [
  {
    id: 'RVDSS-002',
    requester: 'Vico Sotto',
    destination: 'Pasig City Hall Annex',
    schedule: 'April 8, 2026 - 9:00 AM',
    status: 'Processing',
  },
  {
    id: 'RVDSS-006',
    requester: 'Mia Reyes',
    destination: 'Kapitolyo',
    schedule: 'April 12, 2026 - 2:00 PM',
    status: 'Approved',
  },
  {
    id: 'RVDSS-008',
    requester: 'Maria Santos',
    destination: 'Pasig Mega Market',
    schedule: 'April 14, 2026 - 8:00 AM',
    status: 'Ongoing',
  },
]

const approvalSeedData: StaffDispatchItem[] = [
  {
    id: 'DRN-2101',
    requester: 'Vico Sotto',
    destination: 'Pasig City Hall Annex',
    schedule: 'April 8, 2026 - 9:00 AM',
    status: 'For Approval',
  },
]

function getStatusTone(status: RequestStatus) {
  switch (status) {
    case 'Approved':
      return styles.statusApproved
    case 'Ongoing':
      return styles.statusOngoing
    case 'Completed':
      return styles.statusCompleted
    case 'Denied':
      return styles.statusDenied
    default:
      return styles.statusProcessing
  }
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number | string
  accent: string
}) {
  return (
    <View style={[styles.statCard, { borderTopColor: accent }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  )
}

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      <View style={styles.sectionContent}>{children}</View>
    </View>
  )
}

function PortalToggle({
  activePortal,
  onChange,
}: {
  activePortal: Portal
  onChange: (portal: Portal) => void
}) {
  return (
    <View style={styles.toggleRow}>
      {(['requester', 'staff'] as const).map((portal) => {
        const active = portal === activePortal
        return (
          <Pressable
            key={portal}
            onPress={() => onChange(portal)}
            style={[styles.toggleButton, active && styles.toggleButtonActive]}
          >
            <Text style={[styles.toggleButtonText, active && styles.toggleButtonTextActive]}>
              {portal === 'requester' ? 'Requester' : 'Staff'}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

function LoginScreen({
  activePortal,
  credentials,
  title,
  onPortalChange,
  onLogin,
}: {
  activePortal: Portal
  credentials: LoginCredentials
  title: string
  onPortalChange: (portal: Portal) => void
  onLogin: () => void
}) {
  const [email, setEmail] = useState(credentials.email)
  const [password, setPassword] = useState(credentials.password)
  const [message, setMessage] = useState('')

  const handleLogin = () => {
    const matches =
      email.trim().toLowerCase() === credentials.email.toLowerCase() &&
      password === credentials.password

    if (!matches) {
      setMessage('Use the temporary credentials shown below for this prototype build.')
      return
    }

    setMessage('')
    onLogin()
  }

  return (
    <SafeAreaView style={styles.appShell}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.loginScreen}>
        <Image source={require('../../assets/pasig-login-logo.png')} style={styles.loginLogo} />
        <PortalToggle activePortal={activePortal} onChange={onPortalChange} />

        <View style={styles.loginCard}>
          <Text style={styles.loginEyebrow}>OneFleet Mobile</Text>
          <Text style={styles.loginTitle}>{title}</Text>
          <Text style={styles.loginDescription}>
            Native conversion of the portal flow for mobile use on Android and iOS.
          </Text>

          <View style={styles.credentialCard}>
            <Text style={styles.credentialTitle}>Temporary credentials</Text>
            <Text style={styles.credentialText}>Email: {credentials.email}</Text>
            <Text style={styles.credentialText}>Password: {credentials.password}</Text>
          </View>

          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="E-mail"
            placeholderTextColor="#6b7280"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#6b7280"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          {message ? <Text style={styles.inlineMessage}>{message}</Text> : null}

          <Pressable style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Log In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function RequesterHome({
  profile,
  requests,
  onLogout,
}: {
  profile: Profile
  requests: RequestItem[]
  onLogout: () => void
}) {
  const summary = useMemo(
    () => ({
      Total: requests.length,
      Approved: requests.filter((request) => request.status === 'Approved').length,
      Ongoing: requests.filter((request) => request.status === 'Ongoing').length,
      Completed: requests.filter((request) => request.status === 'Completed').length,
      Processing: requests.filter((request) => request.status === 'Processing').length,
      Denied: requests.filter((request) => request.status === 'Denied').length,
    }),
    [requests],
  )

  return (
    <SafeAreaView style={styles.appShell}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>Requester Portal</Text>
            <Text style={styles.heroTitle}>Driver and Vehicle Requisition</Text>
            <Text style={styles.heroText}>
              Welcome back, {profile.fullName}. Track requests, check schedules, and review remarks in
              a layout designed for mobile screens.
            </Text>
          </View>
          <Image source={require('../../assets/hero-logo.png')} style={styles.heroLogo} />
        </View>

        <View style={styles.actionRow}>
          <View>
            <Text style={styles.profileName}>{profile.fullName}</Text>
            <Text style={styles.profileMeta}>{profile.office}</Text>
          </View>
          <Pressable style={styles.secondaryButton} onPress={onLogout}>
            <Text style={styles.secondaryButtonText}>Logout</Text>
          </Pressable>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Total" value={summary.Total} accent="#0f766e" />
          <StatCard label="Approved" value={summary.Approved} accent="#2563eb" />
          <StatCard label="Ongoing" value={summary.Ongoing} accent="#d97706" />
          <StatCard label="Denied" value={summary.Denied} accent="#b91c1c" />
        </View>

        <SectionCard
          title="Profile"
          subtitle={`${profile.email} • ${profile.contactNumber}`}
        >
          <Text style={styles.bodyText}>Employee ID: {profile.employeeId}</Text>
          <Text style={styles.bodyText}>Address: {profile.address}</Text>
        </SectionCard>

        <SectionCard
          title="Request Rules"
          subtitle="The original web flow has been condensed for a touch-friendly mobile dashboard."
        >
          <Text style={styles.bodyText}>Requests should be submitted 2 to 3 days before travel.</Text>
          <Text style={styles.bodyText}>Missing the approved schedule forfeits the assigned vehicle slot.</Text>
        </SectionCard>

        <SectionCard title="Recent Requests" subtitle="Your latest requisitions and their dispatch status.">
          {requests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View>
                  <Text style={styles.requestId}>{request.id}</Text>
                  <Text style={styles.requestType}>{request.tripType}</Text>
                </View>
                <View style={[styles.statusBadge, getStatusTone(request.status)]}>
                  <Text style={styles.statusText}>{request.status}</Text>
                </View>
              </View>
              <Text style={styles.requestDetail}>Destination: {request.destination}</Text>
              <Text style={styles.requestDetail}>Schedule: {request.schedule}</Text>
              <Text style={styles.requestDetail}>Passengers: {request.passengerNames.join(', ')}</Text>
              <Text style={styles.requestRemark}>{request.remarks}</Text>
            </View>
          ))}
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  )
}

function StaffHome({
  profile,
  requests,
  approvals,
  onLogout,
}: {
  profile: Profile
  requests: StaffTransportRequest[]
  approvals: StaffDispatchItem[]
  onLogout: () => void
}) {
  const summary = useMemo(
    () => ({
      total: requests.length,
      processing: requests.filter((request) => request.status === 'Processing').length,
      approved: requests.filter((request) => request.status === 'Approved').length,
      ongoing: requests.filter((request) => request.status === 'Ongoing').length,
    }),
    [requests],
  )

  return (
    <SafeAreaView style={styles.appShell}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>Staff Portal</Text>
            <Text style={styles.heroTitle}>Fleet Management System</Text>
            <Text style={styles.heroText}>
              Review inbound requests, monitor dispatch approvals, and keep the transport queue visible
              on mobile.
            </Text>
          </View>
          <Image source={require('../../assets/ogs-office.png')} style={styles.officeImage} />
        </View>

        <View style={styles.actionRow}>
          <View>
            <Text style={styles.profileName}>{profile.fullName}</Text>
            <Text style={styles.profileMeta}>{profile.office}</Text>
          </View>
          <Pressable style={styles.secondaryButton} onPress={onLogout}>
            <Text style={styles.secondaryButtonText}>Logout</Text>
          </Pressable>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Queue" value={summary.total} accent="#0f766e" />
          <StatCard label="Processing" value={summary.processing} accent="#7c3aed" />
          <StatCard label="Approved" value={summary.approved} accent="#2563eb" />
          <StatCard label="Ongoing" value={summary.ongoing} accent="#d97706" />
        </View>

        <SectionCard title="Operations Snapshot" subtitle="Core staff visibility preserved from the web prototype.">
          <Text style={styles.bodyText}>Pending requests: {summary.processing}</Text>
          <Text style={styles.bodyText}>Dispatch approvals waiting: {approvals.length}</Text>
          <Text style={styles.bodyText}>Fleet available today: 18 vehicles</Text>
        </SectionCard>

        <SectionCard title="Transport Queue" subtitle="Incoming and active request items.">
          {requests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View>
                  <Text style={styles.requestId}>{request.id}</Text>
                  <Text style={styles.requestType}>{request.requester}</Text>
                </View>
                <View style={[styles.statusBadge, getStatusTone(request.status)]}>
                  <Text style={styles.statusText}>{request.status}</Text>
                </View>
              </View>
              <Text style={styles.requestDetail}>Destination: {request.destination}</Text>
              <Text style={styles.requestDetail}>Schedule: {request.schedule}</Text>
            </View>
          ))}
        </SectionCard>

        <SectionCard title="Dispatch Approvals" subtitle="Records queued for staff approval workflow.">
          {approvals.map((approval) => (
            <View key={approval.id} style={styles.requestCard}>
              <Text style={styles.requestId}>{approval.id}</Text>
              <Text style={styles.requestDetail}>Requester: {approval.requester}</Text>
              <Text style={styles.requestDetail}>Destination: {approval.destination}</Text>
              <Text style={styles.requestDetail}>Schedule: {approval.schedule}</Text>
              <Text style={styles.requestRemark}>Status: {approval.status}</Text>
            </View>
          ))}
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  )
}

export default function OneFleetNativeApp() {
  const [activePortal, setActivePortal] = useState<Portal>('requester')
  const [isRequesterLoggedIn, setIsRequesterLoggedIn] = useState(false)
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false)
  const [requesterRequests] = useState<RequestItem[]>(requesterSeedData)
  const [staffRequests] = useState<StaffTransportRequest[]>(staffSeedData)
  const [approvalRequests] = useState<StaffDispatchItem[]>(approvalSeedData)

  if (activePortal === 'requester' && isRequesterLoggedIn) {
    return (
      <RequesterHome
        profile={requesterProfile}
        requests={requesterRequests}
        onLogout={() => setIsRequesterLoggedIn(false)}
      />
    )
  }

  if (activePortal === 'staff' && isStaffLoggedIn) {
    return (
      <StaffHome
        profile={staffProfile}
        requests={staffRequests}
        approvals={approvalRequests}
        onLogout={() => setIsStaffLoggedIn(false)}
      />
    )
  }

  const loginConfig =
    activePortal === 'requester'
      ? {
          credentials: requesterCredentials,
          title: 'Driver and Vehicle Requisition Portal',
          onLogin: () => setIsRequesterLoggedIn(true),
        }
      : {
          credentials: staffCredentials,
          title: 'Fleet Management System',
          onLogin: () => setIsStaffLoggedIn(true),
        }

  return (
    <LoginScreen
      activePortal={activePortal}
      credentials={loginConfig.credentials}
      title={loginConfig.title}
      onPortalChange={setActivePortal}
      onLogin={loginConfig.onLogin}
    />
  )
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: '#f4f7f2',
  },
  loginScreen: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: '#dbe7d4',
  },
  loginLogo: {
    alignSelf: 'center',
    width: 110,
    height: 110,
    marginBottom: 18,
    resizeMode: 'contain',
  },
  loginCard: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#163020',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  loginEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: '#2f6f52',
    marginBottom: 10,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#102418',
  },
  loginDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: '#4b6354',
    marginTop: 10,
    marginBottom: 18,
  },
  credentialCard: {
    backgroundColor: '#eef5e8',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  credentialTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#244734',
    marginBottom: 6,
  },
  credentialText: {
    fontSize: 13,
    color: '#355746',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5c0',
    borderRadius: 16,
    backgroundColor: '#fbfcfa',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#102418',
    marginBottom: 12,
  },
  inlineMessage: {
    color: '#9a3412',
    fontSize: 13,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#194d35',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#edf2e8',
    padding: 5,
    borderRadius: 999,
    marginBottom: 18,
  },
  toggleButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#194d35',
  },
  toggleButtonText: {
    color: '#47604f',
    fontWeight: '700',
  },
  toggleButtonTextActive: {
    color: '#ffffff',
  },
  screenContent: {
    padding: 18,
    paddingBottom: 32,
    gap: 16,
  },
  heroCard: {
    backgroundColor: '#1e4333',
    borderRadius: 28,
    padding: 22,
    overflow: 'hidden',
  },
  heroCopy: {
    gap: 8,
  },
  heroEyebrow: {
    color: '#b7d5c4',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '700',
    fontSize: 12,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
  heroText: {
    color: '#d8e8de',
    fontSize: 14,
    lineHeight: 21,
    maxWidth: '92%',
  },
  heroLogo: {
    width: 88,
    height: 88,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  officeImage: {
    width: '100%',
    height: 150,
    borderRadius: 18,
    resizeMode: 'cover',
    marginTop: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#102418',
  },
  profileMeta: {
    marginTop: 4,
    color: '#5b6f62',
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#c7d4c6',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#194d35',
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '47%',
    minWidth: 148,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderTopWidth: 4,
  },
  statLabel: {
    color: '#607163',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  statValue: {
    color: '#102418',
    fontSize: 28,
    fontWeight: '800',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#102418',
  },
  sectionSubtitle: {
    color: '#5f7366',
    lineHeight: 20,
    marginTop: 6,
  },
  sectionContent: {
    marginTop: 14,
    gap: 10,
  },
  bodyText: {
    color: '#24372b',
    lineHeight: 21,
  },
  requestCard: {
    borderWidth: 1,
    borderColor: '#d7e1d7',
    borderRadius: 18,
    padding: 14,
    backgroundColor: '#fbfcfb',
    gap: 6,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  requestId: {
    fontSize: 16,
    fontWeight: '800',
    color: '#102418',
  },
  requestType: {
    marginTop: 3,
    color: '#5e7062',
    fontSize: 13,
  },
  requestDetail: {
    color: '#2b3b31',
    lineHeight: 20,
  },
  requestRemark: {
    color: '#47604f',
    lineHeight: 20,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
  },
  statusApproved: {
    backgroundColor: '#2563eb',
  },
  statusOngoing: {
    backgroundColor: '#d97706',
  },
  statusCompleted: {
    backgroundColor: '#0f766e',
  },
  statusDenied: {
    backgroundColor: '#b91c1c',
  },
  statusProcessing: {
    backgroundColor: '#7c3aed',
  },
})
