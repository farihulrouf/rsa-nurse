'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

// Dummy records
const RECORDS_DATA = [
  { id: "R001", patientName: "John Smith", patientId: "P001", date: "2024-01-15", type: "visit", nurse: "Sarah Johnson", status: "completed", summary: "Vital signs normal, medication adherence good" },
  { id: "R002", patientName: "Mary Johnson", patientId: "P002", date: "2024-01-14", type: "visit", nurse: "Sarah Johnson", status: "completed", summary: "Blood pressure monitoring, diet counseling provided" },
  { id: "R003", patientName: "Robert Williams", patientId: "P003", date: "2024-01-16", type: "visit", nurse: "Sarah Johnson", status: "completed", summary: "Post-hospital follow-up, condition stable" },
  { id: "R004", patientName: "Patricia Brown", patientId: "P004", date: "2024-01-13", type: "phone", nurse: "Michael Brown", status: "completed", summary: "Phone consultation for medication questions" },
  { id: "R005", patientName: "Linda Garcia", patientId: "P006", date: "2024-01-15", type: "visit", nurse: "Sarah Johnson", status: "completed", summary: "Pain management assessment and care plan update" },
  { id: "R006", patientName: "James Martinez", patientId: "P007", date: "2024-01-12", type: "visit", nurse: "Michael Brown", status: "completed", summary: "Diabetes management, insulin administration" },
  { id: "R007", patientName: "Barbara Rodriguez", patientId: "P008", date: "2024-01-14", type: "visit", nurse: "Sarah Johnson", status: "completed", summary: "Routine vital signs check, all parameters normal" },
  { id: "R008", patientName: "William Wilson", patientId: "P009", date: "2024-01-16", type: "emergency", nurse: "Sarah Johnson", status: "completed", summary: "Emergency visit for wound care complication" },
  { id: "R009", patientName: "Elizabeth Moore", patientId: "P010", date: "2024-01-11", type: "visit", nurse: "Michael Brown", status: "completed", summary: "Cognitive assessment and family counseling" },
  { id: "R010", patientName: "John Smith", patientId: "P001", date: "2024-01-16", type: "phone", nurse: "Sarah Johnson", status: "draft", summary: "Follow-up call regarding new medication" },
  { id: "R011", patientName: "Mary Johnson", patientId: "P002", date: "2024-01-15", type: "visit", nurse: "Michael Brown", status: "pending", summary: "Scheduled visit pending completion" },
  { id: "R012", patientName: "Patricia Brown", patientId: "P004", date: "2024-01-14", type: "visit", nurse: "Sarah Johnson", status: "completed", summary: "Respiratory assessment, oxygen therapy adjusted" },
];

export default function Records() {
  const router = useRouter();

  // Table & filter states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all-types");
  const [statusFilter, setStatusFilter] = useState("all-status");

  // Modal search patient
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientQuery, setPatientQuery] = useState("");

  // Filter records for table
  const filteredRecords = RECORDS_DATA.filter((r) => {
    const matchesSearch =
      r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nurse.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all-types" || r.type === typeFilter;
    const matchesStatus = statusFilter === "all-status" || r.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  // Modal search patients
  const filteredPatients = RECORDS_DATA.filter((r) =>
    r.patientName.toLowerCase().includes(patientQuery.toLowerCase()) ||
    r.patientId.toLowerCase().includes(patientQuery.toLowerCase())
  );

  // Helpers
  const getTypeConfig = (type: string) => ({
    visit: { label: "Visit", className: "bg-primary text-primary-foreground" },
    phone: { label: "Phone", className: "bg-accent text-accent-foreground" },
    emergency: { label: "Emergency", className: "bg-destructive text-destructive-foreground" },
  }[type] || { label: type, className: "bg-muted text-muted-foreground" });

  const getStatusConfig = (status: string) => ({
    completed: { label: "Completed", className: "bg-green-500 text-white" },
    pending: { label: "Pending", className: "bg-yellow-500 text-warning-foreground" },
    draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  }[status] || { label: status, className: "bg-muted text-muted-foreground" });

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Records Management</h2>
          <p className="text-muted-foreground mt-1">View and manage all nursing visit records</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Create Record
        </Button>
      </div>

      {/* Modal Search Patient */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[400px] max-w-full p-4">
            <h3 className="text-lg font-bold mb-2">Select Patient</h3>
            <Input
              placeholder="Search patient..."
              value={patientQuery}
              onChange={(e) => setPatientQuery(e.target.value)}
            />
            <div className="mt-4 max-h-60 overflow-y-auto">
              {filteredPatients.map((p) => (
                <div
                  key={p.patientId + p.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                    router.push(`/dashboard/records/create?patientId=${p.patientId}`);

                  }}
                >
                  {p.patientName} ({p.patientId})
                </div>
              ))}
              {filteredPatients.length === 0 && <p className="text-muted-foreground mt-2">No patient found</p>}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="search"
            placeholder="Search by patient, ID, nurse..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Types</SelectItem>
            <SelectItem value="visit">Visit</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Record ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Nurse</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.id}</TableCell>
                <TableCell>
                  <p className="font-semibold">{record.patientName}</p>
                  <p className="text-xs text-muted-foreground">{record.patientId}</p>
                </TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Badge className={getTypeConfig(record.type).className}>{getTypeConfig(record.type).label}</Badge>
                </TableCell>
                <TableCell>{record.nurse}</TableCell>
                <TableCell>
                  <Badge className={getStatusConfig(record.status).className}>{getStatusConfig(record.status).label}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">{record.summary}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
            <SelectTrigger className="w-[70px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground ml-4">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredRecords.length)} of {filteredRecords.length} records
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button key={page} size="sm" variant={currentPage === page ? "default" : "outline"} onClick={() => handlePageChange(page)} className="w-8">{page}</Button>
          ))}
          <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
