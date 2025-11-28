'use client';
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- TypeScript fix untuk Web Speech API ---
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}
type SpeechRecognition = any;

// Dummy previous records
const RECORDS_DATA = [
  {
    id: "R001",
    patientName: "John Smith",
    patientId: "P001",
    date: "2024-01-15",
    type: "visit",
    nurse: "Sarah Johnson",
    status: "completed",
    summary: "Keluhan: nyeri ringan di lutut. Tindakan: Peregangan & analgesik. Edukasi: Pantau kondisi 2-3 hari ke depan."
  },
  {
    id: "R002",
    patientName: "Mary Johnson",
    patientId: "P002",
    date: "2024-01-14",
    type: "visit",
    nurse: "Sarah Johnson",
    status: "completed",
    summary: "Keluhan: batuk ringan. Tindakan: Obat batuk & edukasi minum banyak air. Edukasi: Pantau 3 hari."
  },
];

export default function CreateRecordComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const patientIdParam = searchParams.get("patientId");

  const [patientId, setPatientId] = useState(patientIdParam || "");
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("visit");
  const [nurse, setNurse] = useState("");
  const [status, setStatus] = useState("draft");
  const [summary, setSummary] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [aiDraft, setAiDraft] = useState("");

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Mock fetching patient name
  useEffect(() => {
    if (patientId) {
      const patientMap: Record<string, string> = {
        P001: "John Smith",
        P002: "Mary Johnson",
        P003: "Robert Williams",
        P004: "Patricia Brown",
        P005: "Linda Garcia",
      };
      setPatientName(patientMap[patientId] || "");
    }
  }, [patientId]);

  // Get last record for this patient
  const lastRecord = RECORDS_DATA
    .filter(r => r.patientId === patientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  // Setup Speech Recognition
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setNurse(prev => prev + " " + transcript);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // Generate AI draft
  const generateDraft = () => {
    if (!patientId || !nurse) return;

    setAiDraft(`Draft AI (gabungan catatan lama + input nurse):\n${lastRecord?.summary || ""}\n${nurse}`);
    setSummary(lastRecord?.summary ? lastRecord.summary + " " + nurse : nurse);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = { patientId, patientName, date, type, nurse, status, summary: summary || aiDraft };
    console.log("New Record:", newRecord);
    alert("Record created successfully!");
    router.push("/dashboard/records");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold">Create New Record</h2>

      {lastRecord && (
        <div className="border p-4 rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Last Record ({lastRecord.date})</h3>
          <p><strong>Summary:</strong> {lastRecord.summary}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient ID" required />
        <Input value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient Name" required />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <Select value={type} onValueChange={setType}>
          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="visit">Visit</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Input value={nurse} onChange={(e) => setNurse(e.target.value)} placeholder="Nurse input" required />
          <Button type="button" onClick={toggleListening} className={isListening ? "bg-red-500 text-white" : ""}>
            {isListening ? "Stop 🎤" : "Speak 🎤"}
          </Button>
        </div>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" />

        <Button type="button" onClick={generateDraft} className="bg-blue-500 text-white">Generate Draft AI</Button>

        {aiDraft && (
          <div className="border p-4 rounded bg-green-50 mt-4">
            <h3 className="font-semibold mb-2">AI Generated Draft</h3>
            <pre className="whitespace-pre-wrap">{aiDraft}</pre>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/records")}>Cancel</Button>
          <Button type="submit">Create Record</Button>
        </div>
      </form>
    </div>
  );
}
