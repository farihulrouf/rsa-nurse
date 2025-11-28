'use client';

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
import { Search, Plus, FileText, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const PATIENTS_DATA = [
  { id: "P001", name: "John Smith", age: 68, diagnosis: "Diabetes", status: "active", lastVisit: "2024-01-15", nextVisit: "2024-01-18", phone: "(555) 123-4567" },
  { id: "P002", name: "Mary Johnson", age: 72, diagnosis: "Hypertension", status: "active", lastVisit: "2024-01-14", nextVisit: "2024-01-17", phone: "(555) 234-5678" },
  { id: "P003", name: "Robert Williams", age: 65, diagnosis: "Heart Failure", status: "active", lastVisit: "2024-01-16", nextVisit: "2024-01-20", phone: "(555) 345-6789" },
  { id: "P004", name: "Patricia Brown", age: 70, diagnosis: "COPD", status: "active", lastVisit: "2024-01-13", nextVisit: "2024-01-19", phone: "(555) 456-7890" },
  { id: "P005", name: "Michael Davis", age: 66, diagnosis: "Stroke Recovery", status: "inactive", lastVisit: "2024-01-10", nextVisit: "2024-01-24", phone: "(555) 567-8901" },
  { id: "P006", name: "Linda Garcia", age: 74, diagnosis: "Arthritis", status: "active", lastVisit: "2024-01-15", nextVisit: "2024-01-18", phone: "(555) 678-9012" },
  { id: "P007", name: "James Martinez", age: 69, diagnosis: "Diabetes", status: "active", lastVisit: "2024-01-12", nextVisit: "2024-01-16", phone: "(555) 789-0123" },
  { id: "P008", name: "Barbara Rodriguez", age: 71, diagnosis: "Hypertension", status: "active", lastVisit: "2024-01-14", nextVisit: "2024-01-21", phone: "(555) 890-1234" },
  { id: "P009", name: "William Wilson", age: 67, diagnosis: "Post-Surgery", status: "active", lastVisit: "2024-01-16", nextVisit: "2024-01-17", phone: "(555) 901-2345" },
  { id: "P010", name: "Elizabeth Moore", age: 73, diagnosis: "Dementia", status: "active", lastVisit: "2024-01-11", nextVisit: "2024-01-18", phone: "(555) 012-3456" },
];

const Patients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtered data
  const filteredPatients = PATIENTS_DATA.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      || patient.id.toLowerCase().includes(searchQuery.toLowerCase())
      || patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Patient List</h2>
            <p className="text-muted-foreground mt-1">Manage and view all patients</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search by name, ID, or diagnosis..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg bg-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Next Visit</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell className="font-semibold">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.diagnosis}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        patient.status === "active"
                          ? "bg-success text-success-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{patient.nextVisit}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{patient.phone}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4 mr-2" /> View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(val) => { setItemsPerPage(Number(val)); setCurrentPage(1); }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground ml-4">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} patients
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
  );
};

export default Patients;
