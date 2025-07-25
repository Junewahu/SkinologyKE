import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const routineItems = [
	{ label: "Cleanser (AM)", key: "cleanser_am" },
	{ label: "Moisturizer (AM)", key: "moisturizer_am" },
	{ label: "Sunscreen (AM)", key: "sunscreen_am" },
	{ label: "Cleanser (PM)", key: "cleanser_pm" },
	{ label: "Treatment (PM)", key: "treatment_pm" },
	{ label: "Moisturizer (PM)", key: "moisturizer_pm" }
];

export default function Routine() {
	const [checked, setChecked] = useState(() => {
		const saved = localStorage.getItem("routineChecked");
		return saved ? JSON.parse(saved) : {};
	});
	const [email, setEmail] = useState("");
	const [calendarAdded, setCalendarAdded] = useState(false);
	const [user, setUser] = useState(null);
	const [notifStatus, setNotifStatus] = useState('');

	useEffect(() => {
		localStorage.setItem("routineChecked", JSON.stringify(checked));
	}, [checked]);

	useEffect(() => {
		// OneSignal browser notification setup (pseudo-code)
		if ((window as any).OneSignal) {
			(window as any).OneSignal.init({ appId: "YOUR_ONESIGNAL_APP_ID" });
			setNotifStatus('Browser notifications enabled');
		} else {
			setNotifStatus('Browser notifications not enabled');
		}
	}, []);

	useEffect(() => {
		// Save routine to Firestore if logged in
		if (user && (window as any).firebase) {
			(window as any).firebase.firestore().collection('routines').doc(user.uid).set({ checked });
		}
	}, [checked, user]);

	// Progress tracker: percent complete
	const progress = Math.round((Object.values(checked).filter(Boolean).length / routineItems.length) * 100);

	const handleCheck = (key: string) => {
		setChecked({ ...checked, [key]: !checked[key] });
		// Send notification if checked
		if ((window as any).OneSignal && !checked[key]) {
			(window as any).OneSignal.sendSelfNotification({
				title: "SkinologyKE Reminder",
				message: `Don't forget your ${key.replace('_', ' ')}!`
			});
		}
	};

	const handleEmailReminder = async () => {
		// Send reminder via Formspree (pseudo-code)
		await fetch('https://formspree.io/f/YOUR_FORM_ID', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, message: 'SkinologyKE: Time for your skin routine!' })
		});
		alert('Email reminder set!');
	};

	const handleCalendar = () => {
		// Add event to Google Calendar (pseudo-code)
		window.open('https://calendar.google.com/calendar/r/eventedit?text=SkinologyKE+Routine&details=Time+for+your+skin+routine!', '_blank');
		setCalendarAdded(true);
	};

	return (
		<div className="max-w-xl mx-auto py-12">
			<h1 className="text-3xl font-bold mb-6">Daily Skin Routine Checklist</h1>
			<ul className="mb-8">
				{routineItems.map(item => (
					<li key={item.key} className="flex items-center gap-2 mb-4">
						<input
							type="checkbox"
							checked={!!checked[item.key]}
							onChange={() => handleCheck(item.key)}
							className="w-5 h-5"
						/>
						<span>{item.label}</span>
					</li>
				))}
			</ul>
			<div className="mt-8">
				<input
	return (
		<div className="min-h-screen bg-background p-8">
			<h1 className="text-3xl font-bold mb-6">Daily Skin Routine</h1>
			<div className="mb-4">Check off each step as you complete it. Your progress is saved locally.</div>
			<div className="mb-4 text-sm text-muted-foreground">{notifStatus}</div>
			<div className="mb-4 w-full bg-gray-200 rounded-full h-4">
				<div className="bg-primary h-4 rounded-full" style={{ width: `${progress}%` }}></div>
			</div>
			<div className="mb-2 text-sm">Progress: {progress}%</div>
			<div className="mb-6 grid gap-3">
				{routineItems.map(item => (
					<label key={item.key} className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={!!checked[item.key]}
							onChange={() => handleCheck(item.key)}
						/>
						{item.label}
					</label>
				))}
			</div>
			<div className="mb-6">
				<input
					type="email"
					placeholder="Email for reminders"
					value={email}
					onChange={e => setEmail(e.target.value)}
					className="border rounded px-2 py-1 mr-2"
				/>
				<Button onClick={handleEmailReminder}>Set Email Reminder</Button>
			</div>
			<div className="mb-6">
				<Button onClick={() => setCalendarAdded(true)} disabled={calendarAdded}>
					{calendarAdded ? "Added to Calendar" : "Add to Google Calendar"}
				</Button>
			</div>
			<div className="text-xs text-muted-foreground">Routine progress and reminders are for informational purposes only.</div>
		</div>
	);
