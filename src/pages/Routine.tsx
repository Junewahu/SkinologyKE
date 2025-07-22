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

	useEffect(() => {
		localStorage.setItem("routineChecked", JSON.stringify(checked));
	}, [checked]);

	useEffect(() => {
		// OneSignal browser notification setup (pseudo-code)
		if (window.OneSignal) {
			window.OneSignal.init({ appId: "YOUR_ONESIGNAL_APP_ID" });
		}
	}, []);

	useEffect(() => {
		// Save routine to Firestore if logged in
		if (user && window.firebase) {
			window.firebase.firestore().collection('routines').doc(user.uid).set({ checked });
		}
	}, [checked, user]);

	const handleCheck = (key: string) => {
		setChecked({ ...checked, [key]: !checked[key] });
		// Send notification if checked
		if (window.OneSignal && !checked[key]) {
			window.OneSignal.sendSelfNotification({
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
					type="email"
					placeholder="Email for reminders"
					value={email}
					onChange={e => setEmail(e.target.value)}
					className="border rounded px-2 py-1 mr-2"
				/>
				<Button onClick={handleEmailReminder}>Set Email Reminder</Button>
				<Button onClick={handleCalendar} className="ml-2">Add to Google Calendar</Button>
				{calendarAdded && <span className="ml-2 text-green-600">Added to Calendar!</span>}
			</div>
			<Button onClick={() => setChecked({})}>Reset Checklist</Button>
		</div>
	);
}
